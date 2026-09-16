import { ChevronDown, ChevronUp, Download, RefreshCw } from 'lucide-react';
import { Button, ProgressBar } from '@cake-admin/cakeand';
import styled from 'styled-components';

import { updateFlowCopy } from '../../data/updateFlow.js';
import {
  CheckCircleGlyph,
  DownloadGlyph,
  ErrorGlyph,
  InfoGlyph,
} from './UpdateGlyphs.js';
import { UpdateToast } from './UpdateToast.js';
import type { UpdateFlow } from './useUpdateFlow.js';

const Track = styled.div`
  width: 100%;

  /* Figma draws the bare 12px track with no label, value, or helper rows. */
  > * {
    width: 100%;
  }
`;

const DisclosureRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* Figma indents the toggle so its label — not its 12px padding box — lands on
     the 40px text column. */
  padding-left: calc(var(--space-700) - var(--space-200));
`;

const DisclosureDetail = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding-right: var(--space-100);
  padding-left: var(--space-700);

  p {
    margin: 0;
    color: var(--color-text-icon-secondary);
    font-family: var(--font-family);
    font-size: var(--type-size-body);
    font-weight: var(--font-weight-regular);
    letter-spacing: 0.2px;
    line-height: 1.35;
  }
`;

type UpdateFlowToastProps = {
  flow: UpdateFlow;
  onViewDetails: () => void;
};

export function UpdateFlowToast({ flow, onViewDetails }: UpdateFlowToastProps) {
  const {
    phase,
    progress,
    failureExpanded,
    updateCount,
    cancel,
    dismiss,
    install,
    startScan,
    toggleFailureDetail,
  } = flow;

  if (phase === 'idle') {
    return null;
  }

  const viewDetails = (
    <Button size="sm" intent="secondary" variant="ghost" onClick={onViewDetails}>
      View details
    </Button>
  );

  if (phase === 'scanning' || phase === 'installing') {
    const scanning = phase === 'scanning';

    return (
      <UpdateToast
        data-node-id={scanning ? '2389:28635' : '2754:29544'}
        status="info"
        icon={scanning ? <InfoGlyph /> : <DownloadGlyph />}
        title={
          scanning
            ? updateFlowCopy.scanTitle(progress)
            : updateFlowCopy.installTitle(progress)
        }
        media={
          <Track>
            <ProgressBar
              value={progress}
              color="info"
              width="thin"
              label={null}
              showHelper={false}
              aria-label={scanning ? 'Scan progress' : 'Installation progress'}
            />
          </Track>
        }
        actions={
          <>
            <Button size="sm" intent="secondary" variant="ghost" onClick={cancel}>
              Cancel
            </Button>
            <Button size="sm" onClick={onViewDetails}>
              View details
            </Button>
          </>
        }
        onDismiss={dismiss}
      />
    );
  }

  if (phase === 'found') {
    return (
      <UpdateToast
        data-node-id="2725:28249"
        status="info"
        icon={<InfoGlyph />}
        title={updateFlowCopy.foundTitle(updateCount)}
        description={updateFlowCopy.foundDescription}
        actions={
          <>
            {viewDetails}
            <Button
              size="sm"
              intent="secondary"
              variant="ghost"
              startIcon={<RefreshCw />}
              onClick={startScan}
            >
              Scan again
            </Button>
            <Button size="sm" startIcon={<Download />} onClick={install}>
              Install
            </Button>
          </>
        }
        onDismiss={dismiss}
      />
    );
  }

  if (phase === 'installed') {
    return (
      <UpdateToast
        data-node-id="2754:29591"
        status="success"
        icon={<CheckCircleGlyph />}
        title={updateFlowCopy.installedTitle(updateCount)}
        description={updateFlowCopy.installedDescription}
        actions={
          <>
            {viewDetails}
            {/* Both actions read "View details" in node 2754:29591. Kept as
                designed; flagged as placeholder copy in the README. */}
            <Button size="sm" onClick={onViewDetails}>
              View details
            </Button>
          </>
        }
        onDismiss={dismiss}
      />
    );
  }

  return (
    <UpdateToast
      data-node-id={failureExpanded ? '2754:29410' : '2754:29351'}
      status="error"
      icon={<ErrorGlyph />}
      title={updateFlowCopy.scanFailureTitle}
      description={updateFlowCopy.scanFailureDescription}
      media={
        <>
          <DisclosureRow>
            <Button
              size="xs"
              intent="secondary"
              variant="ghost"
              endIcon={failureExpanded ? <ChevronUp /> : <ChevronDown />}
              aria-expanded={failureExpanded}
              aria-controls="update-scan-failure-detail"
              onClick={toggleFailureDetail}
            >
              {failureExpanded ? 'Less' : 'More'}
            </Button>
          </DisclosureRow>
          {failureExpanded ? (
            <DisclosureDetail id="update-scan-failure-detail">
              <p>{updateFlowCopy.scanFailureDetail}</p>
            </DisclosureDetail>
          ) : null}
        </>
      }
      actions={
        <>
          {viewDetails}
          <Button size="sm" startIcon={<RefreshCw />} onClick={startScan}>
            Scan again
          </Button>
        </>
      }
      onDismiss={dismiss}
    />
  );
}
