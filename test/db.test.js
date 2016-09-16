var db = require('../db.js');
var assert = require('assert');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();

var sqlite = require('sqlite3');

describe('testing pictures', function () {

    it('insert a picture', function () {
        var expected = { UserName: 'JMelka', ActualFileName: 'ThePictureFileName.jpg', SystemFileName: '123.jpg' };
        return db.insertPicture('JMelka', 'ThePictureFileName.jpg', '123.jpg').then(
            (pictureId) => {

                return db.getPictures('JMelka');
            }
            ).then(
                (val) => {
                    return val[0];
                }
            ).should.eventually.contain.keys(expected);
            // ).should.eventually.contain.keys({ UserName: 'John', ActualFileName: 'ThePictureFileName.jpg', SystemFileName: '123.jpg' });
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