export type Scenario = 'default' | 'loading' | 'empty' | 'error' | 'success';

export type NavigationItem = {
  id: string;
  label: string;
  icon:
    | 'home'
    | 'settings'
    | 'download'
    | 'scan'
    | 'security'
    | 'utilities'
    | 'support'
    | 'identity'
    | 'performance'
    | 'lock'
    | 'parts';
  group: 'main' | 'pro';
};

export type DeviceDetail = {
  label: string;
  value: string;
};

export type SupportAction = {
  id: string;
  label: string;
  icon: 'download' | 'parts' | 'request' | 'contact';
};

export type Promotion = {
  id: string;
  title: string;
  body: string;
  action: string;
};

export type PartnerService = {
  id: 'performance' | 'lock';
  partner: string;
  title: string;
  body: string;
};

export const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Home', icon: 'home', group: 'main' },
  { id: 'device-settings', label: 'Device settings', icon: 'settings', group: 'main' },
  { id: 'system-update', label: 'System update', icon: 'download', group: 'main' },
  { id: 'hardware-scan', label: 'Hardware scan', icon: 'scan', group: 'main' },
  { id: 'security', label: 'Security', icon: 'security', group: 'main' },
  { id: 'utilities', label: 'Utilities', icon: 'utilities', group: 'main' },
  { id: 'support-services', label: 'Support services', icon: 'support', group: 'main' },
  { id: 'identity-advisor', label: 'Lenovo Identity Advisor', icon: 'identity', group: 'pro' },
  { id: 'smart-performance', label: 'Lenovo Smart Performance', icon: 'performance', group: 'pro' },
  { id: 'smart-lock', label: 'Lenovo Smart Lock', icon: 'lock', group: 'pro' },
  { id: 'parts', label: 'Parts', icon: 'parts', group: 'pro' },
];

export const device = {
  name: 'ThinkPad X1 Carbon Gen 12',
  details: [
    { label: 'Serial number', value: 'PF5LFDXN' },
    { label: 'Product number', value: '21KDS8DD00' },
    { label: 'BIOS version', value: 'N3YET84W (1.49)' },
  ] satisfies DeviceDetail[],
  battery: {
    value: 75,
    label: 'In use',
    semanticState: 'normal' as const,
  },
  warranty: {
    label: 'Active',
    detail: '1 year remaining',
    action: 'Upgrade',
    semanticState: 'normal' as const,
  },
};

export const supportActions: SupportAction[] = [
  { id: 'system-update', label: 'System update', icon: 'download' },
  { id: 'parts-support', label: 'Parts support', icon: 'parts' },
  { id: 'service-request', label: 'Service request', icon: 'request' },
  { id: 'contact-us', label: 'Contact us', icon: 'contact' },
];

export const promotions: Promotion[] = [
  {
    id: 'microsoft-365',
    title: 'Get 10% OFF now on your first Microsoft 365 purchase!',
    body: 'Make the most of your device with Microsoft 365 apps, cloud storage, and premium security.',
    action: 'Show offer',
  },
  {
    id: 'device-care',
    title: 'Keep your device protected wherever work takes you.',
    body: 'Review coverage options selected for your ThinkPad and explore additional protection.',
    action: 'View coverage',
  },
  {
    id: 'support',
    title: 'Get expert help when you need it.',
    body: 'Connect with Lenovo support, review service requests, and find device-specific answers.',
    action: 'Get support',
  },
];

export const partnerServices: PartnerService[] = [
  {
    id: 'performance',
    partner: 'Sutherland',
    title: 'Lenovo Smart performance',
    body: 'Proactively find and fix any issues as they arise so that your PC always has top-notch performance.',
  },
  {
    id: 'lock',
    partner: 'Absolute',
    title: 'Lenovo Smart lock',
    body: 'Lenovo Smart lock service helps locate, lock, secure, and recover your lost or stolen PC anytime anywhere.',
  },
];

export const scenarioOptions: ReadonlyArray<{ value: Scenario; label: string }> = [
  { value: 'default', label: 'Default' },
  { value: 'loading', label: 'Loading' },
  { value: 'empty', label: 'Empty' },
  { value: 'error', label: 'Error' },
  { value: 'success', label: 'Success' },
];

export const actionDelayMs = 650;
