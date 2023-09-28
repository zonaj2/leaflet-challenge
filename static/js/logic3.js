
// Store our API endpoint as url
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

// Create a Leaflet map object
var myMap = L.map("map", {
  center: [10, 0],
  zoom: 3,
}); 

// Add a basemap layer
var streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

//define fill color
function chooseColor(depth) {
  if (depth <= 10) return "red";
  else if (depth > 10 && depth <= 25) return "orange";
  else if (depth > 25 && depth <= 40) return "yellow";
  else if (depth > 40 && depth <= 55) return "pink";
  else return "green";
}

// Load GeoJSON data and create markers with varying sizes based on depth
d3.json(url).then(function (data) {
  L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      const location = feature.properties.place; // Get the earthquake location
      const magnitude = feature.properties.mag; // Get the earthquake magnitude
      const depth = feature.geometry.coordinates[2]; // Get the earthquake depth
      const marker = L.circleMarker(latlng, styleInfo(feature));
     
      // Bind a popup with earthquake information
      marker.bindPopup(`<h3>${location}</h3><hr><p>Magnitude: ${magnitude}</p><p>Depth: ${depth} km</p>`);

      return marker;
    }
  }).addTo(myMap);
});

function styleInfo(feature) {
  const depth = feature.geometry.coordinates[2];

  // Add scaling to control the marker size
  const radius = Math.sqrt(depth) * 2;

  return {
    color: chooseColor(depth),
    radius: radius,
    fillColor: chooseColor(depth),
    fillOpacity: 0.75,
  };
}

// Create a legend control and specify its position (bottom-right corner)
var legend = L.control({
  position: 'topleft'
});

// Function to generate the legend HTML content
legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend');
  var depths = [0, 10, 25, 40, 55]; // Define depth intervals
  var labels = [];

  // Loop through the depth intervals and generate labels
  for (var i = 0; i < depths.length; i++) {
    var from = depths[i];
    var to = depths[i + 1];

    labels.push(
      '<i style="background:' + chooseColor(from + 1) + '"></i> ' +
      from + (to ? '&ndash;' + to + ' km' : '+ km')
    );
  }

  div.innerHTML = '<p>Earthquake Depth</p>'+ labels.join('<br>');
  return div;
};

// Add the legend to the map
legend.addTo(myMap);

