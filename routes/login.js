var Firebase = require("firebase");
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

module.exports = router;


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
    usersRef.child(id).on('value', function(snapshot) {
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

