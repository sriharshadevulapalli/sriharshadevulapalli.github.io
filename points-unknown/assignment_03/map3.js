mapboxgl.accessToken = 'pk.eyJ1Ijoic2QzMDc2IiwiYSI6ImNremJyNW91bDJnZXAybm5rcWtwcGc2dnYifQ.YFcTZCJsTE_xWygvDg0aqw';
var map3 = new mapboxgl.Map({
    container: 'map3',
    style: 'mapbox://styles/sd3076/cl4cxvm4e002l14phx4wscqvr',
    zoom: 10.5,
    maxZoom: 14,
    minZoom: 10.5,
    center: [-73.948, 40.7447],
});

map3.on("load", function () {
  map3.addLayer(
    {
      id: "citibikes3",
      type: "circle",
      source: {
        type: "geojson",
        data: "data/citibikeStations2021startGeo.geojson",
      },
      paint: {
        'circle-radius': {
          'property': 'tripCount',
          'stops': [
          [10, 1],
          [15000, 10]
          ]
          },
        'circle-color': '#003B70',
        'circle-opacity': 0.5,
        'circle-stroke-color': '#ffffff',
        'circle-stroke-width': 0.5,
            },

            
    },
    "waterway-label" // Here's where we tell Mapbox where to slot this new layer
  ); 
  

 

map3.on("click", "citibikes3", function (e) {
  var bikeStationName = e.features[0].properties['start_station_name'];
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
    .addTo(map3);
});

// Change the cursor to a pointer when the mouse is over the us_states_elections layer.
map3.on("mouseenter", "citibikes3", function () {
  map3.getCanvas().style.cursor = "pointer";
});
// Change it back to a pointer when it leaves.
map3.on("mouseleave", "citibikes3", function () {
  map3.getCanvas().style.cursor = "";
});


});