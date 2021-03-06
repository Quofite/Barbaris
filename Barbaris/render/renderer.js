/* Рендер  главного окна*/
const { 
    ipcRenderer
} = require("electron");

var dirToAcarFile = __dirname;
var parsedPath = dirToAcarFile.split("\\");
var pathToExecFile = "";
for (let j = 0; j < parsedPath.length - 2; j++) {
    pathToExecFile += parsedPath[j] + "\\";
}

ipcRenderer.on("accentColor", (event, accentColor) => {
    for (let element of document.querySelectorAll(".primary"))
        element.style.background = "#" + accentColor ?? "#0ea5e9";
})

// --------------------------------------------------------------Кнопки слева
// Открыть IDE
document.querySelector("#openIDE").addEventListener("click", () => {
    var exec = require("child_process").execFile;
    const fs = require("fs");

    let pathesJsonContent = fs.readFileSync("pathes.json", "utf8");
    let parsed = JSON.parse(pathesJsonContent);

    exec(parsed.ide, function(err, data) {  
        console.log(err)                      
    });
});

// Открыть GGC
document.querySelector("#openGit").addEventListener("click", () => {
    var exec = require("child_process").execFile;

    let pathesJsonContent = require("fs").readFileSync("pathes.json", "utf8");
    let parsed = JSON.parse(pathesJsonContent);

    if(parsed.ggc === "GitClient.exe"){
        exec(pathToExecFile + parsed.ggc, function(err, data) {  
            console.log(err)                    
        });
    }
    else {
        exec(parsed.ggc, function(err, data) {  
            console.log(err)                    
        });
    }
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

    if(parsed.convertor === "convertor\\Convertor.exe"){
        exec(pathToExecFile + parsed.convertor, function(err, data) {  
            console.log(err)                    
        });
    }
    else {
        exec(parsed.convertor, function(err, data) {  
            console.log(err)                    
        });
    }
});

document.querySelector("#openDoc").addEventListener("click", () => {
    require("child_process").exec(`start "" "` + "https://github.com/Quofite/Barbaris#readme" + `"`);
});

// ------------------------------------------------------------------ проекты
// добавление нового проекта
document.querySelector("#newProjBtn").addEventListener("click", (e) => {
    console.log("clicked");
    ipcRenderer.send('selectDirectoryForNew');
})

ipcRenderer.on("got-directory-for-new", (e, data) => {
    const fs = require("fs");
    data = data.toString();
    let splitted = data.split("\\");
    let toSave = splitted[splitted.length - 1] + "," + data + "\n";
    fs.appendFileSync("projects.csv", toSave);
    showProjs();
});

// ------------------------------------------------ загрузка проектов из памяти
function showProjs(){
    const fs = require("fs");
    var parser = require('csv-parser');
    var mainBlock = document.getElementById("mainBlock");
    
    while(mainBlock.children.length > 1){
        mainBlock.removeChild(mainBlock.lastChild);
    }

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

            var deleteProjBtn = document.createElement("a");
            deleteProjBtn.setAttribute("id", "deleteProject");
            deleteProjBtn.setAttribute("data-folder", csvRow.path);
            deleteProjBtn.setAttribute("href", "#");
            var delIcon = document.createElement("i");
            delIcon.setAttribute("class", "bi bi-folder-minus");
            deleteProjBtn.appendChild(delIcon);
            var infoText3 = document.createTextNode("Удалить проект");
            deleteProjBtn.appendChild(infoText3);

            openProjFolderBtn.addEventListener("click", (event) => {
                require("child_process").exec(`start "" "` + event.target.dataset.folder + `"`);
            });

            openProjIdeBtn.addEventListener("click", (event) => {
                var exec = require("child_process").execFile;
            
                exec(JSON.parse(require("fs").readFileSync("pathes.json", "utf8")).ide, [event.target.dataset.folder], function(err, data) {  
                    console.log(err)                    
                });

                if(JSON.parse(require("fs").readFileSync("pathes.json", "utf8")).ggc === "GitClient.exe"){
                    exec(pathToExecFile + JSON.parse(require("fs").readFileSync("pathes.json", "utf8")).ggc, [event.target.dataset.folder], function(err, data) {  
                        console.log(err)                    
                    });
                }
                else{
                    exec(JSON.parse(require("fs").readFileSync("pathes.json", "utf8")).ggc, [event.target.dataset.folder], function(err, data) {  
                        console.log(err)                    
                    });
                }

                /*if(JSON.parse(require("fs").readFileSync("pathes.json", "utf8")).backuper === "Backuper.exe"){
                    exec(pathToExecFile + JSON.parse(require("fs").readFileSync("pathes.json", "utf8")).ggc, [event.target.dataset.folder], function(err, data) {  
                        console.log(err)                    
                    });
                }
                else{
                    exec(JSON.parse(require("fs").readFileSync("pathes.json", "utf8")).backuper, [event.target.dataset.folder], function(err, data) {  
                        console.log(err)                    
                    });
                } */
            });

            deleteProjBtn.addEventListener("click", (event) => {
                let remains = [];

                fs.createReadStream("projects.csv")
                    .pipe(parser())
                    .on("data", (data) => {
                        if(data.path !== event.target.dataset.folder){
                            remains.push(data);
                        }
                    })
                    .on("end", () => {
                        console.log(remains);
                        fs.writeFileSync("projects.csv", "name,path\n");

                        for (let i = 0; i < remains.length; i++) {
                            let toWrite = remains[i].name + "," + remains[i].path + "\n";
                            fs.appendFileSync("projects.csv", toWrite);
                        }

                        showProjs();
                    });
            });

            footer.appendChild(openProjFolderBtn);
            footer.appendChild(openProjIdeBtn);
            footer.appendChild(deleteProjBtn);
            element.appendChild(footer);
            mainBlock.appendChild(element);
    })
    .on("end", () => {
        console.log("Выведены все проекты");
    });
}
