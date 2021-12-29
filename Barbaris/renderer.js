document.querySelector('#openIdeBtn').addEventListener('click', () => {
    var exec = require('child_process').execFile;
    const fs = require("fs");

    let pathesJsonContent = fs.readFileSync("pathes.json", "utf8");
    let parsed = JSON.parse(pathesJsonContent);

    exec(parsed.ide, function(err, data) {  
        console.log(err)
        console.log(data.toString());                       
    });
});

document.querySelector('#openGgcBtn').addEventListener('click', () => {
    var exec = require('child_process').execFile;
    const fs = require("fs");

    let pathesJsonContent = fs.readFileSync("pathes.json", "utf8");
    let parsed = JSON.parse(pathesJsonContent);

    exec(parsed.ggc, function(err, data) {  
        console.log(err)
        console.log(data.toString());                       
    });
});

document.querySelector('#openConfigBtn').addEventListener('click', () => {
    const { ipcRenderer } = require('electron');
    ipcRenderer.send('create-conf-window');
});

document.querySelector('#openConvBtn').addEventListener('click', () => {
    var exec = require('child_process').execFile;
    const fs = require("fs");

    let pathesJsonContent = fs.readFileSync("pathes.json", "utf8");
    let parsed = JSON.parse(pathesJsonContent);

    exec(parsed.convertor, function(err, data) {  
        console.log(err)
        console.log(data.toString());                       
    });
});
