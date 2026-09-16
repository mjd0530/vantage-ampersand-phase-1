import {
  SidebarItem,
  SidebarNav,
  SidebarSectionHeader,
} from '@cake-admin/cakeand';
import styled from 'styled-components';

import downloadIcon from '../../assets/nav/download.svg';
import homeIcon from '../../assets/nav/home.svg';
import identityIcon from '../../assets/nav/identity.svg';
import lockIcon from '../../assets/nav/lock.svg';
import partsIcon from '../../assets/nav/parts.svg';
import performanceIcon from '../../assets/nav/performance.svg';
import scanIcon from '../../assets/nav/scan.svg';
import securityIcon from '../../assets/nav/security.svg';
import settingsIcon from '../../assets/nav/settings.svg';
import supportIcon from '../../assets/nav/support.svg';
import utilitiesIcon from '../../assets/nav/utilities.svg';
import vantageAppIcon from '../../assets/vantage-app-icon.svg';
import type { NavigationItem } from '../../data/vantageData.js';

const Rail = styled.div`
  position: relative;
  z-index: 2;
  width: 232px;
  min-width: 232px;
  height: 100%;
  overflow: hidden;

  /* Cake& SidebarNav defaults to 280px; Figma rail is 232×1056. */
  nav {
    box-sizing: border-box;
    width: 232px !important;
    min-width: 232px;
    max-width: 232px;
    height: 100%;
    background: transparent;
    border-right: none;
  }

  /* Figma brand lockup uses space-200 between mark and Lenovo/Vantage. */
  nav > div > div:first-child {
    gap: var(--space-200);
    padding-right: 0;
  }

  /* Reclaim Cake& scrollbar gutter so labels match the 232px Figma column. */
  [data-radix-scroll-area-viewport] {
    width: 100% !important;
  }

  /* Hide only the Cake& ScrollArea thumb rail — not Tabs.List (also vertical). */
  [data-radix-scroll-area-scrollbar] {
    display: none;
  }

  /* No collapse/user in this shell — hide the empty footer rule. */
  nav > div:last-child {
    display: none;
  }

  /* Show full Figma labels (Identity Advisor / Smart Performance) without ellipsis. */
  [role='tab'] > span > span:last-child {
    overflow: visible;
    text-overflow: unset;
    white-space: normal;
  }
`;

const BrandIcon = styled.img`
  display: block;
  width: var(--space-600);
  height: var(--space-600);
  border-radius: var(--radius-150);
`;

const NavGlyph = styled.span<{ $src: string }>`
  display: block;
  width: var(--space-500);
  height: var(--space-500);
  background-color: currentColor;
  mask-image: url(${(props) => props.$src});
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-image: url(${(props) => props.$src});
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
`;

const icons: Record<NavigationItem['icon'], string> = {
  home: homeIcon,
  settings: settingsIcon,
  download: downloadIcon,
  scan: scanIcon,
  security: securityIcon,
  utilities: utilitiesIcon,
  support: supportIcon,
  identity: identityIcon,
  performance: performanceIcon,
  lock: lockIcon,
  parts: partsIcon,
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
          <SidebarItem
            key={item.id}
            value={item.id}
            icon={<NavGlyph $src={icons[item.icon]} />}
          >
            {item.label}
          </SidebarItem>
        ))}
        <SidebarSectionHeader>Vantage pro</SidebarSectionHeader>
        {proItems.map((item) => (
          <SidebarItem
            key={item.id}
            value={item.id}
            icon={<NavGlyph $src={icons[item.icon]} />}
          >
            {item.label}
          </SidebarItem>
        ))}
      </SidebarNav>
    </Rail>
  );
}
