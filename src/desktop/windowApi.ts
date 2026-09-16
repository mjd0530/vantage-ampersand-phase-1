export type VantageDesktopApi = {
  isDesktop: boolean;
  minimize: () => Promise<void> | void;
  maximize: () => Promise<void> | void;
  close: () => Promise<void> | void;
};

declare global {
  interface Window {
    vantageDesktop?: VantageDesktopApi;
  }
}

export function getDesktopApi(): VantageDesktopApi | undefined {
  return window.vantageDesktop;
}

export function isDesktopShell(): boolean {
  return window.vantageDesktop?.isDesktop === true;
}
