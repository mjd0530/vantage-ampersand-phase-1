import { CircleHelp, MoreVertical } from 'lucide-react';
import { Card, IconButton } from '@cake-admin/cakeand';
import styled from 'styled-components';

const SizedCard = styled(Card)`
  height: 264px;
`;

const Content = styled.section`
  box-sizing: border-box;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  padding: var(--space-500);
`;

const Header = styled.header`
  display: flex;
  width: 100%;
  min-height: var(--space-600);
  align-items: center;
  gap: var(--space-100);
`;

const Title = styled.h2`
  flex: 1;
  margin: 0;
  color: var(--color-text-icon-primary);
  font-size: var(--type-size-subtitle);
  font-weight: var(--font-weight-bold);
`;

const StatusIcon = styled.img`
  width: var(--space-500);
  height: var(--space-500);
`;

const Gauge = styled.div`
  position: relative;
  display: grid;
  width: 112px;
  height: 112px;
  margin-top: var(--space-300);
  place-items: center;

  svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }

  circle {
    fill: none;
    stroke-width: var(--space-200);
  }

  .track {
    stroke: var(--color-surfaces-on-container-low);
  }

  .value {
    stroke: var(--color-info-info);
    stroke-linecap: round;
  }
`;

const GaugeContent = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  justify-items: center;
  gap: var(--space-050);
  color: var(--color-text-icon-primary);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-bold);
`;

const GaugeIcon = styled.img`
  width: var(--space-600);
  height: var(--space-600);
`;

const Footer = styled.div`
  display: flex;
  margin-top: auto;
  align-items: center;
  justify-content: center;
  gap: var(--space-050);
  color: var(--color-text-icon-primary);
  font-size: var(--type-size-caption);

  button {
    border: 0;
    background: transparent;
    color: var(--color-primary-primary);
    font: inherit;
    font-weight: var(--font-weight-bold);
    text-decoration: underline;
    text-underline-offset: var(--space-025);
  }

  button:focus-visible {
    outline: var(--stroke-200) solid var(--color-primary-primary);
    outline-offset: var(--space-025);
  }
`;

type StatusCardProps = {
  title: string;
  value: number;
  valueLabel: string;
  detail: string;
  headerIcon?: string;
  gaugeIcon: string;
  action?: string;
  onAction?: () => void;
  onMenu: () => void;
};

export function StatusCard({
  title,
  value,
  valueLabel,
  detail,
  headerIcon,
  gaugeIcon,
  action,
  onAction,
  onMenu,
}: StatusCardProps) {
  return (
    <SizedCard>
      <Content aria-label={`${title}: ${valueLabel}`}>
        <Header>
          <Title>{title}</Title>
          {headerIcon ? <StatusIcon src={headerIcon} alt="" /> : <CircleHelp aria-hidden="true" />}
          <IconButton
            label={`${title} options`}
            icon={<MoreVertical />}
            size="sm"
            intent="secondary"
            variant="ghost"
            onClick={onMenu}
          />
        </Header>
        <Gauge aria-hidden="true">
          <svg viewBox="0 0 112 112">
            <circle className="track" cx="56" cy="56" r="44" pathLength="100" />
            <circle
              className="value"
              cx="56"
              cy="56"
              r="44"
              pathLength="100"
              strokeDasharray={`${value} 100`}
            />
          </svg>
          <GaugeContent>
            <GaugeIcon src={gaugeIcon} alt="" />
            <span>{valueLabel}</span>
          </GaugeContent>
        </Gauge>
        <Footer>
          <span>{detail}</span>
          {action ? (
            <button type="button" onClick={onAction}>
              {action}
            </button>
          ) : null}
        </Footer>
      </Content>
    </SizedCard>
  );
}
