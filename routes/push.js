var Firebase = require("firebase");

// Main Reference for Firebase Server
var fireRef = new Firebase("https://cognition-client.firebaseio.com/");

// Pushes a child to the parent
// REQUIRES: Parent to exist (Handled by the pull request, which ALWAYS runs first.)

function addDocument(parent, docData) {
    // Points path the location.
    var path = fireRef(parent);
    path.set(docData);
}