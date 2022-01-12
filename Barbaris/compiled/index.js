"use strict";
exports.__esModule = true;
var path = require("path");
var electron_1 = require("electron");
// Главное окно
var mainWindow;
electron_1.app.on("ready", function () {
    mainWindow = new electron_1.BrowserWindow({
        width: 1400,
        height: 800,
        title: "Barbaris",
        icon: "Barbaris.ico",
        minWidth: 800,
        minHeight: 450,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        },
        titleBarStyle: "hidden"
    });
    mainWindow.loadURL(path.join(__dirname, "../render/main.html"));
    /*ipcMain.on('set-ignore-mouse-events', (event, ...args: [boolean]) => {
        const win = BrowserWindow.fromWebContents(event.sender)
        win.setIgnoreMouseEvents(...args)
    })*/
    mainWindow.removeMenu();
    mainWindow.webContents.openDevTools();
    mainWindow.on("minimize", function (event) {
        event.preventDefault();
        newTray();
        mainWindow.hide();
        return false;
    });
    mainWindow.on("close", function (event) {
        if ( /*!app.isQuiting*/!isQuiting) {
            event.preventDefault();
            newTray();
            mainWindow.hide();
        }
        return false;
    });
    electron_1.ipcMain.handle("dark-mode:toggle", function () {
        if (electron_1.nativeTheme.shouldUseDarkColors)
            electron_1.nativeTheme.themeSource = "light";
        else
            electron_1.nativeTheme.themeSource = "dark";
        return electron_1.nativeTheme.shouldUseDarkColors;
    });
    electron_1.ipcMain.handle("dark-mode:system", function () {
        electron_1.nativeTheme.themeSource = "system";
    });
});
var isQuiting;
var newTray = function () {
    var tray = new electron_1.Tray("Barbaris.ico");
    tray.setToolTip("Barbaris");
    tray.setContextMenu(electron_1.Menu.buildFromTemplate([
        {
            label: "Open Barbaris",
            click: function () {
                mainWindow.show();
                tray.destroy(); // Насирало много иконок в трей
            }
        },
        {
            label: "Close",
            click: function () {
                isQuiting = true;
                //app.isQuiting = true;
                electron_1.app.quit();
            }
        }
    ]));
    // Убобно
    tray.on("double-click", function () {
        mainWindow.show();
        tray.destroy();
    });
};
electron_1.app.on("window-all-closed", function () {
    electron_1.app.quit();
});
// Окно конфига
var configWindow;
electron_1.ipcMain.on("openConfig", function () {
    configWindow = new electron_1.BrowserWindow({
        width: 700,
        height: 500,
        title: "Barbaris",
        icon: "Barbaris.ico",
        // resizable: false,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    });
    configWindow.loadFile(path.join(__dirname, "../render/config.html"));
    configWindow.removeMenu();
    configWindow.webContents.openDevTools();
});
electron_1.ipcMain.on("saved", function () {
    configWindow.close();
    mainWindow.reload();
});
electron_1.ipcMain.on("minimize", function () {
    mainWindow.minimize();
});
electron_1.ipcMain.on("maximize", function () {
    mainWindow.maximize();
});
//app.addRecentDocument(path.join(__dirname, csvRow.path))
var dir;
electron_1.ipcMain.on("selectDirectoryForNew", function (event) {
    dir = electron_1.dialog.showOpenDialogSync(mainWindow, {
        properties: ["openDirectory"]
    });
    event.sender.send("got-directory-for-new", dir);
});
/*
function createDirectoryDialog(){
    const { dialog } = require("electron");
    directory = dialog.showOpenDialogSync(mainWindow, {
        properties: ["openDirectory"]
    });

    return directory;
} */ 
//# sourceMappingURL=index.js.map