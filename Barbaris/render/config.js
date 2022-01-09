const { ipcRenderer } = require("electron");

document.querySelector("#save").addEventListener("click", () => {
    let idePath = document.getElementById("idePathField").value;
    let ggcPath = document.getElementById("gitPathField").value;
    let convPath = document.getElementById("converterPathField").value;
    let backuperPath = document.getElementById("backuperPathField").value;

    let pathes = JSON.stringify({
        ide: idePath,
        ggc: ggcPath,
        convertor: convPath,
        backuper: backuperPath
    });

    console.log(pathes);

    require("fs").writeFile("pathes.json", pathes, (error) => {
        if(error) throw error;
    });

    ipcRenderer.send("saved");
});