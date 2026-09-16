import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const electronBinary = require('electron');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const devUrl = 'http://127.0.0.1:5173';
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const children = [];

function spawnProcess(command, args, extraEnv = {}) {
  const child = spawn(command, args, {
    cwd: root,
    env: { ...process.env, ...extraEnv },
    stdio: 'inherit',
    shell: process.platform === 'win32',
    windowsHide: false,
  });
  children.push(child);
  return child;
}

async function waitForServer(url, timeoutMs = 60000) {
  const started = Date.now();

  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url, { redirect: 'manual' });
      if (response.ok || response.status === 304) {
        return;
      }
    } catch {
      // Vite is still booting.
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 250);
    });
  }

  throw new Error(`Timed out waiting for ${url}`);
}

function shutDown(code = 0) {
  for (const child of children) {
    if (!child.killed) {
      child.kill('SIGTERM');
    }
  }
  process.exit(code);
}

process.on('SIGINT', () => shutDown(0));
process.on('SIGTERM', () => shutDown(0));

const vite = spawnProcess(
  npmCommand,
  ['run', 'dev:desktop', '--', '--host', '127.0.0.1'],
  { ELECTRON: '1' },
);

vite.on('exit', (code) => {
  if (code && code !== 0) {
    shutDown(code);
  }
});

try {
  await waitForServer(devUrl);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  shutDown(1);
}

const electronArgs = [root];

if (process.platform === 'linux') {
  electronArgs.push('--disable-gpu', '--no-sandbox');
}

const electronApp = spawnProcess(electronBinary, electronArgs, {
  ELECTRON: '1',
  VANTAGE_DEV_URL: devUrl,
});

electronApp.on('exit', (code) => {
  shutDown(code ?? 0);
});
