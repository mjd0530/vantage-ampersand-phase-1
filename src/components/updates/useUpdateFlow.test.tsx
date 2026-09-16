import { act, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { systemUpdates } from '../../data/updateFlow.js';
import { useUpdateFlow, type UpdateFlow } from './useUpdateFlow.js';

/**
 * Drives the machine with fast timings so the phase transitions are covered
 * without waiting out the real three-second runs.
 */
function renderFlow(failScan = false) {
  const seen: { current: UpdateFlow | null } = { current: null };

  function Probe() {
    const flow = useUpdateFlow({ failScan, intervalMs: 1, step: 50 });
    seen.current = flow;
    return <output>{`${flow.phase}:${flow.progress}`}</output>;
  }

  render(<Probe />);
  return seen as { current: UpdateFlow };
}

async function runToCompletion() {
  // Two 50% ticks finish a run; the extra frames let React flush the phase.
  await act(async () => {
    await new Promise((resolve) => window.setTimeout(resolve, 40));
  });
}

describe('useUpdateFlow', () => {
  it('starts idle with every update counted', () => {
    const flow = renderFlow();

    expect(flow.current.phase).toBe('idle');
    expect(flow.current.progress).toBe(0);
    expect(flow.current.busy).toBe(false);
    expect(flow.current.updateCount).toBe(systemUpdates.length);
  });

  it('resolves a scan into found updates', async () => {
    const flow = renderFlow();

    act(() => flow.current.startScan());
    expect(flow.current.busy).toBe(true);

    await runToCompletion();
    expect(flow.current.phase).toBe('found');
    expect(flow.current.progress).toBe(0);
  });

  it('resolves a scan into the failed state when the next scan should fail', async () => {
    const flow = renderFlow(true);

    act(() => flow.current.startScan());
    await runToCompletion();

    expect(flow.current.phase).toBe('failed');
  });

  it('resolves an install into the installed state', async () => {
    const flow = renderFlow();

    act(() => flow.current.startScan());
    await runToCompletion();
    act(() => flow.current.install());
    await runToCompletion();

    expect(flow.current.phase).toBe('installed');
  });

  it('steps a cancelled install back to found and a cancelled scan to idle', async () => {
    const flow = renderFlow();

    act(() => flow.current.startScan());
    await runToCompletion();
    act(() => flow.current.install());
    act(() => flow.current.cancel());
    expect(flow.current.phase).toBe('found');

    act(() => flow.current.startScan());
    act(() => flow.current.cancel());
    expect(flow.current.phase).toBe('idle');
  });

  it('toggles the failure disclosure and clears it on a new scan', async () => {
    const flow = renderFlow(true);

    act(() => flow.current.startScan());
    await runToCompletion();
    expect(flow.current.failureExpanded).toBe(false);

    act(() => flow.current.toggleFailureDetail());
    expect(flow.current.failureExpanded).toBe(true);

    act(() => flow.current.startScan());
    expect(flow.current.failureExpanded).toBe(false);
  });

  it('dismisses back to idle from any phase', async () => {
    const flow = renderFlow();

    act(() => flow.current.startScan());
    await runToCompletion();
    act(() => flow.current.dismiss());

    expect(flow.current.phase).toBe('idle');
    expect(screen.getByText('idle:0')).toBeInTheDocument();
  });
});
