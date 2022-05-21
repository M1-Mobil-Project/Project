const mysql  = require('mysql');

function getDb(){
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "solaitra_db"
      });
}

module.exports = {getDb}