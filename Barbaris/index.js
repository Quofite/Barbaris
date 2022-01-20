const path = require("path");
const url = require("url");
const {
    app, 
    BrowserWindow,
    Tray,
    Menu,
    ipcMain,
    webContents,
    systemPreferences,
} = require("electron");
const process = require("os");

// Главное окно
var mainWindow;
app.on("ready", () => {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 800,
        title: "Barbaris",
        icon: "barbaris.ico",
        minWidth: 800,
        minHeight: 450,
        paintWhenInitiallyHidden: true,
        //autoHideMenuBar: true,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(__dirname + "/render/index.html");

    mainWindow.on("ready-to-show", () => {
        mainWindow.webContents.send("accentColor", systemPreferences.getAccentColor());
    });

    //mainWindow.ready-to-show(() => {
    //    mainWindow.webContents.send("accentColor", systemPreferences.getAccentColor());
    //})

    mainWindow.removeMenu();

    //mainWindow.webContents.openDevTools();

    mainWindow.on("minimize", (event) => {
        if (process.platform == "linux")
            return true;

        event.preventDefault();

        newTray();

        mainWindow.hide();
    });

    mainWindow.on("close", (event) => { 
        if (process.platform == "linux")
            return true;
        
        if (!app.isQuiting) {
            event.preventDefault();

            newTray();

            mainWindow.hide();
        }
    
        return false;
    });
    
    ipcMain.handle("dark-mode:toggle", () => {
        if (nativeTheme.shouldUseDarkColors)
        	nativeTheme.themeSource = "light";
        else
          	nativeTheme.themeSource = "dark";

        return nativeTheme.shouldUseDarkColors;
    })
    
    ipcMain.handle("dark-mode:system", () => {
    	nativeTheme.themeSource = "system";
	})
});

const newTray = () => {
    let tray = new Tray("Barbaris.ico")
    tray.setToolTip("Barbaris")
    tray.setContextMenu(Menu.buildFromTemplate([
        { 
            label: "Open Barbaris",
            click: () => {
                mainWindow.show();

                tray.destroy(); // Насирало много иконок в трей
            }
        },
        { 
            label: "Close",
            click: () => {
                app.isQuiting = true;
                app.quit();
            }
        }
    ]));

    // Убобно
    tray.on("double-click", () => { 
        mainWindow.show();

        tray.destroy();
    });
}

app.on("window-all-closed", () => {
    app.quit(); 
});

// Окно конфига
var configWindow;
ipcMain.on("openConfig", (e) => {
    configWindow = new BrowserWindow({
        width: 700,
        height: 560,
        title: "Barbaris",
        icon: "barbaris.ico",
        // resizable: false,
        webPreferences:{
            contextIsolation: false,
            nodeIntegration: true
        }
    });

    configWindow.on("ready-to-show", () => {
        configWindow.webContents.send("accentColor", systemPreferences.getAccentColor());
    });

    configWindow.loadFile(__dirname + "/render/config.html");

    configWindow.removeMenu();

    //configWindow.webContents.openDevTools();
});

ipcMain.on("saved", (e) => {
    configWindow.close();
    mainWindow.reload();
});

let directory;
ipcMain.on("selectDirectoryForNew", (e) => {
    const { dialog } = require("electron");
    directory = dialog.showOpenDialogSync(mainWindow, {
        properties: ["openDirectory"]
    });
    e.sender.send("got-directory-for-new", directory);
});

/*
function createDirectoryDialog(){
    const { dialog } = require("electron");
    directory = dialog.showOpenDialogSync(mainWindow, {
        properties: ["openDirectory"]
    });

    return directory;
} */