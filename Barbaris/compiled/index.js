var path = require("path");
var url = require("url");
var _a = require("electron"), app = _a.app, BrowserWindow = _a.BrowserWindow, Tray = _a.Tray, Menu = _a.Menu, ipcMain = _a.ipcMain;
var electron = require("process").electron;
// Главное окно
var mainWindow;
app.on("ready", function () {
    mainWindow = new BrowserWindow({
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
        titleBarStyle: 'hidden'
    });
    mainWindow.loadURL(path.join(__dirname, "../render/main.html"));
    //mainWindow.removeMenu();
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
    /*ipcMain.handle("dark-mode:toggle", () => {
        if (nativeTheme.shouldUseDarkColors)
            nativeTheme.themeSource = "light"
        else
            nativeTheme.themeSource = "dark"

        return nativeTheme.shouldUseDarkColors
    })
    
    ipcMain.handle("dark-mode:system", () => {
        nativeTheme.themeSource = "system"
    })*/
});
var isQuiting;
var newTray = function () {
    var tray = new Tray("Barbaris.ico");
    tray.setToolTip("Barbaris");
    tray.setContextMenu(Menu.buildFromTemplate([
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
                app.quit();
            }
        }
    ]));
    // Убобно
    tray.on("double-click", function () {
        mainWindow.show();
        tray.destroy();
    });
};
app.on("window-all-closed", function () {
    app.quit();
});
// Окно конфига
var configWindow;
ipcMain.on("openConfig", function () {
    configWindow = new BrowserWindow({
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
ipcMain.on("saved", function () {
    configWindow.close();
    mainWindow.reload();
});
var dir;
ipcMain.on("selectDirectoryForNew", function (event) {
    var dialog = require("electron").dialog;
    dir = dialog.showOpenDialogSync(mainWindow, {
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