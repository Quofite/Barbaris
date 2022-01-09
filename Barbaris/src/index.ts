const path = require("path");
const url = require("url");
const {
    app, 
    BrowserWindow,
    Tray,
    Menu,
    ipcMain
} = require("electron");
const { electron } = require("process");

// Главное окно
var mainWindow: { loadURL: (arg0: any) => void; webContents: { openDevTools: () => void; }; on: (arg0: string, arg1: { (event: { preventDefault: () => void; }): void; (event: { preventDefault: () => void; }): boolean; }) => void; hide: () => void; show: () => void; reload: () => void; }
app.on("ready", () => {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 800,
        title: "Barbaris",
        icon: "Barbaris.ico",
        minWidth: 800,
        minHeight: 450,
        webPreferences:{
            contextIsolation: false,
            nodeIntegration: true
        },
        titleBarStyle: 'hidden'
    });

    mainWindow.loadURL(path.join(__dirname, "../render/main.html"));

    //mainWindow.removeMenu();

    mainWindow.webContents.openDevTools();

    
    mainWindow.on("minimize", (event) => {
        event.preventDefault();

        newTray();

        mainWindow.hide();

        return false;
    });

    mainWindow.on("close", (event: { preventDefault: () => void; }) => { 
        if (/*!app.isQuiting*/ !isQuiting){
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

var isQuiting: boolean;
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
                isQuiting = true;
                //app.isQuiting = true;
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
var configWindow: { loadFile: (arg0: string) => void; removeMenu: () => void; webContents: { openDevTools: () => void; }; close: () => void; }
ipcMain.on("openConfig", () => {
    configWindow = new BrowserWindow({
        width: 700,
        height: 500,
        title: "Barbaris",
        icon: "Barbaris.ico",
        // resizable: false,
        webPreferences:{
            contextIsolation: false,
            nodeIntegration: true
        }
    });

    configWindow.loadFile(path.join(__dirname, "../render/config.html"));

    configWindow.removeMenu();

    configWindow.webContents.openDevTools();
});

ipcMain.on("saved", () => {
    configWindow.close();
    mainWindow.reload();
});

var dir: string[];
ipcMain.on("selectDirectoryForNew", (event: { sender: { send: (arg0: string, arg1: string[]) => void; }; }) => {
    const { dialog } = require("electron");

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