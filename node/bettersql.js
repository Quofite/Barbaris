const mysql = require("mysql2");

module.exports.Query = function(connectionObject, sqlString, filter){
    const conn = mysql.createConnection(connectionObject);

    conn.query(sql, filter, function(err, results){
        if(err) throw err;

        return results;
    });

    conn.end();
}