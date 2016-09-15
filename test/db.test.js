var main = require('../db.js');
var assert = require('assert');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();

var sqlite = require('sqlite3');

describe('testing pictures', function () {

    it('insert a picture', function () {
        return main.insertPicture('John', 'ThePictureFileName.jpg', '123.jpg').then(
            (pictureId) => {
                return main.getPictures('John');    
            }
        ).should.eventually.contain.keys({UserName: 'John', ActualFileName: 'ThePictureFileName.jpg', SystemFileName: '123.jpg'});
    });


});