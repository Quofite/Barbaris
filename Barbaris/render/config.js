var { ipcRenderer } = require("electron");

/*document.querySelector("#save").addEventListener("click", () => {
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
});*/

document.querySelector("#addProgram").addEventListener("click", () => {
	let programs = JSON.parse(require("fs").readFileSync("pathes.json", "utf8"));

	programs.push({
		"path": document.getElementById("addProgramPath").files[0].path,
		"name": document.getElementById("addProgramName").value,
		"icon": document.getElementById("addProgramIcon").files[0].path
	})

	require("fs").writeFile("pathes.json", JSON.stringify(programs), (error) => {
		if (error) 
			throw error;
	});

	//ipcRenderer.send("saved");
});