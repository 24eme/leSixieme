<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://d19vzq90twjlae.cloudfront.net/leaflet-0.7/leaflet.css" />
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
    <!--this is new-->

    <script src="https://d19vzq90twjlae.cloudfront.net/leaflet-0.7.3/leaflet.js"></script>
    <script src='https://api.tiles.mapbox.com/mapbox.js/v1.6.4/mapbox.js'></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

    <style type="text/css">
    #map {
        width: 100%;
        height: 600px;
    }
    /* This is new */

    button {
        width: 100px;
    }
    </style>
</head>

<body>
    <!-- This is new -->
    <div class="btn-group">
        <button type="button" id="all" class="btn btn-success">Tout afficher</button>
        <button type="button" id="culturel" class="btn btn-danger">Culturels</button>
        <button type="button" id="bar" class="btn btn-danger">Bar</button>
        <button type="button" id="festival" class="btn btn-danger">Festivals</button>
        <button type="button" id="familial" class="btn btn-danger">Familial</button>
        <button type="button" id="others" class="btn btn-primary">Autres</button>
    </div>

    <div id="map"></div>

    <script type="text/javascript">

    var mapboxTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
    });
    //possible colors 'red', 'darkred', 'orange', 'green', 'darkgreen', 'blue', 'purple', 'darkpuple', 'cadetblue'
    var cafeIcon = L.icon({
      iconUrl: '../img/markers/markerSmall.png',
      iconSize: [45, 45],
    });
    var map = L.map('map')
        .addLayer(mapboxTiles)
        .setView([48.853, 2.333], 12);

    var scops = $.getJSON("{{ asset('js/scops.json') }}");
    scops.then(function(data) {
        var allbusinesses = L.geoJson(data);
                var cafes = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.category == "Culturel";
            },
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: cafeIcon
                }).on('mouseover', function() {
                    this.bindPopup(feature.properties.name).openPopup();
                });
            }
        });
        var others = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.category != "Culturel" || "Bar";
            },
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                  icon: cafeIcon
                }).on('mouseover', function() {
                    this.bindPopup(feature.properties.name).openPopup();
                });
            }
        });
        map.fitBounds(allbusinesses.getBounds(), {
            padding: [50, 50]
        });
        cafes.addTo(map)
        others.addTo(map)
        // The JavaScript below is new
        $("#others").click(function() {
            map.addLayer(others)
            map.removeLayer(cafes)
        });
        $("#culturel").click(function() {
            map.addLayer(cafes)
            map.removeLayer(others)
        });
        $("#all").click(function() {
            map.addLayer(cafes)
            map.addLayer(others)
        });
    });
    </script>
</body>

</html>
