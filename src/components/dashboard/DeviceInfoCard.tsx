import { Card, IconButton } from '@cake-admin/cakeand';
import { MoreVertical } from 'lucide-react';
import styled from 'styled-components';

import contentCopyIcon from '../../assets/content-copy.svg';
import type { DeviceDetail } from '../../data/vantageData.js';

const SizedCard = styled(Card)`
  width: 100%;
  min-width: 0;
  height: 264px;
`;

const Content = styled.section`
  box-sizing: border-box;
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: var(--space-300);
  padding: var(--space-500);
`;

const Header = styled.header`
  display: flex;
  min-height: var(--space-600);
  align-items: center;
  gap: var(--space-200);
`;

const Title = styled.h2`
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

const Details = styled.div`
  display: grid;
  flex: 1;
  grid-template-rows: repeat(3, minmax(0, 1fr));
  overflow: hidden;
  border: var(--stroke-100) solid var(--color-stroke-border);
  border-radius: var(--radius-300);
  background: var(--color-surfaces-container);
`;

const DetailRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) var(--space-600);
  align-items: center;
  gap: var(--space-300);
  padding-inline: var(--space-300) var(--space-100);
  border-bottom: var(--stroke-100) solid var(--color-stroke-border);
  color: var(--color-text-icon-primary);
  font-size: var(--type-size-body);
  font-weight: var(--font-weight-medium);
  line-height: 1.35;

  &:last-child {
    border-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  min-width: 0;
`;

const DetailValue = styled.span`
  min-width: 0;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CopyIcon = styled.img`
  width: var(--space-500);
  height: var(--space-500);
`;

type DeviceInfoCardProps = {
  name: string;
  details: DeviceDetail[];
  onMenu: () => void;
  onCopy: (detail: DeviceDetail) => void;
};

/**
 * Figma `CardDeviceInfo` large card variant (node 2027:63094).
 */
export function DeviceInfoCard({
  name,
  details,
  onMenu,
  onCopy,
}: DeviceInfoCardProps) {
  return (
    <SizedCard data-node-id="2027:63094">
      <Content aria-labelledby="device-heading">
        <Header>
          <Title id="device-heading">{name}</Title>
          <IconButton
            label="Device options"
            icon={<MoreVertical aria-hidden="true" />}
            size="sm"
            intent="secondary"
            variant="ghost"
            onClick={onMenu}
          />
        </Header>
        <Details>
          {details.map((detail) => (
            <DetailRow key={detail.label}>
              <DetailLabel>{detail.label}</DetailLabel>
              <DetailValue>{detail.value}</DetailValue>
              <IconButton
                label={`Copy ${detail.label}`}
                icon={<CopyIcon src={contentCopyIcon} alt="" />}
                size="sm"
                intent="secondary"
                variant="ghost"
                onClick={() => onCopy(detail)}
              />
            </DetailRow>
          ))}
        </Details>
      </Content>
    </SizedCard>
  );
}
