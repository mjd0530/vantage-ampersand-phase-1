import {
  ChevronLeft,
  ChevronRight,
  ContactRound,
  Copy,
  Download,
  ExternalLink,
  Headphones,
  MoreVertical,
  PackageSearch,
} from 'lucide-react';
import {
  Button,
  Card,
  IconButton,
  Spinner,
} from '@cake-admin/cakeand';
import styled from 'styled-components';

import absoluteLogo from '../../assets/absolute-logo.svg';
import batteryGaugeIcon from '../../assets/battery-gauge.svg';
import batteryHeartIcon from '../../assets/battery-heart.svg';
import microsoftOffer from '../../assets/microsoft-365-offer.png';
import smartLock from '../../assets/smart-lock.png';
import smartPerformance from '../../assets/smart-performance.png';
import sutherlandLogo from '../../assets/sutherland-logo.svg';
import warrantyGaugeIcon from '../../assets/warranty-gauge.svg';
import {
  device,
  partnerServices,
  promotions,
  supportActions,
  type PartnerService,
  type Scenario,
  type SupportAction,
} from '../../data/vantageData.js';
import { StatusCard } from './StatusCard.js';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--space-500);
`;

const DeviceSlot = styled.div`
  grid-column: span 2;
`;

const WideSlot = styled.div`
  grid-column: span 2;
`;

const FixedCard = styled(Card)`
  height: 264px;
`;

const CardBody = styled.section`
  box-sizing: border-box;
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: var(--space-300);
  padding: var(--space-500);
`;

const CardHeader = styled.header`
  display: flex;
  min-height: var(--space-600);
  align-items: center;
  gap: var(--space-200);
`;

const CardTitle = styled.h2`
  flex: 1;
  overflow: hidden;
  margin: 0;
  color: var(--color-text-icon-primary);
  font-size: var(--type-size-subtitle);
  font-weight: var(--font-weight-bold);
  line-height: 1.35;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DeviceRows = styled.dl`
  display: grid;
  flex: 1;
  margin: 0;
  overflow: hidden;
  border: var(--stroke-100) solid var(--color-stroke-border);
  border-radius: var(--radius-300);
  background: var(--color-surfaces-container);
`;

const DeviceRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr var(--space-600);
  align-items: center;
  gap: var(--space-300);
  padding-inline: var(--space-300) var(--space-100);
  border-bottom: var(--stroke-100) solid var(--color-stroke-border);
  color: var(--color-text-icon-primary);
  font-size: var(--type-size-body);
  font-weight: var(--font-weight-medium);

  &:last-child {
    border-bottom: 0;
  }

  dt,
  dd {
    margin: 0;
  }

  dd {
    overflow: hidden;
    text-align: right;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const SupportGrid = styled.div`
  display: grid;
  flex: 1;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-200) var(--space-300);
`;

const SupportButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-100);
  border: var(--stroke-100) solid var(--color-stroke-border-low);
  border-radius: var(--radius-300);
  background: var(--color-surfaces-on-container-high);
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  font-weight: var(--font-weight-bold);

  &:hover {
    background: var(--color-tonal-tonal-secondary-overlay-hover);
  }

  &:active {
    background: var(--color-tonal-tonal-secondary-overlay-press);
  }

  &:focus-visible {
    outline: var(--stroke-200) solid var(--color-primary-primary);
    outline-offset: var(--space-025);
  }

  svg {
    width: var(--space-500);
    height: var(--space-500);
    color: var(--color-primary-primary);
  }
`;

const Pager = styled.footer`
  display: grid;
  grid-template-columns: var(--space-600) 1fr var(--space-600);
  align-items: center;
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--space-100);
`;

const Dot = styled.span<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? 'var(--space-500)' : 'var(--space-100)')};
  height: var(--space-100);
  border-radius: var(--radius-1000);
  background: ${({ $active }) =>
    $active ? 'var(--color-secondary-secondary)' : 'var(--color-text-icon-placeholder)'};
  transition: width 160ms ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const PromotionBody = styled.div`
  display: grid;
  flex: 1;
  grid-template-columns: 168px minmax(0, 1fr);
  gap: var(--space-500);
`;

const PromotionImage = styled.img`
  width: 168px;
  height: 168px;
  border-radius: var(--radius-300);
  object-fit: cover;
`;

const PromotionCopy = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
`;

const PromotionTitle = styled.h2`
  margin: 0;
  color: var(--color-text-icon-primary);
  font-size: var(--type-size-subtitle);
  line-height: 1.35;
`;

const BodyText = styled.p`
  margin: var(--space-100) 0 0;
  color: var(--color-text-icon-secondary);
  font-size: var(--type-size-body);
  line-height: 1.35;
`;

const PromotionAction = styled.div`
  margin-top: auto;
  align-self: flex-start;
`;

const ServiceBody = styled.section`
  box-sizing: border-box;
  display: grid;
  height: 100%;
  grid-template-columns: 188px minmax(0, 1fr);
  gap: var(--space-600);
  padding: var(--space-500);
`;

const ServiceMedia = styled.div`
  display: grid;
  width: 188px;
  height: 216px;
  place-items: center;
  overflow: hidden;
  border-radius: var(--radius-300);
  background: var(--color-surfaces-on-container-high);
`;

const ServiceImage = styled.img`
  width: 92%;
  height: 82%;
  object-fit: contain;
`;

const ServiceCopy = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
`;

const PoweredBy = styled.div`
  display: flex;
  min-height: var(--space-500);
  align-items: center;
  gap: var(--space-100);
  color: var(--color-text-icon-secondary);
  font-size: var(--type-size-subject);
`;

const PartnerLogo = styled.img`
  width: auto;
  max-width: 136px;
  height: var(--space-500);
  object-fit: contain;
`;

const ServiceActions = styled.div`
  display: flex;
  margin-top: auto;
  gap: var(--space-300);
`;

const ScenarioCard = styled(Card)`
  grid-column: 1 / -1;
  min-height: 552px;
`;

const ScenarioContent = styled.section`
  display: grid;
  min-height: 552px;
  place-items: center;
  padding: var(--space-600);
  color: var(--color-text-icon-primary);
  text-align: center;

  h2 {
    margin: 0 0 var(--space-100);
    font-size: var(--type-size-title);
  }

  p {
    max-width: 32rem;
    margin: 0;
    color: var(--color-text-icon-secondary);
    font-size: var(--type-size-body);
  }
`;

const supportIcons: Record<SupportAction['icon'], React.ReactNode> = {
  download: <Download />,
  parts: <PackageSearch />,
  request: <ContactRound />,
  contact: <Headphones />,
};

type DashboardProps = {
  scenario: Scenario;
  promotionIndex: number;
  supportIndex: number;
  onPromotionChange: (index: number) => void;
  onSupportChange: (index: number) => void;
  onNotify: (message: string, status?: 'info' | 'success' | 'error') => void;
  onServiceAction: (service: PartnerService) => void;
};

function nextIndex(index: number, direction: -1 | 1, count: number) {
  return (index + direction + count) % count;
}

function ScenarioState({ scenario }: { scenario: Exclude<Scenario, 'default' | 'success'> }) {
  const content = {
    loading: {
      title: 'Loading your device',
      body: 'Vantage is gathering device status and personalized services.',
    },
    empty: {
      title: 'No device data yet',
      body: 'Connect a supported Lenovo device to see status and recommendations.',
    },
    error: {
      title: 'Device data is unavailable',
      body: 'Vantage could not load this device. Check the connection and try again.',
    },
  }[scenario];

  return (
    <ScenarioCard>
      <ScenarioContent aria-live="polite">
        <div>
          {scenario === 'loading' ? <Spinner aria-label="Loading device data" /> : null}
          <h2>{content.title}</h2>
          <p>{content.body}</p>
        </div>
      </ScenarioContent>
    </ScenarioCard>
  );
}

export function Dashboard({
  scenario,
  promotionIndex,
  supportIndex,
  onPromotionChange,
  onSupportChange,
  onNotify,
  onServiceAction,
}: DashboardProps) {
  if (scenario !== 'default' && scenario !== 'success') {
    return (
      <Grid>
        <ScenarioState scenario={scenario} />
      </Grid>
    );
  }

  const promotion = promotions[promotionIndex] ?? promotions[0];

  return (
    <Grid aria-label="Vantage home dashboard" data-node-id="2076:14828">
      <DeviceSlot>
        <FixedCard>
          <CardBody aria-labelledby="device-heading">
            <CardHeader>
              <CardTitle id="device-heading">{device.name}</CardTitle>
              <IconButton
                label="Device options"
                icon={<MoreVertical />}
                size="sm"
                intent="secondary"
                variant="ghost"
                onClick={() => onNotify('Device options opened')}
              />
            </CardHeader>
            <DeviceRows>
              {device.details.map((detail) => (
                <DeviceRow key={detail.label}>
                  <dt>{detail.label}</dt>
                  <dd>{detail.value}</dd>
                  <IconButton
                    label={`Copy ${detail.label}`}
                    icon={<Copy />}
                    size="sm"
                    intent="secondary"
                    variant="ghost"
                    onClick={() => {
                      void navigator.clipboard.writeText(detail.value);
                      onNotify(`${detail.label} copied`, 'success');
                    }}
                  />
                </DeviceRow>
              ))}
            </DeviceRows>
          </CardBody>
        </FixedCard>
      </DeviceSlot>

      <StatusCard
        title="Battery"
        value={device.battery.value}
        valueLabel={`${device.battery.value}%`}
        detail={device.battery.label}
        headerIcon={batteryHeartIcon}
        gaugeIcon={batteryGaugeIcon}
        onMenu={() => onNotify('Battery options opened')}
      />

      <StatusCard
        title="Warranty"
        value={62}
        valueLabel={device.warranty.label}
        detail={device.warranty.detail}
        gaugeIcon={warrantyGaugeIcon}
        action={device.warranty.action}
        onAction={() => onNotify('Warranty upgrade opened')}
        onMenu={() => onNotify('Warranty options opened')}
      />

      <WideSlot>
        <FixedCard>
          <CardBody aria-labelledby="support-heading">
            <CardHeader>
              <CardTitle id="support-heading">Support services</CardTitle>
              <IconButton
                label="Support options"
                icon={<MoreVertical />}
                size="sm"
                intent="secondary"
                variant="ghost"
                onClick={() => onNotify('Support options opened')}
              />
            </CardHeader>
            <SupportGrid>
              {supportActions.map((action) => (
                <SupportButton
                  key={action.id}
                  type="button"
                  onClick={() => onNotify(`${action.label} opened`)}
                >
                  {supportIcons[action.icon]}
                  <span>{action.label}</span>
                </SupportButton>
              ))}
            </SupportGrid>
            <Pager aria-label={`Support page ${supportIndex + 1} of 3`}>
              <IconButton
                label="Previous support page"
                icon={<ChevronLeft />}
                size="sm"
                intent="secondary"
                variant="ghost"
                onClick={() => onSupportChange(nextIndex(supportIndex, -1, 3))}
              />
              <Dots aria-hidden="true">
                {[0, 1, 2].map((index) => (
                  <Dot key={index} $active={index === supportIndex} />
                ))}
              </Dots>
              <IconButton
                label="Next support page"
                icon={<ChevronRight />}
                size="sm"
                intent="secondary"
                variant="ghost"
                onClick={() => onSupportChange(nextIndex(supportIndex, 1, 3))}
              />
            </Pager>
          </CardBody>
        </FixedCard>
      </WideSlot>

      <WideSlot>
        <FixedCard>
          <CardBody aria-label="Featured offer">
            <PromotionBody>
              <PromotionImage src={microsoftOffer} alt="" />
              <PromotionCopy>
                <PromotionTitle>{promotion.title}</PromotionTitle>
                <BodyText>{promotion.body}</BodyText>
                <PromotionAction>
                  <Button
                    size="sm"
                    variant="ghost"
                    intent="secondary"
                    startIcon={<ExternalLink />}
                    onClick={() => onNotify(`${promotion.action} opened`)}
                  >
                    {promotion.action}
                  </Button>
                </PromotionAction>
              </PromotionCopy>
            </PromotionBody>
            <Pager aria-label={`Offer ${promotionIndex + 1} of ${promotions.length}`}>
              <IconButton
                label="Previous offer"
                icon={<ChevronLeft />}
                size="sm"
                intent="secondary"
                variant="ghost"
                onClick={() =>
                  onPromotionChange(nextIndex(promotionIndex, -1, promotions.length))
                }
              />
              <Dots aria-hidden="true">
                {promotions.map((item, index) => (
                  <Dot key={item.id} $active={index === promotionIndex} />
                ))}
              </Dots>
              <IconButton
                label="Next offer"
                icon={<ChevronRight />}
                size="sm"
                intent="secondary"
                variant="ghost"
                onClick={() =>
                  onPromotionChange(nextIndex(promotionIndex, 1, promotions.length))
                }
              />
            </Pager>
          </CardBody>
        </FixedCard>
      </WideSlot>

      {partnerServices.map((service) => (
        <WideSlot key={service.id}>
          <FixedCard>
            <ServiceBody aria-labelledby={`${service.id}-heading`}>
              <ServiceMedia>
                <ServiceImage
                  src={service.id === 'performance' ? smartPerformance : smartLock}
                  alt=""
                />
              </ServiceMedia>
              <ServiceCopy>
                <PoweredBy>
                  <span>Powered by</span>
                  <PartnerLogo
                    src={service.id === 'performance' ? sutherlandLogo : absoluteLogo}
                    alt={service.partner}
                  />
                </PoweredBy>
                <CardTitle id={`${service.id}-heading`}>{service.title}</CardTitle>
                <BodyText>{service.body}</BodyText>
                <ServiceActions>
                  <Button
                    size="sm"
                    variant="ghost"
                    intent="secondary"
                    onClick={() => onNotify(`${service.title} details opened`)}
                  >
                    Learn more
                  </Button>
                  <Button size="sm" onClick={() => onServiceAction(service)}>
                    Scan now
                  </Button>
                </ServiceActions>
              </ServiceCopy>
            </ServiceBody>
          </FixedCard>
        </WideSlot>
      ))}
    </Grid>
  );
}
