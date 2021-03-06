const { app, BrowserWindow } = require('electron');

require('@electron/remote/main').initialize()

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // preload: path.join(__dirname, 'preload.js')
            nodeIntegration: true,
            enableRemoteModule: true
        }  
    })
  
    // win.loadFile('index.html')
    win.loadURL('http://localhost:3000')
}

// app.whenReady().then(() => {
//     createWindow()
// })

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
  
app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})