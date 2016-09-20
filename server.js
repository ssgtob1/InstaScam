var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    db = require('./db'),
    path = require('path'),
    mkdirp = require('mkdirp');

var multer = require('multer'),
    bodyParser = require('body-parser'),
    path = require('path');

var fs = require('fs-extra');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//
app.use('/static', express.static(__dirname + '/public'));


app.post('/login/', function (req, res) {
    var login = {
        userName: req.body.userName,
        password: req.body.password
    };
    console.log(login.userName);

    var p = db.getUser(login.userName);
    p.then(
        (val) => {

            if (login.password === val.Password) {
                res.send(val);

            } else {
                throw 'Username or password issue!';
            }
        }
    ).catch(
        (err) => {
            res.status(500);
            console.log(err);
            res.send(err);
        }
        )
});

app.post('/insertUser/', function (req, res) {
    var user = {
        userName: req.body.userName,
        password: req.body.password,
        profileName: req.body.profileName
    };
    console.log('InstaScam user Name = ' + user.userName);
    console.log('InstaScam password = ' + user.password);
    console.log('InstaScam profile Name  =' + user.profileName);

    var p = db.insertUser(user);
    p.then(
        (val) => {
            var dirPath = '/public/photos/' + user.userName;
            mkdirp(dirPath, function (err) {
                if (err) {
                    console.log(err);
                }
            });
            res.send('User ' + user.userName + ' is added successfully!');
        }
    ).catch(
        (err) => {
            console.log(err);
            res.send(err);
        }
        )
});

app.post('/insertPicture/', multer({ dest: './public/photos/' }).single('dropzone'), function (req, res) {
   // console.log("insertPicture body:" + req.body);
  //  console.log("insertPicture file:" + req.file);

    //var time = new Date();

    var user = {
        userName: req.body.userName
    };

    var file = {
        actualFileName: req.file.originalname,
        systemFileName: req.file.filename,
        filePath: req.file.path
        // fieldname: 'upl',
        // originalname: '123.jpg',
        // encoding: '7bit',
        // mimetype: 'image/png',
        // destination: './uploads/',
        // filename: '436ec561793aa4dc475a88e84776b1b9',
        // path: 'uploads/436ec561793aa4dc475a88e84776b1b9',
        // size: 277056 
    };

    console.log('insertPicture - userName = ' + user.userName);
    console.log('insertPicture - actualFileName = ' + file.actualFileName);
    console.log('insertPicture - systemFileName = ' + file.systemFileName);

    //replace fileName with fileTs
    //var fileTs = time + "." + file.actualFileName.split('.').pop();
    //console.log('insertPicture - fileTs = ' + fileTs);

    var insertPic = db.insertPicture(user.userName, file.actualFileName, file.systemFileName);

    fs.move('./public/photos/' + req.file.filename, './public/photos/' + user.userName + '/' + file.systemFileName, function (err) {
        if (err) return console.error(err)
        console.log("upload and move file success!")
    })

    insertPic.then((val) => {
        res.send('Picture for ' + user.userName + ' is added successfully!');
    }).catch(
        (err) => {
            console.log(err);
            res.send(err);
        }
        );

});

app.get('/getPictures/:userName', function (req, res) {

    var picture = {
       userName: req.params.userName,
   };

    console.log('input app.get getPictures - userName = ' + picture.userName);


    var thePictures = db.getPictures(picture.userName);

    thePictures.then(
        (pictures) => {
            console.dir(pictures);
            res.send(pictures);
        }
    ).catch(
        (err) => {
            res.status(500);
            res.send('output app.get getPictures error: issue getting Pictures');
        }
        );
})

app.post('/insertComment/', function (req, res) {

    var picture = {
        pictureId: req.body.pictureId,
        userName: req.body.userName,
        message: req.body.comment
    };

    console.log('insertComment - pictureId = ' + picture.pictureId);
    console.log('insertComment - userName = ' + picture.userName);
    console.log('insertComment - message = ' + picture.message);

    var insertPic = db.insertComment(picture.pictureId, picture.userName, picture.message);

    insertPic.then((val) => {
        res.send('Comment for ' + picture.pictureId + ' is added successfully!');
    }).catch(
        (err) => {
            console.log(err);
            res.send(err);
        }
        )

});

app.get('/getPictureComments/', function (req, res) {

    var picture = {
        pictureId: req.body.pictureId,
    };

    console.log('input app.get getPictureComments - pictureId = ' + picture.pictureId);

    var thePictureComments = db.getPictureComments(picture.pictureId);

    thePictureComments.then(
        (pictureComments) => {
            console.log("output app.get getPictureComments: " + pictureComments);
            res.send(pictureComments);
        }
    ).catch(
        (err) => {
            res.status(500);
            res.send('output app.get getPictureComments error: issue getting comments');
        }
        );
})

app.post('/likeTweet', function (req, res) {
    var tweet = {
        userid: req.body.userid,
        tweetid: req.body.tweetid
    };
    console.log('tweet user id = ' + tweet.userid);
    console.log('tweet id = ' + tweet.tweetid);

    var p = db.likeTweet(tweet.tweetid, tweet.userid);
    p.then(
        (val) => {
            res.send(tweet.userid + ' like tweet ' + tweet.tweetid);
        }
    ).catch(
        (err) => {
            console.log(err);
            res.send(err);
        }
        )
});



app.get('/angular', function(req, res) {
    res.sendFile(__dirname + '/angularIndex.html');
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/mainApp', function (req, res) {
    res.send('logged in');
})

app.get('/adduser', function (req, res) {

    var user = {
        userid: req.query.userid,
        password: req.query.password,
        firstname: req.query.firstname,
        lastname: req.query.lastname,
        email: req.query.email

    };
    var p = dbInsertUser(user);
    p.then(
        (val) => {
            res.send('User Added');
        }
    ).catch(
        (err) => {
            res.send(err);
        }
        )
});

app.get('/addtweet', function (req, res) {
    var tweet = {
        userid: req.query.userid,
        tweetcontent: req.query.tweetcontent,
        tweetts: new Date()
    };

    var p = dbInsertTweet(tweet);
    p.then(
        (val) => {
            res.send('Tweet Added');
        }
    ).catch(
        (err) => {
            res.send(err);
        }
        )
});

app.get('/gettweets', function (req, res) {
    var user = {
        userid: req.query.userid,
    };

    var p = dbGetTweets(user);
    p.then(
        (val) => {
            res.send(val);
        }
    ).catch(
        (err) => {
            res.send(err);
        }
        )
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});