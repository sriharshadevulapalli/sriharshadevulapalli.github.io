mapboxgl.accessToken = 'pk.eyJ1Ijoic2QzMDc2IiwiYSI6ImNremJyNW91bDJnZXAybm5rcWtwcGc2dnYifQ.YFcTZCJsTE_xWygvDg0aqw';
// const bounds = [
//   [50, 60], // Southwest coordinates
//   [150, -0] // Northeast coordinates
//   ];
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/sd3076/cl4jbdc8b004p14qs5v04mp01',
    zoom: 1,
    maxZoom: 4,
    minZoom: 1,
    center: [0,0],
    projection: 'equalEarth',
    // maxBounds: bounds,

});

map.on("load", function () {
  map.addLayer({
    id: "world_boundaries",
    type: "line",
    source: {
      type: "geojson",
      data: "data/worldjusticedatachange_2021_2015.geojson",
    },
    paint: {
      "line-color": "#ffffff",
      "line-width": 0.0,
    },
  },
// Here's where we tell Mapbox where to slot this new layer
);
  map.addLayer({
    id: "world_fill",
    type: "fill",
    source: {
      type: "geojson",
      data: "data/worldjusticedatachange_2021_2015.geojson",
    },
    paint: {
      "fill-color": [
        "match",
        ["get", "Category"],
        " Massive Decline ", "#FF0000",
        " Decline ", "#CE5757",
        " Slight Decline ","#E0A5A6",
        " Steady ","#F2F3F4",
        " Slight Increase ","#A8D0F0",
        " Increase ","#5DADEC",
        " No Data ","#808082",
        "#808080"
      ],
      "fill-outline-color": "#ffffff",
    },
  }, "waterway-label");

});

map.on("click", "world_fill", function (e) {
  var country = e.features[0].properties.Country;
  var score = e.features[0].properties["WJP Rule of Law Index: Overall Score"];
  country = country.toUpperCase();
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h4><b>" +
        country + 
        "</b></h4><p>WJP Rule of Law Index 2021 Score: <b>" +
        score +
        " </b></p>"
    )
    .addTo(map);
});

map.on("mouseenter", "world_fill", function () {
  map.getCanvas().style.cursor = "pointer";
});

map.on("mouseleave", "world_fill", function () {
  map.getCanvas().style.cursor = "";
});