// additional layers


var watershed = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "blue",
      fill: true,
      opacity: 1,
      clickable: false
    };
  }
});
$.getJSON("River_Basin/Ghost_watershed.geojson", function (data) {
  watershed.addData(data);
});

var ghost_points = L.geoJson(null, {
    pointToLayer: function(feature, coords) {
        return new L.Marker(coords);
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.DESC);
    }
});
$.getJSON("River_Basin/Ghost_points.geojson", function (data) {
  ghost_points.addData(data);
});

var socio_economic = L.geoJson(null, {
    pointToLayer: function(feature, coords) {
        return new L.Marker(coords);
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.DESC);
    }
});
$.getJSON("River_Basin/socio_economic.geojson", function (data) {
  socio_economic.addData(data);
});

var surface_water_quality = L.geoJson(null, {
    pointToLayer: function(feature, coords) {
        return new L.Marker(coords);
    }
});
$.getJSON("River_Basin/surface_water_quality.geojson", function (data) {
  surface_water_quality.addData(data);
});

var surface_water_quantity = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "red",
      fill: true,
      opacity: 1,
      clickable: true
    };
  },
  onEachFeature: function (feature, layer) {
      layer.bindPopup(feature.properties.DESC);
  }  
});
$.getJSON("River_Basin/surface_water_quantity.geojson", function (data) {
  surface_water_quantity.addData(data);
});

var biodiversity = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "green",
      fill: false,
      opacity: 1,
      clickable: true
    };
  },
  onEachFeature: function (feature, layer) {
      layer.bindPopup(feature.properties.DESC);
  }  
});
$.getJSON("River_Basin/biodiversity.geojson", function (data) {
  biodiversity.addData(data);
});

var natural_earth = L.tileLayer('http://demo.opengeo.org/geoserver/gwc/service/tms/1.0.0/ne:ne@EPSG:900913@png/{z}/{x}/{y}.png', {
    tms: true
});

var map_data = {
    ghost: {initial:{lat: 51.2861283, lon: -115.095, zoom: 10}, layers:[watershed, ghost_points]},
    socio_economic: {initial:{lat: 51.2861283, lon: -115.095, zoom: 12}, layers:[socio_economic]},
    surface_water_quantity: {layers:[surface_water_quantity]},
    surface_water_quality: {layers:[surface_water_quality]},
    groundwater: {initial:{lat: 51.2861283, lon: -115.095, zoom: 10}, layers:[watershed]},
    riperian: {initial:{lat: 51.2861283, lon: -115.095, zoom: 10}, layers:[natural_earth]},
    biodiversity: {layers:[biodiversity]},
    air_quality: {initial:{lat: 51.2861283, lon: -115.095, zoom: 10}, layers:[watershed]},
    landuse: {initial:{lat: 51.2861283, lon: -115.095, zoom: 10}, layers:[watershed]},
    existing_plans: {initial:{lat: 51.2861283, lon: -115.095, zoom: 10}, layers:[watershed]}
};

// Initialize the map
$('.main').storymap({
  map_data: map_data,
  createMap: function () { //function that creates a map
    // create a map in the "map" div, set the view to a given place and zoom
    var map = L.map('map').setView([51.2861283,-115.095], 10)            
    // add an OpenStreetMap tile layer            
    L.tileLayer(
        'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
    ).addTo(map);
    watershed.addTo(map);
    return map;
  }
 });
    