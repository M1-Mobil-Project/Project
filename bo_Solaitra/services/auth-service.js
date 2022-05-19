const { dbconnect } = require("../utils");
const sha1 = require("sha1");
const moment = require("moment");

async function inscription(user) {
    var db = await dbconnect.getDb();

    var sql = "INSERT INTO user (lastname, firstname, sex, pseudo, password) VALUES ('"+user.lastname+"', '"+user.firstname+"', '"+user.sex+"', '"+user.pseudo+"', '"+sha1(user.password)+"') ";
    console.log(sql);
    db.connect(function(err){
        db.query(sql, function(err, result){
            if (err) throw err;
            console.log(result);
        });
    });
    
    //return login(user.pseudo, user.password, db);
    return user; 
}

async function saveToken(db, user) {
    var token = sha1(
        user.id +
        user.password +
        moment().format("YYYY-MM-DD HH:mm:ss.SSS")
    );

    var sql = "INSERT INTO token (id_user, token, expiration) VALUES ('"+user.id+"', '"+token+"', '"+moment().add(1, "h").format("YYYY-MM-DD HH:mm:ss.SSS")+"') ";
    
    db.connect(function(err){
        user = db.query(sql, function(err, result){
            if (err) throw err;
            console.log(result);
        });
    });
    return token;
}

async function login(pseudo, password, db) {
    if (db === undefined) db = await dbconnect.getDb();
    var sql = "select * from user where pseudo = '"+pseudo+"' and password = '"+sha1(password)+"'";
    console.log(sql)
    var user;

    db.connect(function(err){
        var data = db.query(sql, function(err, result){
            if (err) throw err;
            user = result[0];
            if (!user) {
                throw new Error("nom d'utilisateur ou mot de passe invalide");
            }
            var token = saveToken(db, user);
            var results = {
                token: token,
                id_user: user.id
            };
            return results;
        });
        console.log("data2 : "+data);
    })
   
}

async function logout(token) {
    var db = await dbconnect.getDb();
    var sql = "DELETE FROM token where token = '"+token+"'";

    db.connect(function(err){
        if (err) throw err;
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Number of records deleted: " + result.affectedRows);
        });
    })
}

module.exports = {login, logout, inscription}