const {app, BrowserWindow} = require('electron');
const url = require('url');

const {viewsController} = require('./scripts/views');

if (process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname, {})
};

let view = new viewsController();
let mainWindow;
let mainLoader;

function createWindow(){
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        show: false,
    });

    mainLoader = new BrowserWindow({ 
        width: 500, 
        height: 200, 
        frame: false, 
        show: false
    });

    mainWindow.loadURL(url.format({
        pathname: view.url_index,
        protocol: 'file',
        slashes: true,
    }));

    mainWindow.setMenu(null);

    mainLoader.loadURL(url.format({
        pathname: view.url_loader,
        protocol: 'file',
        slashes: true,
    }));

    mainLoader.once('ready-to-show', () => {
        mainLoader.show();
    });


    mainWindow.once('ready-to-show', () => {
        mainLoader.close();
        mainWindow.show();
        mainWindow.maximize(true);
    });
    // mainWindow.maximize(true);
    // mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);
