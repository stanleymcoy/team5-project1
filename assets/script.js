console.log("script loaded");

$.ajax({
    url: "https://pixabay.com/api/?key=19889884-fb56b98757db0c3c85fe41506&q=barcelona&image_type=photo&category=places",
    method: "GET"
  }).then(function(response) {
    console.log(response);
    
    
    console.log(response.hits[0].webformatURL);

    for(i = 0; i < response.hits.length; i++){
        $("#images").append("<img src="+ response.hits[i].webformatURL+"></img>");
    }
    
  });

  