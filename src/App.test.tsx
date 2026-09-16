import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';

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

  it('copies a device identifier and announces success', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Copy Serial number' }));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('PF5LFDXN');
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

    expect(results).toHaveNoViolations();
  });
});
