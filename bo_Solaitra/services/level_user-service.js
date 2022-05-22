const { dbconnect } = require("../utils");
const moment = require("moment");

async function findLevelUser(id_user, db) {
    if (db === undefined) db = await dbconnect.getDb();
    var sql = "select * from level_user where id_user = "+id_user;
    console.log(sql)
    var level_user;

    db.connect(function(err){
        var data = db.query(sql, function(err, result){
            if (err) throw err;
            level_user = result[0];
            if (!level_user) {
                throw new Error("nom d'utilisateur ou mot de passe invalide");
            }
            var results = {
                id_user: level_user.id,
                unlocked: level_user.unlocked,
            };
            return results;
        });
        console.log("data2"+data);
    })
   
}

module.exports = {findLevelUser}