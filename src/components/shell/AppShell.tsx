import { useState, type ReactNode } from 'react';
import { Sidebar, SidebarContent } from '@cake-admin/cakeand';
import styled from 'styled-components';

import wallpaper from '../../assets/wallpaper.png';
import type { NavigationItem } from '../../data/vantageData.js';
import { AppSidebar, COLLAPSED_RAIL, EXPANDED_RAIL } from './AppSidebar.js';
import { TitleBar } from './TitleBar.js';

const Desktop = styled.div`
  min-width: 1180px;
  height: 100%;
  background-image: url(${wallpaper});
  background-position: center;
  background-size: cover;
`;

const Window = styled.div`
  box-sizing: border-box;
  display: flex;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
  border-radius: var(--radius-150);
  outline: var(--space-100) solid var(--color-stroke-border-container-os);
  outline-offset: calc(-1 * var(--space-100));
  background: var(--color-surfaces-container-blur-high);
  background-clip: padding-box;
  box-shadow: var(--elevation-5);
  backdrop-filter: blur(45px);
`;

const ShellTabs = styled(Sidebar)<{ $navWidth: string }>`
  display: grid;
  flex: 1;
  min-height: 0;
  grid-template-columns: ${({ $navWidth }) => $navWidth} minmax(0, 1fr);
  /* A definite row keeps the panel from growing to its content, which is what
     lets the workspace scroll while the rail holds its full-height column.
     Cake& Sidebar aligns to flex-start, so stretch is restored here. */
  grid-template-rows: minmax(0, 1fr);
  align-items: stretch;
  gap: 0;
  transition: grid-template-columns 160ms ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

// Only the workspace scrolls; the rail beside it keeps its full-height row.
const Workspace = styled(SidebarContent)`
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
  overflow-y: auto;
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
  const [navCollapsed, setNavCollapsed] = useState(false);

  return (
    <Desktop>
      <Window data-node-id="2076:14774">
        <TitleBar />
        <ShellTabs
          value={selected}
          onValueChange={onSelectedChange}
          activationMode="manual"
          $navWidth={navCollapsed ? COLLAPSED_RAIL : EXPANDED_RAIL}
        >
          <AppSidebar
            items={navigation}
            collapsed={navCollapsed}
            onCollapsedChange={setNavCollapsed}
          />
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
