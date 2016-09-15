'use strict'

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('InstaScam.db');

// function setDB(otherDB) {
//     db = otherDB;
// }

initDB(db);

function initDB() {

    var tableSql = `
    CREATE TABLE IF NOT EXISTS User (
        UserName TEXT NOT NULL PRIMARY KEY,
        Password Text,
        ProfileName TEXT
    );

    CREATE TABLE IF NOT EXISTS Picture (
        PictureId INTEGER NOT NULL PRIMARY KEY,
        UserName TEXT,
        FileName TEXT,
        Date INTEGER DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(UserName) REFERENCES User(UserName)
    );

    CREATE TABLE IF NOT EXISTS Comment (
        CommentId INTEGER NOT NULL PRIMARY KEY,
        PictureId INTEGER,
        UserName TEXT,
        FOREIGN KEY(UserName) REFERENCES User(UserName),
        FOREIGN KEY(PictureId) REFERENCES Picture(PictureId)
    );
    `

    db.exec(tableSql, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('all good');
    }); 

}

function insertUser(user) {
    return new Promise(
        (resolve, reject) => {
            var stmt = db.prepare("INSERT INTO User (UserName, Password, ProfileName) VALUES (?, ?, ?)");
            stmt.run(user.userName, user.password, user.profileName, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    console.log("The ID of the last row inserted is: " + this.lastID);
                    stmt.finalize();
                    resolve('success');
                }
            });
        });
}

function getUser(userName) {
    return new Promise(
        (resolve, reject) => {
            var stmt = db.prepare("SELECT * FROM USER WHERE UserName = ?");
            stmt.all(userName, function (err, rows) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows[0]);
                }
            });
        });
}

exports.insertUser = insertUser;
exports.getUser = getUser;
exports.setDB = setDB;
