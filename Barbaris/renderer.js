/* Main page */


/* Left buttons handlers */
/* Implement open IDE button */
document.querySelector("#openIDE").addEventListener("click", () => {
    var exec = require("child_process").execFile;
    const fs = require("fs");

    let pathesJsonContent = fs.readFileSync("pathes.json", "utf8");
    let parsed = JSON.parse(pathesJsonContent);

    exec(parsed.ide, function(err, data) {  
        console.log(err)
        console.log(data.toString());                       
    });
});

/* Implement open Git Client button */
document.querySelector("#openGit").addEventListener("click", () => {
    var exec = require("child_process").execFile;

    let pathesJsonContent = require("fs").readFileSync("pathes.json", "utf8");
    let parsed = JSON.parse(pathesJsonContent);

    exec(parsed.ggc, function(err, data) {  
        console.log(err)
        console.log(data.toString());                       
    });
});

/* Implement open Config button */
document.querySelector("#openConfig").addEventListener("click", () => {
    const { ipcRenderer } = require("electron");
    ipcRenderer.send("openConfig");
});

/* Implement open Converter button */
document.querySelector("#openConverter").addEventListener("click", () => {
    var exec = require("click").execFile;

    let pathesJsonContent = require("fs").readFileSync("pathes.json", "utf8");
    let parsed = JSON.parse(pathesJsonContent);

    exec(parsed.convertor, function(err, data) {  
        console.log(err)
        console.log(data.toString());                       
    });
});


/* Projects handlers */
/* Implement open Project Folder button */
document.querySelector("#openProjectFolder").addEventListener("click", (event) => {
    require("child_process").exec(`start "" "` + event.target.dataset.folder + `"`);
});

/* Implement open Project Folder in IDE button */
document.querySelector("#openProjectIDE").addEventListener("click", (event) => {
    var exec = require("child_process").execFile;

    exec(JSON.parse(require("fs").readFileSync("pathes.json", "utf8")).ide, [event.target.dataset.folder], function(err, data) {  
        console.log(err)
        console.log(data.toString());                       
    });
});