mapboxgl.accessToken = 'pk.eyJ1Ijoic2QzMDc2IiwiYSI6ImNremJyNW91bDJnZXAybm5rcWtwcGc2dnYifQ.YFcTZCJsTE_xWygvDg0aqw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/sd3076/cl3xaqapy000y16jy6zgxk2e2',
    zoom: 3,
    maxZoom: 9,
    minZoom: 3,
    center: [-99, 38],
});

map.on("load", function () {
  map.addLayer({
    id: "us_counties_typology",
    type: "line",
    source: {
      type: "geojson",
      data: "data/countiesTypologyData.geojson",
    },
    paint: {
      "line-color": "#ffffff",
      "line-width": 0.0,
    },
  },
  "waterway-label" // Here's where we tell Mapbox where to slot this new layer
); 
  map.addLayer({
    id: "us_counties_data",
    type: "fill",
    source: {
      type: "geojson",
      data: "data/countiesTypologyData.geojson",
    },
    paint: {
      "fill-color": [
        "match",
        ["get", "Persistent_Poverty_2013"],
        1, "#cf635d",
        0, "transparent",
        "#91b66e"
      ],
      "fill-outline-color": "#ffffff",
    },
  });

  map.addLayer({
    id: "us_states",
    type: "line",
    source: {
      type: "geojson",
      data: "data/StateBoundaries.geojson.json",
    },
    paint: {
      "line-color": "#000000",
      "line-width": 0.2,
    },
  });
});

map.on("click", "us_counties_data", function (e) {
  var stateName = e.features[0].properties.STATE_NAME;
  var countyName = e.features[0].properties.NAMELSAD;
  stateName = stateName.toUpperCase();
  countyName = countyName.toUpperCase();
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h3><b>" +
        countyName + 
        "</b>, " +
        stateName +
        "</h3>"
    )
    .addTo(map);
});

map.on("mouseenter", "us_counties_data", function () {
  map.getCanvas().style.cursor = "pointer";
});

map.on("mouseleave", "us_counties_data", function () {
  map.getCanvas().style.cursor = "";
});