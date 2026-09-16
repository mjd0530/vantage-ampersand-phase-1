export type UpdatePhase =
  | 'idle'
  | 'scanning'
  | 'found'
  | 'installing'
  | 'installed'
  | 'failed';

export type UpdateSeverity = 'critical' | 'recommended' | 'optional';

export type SystemUpdate = {
  id: string;
  name: string;
  version: string;
  size: string;
  severity: UpdateSeverity;
};

export const systemUpdates: SystemUpdate[] = [
  {
    id: 'bios',
    name: 'BIOS update',
    version: 'N3YET92W (1.50)',
    size: '18.4 MB',
    severity: 'critical',
  },
  {
    id: 'chipset',
    name: 'Intel chipset device software',
    version: '10.1.19600.8541',
    size: '4.1 MB',
    severity: 'recommended',
  },
  {
    id: 'graphics',
    name: 'Intel graphics driver',
    version: '31.0.101.5534',
    size: '312 MB',
    severity: 'recommended',
  },
  {
    id: 'audio',
    name: 'Realtek high definition audio driver',
    version: '6.0.9734.1',
    size: '52.7 MB',
    severity: 'recommended',
  },
  {
    id: 'wireless',
    name: 'Intel wireless LAN driver',
    version: '23.20.0.4',
    size: '28.9 MB',
    severity: 'critical',
  },
  {
    id: 'bluetooth',
    name: 'Intel Bluetooth driver',
    version: '23.20.0.2',
    size: '14.2 MB',
    severity: 'recommended',
  },
  {
    id: 'thunderbolt',
    name: 'Thunderbolt 4 firmware',
    version: '80.0.1',
    size: '9.8 MB',
    severity: 'critical',
  },
  {
    id: 'power',
    name: 'Power management driver',
    version: '10.1.18.4',
    size: '3.6 MB',
    severity: 'recommended',
  },
  {
    id: 'trackpoint',
    name: 'TrackPoint and touchpad driver',
    version: '2.0.6.12',
    size: '22.3 MB',
    severity: 'optional',
  },
  {
    id: 'fingerprint',
    name: 'Fingerprint reader driver',
    version: '5.12.11.6',
    size: '11.5 MB',
    severity: 'recommended',
  },
  {
    id: 'hotkey',
    name: 'Hotkey features integration',
    version: '5.6.0.1',
    size: '6.9 MB',
    severity: 'optional',
  },
  {
    id: 'vantage-service',
    name: 'Lenovo Vantage service',
    version: '4.0.49.0',
    size: '31.2 MB',
    severity: 'recommended',
  },
];

/**
 * Copy is transcribed from the Figma toast frames so a designer can change it
 * in one place.
 *
 * `scanFailureDetail` intentionally repeats `scanFailureDescription`: the
 * expanded "Less" frame (node 2754:29410) shows the same sentence twice. It is
 * placeholder copy in the source design, not a transcription slip.
 */
export const updateFlowCopy = {
  scanTitle: (progress: number) => `Scanning for updates (${progress}%)`,
  foundTitle: (count: number) => `(${count}) Updates found`,
  foundDescription: 'We recommend installing these updates as soon as possible.',
  installTitle: (progress: number) => `Installing updates (${progress}%)`,
  installedTitle: (count: number) => `(${count}) Updates successfully installed`,
  installedDescription: 'We recommend installing these updates as soon as possible.',
  scanFailureTitle: 'Update scan failed',
  scanFailureDescription:
    'Something went wrong while scanning for updates. Please try scanning again.',
  scanFailureDetail:
    'Something went wrong while scanning for updates. Please try scanning again.',
} as const;

/** Milliseconds between progress ticks while a scan or install runs. */
export const updateProgressIntervalMs = 120;

/**
 * Progress added on each tick. 25 ticks puts a run at about three seconds —
 * long enough that the two progress frames are actually readable, which a
 * sub-second run is not.
 */
export const updateProgressStep = 4;
