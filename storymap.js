var map 
    (function ($) {
    'use strict';

    $.fn.storymap = function(options) {

        var defaults = {
            selector: '[data-place]',
            breakpointPos: '50%',
            createMap: function () {
                // create a map in the "map" div, set the view to a given place and zoom
                map = L.map('map').setView([51.2861283,-115.095], 10)

                // add an OpenStreetMap tile layer
                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);


                return map;
            }
        };

        var settings = $.extend(defaults, options);


        if (typeof(L) === 'undefined') {
            throw new Error('Storymap requires Leaflet');
        }
        if (typeof(_) === 'undefined') {
            throw new Error('Storymap requires underscore.js');
        }

        function getDistanceToTop(elem, top) {
            // Get the window distance in order to knwo when to load layers
            var docViewTop = $(window).scrollTop();
            var elemTop = $(elem).offset().top;
            var dist = elemTop - docViewTop;
            var d1 = top - dist;
            if (d1 < 0) {
                return $(window).height();
            }
            return d1;
        }

        function highlightTopPara(paragraphs, top) {
            // Highlight the paragraph based on the distance to the top of the page
            var distances = _.map(paragraphs, function (element) {
                var dist = getDistanceToTop(element, top);
                return {el: $(element), distance: dist};
            });

            var closest = _.min(distances, function (dist) {
                return dist.distance;
            });

            _.each(paragraphs, function (element) {
                var paragraph = $(element);
                if (paragraph[0] !== closest.el[0]) {
                    paragraph.trigger('notviewing');
                }
            });

            if (!closest.el.hasClass('viewing')) {
                closest.el.trigger('viewing');
            }
        }

        function watchHighlight(element, searchfor, top) {
            //Watch for hilighting (Scrolling) to change
            var paragraphs = element.find(searchfor);
            highlightTopPara(paragraphs, top);
            $(window).scroll(function () {
                highlightTopPara(paragraphs, top);
            });
        }

        var makeStoryMap = function (element, map_data) {
            // Build the actual story map
            var topElem = $('<div class="breakpoint-current"></div>')
                .css('top', settings.breakpointPos);
            $('body').append(topElem);

            var top = topElem.offset().top - $(window).scrollTop();

            var searchfor = settings.selector;

            var paragraphs = element.find(searchfor);

            paragraphs.on('viewing', function () {
                $(this).addClass('viewing');
            });

            paragraphs.on('notviewing', function () {
                $(this).removeClass('viewing');
            });

            watchHighlight(element, searchfor, top);

            var map = settings.createMap();

            var initPoint = map.getCenter();
            var initZoom = map.getZoom();

            var fg = L.featureGroup().addTo(map);

            function showMapView(key) {

                // clears all visible layers on the map
                if (key === 'overview') {
                    fg.clearLayers();
                    settings.createMap;
                    watershed.addTo(map);
                    map.setView(initPoint, initZoom, true);
                } else if (map_data[key]) {
                    // clears all visible layers on the map
                    fg.clearLayers();

                    // iterate through the map_data list
                    var data = map_data[key];
                    var initial = map_data[key]['initial'];                    
                    var layers = map_data[key]['layers'];
                    if(typeof layers !== 'undefined'){
                        for (var i=0; i < layers.length; i++){
                            fg.addLayer(layers[i]);
                        }
                    };
                    if(typeof initial !== 'undefined'){
                        map.setView([initial.lat, initial.lon], initial.zoom, 1);
                    }
                    else{
                        map.fitBounds(map_data[key]['layers'][0].getBounds())
                    }
                }

            }

            paragraphs.on('viewing', function () {
                showMapView($(this).data('place'));
            });
        };

        makeStoryMap(this, settings.map_data);

        return this;
    }

}(jQuery));
