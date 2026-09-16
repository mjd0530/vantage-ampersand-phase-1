import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, expect, it, vi } from 'vitest';

import App from './App.js';

describe('Vantage Ampersand prototype', () => {
  it('renders the Figma Home dashboard with Cake content', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: 'Home' })).toBeInTheDocument();
    expect(screen.getByText('ThinkPad X1 Carbon Gen 12')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Battery' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Warranty' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Support services' })).toBeInTheDocument();
  });

  it('renders full Figma sidebar labels without truncation', () => {
    render(<App />);

    expect(
      screen.getByRole('tab', { name: 'Lenovo Identity Advisor' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('tab', { name: 'Lenovo Smart Performance' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Home', selected: true })).toBeInTheDocument();
  });

  it('navigates with the Cake sidebar tabs', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('tab', { name: 'Device settings' }));

    expect(
      screen.getByRole('heading', { level: 1, name: 'Device settings' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/outside Figma node 2076:14773/i),
    ).toBeInTheDocument();
  });

  it('collapses and expands the Cake sidebar rail', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Collapse sidebar' }));

    const expand = screen.getByRole('button', { name: 'Expand sidebar' });
    expect(expand).toBeInTheDocument();
    // Collapsing hides labels visually but keeps every row's accessible name.
    expect(screen.getByRole('tab', { name: 'Lenovo Smart Performance' })).toBeInTheDocument();

    await user.click(expand);

    expect(screen.getByRole('button', { name: 'Collapse sidebar' })).toBeInTheDocument();
  });

  it('copies a device identifier and announces success', async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, 'writeText');
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Copy Serial number' }));

    expect(writeText).toHaveBeenCalledWith('PF5LFDXN');
    await waitFor(() => {
      expect(screen.getByText('Serial number copied')).toBeInTheDocument();
    });
  });

  it('advances the promotion carousel', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Next offer' }));

    expect(
      screen.getByText('Keep your device protected wherever work takes you.'),
    ).toBeInTheDocument();
  });

  it('handles dashboard and command-bar actions', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Device options' }));
    expect(screen.getByText('Device options opened')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Battery options' }));
    expect(screen.getByText('Battery options opened')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Upgrade' }));
    expect(screen.getByText('Warranty upgrade opened')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'System update' }));
    expect(screen.getByText('System update opened')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Next support page' }));
    expect(screen.getByLabelText('Support page 2 of 3')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(screen.getByText('Search is ready')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Offers' }));
    expect(screen.getByText('You have one new offer')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Cart' }));
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Notifications' }));
    expect(screen.getByText('You have two notifications')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Open account menu' }));
    expect(screen.getByText('Account menu opened')).toBeInTheDocument();

    await user.type(screen.getByRole('searchbox', { name: 'Search Vantage' }), 'battery');
    expect(screen.getByText('Searching Vantage for “battery”')).toBeInTheDocument();
  });

  it('runs the local update and scan flows to completion', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Check for updates' }));
    expect(screen.getByRole('button', { name: 'Checking...' })).toBeDisabled();
    await waitFor(
      () => expect(screen.getByText('Your system is up to date')).toBeInTheDocument(),
      { timeout: 1_500 },
    );

    const scanButtons = screen.getAllByRole('button', { name: 'Scan now' });
    await user.click(scanButtons[0]);
    await user.click(screen.getByRole('button', { name: 'Start scan' }));
    expect(screen.getByRole('button', { name: 'Scanning...' })).toBeDisabled();
    await waitFor(
      () => expect(screen.getByText('Scan completed successfully')).toBeInTheDocument(),
      { timeout: 1_500 },
    );
    await user.click(screen.getByRole('button', { name: 'Done' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('changes the deterministic scenario from prototype controls', async () => {
    const user = userEvent.setup();
    window.history.pushState({}, '', '/?controls=true');
    render(<App />);

    await user.selectOptions(screen.getByLabelText('Dashboard state'), 'success');
    expect(screen.getByText('Device data refreshed')).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText('Dashboard state'), 'empty');
    expect(screen.getByText('No device data yet')).toBeInTheDocument();

    window.history.pushState({}, '', '/');
  });

  it('opens the Cake modal for a local service scan', async () => {
    const user = userEvent.setup();
    render(<App />);

    const scanButtons = screen.getAllByRole('button', { name: 'Scan now' });
    await user.click(scanButtons[0]);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Lenovo Smart performance' }),
    ).toBeInTheDocument();
  });

  it('has no detectable axe violations in the default view', async () => {
    const { container } = render(<App />);
    const results = await axe(container);

    expect(results.violations).toEqual([]);
  });
});
