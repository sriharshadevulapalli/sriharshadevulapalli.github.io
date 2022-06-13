mapboxgl.accessToken = 'pk.eyJ1Ijoic2QzMDc2IiwiYSI6ImNremJyNW91bDJnZXAybm5rcWtwcGc2dnYifQ.YFcTZCJsTE_xWygvDg0aqw';
var map2 = new mapboxgl.Map({
    container: 'map2',
    style: 'mapbox://styles/sd3076/cl4cxvm4e002l14phx4wscqvr',
    zoom: 10.5,
    maxZoom: 14,
    minZoom: 10.5,
    center: [-73.9400, 40.7447],
});

map2.on("load", function () {
  map2.addLayer(
    {
      id: "citibikes2",
      type: "circle",
      source: {
        type: "geojson",
        data: "data/citibikeStations2020endGeo.geojson",
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
  

 

map2.on("click", "citibikes2", function (e) {
  var bikeStationName = e.features[0].properties['end station name'];
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
    .addTo(map2);
});

// Change the cursor to a pointer when the mouse is over the us_states_elections layer.
map2.on("mouseenter", "citibikes2", function () {
  map2.getCanvas().style.cursor = "pointer";
});
// Change it back to a pointer when it leaves.
map2.on("mouseleave", "citibikes2", function () {
  map2.getCanvas().style.cursor = "";
});


});