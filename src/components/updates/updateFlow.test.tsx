import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';

import App from '../../App.js';
import { systemUpdates } from '../../data/updateFlow.js';

const count = systemUpdates.length;

async function startScan(user: ReturnType<typeof userEvent.setup>) {
  render(<App />);
  await user.click(screen.getByRole('button', { name: 'Check for updates' }));
}

describe('check for updates flow', () => {
  it('runs the scan toast through to the updates found toast', async () => {
    const user = userEvent.setup();
    await startScan(user);

    // Node 2389:28635 — progress title and a bare determinate track.
    expect(screen.getByText(/^Scanning for updates \(\d+%\)$/)).toBeInTheDocument();
    expect(screen.getByRole('progressbar', { name: 'Scan progress' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();

    // Node 2725:28249 — the scan resolves into the found toast.
    await waitFor(
      () => {
        expect(screen.getByText(`(${count}) Updates found`)).toBeInTheDocument();
      },
      { timeout: 8000 },
    );
    expect(
      screen.getByText('We recommend installing these updates as soon as possible.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Scan again' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Install' })).toBeInTheDocument();
  });

  it('installs the found updates and reports success', async () => {
    const user = userEvent.setup();
    await startScan(user);

    await waitFor(
      () => {
        expect(screen.getByRole('button', { name: 'Install' })).toBeInTheDocument();
      },
      { timeout: 8000 },
    );
    await user.click(screen.getByRole('button', { name: 'Install' }));

    // Node 2754:29544 — install progress reuses the same track.
    expect(screen.getByText(/^Installing updates \(\d+%\)$/)).toBeInTheDocument();
    expect(
      screen.getByRole('progressbar', { name: 'Installation progress' }),
    ).toBeInTheDocument();

    // Node 2754:29591 — success.
    await waitFor(
      () => {
        expect(
          screen.getByText(`(${count}) Updates successfully installed`),
        ).toBeInTheDocument();
      },
      { timeout: 8000 },
    );
  });

  it('returns to the found updates when an install is cancelled', async () => {
    const user = userEvent.setup();
    await startScan(user);

    await waitFor(
      () => {
        expect(screen.getByRole('button', { name: 'Install' })).toBeInTheDocument();
      },
      { timeout: 8000 },
    );
    await user.click(screen.getByRole('button', { name: 'Install' }));
    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(screen.getByText(`(${count}) Updates found`)).toBeInTheDocument();
  });

  it('expands and collapses the failed scan detail', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('tab', { name: 'System update' }));
    await user.click(screen.getByRole('switch', { name: 'Fail the next scan' }));
    await user.click(screen.getByRole('button', { name: 'Check for updates' }));

    // Node 2754:29351 — collapsed failure with a More disclosure.
    await waitFor(
      () => {
        expect(screen.getByText('Update scan failed')).toBeInTheDocument();
      },
      { timeout: 8000 },
    );
    const more = screen.getByRole('button', { name: 'More', expanded: false });

    // Node 2754:29410 — expanding repeats the sentence, as the frame specifies.
    await user.click(more);
    const less = screen.getByRole('button', { name: 'Less', expanded: true });
    expect(
      screen.getAllByText(
        'Something went wrong while scanning for updates. Please try scanning again.',
      ),
    ).toHaveLength(2);

    await user.click(less);
    expect(screen.getByRole('button', { name: 'More', expanded: false })).toBeInTheDocument();
  });

  it('opens the update details dialog from a toast', async () => {
    const user = userEvent.setup();
    await startScan(user);

    await waitFor(
      () => {
        expect(screen.getByText(`(${count}) Updates found`)).toBeInTheDocument();
      },
      { timeout: 8000 },
    );
    await user.click(screen.getAllByRole('button', { name: 'View details' })[0]);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Update details' })).toBeInTheDocument();
    expect(screen.getByText('BIOS update')).toBeInTheDocument();
  });

  it('dismisses the toast and leaves the flow idle', async () => {
    const user = userEvent.setup();
    await startScan(user);

    await waitFor(
      () => {
        expect(screen.getByText(`(${count}) Updates found`)).toBeInTheDocument();
      },
      { timeout: 8000 },
    );
    await user.click(screen.getByRole('button', { name: 'Dismiss notification' }));

    expect(screen.queryByText(`(${count}) Updates found`)).not.toBeInTheDocument();
  });

  it('has no detectable axe violations while a scan runs', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    await user.click(screen.getByRole('button', { name: 'Check for updates' }));
    const results = await axe(container);

    expect(results.violations).toEqual([]);
  });
});
