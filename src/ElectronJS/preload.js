const {contextBridge, ipcRenderer, webUtils} = require('electron');

contextBridge.exposeInMainWorld('electron', {
  send: (channel, data)=>ipcRenderer.send(channel, data),
  invoke: (channel, data) => ipcRenderer.invoke(channel, data),
  receive: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
  openDevTools: ()=>ipcRenderer.invoke("openDevTools")
});
contextBridge.exposeInMainWorld('resources', {
  getPath: ipcRenderer.invoke("resourcesPath"),
  getJson: (name)=> {
    return ipcRenderer.invoke("getJSON", name);
  },
  getCompletePath: (name)=> {
    return ipcRenderer.invoke("getCompletePath", name);
  },
  editJson: (name, content)=> {
    ipcRenderer.invoke("editJSON", name, content);
  },
  getFilePath: (file)=> {
    return webUtils.getPathForFile(file);
  }
});