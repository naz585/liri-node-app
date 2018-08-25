require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var keys = require('./keys');
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var search = process.argv[2];
var term = process.argv.slice(3).join(" ");


if (search === 'my-tweets'){

client.get('statuses/user_timeline', { screen_name: 'oldskool11218' }, function (error, tweets, response) {
    if (!error) {
        for (var i = 0; i < tweets.length; i++) {
            console.log('\n' + tweets[i].text + '\n');
        }
    }
});
}
else if (search === 'spotify-this-song'){
spotify.search({ type: 'track', query: term }, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    var song = data.tracks.items[0];
    
    var trackData = [
        "  Artist(s): " + song.artists[0].name,
        "  Song Title: " + song.name,
        "  Spotify Link: " + song.external_urls.spotify,
        "  Album: " + song.album.name
      ].join("\n\n");
      console.log('\n'+trackData);
    
});
}
else if (search === 'movie-this'){

var queryUrl = "http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey="+keys.omdb.key;

request(queryUrl, function(error, response, body) {

    if (!error && response.statusCode === 200) {
  
      var film = JSON.parse(body)
      var filmData = [
        "  Movie Title: " + film.Title,
        "  Release Year: " + film.Year,
        "  IMDB Rating: " + film.imdbRating,
        "  Rotton Tomatoes: " + film.Ratings[1].Value,
        "  Produced in: " + film.Country,
        "  Language: " + film.Language,
        "  Plot: " + film.Plot,
        "  Actors: " + film.Actors
      ].join("\n\n");
      console.log('\n'+filmData);

    }
  })

}
else if (search === 'movie-this'){


    
}