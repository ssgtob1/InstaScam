'use strict'

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('InstaScam.db');

//initDB(db);

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
        ActualFileName TEXT,
        SystemFileName TEXT,
        Insrt_TS INTEGER DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(UserName) REFERENCES User(UserName)
    );

    CREATE TABLE IF NOT EXISTS Comment (
        CommentId INTEGER NOT NULL PRIMARY KEY,
        PictureId INTEGER,
        UserName TEXT,
        Message TEXT,
        Insrt_TS INTEGER DATETIME DEFAULT CURRENT_TIMESTAMP,
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

function insertPicture(userName, fileName, fileTs) {
    console.log("db.js insertPicture userName: " + userName)
    console.log("db.js insertPicture fileName: " + fileName)
    console.log("db.js insertPicture fileTs: " + fileTs)
    return new Promise(function (resolve, reject) {
        var stmt = db.prepare(`INSERT INTO Picture (UserName, ActualFileName, SystemFileName) VALUES (?, ?, ?)`);        
        stmt.run(userName, fileName, fileTs, function (err) {
            if (err) {
                reject(err);
                return;
            }
            console.log(this.lastID);
            resolve(this.lastID);
        });
        stmt.finalize(); 
    });
}

function getPictures(userName) {
    console.log("db.js getPictures(userName): " + userName)
    return new Promise(function (resolve, reject) {
        var stmt = "SELECT PictureId as PictureId, UserName as UserName, ActualFileName as ActualFileName, SystemFileName as SystemFileName, Insrt_TS as Date FROM Picture where UserName = ?";
        db.all(stmt, userName, function (err, rows) {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
}

function insertComment(pictureId, userName, message) {
    console.log("db.js insertComment pictureId: " + pictureId)
    console.log("db.js insertComment userName: " + userName)
    console.log("db.js insertComment message: " + message)
    return new Promise(function (resolve, reject) {
        var stmt = db.prepare(`INSERT INTO Comment (PictureId, UserName, Message) VALUES (?, ?, ?)`);        
        stmt.run(pictureId, userName, message, function (err) {
            if (err) {
                reject(err);
                return;
            }
            console.log(this.lastID);
            resolve(this.lastID);
        });
        stmt.finalize(); 
    });
}

function getPictureComments(pictureId) {
    console.log("db.js getPictureComments(pictureId): " + pictureId)
    return new Promise(function (resolve, reject) {
        var stmt = "SELECT CommentId as CommentId, PictureId as PictureId, UserName as UserName, Message as Message, Insrt_TS as Date FROM Comment where PictureId = ?";
        db.all(stmt, pictureId, function (err, rows) {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
}

exports.initDB = initDB;
exports.insertPicture = insertPicture;
exports.getPictures = getPictures;
exports.insertComment = insertComment;
exports.getPictureComments = getPictureComments;

