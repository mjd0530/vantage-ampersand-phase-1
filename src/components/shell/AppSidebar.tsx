import {
  SidebarItem,
  SidebarNav,
  SidebarSectionHeader,
} from '@cake-admin/cakeand';
import styled from 'styled-components';

import downloadIcon from '../../assets/nav/download.svg?raw';
import homeIcon from '../../assets/nav/home.svg?raw';
import identityIcon from '../../assets/nav/identity.svg?raw';
import lockIcon from '../../assets/nav/lock.svg?raw';
import partsIcon from '../../assets/nav/parts.svg?raw';
import performanceIcon from '../../assets/nav/performance.svg?raw';
import scanIcon from '../../assets/nav/scan.svg?raw';
import securityIcon from '../../assets/nav/security.svg?raw';
import settingsIcon from '../../assets/nav/settings.svg?raw';
import supportIcon from '../../assets/nav/support.svg?raw';
import utilitiesIcon from '../../assets/nav/utilities.svg?raw';
import vantageAppIcon from '../../assets/vantage-app-icon.svg';
import type { NavigationItem } from '../../data/vantageData.js';

// Figma pins the expanded rail at 232; Cake& owns the collapsed icon rail.
export const EXPANDED_RAIL = '232px';
export const COLLAPSED_RAIL = '96px';

const Rail = styled.div<{ $collapsed: boolean }>`
  position: relative;
  z-index: 2;
  width: ${({ $collapsed }) => ($collapsed ? COLLAPSED_RAIL : EXPANDED_RAIL)};
  min-width: ${({ $collapsed }) => ($collapsed ? COLLAPSED_RAIL : EXPANDED_RAIL)};
  height: 100%;
  overflow: hidden;

  /* Cake& SidebarNav ships 280/96; the rail width is owned here instead. */
  nav {
    box-sizing: border-box;
    width: 100% !important;
    max-width: 100%;
    height: 100%;
    background: transparent;
    border-right: none;
  }

  /* Reclaim Cake& scrollbar gutter so labels match the 232px Figma column. */
  [data-radix-scroll-area-viewport] {
    width: 100% !important;
  }

  /* Hide only the Cake& ScrollArea thumb rail — not Tabs.List (also vertical). */
  [data-radix-scroll-area-scrollbar] {
    display: none;
  }

  /* Collapsed rows centre their glyph and hide labels via Cake&'s own rules. */
  ${({ $collapsed }) =>
    $collapsed
      ? ''
      : `
  /* Figma brand lockup uses space-200 between mark and Lenovo/Vantage. */
  nav > div > div:first-child {
    gap: var(--space-200);
    padding-right: 0;
  }

  /* Show full Figma labels (Identity Advisor / Smart Performance) without ellipsis. */
  [role='tab'] > span > span:last-child {
    overflow: visible;
    text-overflow: unset;
    white-space: normal;
  }
  `}
`;

const BrandIcon = styled.img`
  display: block;
  width: var(--space-600);
  height: var(--space-600);
  border-radius: var(--radius-150);
`;

const NavGlyph = styled.span`
  display: inline-flex;
  flex: none;
  width: var(--space-500);
  height: var(--space-500);
  color: currentColor;

  svg {
    display: block;
    width: var(--space-500);
    height: var(--space-500);
  }
`;

function toCurrentColorSvg(markup: string): string {
  return markup
    .replaceAll('fill="black"', 'fill="currentColor"')
    .replaceAll("fill='black'", "fill='currentColor'");
}

const icons: Record<NavigationItem['icon'], string> = {
  home: toCurrentColorSvg(homeIcon),
  settings: toCurrentColorSvg(settingsIcon),
  download: toCurrentColorSvg(downloadIcon),
  scan: toCurrentColorSvg(scanIcon),
  security: toCurrentColorSvg(securityIcon),
  utilities: toCurrentColorSvg(utilitiesIcon),
  support: toCurrentColorSvg(supportIcon),
  identity: toCurrentColorSvg(identityIcon),
  performance: toCurrentColorSvg(performanceIcon),
  lock: toCurrentColorSvg(lockIcon),
  parts: toCurrentColorSvg(partsIcon),
};

type AppSidebarProps = {
  items: NavigationItem[];
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
};

export function AppSidebar({ items, collapsed, onCollapsedChange }: AppSidebarProps) {
  const mainItems = items.filter((item) => item.group === 'main');
  const proItems = items.filter((item) => item.group === 'pro');

  return (
    <Rail $collapsed={collapsed} data-node-id="2076:14793">
      <SidebarNav
        aria-label="Vantage navigation"
        logo={<BrandIcon src={vantageAppIcon} alt="" />}
        productName="Lenovo"
        appName="Vantage"
        surface="translucent"
        collapsed={collapsed}
        onCollapsedChange={onCollapsedChange}
      >
        {mainItems.map((item) => (
          <SidebarItem
            key={item.id}
            value={item.id}
            icon={
              <NavGlyph
                aria-hidden
                dangerouslySetInnerHTML={{ __html: icons[item.icon] }}
              />
            }
          >
            {item.label}
          </SidebarItem>
        ))}
        <SidebarSectionHeader>Vantage pro</SidebarSectionHeader>
        {proItems.map((item) => (
          <SidebarItem
            key={item.id}
            value={item.id}
            icon={
              <NavGlyph
                aria-hidden
                dangerouslySetInnerHTML={{ __html: icons[item.icon] }}
              />
            }
          >
            {item.label}
          </SidebarItem>
        ))}
      </SidebarNav>
    </Rail>
  );
}
