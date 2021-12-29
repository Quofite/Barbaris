document.querySelector("#saveBtn").addEventListener("click", () => {
    const fs = require("fs");
    const { ipcRenderer } = require("electron");

    let idePath = document.getElementById("idePathField").value;
    let ggcPath = document.getElementById("ggcPathField").value;
    let convPath = document.getElementById("convPathField").value;
    let backuperPath = document.getElementById("backuperPathField").value;

    let pathes = JSON.stringify({
        ide: idePath,
        ggc: ggcPath,
        convertor: convPath,
        backuper: backuperPath
    });

    console.log(pathes);

    fs.writeFile("pathes.json", pathes, (error) => {
        if(error) throw error;
    });

    ipcRenderer.send("saved");
});