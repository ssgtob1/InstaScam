var express = require('express'),
    app = express(),
    fs = require('fs'),
    html = fs.readFileSync('./index.html'),
    bodyParser = require('body-parser'),
    db = require('./db'),
    path = require('path');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true

    
}));


app.use(express.static('public'));


app.post('/login', function(req, res) {
    var login = {
        userName: req.body.userName,
        password: req.body.password
    };
    console.log(login.userid);
    
    var p = db.getUser(login.userName);
    p.then(
        (val) => {
            
            if (login.password == val.password) {
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

app.post('/insertUser', function(req, res) {
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
                res.send('User ' + user.userName + ' is added successfully!');
        }
    ).catch(
        (err) => {
            console.log(err);
            res.send(err);
        }
    )
});

app.post('/likeTweet', function(req, res) {
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


app.get('/', function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(html);
});

app.get('/mainApp', function(req, res) {
    res.send('logged in');
})

app.get('/adduser', function(req, res) {

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

app.get('/addtweet', function(req, res) {
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

app.get('/gettweets', function(req, res) {
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

app.listen(8080, function() {
    console.log('Example app listening on port 8080!');
});