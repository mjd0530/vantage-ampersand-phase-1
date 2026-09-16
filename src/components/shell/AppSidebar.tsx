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
