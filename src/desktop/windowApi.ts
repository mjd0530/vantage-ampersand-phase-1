export type VantageDesktopApi = {
  isDesktop: boolean;
  minimize: () => Promise<void> | void;
  maximize: () => Promise<void> | void;
  close: () => Promise<void> | void;
};

declare global {
  interface Window {
    vantageDesktop?: VantageDesktopApi;
    __TAURI_INTERNALS__?: unknown;
  }
}

function isTauri(): boolean {
  return window.__TAURI_INTERNALS__ !== undefined;
}

async function tauriWindow() {
  const { getCurrentWindow } = await import('@tauri-apps/api/window');
  return getCurrentWindow();
}

const tauriApi: VantageDesktopApi = {
  isDesktop: true,
  minimize: async () => {
    await (await tauriWindow()).minimize();
  },
  maximize: async () => {
    await (await tauriWindow()).toggleMaximize();
  },
  close: async () => {
    await (await tauriWindow()).close();
  },
};

export function getDesktopApi(): VantageDesktopApi | undefined {
  // The Electron preload bridge wins when present so an injected test double
  // keeps working; Tauri exposes no equivalent injectable global.
  if (window.vantageDesktop) {
    return window.vantageDesktop;
  }

  return isTauri() ? tauriApi : undefined;
}

export function isDesktopShell(): boolean {
  return window.vantageDesktop?.isDesktop === true || isTauri();
}

/**
 * Tauri opens the window hidden so the first paint is the finished UI rather
 * than a white flash. Electron handles the same concern with `ready-to-show`.
 */
export async function revealDesktopWindow(): Promise<void> {
  if (!isTauri()) {
    return;
  }

  const win = await tauriWindow();
  await win.show();
  await win.setFocus();
}
