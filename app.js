// additional layers

// load GeoJSON from an external file
$.getJSON("River_Basin/Ghost_watershed.geojson",function(data){
  // add GeoJSON layer to the map once the file is loaded
  L.geoJson(data).addTo(map);
});

var layers = {
  'test' : L.tileLayer.wms('http://limes.grid.unep.ch/geoserver/wms?', {
      layers: 'limes:Balkash_173_20140830_LC8_NDVI',
      tiled: true,
      format: 'image/png',
      transparent: true,
      maxZoom: 14,
      minZoom: 0,
      continuousWorld: true
      })

};

var markers = {
    ghost: {lat: 51.2861283, lon: -114.983007, zoom: 12},
    socio_economic: {lat: 51.1, lon: -115.095, zoom: 12},
    surface_water_quantity: {lat: 51.35, lon: -114.97, zoom: 12},
    surface_water_quality: {lat: 59.92173, lon: 10.75719, zoom: 7},
    groundwater: {lat: 63.4319, lon: 10.3988, zoom: 7},
    riperian: {lat: 60.3992, lon: 5.3227, zoom: 7},
    biodiversity: {lat: 69.632, lon: 18.9197, zoom: 7},
    air_quality: {lat: 58.17993, lon: 8.12952, zoom: 7},
    landuse: {lat: 58.9694, lon: 5.73, zoom: 7},
    existing_plans: {lat: 67.28319, lon: 14.38565, zoom: 7}
};

$('.main').storymap({markers: markers});
    