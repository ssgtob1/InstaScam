var db = require('../db.js');
var assert = require('assert');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();

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
            ).should.eventually.contain.keys({ UserName: 'superman', Password: 'sahota', ProfileName: 'ronsahota' });
    });
});

describe('testing user', function () {
    it('insert a user', function () {
        var user = {
            userName: 'JMelka',
            password: 'abc123',
            profileName: 'John'
        };
        return db.insertUser(user).then(
            (val) => {
                return db.getUser(user.userName);
            }
        ).then(
            (val) => {
                console.log('got user!');
                return val;
            }
            ).should.eventually.contain.keys({ UserName: 'JMelka', Password: 'abc123', ProfileName: 'John' });
    });
});


describe('testing pictures', function () {

    it('insert a picture', function () {

        var expected = { UserName: 'JMelka', ActualFileName: 'ThePictureFileName.jpg', SystemFileName: '123' };
        return db.insertPicture('JMelka', 'ThePictureFileName.jpg', '123').then(
            (pictureId) => {

                return db.getPictures('JMelka');
            }
        ).then(
            (val) => {
                return val[0];
            }
            ).should.eventually.contain.keys(expected);
        // ).should.eventually.contain.keys({ UserName: 'John', ActualFileName: 'ThePictureFileName.jpg', SystemFileName: '123' });
    });


});

describe('testing comments', function () {

    it('insert a comment', function () {
        var expected = { PictureId: 1, UserName: 'JMelka', Message: 'message test' };
        return db.insertComment(1, 'JMelka', 'message test').then(
            (commentId) => {

                return db.getPictureComments(1);
            }
        ).then(
            (val) => {
                return val[0];
            }
            ).should.eventually.contain.keys(expected);
    });


});