<!-- <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://d19vzq90twjlae.cloudfront.net/leaflet-0.7/leaflet.css" />
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
    <script src="https://d19vzq90twjlae.cloudfront.net/leaflet-0.7.3/leaflet.js"></script>
    <script src='https://api.tiles.mapbox.com/mapbox.js/v1.6.4/mapbox.js'></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.js"></script>

    <style type="text/css">
    #map {
        width: 100%;
        height: 600px;
    }
    button {
        width: 100px;
    }
    </style>
</head>

<body>
    <!-- This is new -->
    <!-- <div class="btn-group">
        <button type="button" id="all" class="btn btn-primary">Tout afficher</button>
        <button type="button" id="culturel" class="btn btn-secondary">Culturels</button>
        <button type="button" id="bar" class="btn btn-secondary">Bar</button>
        <button type="button" id="festival" class="btn btn-secondary">Festivals</button>
        <button type="button" id="familial" class="btn btn-secondary">Familial</button>
        <button type="button" id="others" class="btn btn-secondary">Autres</button>
    </div>

    <div id="map"></div>

    <script type="text/javascript">

    var mapboxTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
    });
    //possible colors 'red', 'darkred', 'orange', 'green', 'darkgreen', 'blue', 'purple', 'darkpuple', 'cadetblue'
    var Icon = L.icon({
      iconUrl: '../img/markers/markerSmall.png',
      iconSize: [45, 45],
    });
    var barIcon = L.AwesomeMarkers.icon({
    prefix: 'fa', //font awesome rather than bootstrap
    markerColor: 'green', // see colors above
    icon: 'glass' //http://fortawesome.github.io/Font-Awesome/icons/
    });
    var culturelIcon = L.AwesomeMarkers.icon({
    prefix: 'fa', //font awesome rather than bootstrap
    markerColor: 'red', // see colors above
    icon: 'comments' //http://fortawesome.github.io/Font-Awesome/icons/
    });

    var cafeIcon = L.AwesomeMarkers.icon({
    prefix: 'fa', //font awesome rather than bootstrap
    markerColor: 'red', // see colors above
    icon: 'coffee' //http://fortawesome.github.io/Font-Awesome/icons/
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
                    icon: culturelIcon
                }).on('mouseover', function() {
                    this.bindPopup(feature.properties.name).openPopup();
                });
            }
        });
        var others = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.category != "Culturel" || "Bar" || "Festival" || "" || "";
            },
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                  icon: Icon
                }).on('mouseover', function() {
                    this.bindPopup(feature.properties.name).openPopup();
                });
            }
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

</html>  -->

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Leaflet Routing Machine Example</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css" />
    <script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"></script>
    <script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"></script>

    <style>
        .map {
            position: absolute;
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body>
    <div id="map" class="map"></div>
    <script type="text/javascript">
    var map = L.map('map');

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

L.Routing.control({
  waypoints: [
      L.latLng(57.74, 11.94),
      L.latLng(57.6792, 11.949)
  ],
  routeWhileDragging: true
}).addTo(map);
    </script>

</body>

</html>
