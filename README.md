# Module 15: Leaflet Challenge

<img src = "images/EarthquakesMonth.png">

## About
In this project I created a visualization that mapped earthquake data from the United States Geological Survey(USGS).

## Tools
- Leaflet
- GeoJSON
- HTML/CSS
- D3
- Javascript

## GeoJSON
Used D3 to read in GeoJSON data from [USGS]("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson").

--------------------------------------------------- 
## **Leaflet**
1. Created a Leaflet map object:
``````
var myMap = L.map("map", {
  center: [10, 0],
  zoom: 3,
}); 
``````
2. Created a basemap layer:
``````
var streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
``````
3. Created markers on my map based on the earthquake data in the GeoJSON.
``````
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
``````
--------------------------------------------------- 
4. Created a legend with modifications to the CSS
``````
 /* Style for the legend */
.info.legend {
  padding: 2px 2px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 12px;
  text-align: left;
}

/* Style for legend color boxes */
.info.legend i {
  width: 18px;
  height: 18px;
  float: left;
  margin-right: 8px;
}
``````


--------------------------------------------------- 




