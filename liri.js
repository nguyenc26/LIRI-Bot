require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
//to get omdb and bands in town
var axios = require('axios');
//var moment = require('moment');

//var spotify = new Spotify(keys.spotify);

var fs = require('fs');

var userInput = process.argv.slice(3).join("+");
console.log(userInput);

var userAction = process.argv[2];
console.log(userAction);
//console.log(process.argv);

switch (userAction) {
    case "concert-this":
        getBands(userInput);
        break;
    case "spotify-this-song":
        
        console.log("concert this man");

        break;
    case "movie-this":
        console.log("concert this man");

        break;

};

function getBands() {
    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp")
        .then(function (response) {
            console.log(response.data[0].venue.name);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
    console.log("concert this action");
}