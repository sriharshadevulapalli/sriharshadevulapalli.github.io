mapboxgl.accessToken = 'pk.eyJ1Ijoic2QzMDc2IiwiYSI6ImNremJyNW91bDJnZXAybm5rcWtwcGc2dnYifQ.YFcTZCJsTE_xWygvDg0aqw';
var map4 = new mapboxgl.Map({
    container: 'map4',
    style: 'mapbox://styles/sd3076/cl4cxvm4e002l14phx4wscqvr',
    zoom: 10.5,
    maxZoom: 14,
    minZoom: 10.5,
    center: [-73.9400, 40.7447],
});

map4.on("load", function () {
  map4.addLayer(
    {
      id: "citibikes4",
      type: "circle",
      source: {
        type: "geojson",
        data: "data/citibikeStations2021endGeo.geojson",
      },
      paint: {
        'circle-radius': {
          'property': 'tripCount',
          'stops': [
          [10, 1],
          [15000, 10]
          ]
          },
        'circle-color': '#D9261C',
        'circle-opacity': 0.5,
        'circle-stroke-color': '#ffffff',
        'circle-stroke-width': 0.5,
            },

            
    },
    "waterway-label" // Here's where we tell Mapbox where to slot this new layer
  ); 
  

 

map4.on("click", "citibikes4", function (e) {
  var bikeStationName = e.features[0].properties['end_station_name'];
  var bikeStationTripCount = e.features[0].properties['tripCount'];
  bikeStationName = bikeStationName.toLocaleString();
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h3>" +
      bikeStationName +
        " </h3> <p> Number of Trips: " +
        bikeStationTripCount +
        "</p>"
    )
    .addTo(map4);
});

// Change the cursor to a pointer when the mouse is over the us_states_elections layer.
map4.on("mouseenter", "citibikes4", function () {
  map4.getCanvas().style.cursor = "pointer";
});
// Change it back to a pointer when it leaves.
map4.on("mouseleave", "citibikes4", function () {
  map4.getCanvas().style.cursor = "";
});


});