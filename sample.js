$(function () {
    var params = {
        // Request parameters
        "language": "unk",
        "detectOrientation ": "true",
    };

    $.ajax({
        url: "https://api.projectoxford.ai/vision/v1/ocr&" + $.param(params),
        beforeSend: function (img) {
            // Request headers
            img.setRequestHeader("Content-Type", "application/json");
            img.setRequestHeader("Ocp-Apim-Subscription-Key", "{subscription key}");
        },
        type: "POST",
        // Request body
        data: "{body}",
    })
        .done(function (data) {
            alert("success");
            console.log("done")
        })
        .fail(function () {
            alert("error");
        });
});

// request load
var request = require('request');

//configuration
request({
    url: "https://api.projectoxford.ai/vision/v1/ocr"


})

