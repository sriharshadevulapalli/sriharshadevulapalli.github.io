mapboxgl.accessToken = 'pk.eyJ1Ijoic2QzMDc2IiwiYSI6ImNremJyNW91bDJnZXAybm5rcWtwcGc2dnYifQ.YFcTZCJsTE_xWygvDg0aqw';
var map2 = new mapboxgl.Map({
    container: 'map2',
    style: 'mapbox://styles/sd3076/cl3xaqapy000y16jy6zgxk2e2',
    zoom: 2,
    maxZoom: 9,
    minZoom: 1,
    center: [0, 0],
});

map2.on("load", function () {
  map2.addLayer({
    id: "world_boundaries",
    type: "line",
    source: {
      type: "geojson",
      data: "data/countrieswithDisasters.geojson",
    },
    paint: {
      "line-color": "#ffffff",
      "line-width": 0.7,
    },
  } // Here's where we tell Mapbox where to slot this new layer
); 
  map2.addLayer({
    id: "world_disasters",
    type: "fill",
    source: {
      type: "geojson",
      data: "data/countrieswithDisasters.geojson",
    },
    paint: {
      "fill-color": [
        "match",
        ["get", "mostcommon"],
        "drought", "#B8A88F",
        "earthquake", "#964B00",
        "extreme temperature ", "#FF0000",
        "flood", "#0000FF",
        "landslide", "#808080",
        "mass movement (dry)", "#000000",
        "storm", "#008080",
        "volcanic activity", "#d07e59",
        "#91b66e"
      ],
      "fill-outline-color": "#ffffff",
    },
  });

});

map2.on("click", "world_disasters", function (e) {
  console.log("CLICK")
  var country = e.features[0].properties.country;
  var disaster = e.features[0].properties.mostcommon;
  country = country.toUpperCase();
  disaster = disaster.toUpperCase();
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h3> MOST COMMON DISASTER IN " +
        country + 
        ": <b> " +
        disaster +
        " </b></h3>"
    )
    .addTo(map2);
});

map2.on("mouseenter", "world_disasters", function () {
  map.getCanvas().style.cursor = "pointer";
});

map2.on("mouseleave", "world_disasters", function () {
  map.getCanvas().style.cursor = "";
});