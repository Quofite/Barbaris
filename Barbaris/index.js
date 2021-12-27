const path = require("path");
const url = require("url");
const {app, BrowserWindow} = require("electron");

let win;

function CreateWindow(){
    win = new BrowserWindow({
        width: 900,
        height: 600
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true
    }));

    //win.webContents.openDevTools();

    win.on("closed", () => { win = null; });
}

app.on("ready", CreateWindow);
app.on("window-all-closed", ()=> { app.quit(); });