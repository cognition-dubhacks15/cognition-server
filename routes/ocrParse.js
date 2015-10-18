// Taken from nodecr and adapted.

var ncr = require('nodecr')
    , request = require('request')
    , fs = require('fs')
//    , test_img = 'https://www.google.com/images/srpr/logo3w.png' // Google Logo
    , test_img = 'https://www.google.com/images/srpr/bise_l40.jpg'

// Create image name from end of URL.
// Note this will fail in loads of cases.
var imgName = test_img.split('/').pop()

// Process the image and read the text from it using Tesseract
function ncrHandler(){

    ncr.process(__dirname + '/' + imgName,function(err, text){

        if(err) return console.error(err)

        console.log(text)

        var textData = text;

    }, 'eng', 6)

}

function ncrHandlerFile(fileName){

    imgName = fileName;
    ncr.process(__dirname + '/' + fileName,function(err, text){

        if(err) return console.error(err)

        console.log(text)

        var textData = text;

    }, 'eng', 6)

}
// -- * -- Debug -- * --
console.log("First file:")

// Prints out the copy of the file.
ncrHandlerFile("logo3w.png");

console.log("Next file:")

ncrHandlerFile("bise_l40.jpg")
