document.querySelector('#openIdeBtn').addEventListener('click', () => {
    //openIDE();
});

document.querySelector('#openGgcBtn').addEventListener('click', () => {
    var exec = require('child_process').execFile;

    exec('C:\\Users\\marga\\Desktop\\Barbaris\\GitClient.exe', function(err, data) {  
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

    exec('C:\\Users\\marga\\Desktop\\Barbaris\\convertor\\Convertor.exe', function(err, data) {  
        console.log(err)
        console.log(data.toString());                       
    });
});