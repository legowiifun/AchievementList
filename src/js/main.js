const { app, BrowserWindow } = require('electron/main');
const mosaic = require('./mosaicHandler.js');
//import { table } from './mosaicHandler.js';
//run `npm run make` to create an exe file
//run `npm run start` to run the program

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
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
  mosaic.table([], 5, 5);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});