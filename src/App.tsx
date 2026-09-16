import { useCallback, useEffect, useMemo, useState } from 'react';
import { Activity } from 'lucide-react';
import {
  CakeProvider,
  Card,
  Modal,
  ModalContent,
  ModalFooter,
  ProgressBar,
  Toast,
} from '@cake-admin/cakeand';
import { Toast as RadixToast } from 'radix-ui';
import styled from 'styled-components';

import { Dashboard } from './components/dashboard/Dashboard.js';
import { ScenarioControl } from './components/prototype/ScenarioControl.js';
import { AppShell } from './components/shell/AppShell.js';
import { CommandBar } from './components/shell/CommandBar.js';
import { SystemUpdatePanel } from './components/updates/SystemUpdatePanel.js';
import { UpdateDetailsModal } from './components/updates/UpdateDetailsModal.js';
import { UpdateFlowToast } from './components/updates/UpdateFlowToast.js';
import { useUpdateFlow } from './components/updates/useUpdateFlow.js';
import {
  actionDelayMs,
  navigationItems,
  type NavigationItem,
  type PartnerService,
  type Scenario,
} from './data/vantageData.js';
import { GlobalStyles } from './styles/GlobalStyles.js';

const Page = styled.main`
  display: grid;
  gap: var(--space-500);
`;

const EmptyCard = styled(Card)`
  min-height: 552px;
`;

const EmptyContent = styled.section`
  display: grid;
  min-height: 552px;
  place-items: center;
  padding: var(--space-600);
  text-align: center;

  h2 {
    margin: 0 0 var(--space-100);
    font-size: var(--type-size-title);
  }

  p {
    max-width: 34rem;
    margin: 0;
    color: var(--color-text-icon-secondary);
    font-size: var(--type-size-body);
  }
`;

const SearchMessage = styled.p`
  margin: calc(-1 * var(--space-300)) 0 0;
  color: var(--color-text-icon-secondary);
  font-size: var(--type-size-caption);
`;

const ToastViewport = styled(RadixToast.Viewport)`
  position: fixed;
  z-index: 30;
  right: var(--space-500);
  bottom: var(--space-500);
  display: grid;
  /* 480px is the width Cake& gives the complex toast layout and the width the
     Figma update frames are drawn at; a narrower viewport would clip them. */
  width: min(480px, calc(100vw - (2 * var(--space-500))));
  margin: 0;
  padding: 0;
  gap: var(--space-200);
  list-style: none;
`;

type Notice = {
  id: number;
  title: string;
  status: 'info' | 'success' | 'error';
};

type ScanState = 'idle' | 'running' | 'complete';

function getInitialScenario(): Scenario {
  const value = new URLSearchParams(window.location.search).get('scenario');
  return ['default', 'loading', 'empty', 'error', 'success'].includes(value ?? '')
    ? (value as Scenario)
    : 'default';
}

export default function App() {
  const [selected, setSelected] = useState('home');
  const [scenario, setScenario] = useState<Scenario>(getInitialScenario);
  const [query, setQuery] = useState('');
  const [promotionIndex, setPromotionIndex] = useState(0);
  const [supportIndex, setSupportIndex] = useState(0);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [service, setService] = useState<PartnerService | null>(null);
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [failScan, setFailScan] = useState(false);
  const [updateDetailsOpen, setUpdateDetailsOpen] = useState(false);
  const showControls = new URLSearchParams(window.location.search).get('controls') === 'true';

  const updateFlow = useUpdateFlow({ failScan });

  const selectedItem = useMemo(
    () => navigationItems.find((item) => item.id === selected) ?? navigationItems[0],
    [selected],
  );

  const notify = useCallback((
    title: string,
    status: Notice['status'] = 'info',
  ) => {
    setNotice({ id: Date.now(), title, status });
  }, []);

  const checkUpdates = () => {
    setSelected('system-update');
    updateFlow.startScan();
  };

  useEffect(() => {
    if (scanState !== 'running') {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setScanState('complete');
      notify('Scan completed successfully', 'success');
    }, actionDelayMs);

    return () => window.clearTimeout(timeout);
  }, [notify, scanState]);

  const renderPanel = (item: NavigationItem) => (
    <Page>
      <CommandBar
        title={item.label}
        query={query}
        onQueryChange={setQuery}
        onAction={notify}
        onCheckUpdates={checkUpdates}
        updating={updateFlow.busy}
      />
      {query ? (
        <SearchMessage aria-live="polite">
          Searching Vantage for “{query}”
        </SearchMessage>
      ) : null}
      {item.id === 'home' ? (
        <Dashboard
          scenario={scenario}
          promotionIndex={promotionIndex}
          supportIndex={supportIndex}
          onPromotionChange={setPromotionIndex}
          onSupportChange={setSupportIndex}
          onNotify={notify}
          onServiceAction={(nextService) => {
            setService(nextService);
            setScanState('idle');
          }}
        />
      ) : item.id === 'system-update' ? (
        <SystemUpdatePanel
          phase={updateFlow.phase}
          busy={updateFlow.busy}
          failScan={failScan}
          onFailScanChange={setFailScan}
          onScan={updateFlow.startScan}
          onInstall={updateFlow.install}
        />
      ) : (
        <EmptyCard>
          <EmptyContent>
            <div>
              <h2>{item.label}</h2>
              <p>
                This destination is represented in the approved navigation, but its
                content is outside Figma node 2076:14773 and is intentionally not
                invented in Phase 1.
              </p>
            </div>
          </EmptyContent>
        </EmptyCard>
      )}
    </Page>
  );

  return (
    <CakeProvider mode="light.a">
      <GlobalStyles />
      <RadixToast.Provider swipeDirection="right">
        <AppShell
          selected={selectedItem.id}
          navigation={navigationItems}
          onSelectedChange={setSelected}
          renderPanel={renderPanel}
        />
        <UpdateFlowToast
          flow={updateFlow}
          onViewDetails={() => setUpdateDetailsOpen(true)}
        />
        {notice ? (
          <Toast
            key={notice.id}
            open
            status={notice.status}
            title={notice.title}
            type={notice.status === 'error' ? 'foreground' : 'background'}
            onDismiss={() => setNotice(null)}
            onOpenChange={(open) => {
              if (!open) setNotice(null);
            }}
          />
        ) : null}
        <ToastViewport aria-label="Notifications" />
      </RadixToast.Provider>

      <UpdateDetailsModal
        open={updateDetailsOpen}
        phase={updateFlow.phase}
        progress={updateFlow.progress}
        onClose={() => setUpdateDetailsOpen(false)}
      />

      <Modal
        open={service !== null}
        onOpenChange={(open) => {
          if (!open) setService(null);
        }}
        title={service?.title ?? 'Device scan'}
        subtitle="Local prototype scan"
        modalIcon="icon"
        modalIconSlot={<Activity />}
        footer={
          <ModalFooter
            checkbox={<span />}
            secondaryActionLabel="Cancel"
            onSecondaryAction={() => setService(null)}
            primaryActionLabel={
              scanState === 'complete'
                ? 'Done'
                : scanState === 'running'
                  ? 'Scanning...'
                  : 'Start scan'
            }
            primaryActionDisabled={scanState === 'running'}
            onPrimaryAction={() => {
              if (scanState === 'complete') {
                setService(null);
              } else {
                setScanState('running');
              }
            }}
          />
        }
      >
        <ModalContent
          description={
            scanState === 'complete'
              ? 'No issues were found. Your device is performing normally.'
              : 'This prototype uses local data and does not inspect your computer.'
          }
          descriptionAsDialogDescription={false}
        >
          {scanState !== 'idle' ? (
            <ProgressBar
              value={scanState === 'complete' ? 100 : 68}
              color={scanState === 'complete' ? 'success' : 'primary'}
              label="Device scan"
              labelValue={scanState === 'complete' ? 'Complete' : '68%'}
              helperText={
                scanState === 'complete' ? 'Scan complete' : 'Checking system health'
              }
              helperTone={scanState === 'complete' ? 'success' : 'greyscale'}
            />
          ) : null}
        </ModalContent>
      </Modal>

      {showControls ? (
        <ScenarioControl
          value={scenario}
          onChange={(nextScenario) => {
            setScenario(nextScenario);
            if (nextScenario === 'success') {
              notify('Device data refreshed', 'success');
            }
          }}
        />
      ) : null}
    </CakeProvider>
  );
}
