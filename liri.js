require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
//to get omdb and bands in town
var axios = require('axios');
var moment = require('moment');

var spotify = new Spotify(keys.spotify);

var fs = require('fs');

var userInput = process.argv.slice(3).join("+");
console.log(userInput);

var userAction = process.argv[2];
console.log(userAction);
//console.log(process.argv);
runLiri();

function runLiri() {
    switch (userAction) {
        case "concert-this":
            console.log("concert this man");

            break;
        case "spotify-this-song":
            console.log("concert this man");

            break;
        case "movie-this":
            console.log("concert this man");

            break;

    };
};