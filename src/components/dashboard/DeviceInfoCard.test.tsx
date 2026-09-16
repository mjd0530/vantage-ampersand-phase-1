import { CakeProvider } from '@cake-admin/cakeand';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, expect, it, vi } from 'vitest';

import { type DeviceDetail, device } from '../../data/vantageData.js';
import {
  DeviceInfoCard,
  type DeviceInfoCardSize,
} from './DeviceInfoCard.js';

const dimensions: ReadonlyArray<{
  size: DeviceInfoCardSize;
  width: string;
  height: string;
}> = [
  { size: 'xml', width: '252px', height: '252px' },
  { size: 'sml', width: '358px', height: '167px' },
  { size: 'med', width: '436px', height: '206px' },
  { size: 'lrg', width: '560px', height: '264px' },
  { size: 'xlrg', width: '676px', height: '326px' },
];

type RenderCardOptions = {
  size: DeviceInfoCardSize;
  onMenu?: () => void;
  onCopy?: (detail: DeviceDetail) => void;
  onAboutDevice?: () => void;
  onCopyAll?: (details: DeviceDetail[]) => void;
  mode?: 'light.a' | 'dark.a';
};

function renderCard({
  size,
  onMenu = vi.fn(),
  onCopy = vi.fn(),
  onAboutDevice = vi.fn(),
  onCopyAll = vi.fn(),
  mode = 'light.a',
}: RenderCardOptions) {
  const commonProps = {
    name: device.name,
    details: device.details,
    onMenu,
    onCopy,
  };

  return render(
    <CakeProvider mode={mode}>
      {size === 'xlrg' ? (
        <DeviceInfoCard
          {...commonProps}
          size="xlrg"
          onAboutDevice={onAboutDevice}
          onCopyAll={onCopyAll}
        />
      ) : (
        <DeviceInfoCard {...commonProps} size={size} />
      )}
    </CakeProvider>,
  );
}

describe('DeviceInfoCard', () => {
  it.each(dimensions)('renders the $size Figma geometry', ({ size, width, height }) => {
    const { container } = renderCard({ size });
    const card = container.querySelector(`[data-size="${size}"]`);

    expect(card).not.toBeNull();
    expect(getComputedStyle(card as Element).width).toBe(width);
    expect(getComputedStyle(card as Element).height).toBe(height);
    expect(screen.getByRole('heading', { name: device.name })).toBeInTheDocument();
    expect(screen.getByText('PF5LFDXN')).toBeInTheDocument();
  });

  it('routes menu and row-copy interactions through typed callbacks', async () => {
    const user = userEvent.setup();
    const onMenu = vi.fn();
    const onCopy = vi.fn();
    renderCard({ size: 'lrg', onMenu, onCopy });

    await user.click(screen.getByRole('button', { name: 'Device options' }));
    await user.click(screen.getByRole('button', { name: 'Copy BIOS version' }));

    expect(onMenu).toHaveBeenCalledOnce();
    expect(onCopy).toHaveBeenCalledWith(device.details[2]);
  });

  it('shows and wires the xlrg-only actions', async () => {
    const user = userEvent.setup();
    const onAboutDevice = vi.fn();
    const onCopyAll = vi.fn();
    renderCard({ size: 'xlrg', onAboutDevice, onCopyAll });

    await user.click(screen.getByRole('button', { name: 'About your device' }));
    await user.click(screen.getByRole('button', { name: 'Copy all' }));

    expect(onAboutDevice).toHaveBeenCalledOnce();
    expect(onCopyAll).toHaveBeenCalledWith(device.details);
  });

  it('keeps xlrg actions out of the other variants', () => {
    renderCard({ size: 'med' });

    expect(
      screen.queryByRole('button', { name: 'About your device' }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Copy all' })).not.toBeInTheDocument();
  });

  it('has no detectable accessibility violations in dark mode', async () => {
    const { container } = renderCard({ size: 'xlrg', mode: 'dark.a' });

    expect((await axe(container)).violations).toEqual([]);
  });
});
