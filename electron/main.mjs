import { app, BrowserWindow, ipcMain, nativeTheme } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const devUrl = process.env.VANTAGE_DEV_URL ?? 'http://127.0.0.1:5173';
const useDevServer = process.env.VANTAGE_DEV_URL !== undefined || !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 1080,
    minWidth: 1180,
    minHeight: 720,
    frame: false,
    show: false,
    title: 'Lenovo Vantage',
    backgroundColor: '#F3F3F3',
    autoHideMenuBar: true,
    roundedCorners: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  win.once('ready-to-show', () => {
    win.show();
  });

  if (useDevServer) {
    return win.loadURL(devUrl);
  }

  return win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
}

app.whenReady().then(() => {
  nativeTheme.themeSource = 'light';
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.handle('window:minimize', (event) => {
  BrowserWindow.fromWebContents(event.sender)?.minimize();
});

ipcMain.handle('window:maximize', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win) return;
  if (win.isMaximized()) {
    win.unmaximize();
    return;
  }
  win.maximize();
});

ipcMain.handle('window:close', (event) => {
  BrowserWindow.fromWebContents(event.sender)?.close();
});
