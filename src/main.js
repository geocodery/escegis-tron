const {app, BrowserWindow} = require('electron');
const url = require('url');
const path = require('path');

const {viewsController} = require('./scripts/views');

if (process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname, {})
};

let view = new viewsController();
let mainWindow;

function createWindow(){
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL(url.format({
        pathname: view.url_index,
        protocol: 'file',
        slashes: true,
    }));
    mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);
