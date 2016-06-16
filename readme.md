Storymap
========

Storymap is a jQuery-plugin to create a map that follows your text. Annotate each paragraph and place a map alongside it. Then you can zoom/pan/add marker etc to the map as the reader reads through the text.

Demo
----
See http://jbants.github.io/storymap/ 

Known issues
------------
Will not work well on mobile (map gets removed on small screens)

Requirements
------------
Storymap expects some (rather common) js libs to be available:

- jQuery (as it is a jQuery plugin)
- underscore.js (as it makes js easier to work with)
- Leaflet (because we need a map)

In addition the markup is based on Bootstrap 3.

Configuration
-------------
Should be rather simple. Setup a html page like the one in index.html, include dependencies and do a 

    el.storymap({map_data: dict_with_data});

on the element you wish to add a storymap to. By default, the plugin looks for elements that has a "data-place" attribute, sets the breakpoint 33% from the top of the page. This can be overridden by setting some options, like this:

    el.storymap({
        map_data: dict_with_data,
        selector: '[data-place]', //jquery for selectors to trigger an event
        breakpointPos: '33.333%', //position of the breakpoint
        createMap: function () { //function that creates a map
            // create a map in the "map" div, set the view to a given place and zoom
            var map = L.map('map').setView([65, 18], 5);            
            // add an OpenStreetMap tile layer            
            L.tileLayer(
                'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
            ).addTo(map);
            return map;
        }
    });

Creating a map_data dict accepts two optional parameters. initial and layers.
- lnitial sets the map extent and is a dict. If initial is omitted, the map bounds default to the first object in layer.
- layers adds any type of leaflet layer to the map and is a list. 

example:
```javascript
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

var map_data = {
    paragraph_1: {layers:[layers]},
    paragraph_2: {initial:{lat: 51.2861283, lon: -115.095, zoom: 12}},
    paragraph_3: {initial:{lat: 51.2861283, lon: -115.095, zoom: 10}, layers:[layers]},
};
```

License
-------
Storymap is licensed under the MIT license. 
