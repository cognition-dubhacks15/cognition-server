var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Firebase = require("firebase");

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// --- * ---

// Main Reference for Firebase Server
var fireRef = new Firebase("https://cognition-client.firebaseio.com/");


// Pulled from anantn detect_data
// https://gist.github.com/anantn/4323949
function docCall(id) {
    checkIfUserExists(id);
}

function userExistsCallback(id, exists, snapshot) {
    if (exists) {
        return snapshot.child(id);
    } else {
        fireRef.push(id);
        return snapshot.child(id);
    }
}

// Tests to see if /<id> has any data and if it exists.
function checkIfUserExists(id) {
    usersRef.child(id).on('value', function (snapshot) {
        var exists = (snapshot.child(id).exists());
        //var exists = (snapshot.val() !== null);
        userExistsCallback(id, exists, snapshot);
    });
}

// Pushes a child to the parent
// REQUIRES: Parent to exist (Handled by the pull request, which ALWAYS runs first.)

function addDocument(parent, docData) {
    // Points path the location.
    var path = fireRef(parent);
    path.set(docData);
}

// --- * ---

// *** --- ***

app.get('/', function (req, res) {
    res.send('Hello World!');
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

// *** --- ***
module.exports = app;
