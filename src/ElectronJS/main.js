const { app, BrowserWindow } = require('electron/main');
const { ipcMain, session, dialog } = require('electron');
const path = require('node:path');
const fs = require('fs');

//run `npm run make` to create an exe file
//run `npm run start` to run the program
let win;
const createWindow = () => {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    titleBarStyle:'hidden',
    ...(process.platform != 'darwin' ? {titleBarOverlay: true}: {})
  });

  win.loadFile('src/html/index.html');
  
}

app.whenReady().then(() => {
  session.defaultSession.webRequest.onHeadersReceived((details, callback)=> {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy':['script-src \'self\'']
      }
    });
  });
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on('web-contents-created', (event, contents)=> {
    contents.on('will-attach-webview', (event, webPreferences, params)=> {
      delete webPreferences.preload;

      webPreferences.nodeIntegration=false;
      event.preventDefault();
    });
    contents.on('will-navigate', (event, navigationUrl)=> {
      event.preventDefault();
    });
    contents.setWindowOpenHandler(({url})=> {
      return {action: 'deny'};
    });
  });
  ipcMain.handle('openDevTools', (event)=>{
      win.webContents.openDevTools();
    }
  );
  ipcMain.on('toMain', (event, arg)=>console.log(arg));
  ipcMain.handle('get-data', async () => 'Data from main');
  ipcMain.handle('resourcesPath', async () => {
    if (app.isPackaged) {
      return process.resourcesPath;
    } else {
      return process.cwd();
    }
  });

  ipcMain.handle('getJSON', async (event, name) => {
    let dataPath;
    if (app.isPackaged) {
      dataPath=path.join(process.resourcesPath, "resources",name);
    } else {
      dataPath=path.join(process.cwd(),"resources",name);
    }
    console.log("Getting JSON from ",dataPath);
    const data = await fs.promises.readFile(dataPath,'utf-8');
    return data;
  });

  ipcMain.handle('getCompletePath', async (event, name) => {
    let dataPath;
    if (app.isPackaged) {
      dataPath=path.join(process.resourcesPath, "resources",name);
    } else {
      dataPath=path.join(process.cwd(),"resources",name);
    }
    console.log("Getting file path ",dataPath);
    return dataPath;
  });

  ipcMain.handle('editJSON', async (event, name, content)=> {
    let dataPath;
    if (app.isPackaged) {
      dataPath=path.join(process.resourcesPath, "resources",name);
    } else {
      dataPath=path.join(process.cwd(),"resources",name);
    }
    console.log("Editing JSON from ",dataPath);
    await fs.promises.mkdir(path.dirname(dataPath),{recursive:true});
    await fs.promises.writeFile(dataPath,content);
  });
  ipcMain.handle("fileSelection", async () => {
    let defaultPath;
    if (app.isPackaged) {
      defaultPath=path.join(process.resourcesPath,"resources");
    } else {
      defaultPath=path.join(process.cwd(),"resources");
    }
    return dialog.showSaveDialog({defaultPath:defaultPath,properties:['createDirectory','showOverwriteConfirmation']});
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});