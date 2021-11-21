const mysql = require("mysql2");

module.exports.createConnectionObject = function(host, user, password, database){
    const connection = {
        host: host,
        user: user,
        password: password,
        database: database
    };

    return connection;
}

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