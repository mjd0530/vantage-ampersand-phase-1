import type { ReactNode } from 'react';
import { Sidebar, SidebarContent } from '@cake-admin/cakeand';
import styled from 'styled-components';

import wallpaper from '../../assets/wallpaper.png';
import type { NavigationItem } from '../../data/vantageData.js';
import { isDesktopShell } from '../../desktop/windowApi.js';
import { AppSidebar } from './AppSidebar.js';
import { TitleBar } from './TitleBar.js';

const Desktop = styled.div<{ $nativeWindow?: boolean }>`
  min-width: 1180px;
  min-height: 100vh;
  height: ${(props) => (props.$nativeWindow ? '100vh' : 'auto')};
  overflow: ${(props) => (props.$nativeWindow ? 'hidden' : 'visible')};
  background-image: url(${wallpaper});
  background-position: center;
  background-size: cover;
`;

const Window = styled.div`
  box-sizing: border-box;
  min-height: 100vh;
  overflow: hidden;
  border-radius: var(--radius-150);
  outline: var(--space-100) solid var(--color-stroke-border-container-os);
  outline-offset: calc(-1 * var(--space-100));
  background: var(--color-surfaces-container-blur-high);
  background-clip: padding-box;
  box-shadow: var(--elevation-5);
  backdrop-filter: blur(45px);
`;

const ShellTabs = styled(Sidebar)`
  display: grid;
  min-height: calc(100vh - var(--space-800));
  grid-template-columns: 232px minmax(0, 1fr);
  gap: 0;
`;

const Workspace = styled(SidebarContent)`
  box-sizing: border-box;
  min-width: 0;
  padding: var(--space-500) var(--space-600) var(--space-800);
  outline: none;
`;

type AppShellProps = {
  selected: string;
  navigation: NavigationItem[];
  onSelectedChange: (value: string) => void;
  renderPanel: (item: NavigationItem) => ReactNode;
};

export function AppShell({
  selected,
  navigation,
  onSelectedChange,
  renderPanel,
}: AppShellProps) {
  const nativeWindow = isDesktopShell();

  return (
    <Desktop $nativeWindow={nativeWindow} data-desktop-shell={nativeWindow ? 'true' : undefined}>
      <Window data-node-id="2076:14774">
        <TitleBar />
        <ShellTabs
          value={selected}
          onValueChange={onSelectedChange}
          activationMode="manual"
        >
          <AppSidebar items={navigation} />
          {navigation.map((item) => (
            <Workspace key={item.id} value={item.id}>
              {renderPanel(item)}
            </Workspace>
          ))}
        </ShellTabs>
      </Window>
    </Desktop>
  );
}
