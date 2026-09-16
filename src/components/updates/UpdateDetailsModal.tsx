import { ListChecks } from 'lucide-react';
import {
  Badge,
  Modal,
  ModalContent,
  ModalFooter,
  ProgressBar,
} from '@cake-admin/cakeand';
import styled from 'styled-components';

import {
  systemUpdates,
  type UpdatePhase,
  type UpdateSeverity,
} from '../../data/updateFlow.js';

const List = styled.ul`
  display: grid;
  margin: var(--space-300) 0 0;
  padding: 0;
  gap: var(--space-100);
  list-style: none;
`;

const Row = styled.li`
  display: flex;
  align-items: center;
  gap: var(--space-300);
  padding: var(--space-200) 0;
  border-bottom: var(--stroke-100) solid var(--color-stroke-border-low);

  &:last-child {
    border-bottom: 0;
  }
`;

const RowText = styled.div`
  display: grid;
  flex: 1 1 0%;
  min-width: 0;
  gap: var(--space-025);
`;

const Name = styled.span`
  color: var(--color-text-icon-primary);
  font-size: var(--type-size-body);
  font-weight: var(--font-weight-medium);
`;

const Meta = styled.span`
  color: var(--color-text-icon-secondary);
  font-size: var(--type-size-caption);
  letter-spacing: 0.2px;
`;

const severityColor: Record<UpdateSeverity, 'destructive' | 'primary' | 'disabled'> = {
  critical: 'destructive',
  recommended: 'primary',
  optional: 'disabled',
};

const severityLabel: Record<UpdateSeverity, string> = {
  critical: 'Critical',
  recommended: 'Recommended',
  optional: 'Optional',
};

type UpdateDetailsModalProps = {
  open: boolean;
  phase: UpdatePhase;
  progress: number;
  onClose: () => void;
};

function getSummary(phase: UpdatePhase): string {
  switch (phase) {
    case 'scanning':
      return 'Checking Lenovo servers for driver, firmware, and BIOS updates for this device.';
    case 'installing':
      return 'Installing the updates found by the last scan. You can keep working while they install.';
    case 'installed':
      return 'These updates finished installing. Some changes apply after the next restart.';
    case 'failed':
      return 'The last scan did not finish, so this list is from the previous successful scan.';
    default:
      return 'Updates available for this device from the last scan.';
  }
}

export function UpdateDetailsModal({
  open,
  phase,
  progress,
  onClose,
}: UpdateDetailsModalProps) {
  const running = phase === 'scanning' || phase === 'installing';

  return (
    <Modal
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
      title="Update details"
      subtitle={`${systemUpdates.length} updates from the last scan`}
      modalIcon="icon"
      modalIconSlot={<ListChecks />}
      footer={
        <ModalFooter
          checkbox={<span />}
          actions={null}
          secondaryActionLabel="Close"
          onSecondaryAction={onClose}
          primaryActionLabel="Done"
          onPrimaryAction={onClose}
        />
      }
    >
      <ModalContent
        description={getSummary(phase)}
        descriptionAsDialogDescription={false}
      >
        {running ? (
          <ProgressBar
            value={progress}
            color="info"
            width="thin"
            label={phase === 'scanning' ? 'Scanning' : 'Installing'}
            labelValue={`${progress}%`}
            showLabelIcon={false}
            showHelper={false}
          />
        ) : null}
        <List>
          {systemUpdates.map((update) => (
            <Row key={update.id}>
              <RowText>
                <Name>{update.name}</Name>
                <Meta>
                  Version {update.version} • {update.size}
                </Meta>
              </RowText>
              <Badge color={severityColor[update.severity]} tone="subtle">
                {severityLabel[update.severity]}
              </Badge>
            </Row>
          ))}
        </List>
      </ModalContent>
    </Modal>
  );
}
