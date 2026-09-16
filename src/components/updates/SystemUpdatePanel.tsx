import { Download, RefreshCw } from 'lucide-react';
import { Button, Card, Switch } from '@cake-admin/cakeand';
import styled from 'styled-components';

import { systemUpdates, type UpdatePhase } from '../../data/updateFlow.js';

const Panel = styled(Card)`
  width: 100%;
  min-width: 0;
`;

const Body = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--space-300);
  padding: var(--space-500);
`;

const Heading = styled.h2`
  margin: 0;
  color: var(--color-text-icon-primary);
  font-size: var(--type-size-subtitle);
  font-weight: var(--font-weight-bold);
`;

const Status = styled.p`
  margin: 0;
  color: var(--color-text-icon-secondary);
  font-size: var(--type-size-body);
  letter-spacing: 0.2px;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-100);
`;

const PrototypeControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-300);
  padding-top: var(--space-300);
  border-top: var(--stroke-100) solid var(--color-stroke-border-low);

  p {
    margin: 0;
    color: var(--color-text-icon-secondary);
    font-size: var(--type-size-caption);
    letter-spacing: 0.2px;
  }
`;

type SystemUpdatePanelProps = {
  phase: UpdatePhase;
  busy: boolean;
  failScan: boolean;
  onFailScanChange: (failScan: boolean) => void;
  onScan: () => void;
  onInstall: () => void;
};

/**
 * Deliberately avoids repeating the toast titles: the toast owns the live
 * percentage, so this line describes the state instead of mirroring it.
 */
function getStatusMessage(phase: UpdatePhase): string {
  switch (phase) {
    case 'scanning':
      return 'Looking for driver, firmware, and BIOS updates for this device.';
    case 'found':
      return `${systemUpdates.length} updates are ready to install.`;
    case 'installing':
      return 'Updates are installing. You can keep working while they finish.';
    case 'installed':
      return `${systemUpdates.length} updates finished installing.`;
    case 'failed':
      return 'The last update scan did not finish.';
    default:
      return 'Check for driver, firmware, and BIOS updates for this device.';
  }
}

export function SystemUpdatePanel({
  phase,
  busy,
  failScan,
  onFailScanChange,
  onScan,
  onInstall,
}: SystemUpdatePanelProps) {
  return (
    <Panel>
      <Body>
        <Heading>Updates</Heading>
        <Status aria-live="polite">{getStatusMessage(phase)}</Status>
        <Actions>
          <Button
            size="sm"
            startIcon={<RefreshCw />}
            disabled={busy}
            onClick={onScan}
          >
            {phase === 'scanning' ? 'Scanning...' : 'Check for updates'}
          </Button>
          {phase === 'found' ? (
            <Button
              size="sm"
              intent="secondary"
              variant="outline"
              startIcon={<Download />}
              onClick={onInstall}
            >
              Install all
            </Button>
          ) : null}
        </Actions>
        <PrototypeControls>
          <p>
            Prototype control — makes the next scan end in the failed state from
            Figma nodes 2754:29351 and 2754:29410.
          </p>
          <Switch
            label="Fail the next scan"
            checked={failScan}
            onCheckedChange={onFailScanChange}
          />
        </PrototypeControls>
      </Body>
    </Panel>
  );
}
