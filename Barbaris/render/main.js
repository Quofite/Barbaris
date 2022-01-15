/* Рендер  главного окна*/
const {
    ipcRenderer 
} = require("electron");

const mustache = require("mustache");


/* 

ЛЕХА, РАДИ ВСЕГО СВЯТОГО - НЕ ЛЕЗЬ СЮДА

*/


var dirToAcarFile = __dirname;
var parsedPath = dirToAcarFile.split("\\");
var pathToExecFile = "";
for (let j = 0; j < parsedPath.length - 2; j++) {
    pathToExecFile += parsedPath[j] + "\\";
}

// Добавление и логика левых кнопочек, нужно обрабатывать при onload
const leftButtons = () => {
    const fs = require("fs");

    let programs = JSON.parse((!require("fs").readFileSync("pathes.json", "utf8")) ? "[]" : require("fs").readFileSync("pathes.json", "utf8"));
    programs.forEach((program, i, array) => {
        /*var element = document.createElement("div");
        element.setAttribute("class", "card");*/

        document.getElementById("programsButtons").innerHTML = mustache.render(
            fs.readFileSync("render/templates/program.html", "utf-8"), 
            { 
                name: program.name,
                path: program.path,
                icon: program.icon
            }
        ) + document.getElementById("programsButtons").innerHTML;
    });

    if (!programs[0])
        return

    document.getElementById("programButton").addEventListener("click", (event) => { // Не робит почему-то
        console.log(event.target.dataset.path);
        require("child_process").execFile(event.target.dataset.path);
    })
}

// Открыть конфиг
document.querySelector("#openConfig").addEventListener("click", () => {
    ipcRenderer.send("openConfig");
});

// Скрыть окно
document.querySelector("#minimize").addEventListener("click", () => {
    ipcRenderer.send("minimize");
});

// Увеличить окно во всеь экран
document.querySelector("#maximize").addEventListener("click", () => {
    ipcRenderer.send("maximize");
});

// Документация
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
    let projects = JSON.parse(require("fs").readFileSync("projects.json", "utf8"));
    
    projects.push({
		"path": data[0],
		"name": "",
		"description": ""
	})

    require("fs").writeFile("projects.json", JSON.stringify(projects), (error) => {
	    if (error) 
	        throw error;
	});

    showProjects();
});

// ------------------------------------------------ загрузка проектов из памяти
function showProjects(){
    leftButtons();

    const fs = require("fs");
    //var parser = require('csv-parser');
    var mainBlock = document.getElementById("mainBlock");
    
    while (mainBlock.children.length > 1)
        mainBlock.removeChild(mainBlock.lastChild);

    let projects = JSON.parse(fs.readFileSync("projects.json", "utf8"));
    projects.forEach((project, i, array) => {
        document.getElementById("mainBlock").innerHTML = mustache.render(
            fs.readFileSync("render/templates/project.html", "utf-8"), 
            { 
                name: project.name,
                path: project.path,
                description: project.description
            }
        );

        document.getElementById("openProjectFolder").addEventListener("click", (event) => {
            require("child_process").exec(`start "" "` + event.target.dataset.folder + `"`);
        });

        document.getElementById("openProjectIDE").addEventListener("click", (event) => {
            require("child_process").execFile(JSON.parse(require("fs").readFileSync("pathes.json", "utf8"))[0].path, [event.target.dataset.folder], function(err, data) {  
                console.log(err)                    
            });
        });

        document.getElementById("deleteProject").addEventListener("click", (event) => {
            projects.splice(event.target.dataset.folder, 1);

            require("fs").writeFile("projects.json", JSON.stringify(projects), (error) => {
                if (error) 
                    throw error;
            });

            showProjects();
        });
    });
}
