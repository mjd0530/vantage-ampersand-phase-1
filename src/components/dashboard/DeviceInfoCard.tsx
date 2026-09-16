import { Button, Card, IconButton } from '@cake-admin/cakeand';
import { useId } from 'react';
import styled from 'styled-components';

import contentCopyAllIcon from '../../assets/content-copy-all.svg';
import contentCopySmallIcon from '../../assets/content-copy-small.svg';
import contentCopyIcon from '../../assets/content-copy.svg';
import moreVerticalIcon from '../../assets/more-vertical.svg';
import openInNewIcon from '../../assets/open-in-new.svg';
import type { DeviceDetail } from '../../data/vantageData.js';

export type DeviceInfoCardSize = 'xml' | 'sml' | 'med' | 'lrg' | 'xlrg';

const nodeIds: Record<DeviceInfoCardSize, string> = {
  xml: '2027:63092',
  sml: '2027:63090',
  med: '2027:63093',
  lrg: '2027:63094',
  xlrg: '2027:63091',
};

const SizedCard = styled(Card)<{ $size: DeviceInfoCardSize }>`
  width: ${({ $size }) =>
    ({
      xml: '252px',
      sml: '358px',
      med: '436px',
      lrg: '560px',
      xlrg: '676px',
    })[$size]};
  min-width: 0;
  height: ${({ $size }) =>
    ({
      xml: '252px',
      sml: '167px',
      med: '206px',
      lrg: '264px',
      xlrg: '326px',
    })[$size]};
`;

const Content = styled.section<{ $size: DeviceInfoCardSize }>`
  box-sizing: border-box;
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: ${({ $size }) =>
    $size === 'med' || $size === 'sml' ? 'var(--space-100)' : 'var(--space-300)'};
  justify-content: ${({ $size }) => ($size === 'xlrg' ? 'space-between' : 'flex-start')};
  padding: ${({ $size }) =>
    $size === 'med' || $size === 'sml' ? 'var(--space-300)' : 'var(--space-500)'};
`;

const Header = styled.header`
  display: flex;
  width: 100%;
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

const Details = styled.div<{ $size: DeviceInfoCardSize }>`
  display: grid;
  width: 100%;
  height: ${({ $size }) => ($size === 'xlrg' ? '168px' : 'auto')};
  flex: ${({ $size }) => ($size === 'xlrg' ? 'none' : '1')};
  grid-template-rows: repeat(3, minmax(0, 1fr));
  overflow: hidden;
  border: var(--stroke-100) solid var(--color-stroke-border);
  border-radius: var(--radius-300);
  background: var(--color-surfaces-container);
`;

const DetailRow = styled.div<{ $size: DeviceInfoCardSize }>`
  display: grid;
  grid-template-columns:
    minmax(0, 1fr) minmax(0, 1fr)
    ${({ $size }) =>
      $size === 'xml' || $size === 'sml' ? 'var(--space-500)' : 'var(--space-600)'};
  align-items: center;
  gap: ${({ $size }) =>
    $size === 'xml' || $size === 'sml' || $size === 'med'
      ? 'var(--space-050)'
      : 'var(--space-300)'};
  padding-inline: var(--space-300) var(--space-100);
  border-bottom: var(--stroke-100) solid var(--color-stroke-border);
  color: var(--color-text-icon-primary);
  font-weight: var(--font-weight-medium);
  line-height: 1.35;

  &:last-child {
    border-bottom: 0;
  }
`;

const DetailLabel = styled.span<{ $size: DeviceInfoCardSize }>`
  min-width: 0;
  overflow: hidden;
  font-size: ${({ $size }) => {
    if ($size === 'xml' || $size === 'sml') {
      return 'calc(var(--type-size-caption) - var(--space-025))';
    }

    return $size === 'med' ? 'var(--type-size-caption)' : 'var(--type-size-body)';
  }};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DetailValue = styled.span<{ $size: DeviceInfoCardSize }>`
  min-width: 0;
  overflow: hidden;
  font-size: ${({ $size }) =>
    $size === 'xml' || $size === 'sml' || $size === 'med'
      ? 'var(--type-size-caption)'
      : 'var(--type-size-body)'};
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const IconGlyph = styled.span<{ $asset: string; $size: string }>`
  display: block;
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  background: var(--color-text-icon-primary);
  -webkit-mask: url(${({ $asset }) => $asset}) center / contain no-repeat;
  mask: url(${({ $asset }) => $asset}) center / contain no-repeat;
`;

const Actions = styled.footer`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: var(--space-300);
`;

const ActionButton = styled(Button)`
  font-size: var(--type-size-body);
`;

type CommonDeviceInfoCardProps = {
  name: string;
  details: DeviceDetail[];
  onMenu: () => void;
  onCopy: (detail: DeviceDetail) => void;
};

type DeviceInfoCardProps =
  | (CommonDeviceInfoCardProps & {
      size?: Exclude<DeviceInfoCardSize, 'xlrg'>;
      onAboutDevice?: never;
      onCopyAll?: never;
    })
  | (CommonDeviceInfoCardProps & {
      size: 'xlrg';
      onAboutDevice: () => void;
      onCopyAll: (details: DeviceDetail[]) => void;
    });

/**
 * Figma `CardDeviceInfo` variants (component set node 2027:63095).
 */
export function DeviceInfoCard({
  name,
  details,
  onMenu,
  onCopy,
  size = 'lrg',
  onAboutDevice,
  onCopyAll,
}: DeviceInfoCardProps) {
  const headingId = useId();
  const compactControls = size === 'xml' || size === 'sml';

  return (
    <SizedCard $size={size} data-node-id={nodeIds[size]} data-size={size}>
      <Content $size={size} aria-labelledby={headingId}>
        <Header>
          <Title id={headingId}>{name}</Title>
          <IconButton
            label="Device options"
            icon={
              <IconGlyph
                $asset={moreVerticalIcon}
                $size="var(--space-500)"
                aria-hidden="true"
              />
            }
            size="sm"
            intent="secondary"
            variant="ghost"
            onClick={onMenu}
          />
        </Header>
        <Details $size={size}>
          {details.map((detail) => (
            <DetailRow $size={size} key={detail.label}>
              <DetailLabel $size={size}>{detail.label}</DetailLabel>
              <DetailValue $size={size}>{detail.value}</DetailValue>
              <IconButton
                label={`Copy ${detail.label}`}
                icon={
                  <IconGlyph
                    $asset={compactControls ? contentCopySmallIcon : contentCopyIcon}
                    $size={
                      compactControls ? 'var(--space-300)' : 'var(--space-500)'
                    }
                    aria-hidden="true"
                  />
                }
                size={compactControls ? 'xs' : 'sm'}
                intent="secondary"
                variant="ghost"
                onClick={() => onCopy(detail)}
              />
            </DetailRow>
          ))}
        </Details>
        {size === 'xlrg' ? (
          <Actions>
            <ActionButton
              size="sm"
              intent="secondary"
              variant="tonal"
              endIcon={
                <IconGlyph
                  $asset={openInNewIcon}
                  $size="var(--space-400)"
                  aria-hidden="true"
                />
              }
              onClick={onAboutDevice}
            >
              About your device
            </ActionButton>
            <ActionButton
              size="sm"
              intent="secondary"
              variant="tonal"
              endIcon={
                <IconGlyph
                  $asset={contentCopyAllIcon}
                  $size="var(--space-400)"
                  aria-hidden="true"
                />
              }
              onClick={() => onCopyAll(details)}
            >
              Copy all
            </ActionButton>
          </Actions>
        ) : null}
      </Content>
    </SizedCard>
  );
}
