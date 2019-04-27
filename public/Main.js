'use strict';
const {app, BrowserWindow} = require('electron')

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') app.quit();
});

function createWindow () {   
  let win = null
  let loading = new BrowserWindow({show: false, frame: false})    
  loading.once('show', () => {
	win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {nodeIntegration:true},
		icon: 'icon.ico'
		}) 
	win.webContents.once('dom-ready', () => {
		win.show()
		loading.hide()
		loading.close()
	})
	win.setMenuBarVisibility(false)
	win.loadFile('index.html')
  })
  loading.loadFile('loading.html')
  loading.show()
}
      
app.on('ready', createWindow)