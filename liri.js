require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require ('node-spotify-api');
var axios = require ('axios');
var moment = require ('moment');

var spotify = new Spotify(keys.spotify);

var fs = require('fs');

var nodeArgs = process.argv;
console.log(nodeArgs)
var userInput = "";

for (var i = 3; i < nodeArgs.length; i++) {
    
    if (i > 3 && i < nodeArgs.length) {
        userInput = userInput + "+" + nodeArgs[i];
    } else {
        userInput += nodeArgs[i];
    };
};