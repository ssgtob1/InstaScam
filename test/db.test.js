var db = require('../db.js');
var assert = require('assert');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();

// var sqlite3 = require('sqlite3').verbose();

// var TransactionDatabase = require("sqlite3-transactions").TransactionDatabase;

// db.setDB(new TransactionDatabase(
//    new sqlite3.Database("InstaScamTest.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE)));

describe('InstaScam Database', function () {
    it('Test that checks if insert and select function work', function () {
        var user = {
            userName: 'superman',
            password: 'sahota',
            profileName: 'ronsahota'
        };
        return db.insertUser(user).then(
            (val) => {
                return db.getUser(user.userName);
            }
        ).then(
            (val) => {
                console.log('whatever');
                return val;
            }
        ).should.eventually.contain.keys({UserName: 'superman',Password: 'sahota',ProfileName: 'ronsahota'});
    });
});