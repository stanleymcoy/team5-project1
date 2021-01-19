console.log("script loaded");

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
    var musicCountry = event.target.attributes[2].value;
    console.log(place);

    // weather API call

    // weather from query appends to page

    // top tracks API call
    // API Key

    var musicApiKey = "0157c95a3c971813dee6253f52b0f981";

    // Define location variable

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

    // recipe API call

    // recipe from query appends to page

    // images API call
    $.ajax({
      url:
        "https://pixabay.com/api/?key=19889884-fb56b98757db0c3c85fe41506&q=" +
        place +
        "&image_type=photo&category=places",
      method: "GET",
    }).then(function (response) {
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
