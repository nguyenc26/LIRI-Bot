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
    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp")
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var date = moment(response.data[i].datetime).format('L');
                console.log("\nVenue: " + response.data[i].venue.name + "\nVenue Location: " + response.data[i].venue.city + "," + response.data[i].venue.region + " " + response.data[i].venue.country + "\nDate: " + date + "\n================");
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
    spotify
        .search({ type: 'track', query: userInput, limit: 10 })
        .then(function (response) {
            var song = response.tracks.items[0]

            console.log("\nSong Name: " + song.name + "\nArtist(s): " + song.artists[0].name + "\nAlbum Name: " + song.album.name + "\nPreview Link: " + song.preview_url);
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
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            var info = response.data;
            console.log("\nTitle: " + info.Title + "\nRelease Year: " + info.Year + "\nIMDB Rating: " + info.imdbRating + "\nRotten Tomatoes Rating: " + info.Ratings[1].Value + "\nCountry of Production: " + info.Country + "\nLanguage: " + info.Language + "\nPlot: " + info.Plot + "\nActors in the Movie: " + info.Actors);
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