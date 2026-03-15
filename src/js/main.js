const { app, BrowserWindow } = require('electron/main');
const { ipcMain } = require('electron');
const path = require('node:path');
//run `npm run make` to create an exe file
//run `npm run start` to run the program

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('src/html/mosaic.html');
  
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
  ipcMain.on('toMain', (event, arg)=>console.log(arg));
  ipcMain.handle('get-data', async () => 'Data from main');
  ipcMain.handle('resourcesPath', async () => {return process.resourcesPath;});
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});