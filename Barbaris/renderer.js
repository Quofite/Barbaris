/* Рендер  главного окна*/
const { ipcRenderer } = require("electron");


/* 

ЛЕХА, РАДИ ВСЕГО СВЯТОГО - НЕ ЛЕЗЬ СЮДА

*/


// --------------------------------------------------------------Кнопки слева
// Открыть IDE
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

// Открыть GGC
document.querySelector("#openGit").addEventListener("click", () => {
    var exec = require("child_process").execFile;

    let pathesJsonContent = require("fs").readFileSync("pathes.json", "utf8");
    let parsed = JSON.parse(pathesJsonContent);

    exec(parsed.ggc, function(err, data) {  
        console.log(err)
        console.log(data.toString());                       
    });
});

// Открыть конфиг
document.querySelector("#openConfig").addEventListener("click", () => {
    ipcRenderer.send("openConfig");
});

// Открыть конвертор
document.querySelector("#openConverter").addEventListener("click", () => {
    var exec = require("child_process").execFile;

    let pathesJsonContent = require("fs").readFileSync("pathes.json", "utf8");
    let parsed = JSON.parse(pathesJsonContent);

    exec(parsed.convertor, function(err, data) {  
        console.log(err)
        console.log(data.toString());                       
    });
});

// ------------------------------------------------------------------ проекты
// добавление нового проекта
document.querySelector("#newProjBtn").addEventListener("click", (e) => {
    console.log("clicked");
    ipcRenderer.send('selectDirectory');
})

ipcRenderer.on("got-directory", (e, data) => {
    const fs = require("fs");
    console.log(data);
    data = data.toString();
    let splitted = data.split("\\");
    let toSave = splitted[splitted.length - 1] + "," + data + "\n";
    fs.appendFileSync("projects.csv", toSave);
});

// открыть папку
document.querySelector("#openProjectFolder").addEventListener("click", (event) => {
    require("child_process").exec(`start "" "` + event.target.dataset.folder + `"`);
});

document.querySelector("#openProjectIDE").addEventListener("click", (event) => {
    var exec = require("child_process").execFile;

    exec(JSON.parse(require("fs").readFileSync("pathes.json", "utf8")).ide, [event.target.dataset.folder], function(err, data) {  
        console.log(err)                    
    });
});


// ------------------------------------------------ загрузка проектов из памяти
function showProjs(){
    const fs = require("fs");
    var parser = require('csv-parser');
    var mainBlock = document.getElementById("mainBlock");

    fs.createReadStream("projects.csv")
        .pipe(parser({ delimiter: ":" }))
        .on("data", (csvRow) => {
            
            var element = document.createElement("div");
            element.setAttribute("class", "card");

            var header = document.createElement("header");
            var projName = document.createTextNode(csvRow.name);
            header.appendChild(projName);
            var path = document.createElement("span");
            path.setAttribute("class", "grey");
            var pathText = document.createTextNode(csvRow.path);
            path.appendChild(pathText);
            header.appendChild(path);
            element.appendChild(header);

            var contentbar = document.createElement("content");
            var contentBarContent = document.createTextNode("Проект " + csvRow.name);
            contentbar.appendChild(contentBarContent);
            element.appendChild(contentbar);

            var footer = document.createElement("footer");
            var openProjFolderBtn = document.createElement("a");
            openProjFolderBtn.setAttribute("id", "openProjectFolder");
            openProjFolderBtn.setAttribute("data-folder", csvRow.path);
            openProjFolderBtn.setAttribute("href", "#");
            var folderIcon = document.createElement("i");
            folderIcon.setAttribute("class", "bi bi-folder-symlink");
            openProjFolderBtn.appendChild(folderIcon);
            var infoText1 = document.createTextNode("Открыть папку проекта");
            openProjFolderBtn.appendChild(infoText1);
            var openProjIdeBtn = document.createElement("a");
            openProjIdeBtn.setAttribute("id", "openProjectFolder");
            openProjIdeBtn.setAttribute("data-folder", csvRow.path);
            openProjIdeBtn.setAttribute("href", "#");
            var ideIcon = document.createElement("i");
            ideIcon.setAttribute("class", "bi bi-box-arrow-up-left");
            openProjIdeBtn.appendChild(ideIcon);
            var infoText2 = document.createTextNode("Открыть проект в IDE");
            openProjIdeBtn.appendChild(infoText2);

            footer.appendChild(openProjFolderBtn);
            footer.appendChild(openProjIdeBtn);
            element.appendChild(footer);
            mainBlock.appendChild(element);
    })
    .on("end", () => {
        console.log("Выведены все проекты");
    });
}
