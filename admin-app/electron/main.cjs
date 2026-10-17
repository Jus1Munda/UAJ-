/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const { app, BrowserWindow, Notification, ipcMain } = require('electron');
const path = require('path');

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 840,
    minWidth: 900,
    minHeight: 600,
    backgroundColor: '#05040a',
    title: 'UAJ Web Tech - Admin Management Console',
    darkTheme: true,
    titleBarStyle: 'default',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.cjs')
    }
  });

  // Load the built Vite web dist or dev server
  const distPath = path.join(__dirname, '../dist/index.html');
  if (app.isPackaged) {
    mainWindow.loadFile(distPath);
  } else {
    mainWindow.loadFile(distPath).catch(() => {
      // In dev mode fallback to vite local server
      mainWindow.loadURL('http://localhost:5173');
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handler for native Windows notification when new inquiry arrives
ipcMain.on('notify-new-inquiry', (event, data) => {
  if (Notification.isSupported()) {
    new Notification({
      title: 'New Client Project Inquiry',
      body: `${data.name} submitted a project request (${data.projectType})`,
      urgency: 'high'
    }).show();
  }
});
