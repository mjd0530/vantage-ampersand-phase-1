import { useCallback, useEffect, useRef, useState } from 'react';

import {
  systemUpdates,
  updateProgressIntervalMs,
  updateProgressStep,
  type UpdatePhase,
} from '../../data/updateFlow.js';

type UseUpdateFlowOptions = {
  /**
   * When true the next scan finishes in the failed state instead of finding
   * updates, so the prototype can reach Figma nodes 2754:29351 and 2754:29410.
   */
  failScan?: boolean;
  intervalMs?: number;
  step?: number;
};

export type UpdateFlow = {
  phase: UpdatePhase;
  progress: number;
  /** Whether the failed toast's More/Less disclosure is open. */
  failureExpanded: boolean;
  updateCount: number;
  busy: boolean;
  startScan: () => void;
  install: () => void;
  cancel: () => void;
  dismiss: () => void;
  toggleFailureDetail: () => void;
};

export function useUpdateFlow({
  failScan = false,
  intervalMs = updateProgressIntervalMs,
  step = updateProgressStep,
}: UseUpdateFlowOptions = {}): UpdateFlow {
  const [phase, setPhase] = useState<UpdatePhase>('idle');
  const [progress, setProgress] = useState(0);
  const [failureExpanded, setFailureExpanded] = useState(false);

  const running = phase === 'scanning' || phase === 'installing';

  // Read at completion time so toggling the switch mid-run neither restarts the
  // progress effect nor re-runs it with a stale value.
  const failScanRef = useRef(failScan);

  useEffect(() => {
    failScanRef.current = failScan;
  }, [failScan]);

  useEffect(() => {
    if (!running) {
      return undefined;
    }

    let value = 0;
    const timer = window.setInterval(() => {
      value = Math.min(100, value + step);

      if (value < 100) {
        setProgress(value);
        return;
      }

      window.clearInterval(timer);
      setProgress(0);
      setPhase(
        phase === 'scanning'
          ? failScanRef.current
            ? 'failed'
            : 'found'
          : 'installed',
      );
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, phase, running, step]);

  const startScan = useCallback(() => {
    setFailureExpanded(false);
    setProgress(0);
    setPhase('scanning');
  }, []);

  const install = useCallback(() => {
    setProgress(0);
    setPhase('installing');
  }, []);

  /**
   * Cancel steps back rather than closing: cancelling a scan returns to idle,
   * while cancelling an install leaves the found updates on screen.
   */
  const cancel = useCallback(() => {
    setProgress(0);
    setPhase((current) => (current === 'installing' ? 'found' : 'idle'));
  }, []);

  const dismiss = useCallback(() => {
    setProgress(0);
    setFailureExpanded(false);
    setPhase('idle');
  }, []);

  const toggleFailureDetail = useCallback(() => {
    setFailureExpanded((current) => !current);
  }, []);

  return {
    phase,
    progress,
    failureExpanded,
    updateCount: systemUpdates.length,
    busy: running,
    startScan,
    install,
    cancel,
    dismiss,
    toggleFailureDetail,
  };
}
