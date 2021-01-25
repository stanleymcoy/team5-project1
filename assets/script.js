// Create object for location data
var locationData = {
  barcelona: "spain",
  capetown: "south africa",
  dubai: "united arab emirates",
  kyoto: "japan",
  riodejeneiro: "brazil",
  sanfrancisco: "united states",
};

// set global variables for local storage
var place = "";
var currentName = "";
var currentTemp = "";
var currentDescription = "";
var currentHumidity = "";


var playCations = [];



  

    // function renderSaved(){
    //   var stringPlaycations = localStorage.getItem("Playcations");
    //   var parsedPlaycations = JSON.parse(stringPlaycations);

    //   console.log(parsedPlaycations[0].destination);
    // };

    

   
var musicCountry="";



// helper functions for onclick
function getWeather(){
  var weatherKey = "76b919f90d91bc2b20cd335b8fcbe3a8";

  var weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&units=imperial&appid=" + weatherKey;
  
  // API call
  $.ajax({
    url: weatherQueryURL,
    method: "GET"
  }).then(function (response) {
    currentName = response.name;
    currentTemp = response.main.temp;
    currentDescription = response.weather[0].description;
    currentHumidity = response.main.humidity;

    // clear any prior weather info
    $("#weather").empty();
    // weather from query appends to page
    console.log(response);
    $("#weather").append(
      "<p>It is currently " + Math.round(response.main.temp) + " degrees with " + response.weather[0].description + " and " + response.main.humidity + " percent humidity.</p>")
      
})};

function getPlaylist(){
  var musicApiKey = "0157c95a3c971813dee6253f52b0f981";

  // $("#goButton").on("click", function () {
  console.log("music click working");

  var metro = place;
  console.log("metro = " + metro);
  // var musicCountry = locationData[metro];
  console.log("musicCountry = " + musicCountry);

  var queryURL =
    "http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=" +
    musicCountry +
    "&location=" +
    place +
    "&api_key=" +
    musicApiKey +
    "&format=json";

  // API call
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // clear existing music data

    $("#music").empty();
    // top tracks from query append to page

    console.log(response);

    for (i = 0; i < 10; i++) {

      // get artist name
      var artist = $("<p>").text(response.tracks.track[i].artist.name);
      console.log(artist);
      // get track name
      var track = $("<p>").text(response.tracks.track[i].name);
      // get track url
      var trackURL = $("<a>")
        .attr("href", response.tracks.track[i].url)
        .attr("target", "_blank")
        .attr("id", "track-link")
        .text("Listen on Last.fm");
      // append to #music div
      $("#music").append(artist, track, trackURL);
      // $('#music').append(trackURL);

      console.log(response.tracks.track[i]);

    }
  })
}

function getImages(){
  // API call
  $.ajax({
    url:
      "https://pixabay.com/api/?key=19889884-fb56b98757db0c3c85fe41506&q=" +
      place +
      "&image_type=photo&category=places&safesearch=true",
    method: "GET",
  }).then(function (response) {
    console.log(response);
    // images from recent trips are cleared
    $("#image-container").empty();

    // images from query append to page
    for (i = 0; i < response.hits.length; i++) {
    $("#image-container").append(
        "<img class=images src=" + response.hits[i].largeImageURL + "></img>"
      );

    }
    
    
  });
}

function savePlaycation(){
  var stringPlaycations = localStorage.getItem("Playcations") || "[]";
  var parsedPlaycations = JSON.parse(stringPlaycations);

  //building locations to store
  var playCation = {};
  playCation.destination = place;
  
  playCation.weather = {
    name: place,
    temp: currentTemp,
    description: currentDescription,
    humidity: currentHumidity
  };

  parsedPlaycations.push(playCation);
  var stringifiedPlaycations = JSON.stringify(parsedPlaycations);

  localStorage.setItem("Playcations", stringifiedPlaycations);

};


// Dropdown menu reflects selected location
$(".dropdown-menu").on("click", "li", function (event) {
  $("#dropdownMenuButton").text(event.target.innerText);
  console.log("You clicked", event);

// Go! button launches functions for API query
  $("#goButton").on("click", function () {
 
  // define place variable based on target
  place = event.target.attributes[1].value;
  
  // define musicCountry variable based on target
  musicCountry = event.target.attributes[2].value;
  
  // getting destination name
  cityName = $("#dropdownMenuButton").text();
  
  // empty jumbotron and tell user where they are
  $(".jumbotron").empty();
  $(".jumbotron").append("<h1 class=display-2>You are in " + cityName + ".</h1>" )

  // run functions
  getWeather();
  getPlaylist();
  getImages();
  savePlaycation();

  // Commented out code for rendering past trips
    // function renderSaved(){
    //   var stringPlaycations = localStorage.getItem("Playcations");
    //   var parsedPlaycations = JSON.parse(stringPlaycations);
    
    //   console.log(parsedPlaycations[0].destination);
    // };

  });
    
});
  



