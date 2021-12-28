const path = require("path");
const url = require("url");
const {app, BrowserWindow} = require("electron");

app.on("ready", () => {
    let win = new BrowserWindow({
        width: 950,
        height: 600,
        icon: "Barbaris.ico",
        minWidth: 750,
        minHeight: 450
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true
    }));

    //win.webContents.openDevTools();

    win.on("closed", () => { win = null; });
});

app.on("window-all-closed", ()=> { app.quit(); });