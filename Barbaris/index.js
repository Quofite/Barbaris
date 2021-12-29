const path = require("path");
const url = require("url");
const {
    app, 
    BrowserWindow,
    Tray,
    Menu,
    ipcMain
} = require("electron");

var mainWindow;
app.on("ready", () => {
    mainWindow = new BrowserWindow({
        width: 950,
        height: 600,
        title: "Barbaris",
        icon: "Barbaris.ico",
        minWidth: 750,
        minHeight: 450,
        webPreferences:{
            contextIsolation: false,
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true
    }));

    mainWindow.removeMenu();

    mainWindow.webContents.openDevTools();

    /*
    mainWindow.on("minimize", (event) => {
        event.preventDefault();

        newTray();

        mainWindow.hide();
    });

    mainWindow.on("close", (event) => { 
        if (!app.isQuiting){
            event.preventDefault();

            newTray();

            mainWindow.hide();
        }
    
        return false;
    });
    */
});

/*const newTray = () => {
    let tray = new Tray("Barbaris.ico")
    tray.setToolTip("Barbaris")
    tray.setContextMenu(Menu.buildFromTemplate([
        { 
            label: "Open Barbaris",
            click: () => {
                mainWindow.show();
            }
        },
        { 
            label: "Close",
            click: () => {
                app.isQuiting = true;
                app.quit();
            }
        }
    ]))
}*/

/*app.whenReady().then(() => {
})*/

app.on("window-all-closed", () => {
    app.quit(); 
});



// ----------------------
var confWindow;

ipcMain.on("create-conf-window", (e) => {
    confWindow = new BrowserWindow({
        width: 700,
        height: 500,
        title: "Barbaris",
        icon: "Barbaris.ico",
        resizable: false,
        webPreferences:{
            contextIsolation: false,
            nodeIntegration: true
        }
    });

    confWindow.loadFile("config.html");

    confWindow.removeMenu();

    confWindow.webContents.openDevTools();
});

ipcMain.on("saved", (e) => {
    confWindow.close();
});