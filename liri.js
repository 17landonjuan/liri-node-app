require('dotenv').config();
var fs = require('fs');
var spotify = require('spotify');
var request = require('request');
var command = process.argv[2];
var userInput = process.argv.splice(3);

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify)

switch (command) {
    case 'spotify-this-song':
        spotifySong();
        break;

    case 'concert-this':
        concertThis();
        break;

    case 'movie-this':
        movieThis();
        break;

    case 'do-what-it-says':
        doWhatItSays();
        break;
};

function spotifySong() {

    spotify.search({ type: 'track', query: userInput || "The Sign Ace of Base" }, function (err, data) {

        var songData = data.tracks.items;


        if (err) {
            console.log(err);
        };

        if (songData.length > 0) {
            var firstResult = data.tracks.items[0];
            console.log("----------");
            console.log("YOU SEARCHED FOR " + userInput);
            console.log("Artist: " + firstResult.artists[0].name);
            console.log("Song Name: " + firstResult.name);
            console.log("Preview Link of Song: " + firstResult.preview_url);
            console.log("Album: " + firstResult.album.name);
            console.log("----------");
        } else {
            console.log("No songs found! Try another song.");
        }

        log();
    });
};

function concertThis() {
    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"), function (err, bands) {
        var bands = venue.location.date.JSON.stringify(bands, null, 2)
        if (err) {
            console.log(err);
        };

        if (bands.length > 0) {
            var firstResult = venue.location.date[0];
            console.log("----------");
            console.log("YOU SEARCHED FOR " + userInput);
            console.log("This Venue: " + firstResult.venues[0].name);
            console.log("On this Date: " + firstResult.date);
            console.log("At this Location: " + firstResult.venue.location);
            console.log("----------");
        } else {
            console.log("Sorry! I couldn't find any events that matched your search!");
        }

        log();
    };
};







function movieThis() {
    request('http://www.omdbapi.com/?t=' + (userInput || "Mr. Nobody") + "&trilogy", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            //parses through the data received
            var movieData = JSON.parse(body);

            //logs all the needed info to terminal
            console.log("-----MOVIE INFO-----")
            console.log("Title: " + movieData.Title);
            console.log("Year: " + movieData.Year);
            console.log("IMDB Rating: " + movieData.imdbRating);
            console.log("Country: " + movieData.Country);
            console.log("Language: " + movieData.Language);
            console.log("Plot: " + movieData.Plot);
            console.log("Actors: " + movieData.Actors);
            console.log("Rotten Tomatoes Rating: " + movieData.tomatoRating);
            console.log("Rotten Tomatoes URL: " + movieData.tomatoURL);
            console.log("---------------------");
        } else {
            console.log("Error occurred: ", error);
        };

        log();
    });
};

function doWhatItSays() {
    //access random.txt and reads data inside the file
    fs.readFile("random.txt", "utf8", function (error, data) {


        if (error) throw error;

        var dataArr = data.split(",");

        userInput = dataArr[1];

        //decides which function to run based on text file
        switch (dataArr[0].trim()) {

            case "spotify-this-song":
                spotifySong(userInput);
                break;

            case "concert-this":
                concertThis(userInput);
                break;

            case "movie-this":
                movieThis(userInput);
                break;
        };

        log();
    });
};

//appends every node command in log.txt
function log(data) {
    fs.appendFile("log.txt", command + " " + userInput + "" + '\n', function (err) {
        //in case of an error: 
        if (err) {
            console.log("Error occured", err);
        }
    });
};