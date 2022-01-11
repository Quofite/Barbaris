import path = require("path");
import { 
    app, 
    BrowserWindow, 
    Tray, 
    Menu, 
    ipcMain, 
    nativeTheme,
    dialog
} from "electron";
import { electron } from "process";

// Главное окно
var mainWindow: Electron.BrowserWindow;
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
            nodeIntegration: true,
            //preload: "preload.ts",
        },
        titleBarStyle: "hidden"
    });

    mainWindow.loadURL(path.join(__dirname, "../render/main.html"));

    /*ipcMain.on('set-ignore-mouse-events', (event, ...args: [boolean]) => {
        const win = BrowserWindow.fromWebContents(event.sender)
        win.setIgnoreMouseEvents(...args)
    })*/

    //mainWindow.removeMenu();

    mainWindow.webContents.openDevTools();

    
    mainWindow.on("minimize", (event: { preventDefault: () => void; }) => {
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
    
    ipcMain.handle("dark-mode:toggle", () => {
        if (nativeTheme.shouldUseDarkColors)
            nativeTheme.themeSource = "light"
        else
              nativeTheme.themeSource = "dark"

        return nativeTheme.shouldUseDarkColors
    })
    
    ipcMain.handle("dark-mode:system", () => {
        nativeTheme.themeSource = "system"
    })
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
var configWindow: Electron.BrowserWindow;
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

ipcMain.on("minimize", () => {
    mainWindow.minimize();
});

ipcMain.on("maximize", () => {
    mainWindow.maximize();
});

//app.addRecentDocument(path.join(__dirname, csvRow.path))

var dir: string[];
ipcMain.on("selectDirectoryForNew", (event: { sender: { send: (arg0: string, arg1: string[]) => void; }; }) => {
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