mapboxgl.accessToken = 'pk.eyJ1Ijoic2QzMDc2IiwiYSI6ImNremJyNW91bDJnZXAybm5rcWtwcGc2dnYifQ.YFcTZCJsTE_xWygvDg0aqw';
const bounds = [
  [-128.803711,31.503629],
  [-110.126953,42.391009]

  ];
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/sd3076/cl4x5khk5000t14pcp74mrzyj',
    zoom: 4.5,
    maxZoom: 5,
    minZoom: 3,
    center: [-119,37],
    projection: 'albers',
    maxBounds: bounds,

});

map.on("load", function () {
  map.addLayer({
    id: "california",
    type: "line",
    source: {
      type: "geojson",
      data: "data/californiawildfires.geojson",
    },
    paint: {
      "line-color": "#ffffff",
      "line-width": 0.5,
    },
  },
// Here's where we tell Mapbox where to slot this new layer
);
  map.addLayer({
    id: "fires",
    type: "fill",
    source: {
      type: "geojson",
      data: "data/californiawildfires.geojson",
    },

    'paint': {
      'fill-color': [
      'interpolate',
      ['linear'],
      ['get', 'Mean BP percentile within state'],
      0,
      '#ffffcc',
      20,
      '#fed976',
      40,
      '#fd8d3c',
      60,
      '#e31a1c',
      80,
      '#800026',
      ]},

    // 'paint': {
    //   'fill-color': [
    //   'interpolate',
    //   ['linear'],
    //   ['get', 'Mean BP'],
    //   0,
    //   '#ffffcc',
    //   0.00055,
    //   '#fed976',
    //   0.00094,
    //   '#fd8d3c',
    //   0.0017,
    //   '#e31a1c',
    //   0.00343,
    //   '#800026',
    //   ]},
  }, "waterway-label");

});

map.on("click", "fires", function (e) {
  var country = e.features[0].properties.NAMELSAD_x;
  var score = e.features[0].properties["Mean BP percentile within state"];
  country = country.toUpperCase();
  score = score.toFixed(1);
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h4><b>" +
        country + 
        "</b></h4><p>Burn Percentile Score: <b>" +
        score +
        "% </b></p>"
    )
    .addTo(map);
});

map.on("mouseenter", "fires", function () {
  map.getCanvas().style.cursor = "pointer";
});

map.on("mouseleave", "fires", function () {
  map.getCanvas().style.cursor = "";
});