var { 
	ipcRenderer 
} = require("electron");

document.querySelector("#addProgram").addEventListener("click", () => {
	let programs = JSON.parse((!require("fs").readFileSync("pathes.json", "utf8")) ? "[]" : require("fs").readFileSync("pathes.json", "utf8"));
	if (!programs) {
		programs = [
			{
				"path": document.getElementById("idePath").files[0].path,
				"name": "IDE"
			}
		]
	}

	if (programs[0] != null && programs[0].name != "IDE") {
		programs[1] = programs[0];
		programs[0] = {
			"path": document.getElementById("idePath").files[0].path,
			"name": "IDE"
		}
	}

	programs[0] = {
		"path": (document.getElementById("idePath").files.length <= 0) ? (!programs[0]) ? "" : programs[0].path : document.getElementById("idePath").files[0].path,
		"name": "IDE"
	}

	if (document.getElementById("addProgramPath").files.length <= 0) {
		require("fs").writeFile("pathes.json", JSON.stringify(programs), (error) => {
			if (error) 
				throw error;
		});

		return
	}

	programs.push({
		"path": document.getElementById("addProgramPath").files[0].path,
		"name": document.getElementById("addProgramName").value,
		"icon": document.getElementById("addProgramIcon").files[0].path
	})

	require("fs").writeFile("pathes.json", JSON.stringify(programs), (error) => {
		if (error) 
			throw error;
	});

	ipcRenderer.send("saved");
});