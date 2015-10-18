var Firebase = require("firebase");

// Main Reference for Firebase Server
var fireRef = new FireBase("https://cognition-client.firebaseio.com/");


// Pulled from anantn detect_data
// https://gist.github.com/anantn/4323949

function go(id) {
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