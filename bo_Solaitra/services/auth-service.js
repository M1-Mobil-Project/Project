const { dbconnect } = require("../utils");
const sha1 = require("sha1");
const moment = require("moment");

async function inscription(user) {
    var db = await dbconnect.getDb();

    var sql = "INSERT INTO USER (name, firstname, username, password, id_profile) VALUES ('"+user.name+"', '"+user.firstname+"', '"+user.username+"', '"+sha1(user.password)+"', '"+user.id_profile+"') ";
    console.log(sql);
    db.connect(function(err){
        db.query(sql, function(err, result){
            if (err) throw err;
            console.log(result);
        });
    });
    
    
    return login(user.username, user.password, db);
}

async function saveToken(db, user) {
    var token = sha1(
        user.id +
        user.password +
        moment().format("YYYY-MM-DD HH:mm:ss.SSS")
    );

    var sql = "INSERT INTO TOKEN (id_user, token, expiration) VALUES ('"+user.id+"', '"+token+"', '"+moment().add(1, "h").format("YYYY-MM-DD HH:mm:ss.SSS")+"') ";
    
    db.connect(function(err){
        user = db.query(sql, function(err, result){
            if (err) throw err;
            console.log(result);
        });
    });
    return token;
}

async function login(username, password, db) {
    if (db === undefined) db = await dbconnect.getDb();
    var sql = "select * from user where username = '"+username+"' and password = '"+sha1(password)+"'";
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
                id_user: user.id,
                id_profile: user.id_profile,
            };
            return results;
        });
        console.log("data2"+data);
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

// async function findTokenUser(token){
//     var db = await dbconnect.getDb();
//     var tokenCollection = db.collection('token');
//     var result = await tokenCollection.findOne({token: token, date_expiration: {$gte: new Date()}});
//     if(!result) throw new Error("InvalidToken");
//     return result;
// }

module.exports = {login, logout, inscription}