// Create object for location data

var locationData = {
  barcelona: "spain",
};

// Dropdown menu reflects selected location
$(".dropdown-menu").on("click", "li", function (event) {
  $("#dropdownMenuButton").text(event.target.innerText);
  console.log("You clicked", event);

  // Go! button creates API query
  $("#goButton").on("click", function () {
    // setting place variable to equal value of target
    var place = event.target.attributes[1].value;

    // define musicCountry variable
    var musicCountry = event.target.attributes[2].value;

    console.log(place);

    // -------------------------------------------------------------------------//
    // weather API call
    var weatherKey = "76b919f90d91bc2b20cd335b8fcbe3a8";

    var weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&units=imperial&appid=" + weatherKey;

    $.ajax({
      url: weatherQueryURL,
      method: "GET"
    }).then(function (response) {
      // clear any prior weather info
      $("#weather").empty();
      // weather from query appends to page
      console.log(response);
      $("#weather").append(
        "<p>In " + response.name + ", it is currently " + Math.round(response.main.temp) + " degrees with " + response.weather[0].description) + "and " + response.main.humidity + "percent humidity.</p>"
  });
    


    //-------------------------------------------------------------------------//
    
    // top tracks API call
    
    // API Key
    var musicApiKey = "0157c95a3c971813dee6253f52b0f981";

    // $("#goButton").on("click", function () {
    console.log("music click working");

    var metro = event.target.attributes[1].value;
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

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      // top tracks from query append to page

      console.log(response);

      for (i = 0; i < 10; i++) {
        console.log(response.tracks.track[i]);
      }
    });

    // top tracks from query append to page

    //----------------------------------------------------------------------------//

    // recipe API call

    // recipe from query appends to page

    //---------------------------------------------------------------------------//

    // images API call
    $.ajax({
      url:
        "https://pixabay.com/api/?key=19889884-fb56b98757db0c3c85fe41506&q=" +
        place +
        "&image_type=photo&category=places&safesearch=true",
      method: "GET",
    }).then(function (response) {
      console.log(response);
      // images from recent trips are cleared
      $("#images").empty();

      // images from query append to page
      for (i = 0; i < response.hits.length; i++) {
        $("#images").append(
          "<img src=" + response.hits[i].webformatURL + "></img>"
        );
      }
    });
  });
});
