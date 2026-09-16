import {
  CircleHelp,
  Cpu,
  Download,
  HardDrive,
  Home,
  LockKeyhole,
  ScanLine,
  Settings,
  ShieldCheck,
  ShieldUser,
  Wrench,
} from 'lucide-react';
import type { ReactNode } from 'react';
import {
  SidebarItem,
  SidebarNav,
  SidebarSectionHeader,
} from '@cake-admin/cakeand';
import styled from 'styled-components';

import vantageAppIcon from '../../assets/vantage-app-icon.svg';
import type { NavigationItem } from '../../data/vantageData.js';

const Rail = styled.div`
  position: relative;
  z-index: 2;
  width: 232px;
  min-width: 232px;
  height: 100%;
  overflow: hidden;

  nav {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background: transparent;
  }

  svg {
    width: var(--space-500);
    height: var(--space-500);
  }
`;

const BrandIcon = styled.img`
  width: var(--space-600);
  height: var(--space-600);
  border-radius: var(--radius-150);
`;

const icons: Record<NavigationItem['icon'], ReactNode> = {
  home: <Home />,
  settings: <Settings />,
  download: <Download />,
  scan: <ScanLine />,
  security: <ShieldCheck />,
  utilities: <Wrench />,
  support: <CircleHelp />,
  identity: <ShieldUser />,
  performance: <Cpu />,
  lock: <LockKeyhole />,
  parts: <HardDrive />,
};

type AppSidebarProps = {
  items: NavigationItem[];
};

export function AppSidebar({ items }: AppSidebarProps) {
  const mainItems = items.filter((item) => item.group === 'main');
  const proItems = items.filter((item) => item.group === 'pro');

  return (
    <Rail data-node-id="2076:14793">
      <SidebarNav
        aria-label="Vantage navigation"
        logo={<BrandIcon src={vantageAppIcon} alt="" />}
        productName="Lenovo"
        appName="Vantage"
        surface="translucent"
      >
        {mainItems.map((item) => (
          <SidebarItem key={item.id} value={item.id} icon={icons[item.icon]}>
            {item.label}
          </SidebarItem>
        ))}
        <SidebarSectionHeader>Vantage pro</SidebarSectionHeader>
        {proItems.map((item) => (
          <SidebarItem key={item.id} value={item.id} icon={icons[item.icon]}>
            {item.label}
          </SidebarItem>
        ))}
      </SidebarNav>
    </Rail>
  );
}
