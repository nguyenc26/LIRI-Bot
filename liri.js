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

switch (userAction) {
    case "concert-this":
        getBands(userInput);
        break;
    case "spotify-this-song":
        getSongs(userInput);
        break;
    case "movie-this":
        getMovies(userInput);
        break;
    case "do-what-it-says":
        doIT(userInput);
        break;
};

function getBands() {
    var divider = "\n------------------------------------------------------------\n\n";

    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp")
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var jsonData = response.data[i];
                var date = moment(jsonData.datetime).format('L');

                var bandInfo = [
                    "Venue: " + jsonData.venue.name,
                    "Venue Location: " + jsonData.venue.city + "," + jsonData.venue.region + " " + jsonData.venue.country,
                    "Date: " + date,
                    "========================================================"
                ].join("\n");
                fs.appendFile("log.txt", bandInfo + divider, function (err) {
                    if (err) throw err;
                    console.log(bandInfo);
                });
            }
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
};

function getSongs() {
    if (!userInput) {
        userInput = "The Sign"
    }
    var divider = "\n------------------------------------------------------------\n\n";

    spotify
        .search({ type: 'track', query: userInput, limit: 10 })
        .then(function (response) {
            var song = response.tracks.items[0];

            var songInfo = [
                "Song Name: " + song.name,
                "Artist(s): " + song.artists[0].name,
                "Album Name: " + song.album.name,
                "Preview Link: " + song.preview_url,
                "========================================================"
            ].join("\n");
            fs.appendFile("log.txt", songInfo + divider, function (err) {
                if (err) throw err;
                console.log(songInfo);
            });

            console.log();
        })
        .catch(function (err) {
            console.log(err);
        })
};

function getMovies() {
    if (!userInput) {
        userInput = "Mr. Nobody"
        console.log("================");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
    }
    var divider = "\n------------------------------------------------------------\n\n";

    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            var info = response.data;

            var movieInfo = [
                "Title: " + info.Title,
                "Release Year: " + info.Year,
                "IMDB Rating: " + info.imdbRating,
                "Rotten Tomatoes Rating: " + info.Ratings[1].Value,
                "Country of Production: " + info.Country,
                "Language: " + info.Language,
                "Plot: " + info.Plot,
                "Actors in the Movie: " + info.Actors,
                "========================================================"
            ].join("\n");
            fs.appendFile("log.txt", movieInfo + divider, function (err) {
                if (err) throw err;
                console.log(movieInfo);
            });
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
};

function doIT() {
    fs.readFile("random.txt", "utf8", function (err, response) {
        if (err) {
            return console.log(err);
        }

        var Info = response.split(",");
        console.log(response)
        userAction = Info[0];
        userInput = Info[1];
        switch (userAction) {
            case "concert-this":
                getBands(userInput);
                break;
            case "spotify-this-song":
                getSongs(userInput);
                break;
            case "movie-this":
                getMovies(userInput);
                break;
            default:
                break;

        };
    });
};