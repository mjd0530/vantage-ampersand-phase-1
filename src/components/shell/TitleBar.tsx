import { Minus, Square, X } from 'lucide-react';
import styled from 'styled-components';

import vantageTitleIcon from '../../assets/vantage-title-icon.svg';
import { getDesktopApi } from '../../desktop/windowApi.js';

const Bar = styled.header`
  position: relative;
  z-index: 4;
  display: flex;
  min-height: var(--space-800);
  align-items: center;
  justify-content: space-between;
  background: var(--color-surfaces-canvas);
  color: var(--color-text-icon-primary);
  user-select: none;
  -webkit-app-region: drag;
  app-region: drag;
`;

const Identity = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-300);
  padding-inline: var(--space-300);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
`;

const AppIcon = styled.img`
  width: var(--space-300);
  height: var(--space-300);
  border-radius: var(--radius-50);
`;

const WindowControls = styled.div`
  display: flex;
  align-self: stretch;
  -webkit-app-region: no-drag;
  app-region: no-drag;
`;

const CaptionButton = styled.button`
  display: grid;
  width: var(--space-800);
  min-width: var(--space-800);
  place-items: center;
  border: 0;
  background: transparent;
  color: var(--color-text-icon-primary);
  -webkit-app-region: no-drag;
  app-region: no-drag;

  svg {
    width: var(--space-200);
    height: var(--space-200);
  }

  &:hover {
    background: var(--color-tonal-tonal-secondary-overlay-hover);
  }

  &:active {
    background: var(--color-tonal-tonal-secondary-overlay-press);
  }

  &:focus-visible {
    outline: var(--stroke-200) solid var(--color-primary-primary);
    outline-offset: calc(-1 * var(--stroke-200));
  }

  &:last-child:hover {
    background: var(--color-error-error);
    color: var(--color-text-icon-inverse);
  }
`;

export function TitleBar() {
  const desktop = getDesktopApi();

  return (
    <Bar data-node-id="2076:14775">
      <Identity>
        <AppIcon src={vantageTitleIcon} alt="" />
        <span>Lenovo Vantage</span>
      </Identity>
      <WindowControls aria-label="Window controls">
        <CaptionButton
          type="button"
          aria-label="Minimize"
          onClick={() => {
            void desktop?.minimize();
          }}
        >
          <Minus aria-hidden="true" />
        </CaptionButton>
        <CaptionButton
          type="button"
          aria-label="Maximize"
          onClick={() => {
            void desktop?.maximize();
          }}
        >
          <Square aria-hidden="true" />
        </CaptionButton>
        <CaptionButton
          type="button"
          aria-label="Close"
          onClick={() => {
            void desktop?.close();
          }}
        >
          <X aria-hidden="true" />
        </CaptionButton>
      </WindowControls>
    </Bar>
  );
}
