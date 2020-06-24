// Create our map, giving it the streetmap and earthquakes layers to display on load
var myMap = L.map("map", {
    center: [37.38, -122.08],
    zoom: 8
    //layers: [streetmap, earthquakes]
});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox/streets-v11",
      accessToken: "pk.eyJ1IjoiZGlnYmFzZWJhbGwiLCJhIjoiY2tic2NldHFsMDA4MDJxb2U2YnFhaXltaiJ9.1KdKHueX9Sc8DGAm-v9uhQ"
    }).addTo(myMap);


// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
    //createFeatures(data.features);
  //console.log(data.features);

  for (var i = 0; i < data.features.length; i++) {

    // Determinate lat lng for each event
    var location = [data.features[i].geometry.coordinates[1],data.features[i].geometry.coordinates[0]];
    console.log(location);

    // Determine magnitude, type, place, and time of each event
    var mag = data.features[i].properties.mag;
    var eventType = data.features[i].properties.type;
    var eventPlace = data.features[i].properties.place;
    var eventTime = data.features[i].properties.time;

    // Determine the color of the circle
    if (mag < 1) {
        color = "YellowGreen";
    }
    else if (mag < 2) {
        color = "Yellow";
    }
    else if (mag < 3) {
        color = "Gold";
    }
    else if (mag < 4) {
        color = "GoldenRod";
    }
    else if (mag < 5) {
        color = "DarkGoldenRod";
    }
    else {
        color = "Red";
    };
  
    // Add circles to map
    L.circle(location, {
      fillOpacity: 0.75,
      color: color,
      fillColor: color,
      // Adjust radius
      radius: mag * 1500
    }).bindPopup("<h2>" + mag + " magnitude "+ eventType + "</h2><h3>" + eventPlace +
    "</h3><hr><p>" + new Date(eventTime) + "</p>").addTo(myMap);
  };

});



/*

function createFeatures(earthquakeData) {

    // Define a function we want to run once for each feature in the features array
    function onEachFeature(feature, layer) {
        
        // Create a variable for storing the magnitude
        var mag = feature.properties.mag;
        
        // Give each feature a popup describing the magnitude, type, place and time of the incident
        layer.bindPopup("<h2>" + mag + " magnitude "+ feature.properties.type + "</h2><h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");

        
        // Initialize a variable for storing the color of the marker
        var color = "";

        // Determine the color of the marker
        if (mag < 1) {
            color = "YellowGreen";
        }
        else if (mag < 2) {
            color = "Yellow";
        }
        else if (mag < 3) {
            color = "Gold";
        }
        else if (mag < 4) {
            color = "GoldenRod";
        }
        else if (mag < 5) {
            color = "DarkGoldenRod";
        }
        else {
            color = "Red";
        };

        // console.log(`The color is ${color} and the mag is ${mag} and the type is ${feature.properties.type}`);
        
    }
  
    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature
    });
    
    // Define streetmap layer
    var streetmap = 
    
    // Define a baseMaps object to hold our base layer
    var baseMaps = {
        "Street Map": streetmap
    };
    
    // Create overlay object to hold our overlay layer
    var overlayMaps = {
        Earthquakes: earthquakes
    };


};*/