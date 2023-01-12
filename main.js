// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const ipc = ipcMain
const path = require("path");
const find = require('find-process');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        minWidth: 1280,
        minHeight: 720,
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: true,
            preload: path.join(__dirname, "preload.js"),
        },
        frame: false,
        autoHideMenuBar: true
    });

    ipc.on('close-app', () => {
        mainWindow.close();
    });

    ipc.on('minimize-app', () => {
        mainWindow.minimize();
    });

    ipc.on('maximize-app', () => {
        mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
    });

    mainWindow.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
    createWindow();
});

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('before-quit' , () => {
    find('port', 3000)
        .then(function (list) {
            if(list[0] != null){
                console.log(list[0]);
                process.kill(list[0].pid, 'SIGHUP');
            }
        }.catch((e) => {
            console.log(e.stack || e);
        }));
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});