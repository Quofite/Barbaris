const express = require("express");     // получение express.js
const app = express();                  // создание объекта приложения     
const bsql = require("./bettersql");    // получение bettersql.js



// создание объекта подключения
const connect = bsql.createConnectionObject("localhost", "root", "", "messager"); // хост, имя пользователя, пароль, имя БД

// sql запрос
var sql = `SELECT * FROM messages`;
filter = [] // <-- можно не создавать как отдельный объект, если не нужен; просто в параметры вместо filter написать []


// ------------------------------------------- basic --------------------------


// колбэк
function callback(results){
    console.log(results);
}

bsql.basicQuery(connect, sql, filter, callback);


// ------------------------------------------- http-response ------------------


function callback2(results){
    var result = ""
    
    for (var i = results.length - 1; i >= 0; i--){
        result += `<b>${results[i].login}:</b> ${results[i].message}<hr>`;
    }

    return results;
}

app.get("/", function(request, response){
    bsql.responseQuery(connect, sql, filter, callback2, response);
});


// ----- прослушивание порта


app.listen(3000, () => { console.log("listening") });