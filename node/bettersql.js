const mysql = require("mysql2");
const express = require("express");
const app = express();

module.exports.basicQuery = function(connect, sql, filter, callback){
    const connection = mysql.createConnection(connect);

    connection.query(sql, filter, function(err, results){
        if (err) throw err;
        callback(results);
    });

    connection.end();
}

module.exports.responseQuery = function(connect, sql, filter, callback, HttpResponse){
    const connection = mysql.createConnection(connect);

    connection.query(sql, filter, function(err, results){
        if (err) throw err;
        HttpResponse.send(callback(results));
    });

    connection.end();
}