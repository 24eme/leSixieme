// function onEachFeature(feature, layer) {
//     if (feature.properties && feature.properties.popupContent) {
//         layer.bindPopup(feature.properties.popupContent);
//         layer.setIcon(markerInfo).addTo(map);
//
//     };
// };
//
var nearest = 600000;

var mapboxTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">24ème</a>'
});

var map = L.map('map', {
    center: [48.853, 2.333],
    zoom: 9,
    layers: mapboxTiles
});

var scops = [
  {
    "type": "Feature",
    "properties": {
      "name": "A Light in the Attic",
      "long": "\u00a351.77",
      "lat": "../media/cache/2c/da/2cdad67c44b002e7ead0cc35693c0e8b.jpg",
      "url": "a-light-in-the-attic_1000/index.html"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        "\u00a351.77",
        "../media/cache/2c/da/2cdad67c44b002e7ead0cc35693c0e8b.jpg"
      ]
    }
  }];


var barIcon = L.AwesomeMarkers.icon({
prefix: 'fa',
markerColor: 'green',
icon: 'glass'
});
var culturelIcon = L.AwesomeMarkers.icon({
prefix: 'fa',
markerColor: 'red',
icon: 'comments'
});

var cafeIcon = L.AwesomeMarkers.icon({
prefix: 'fa',
markerColor: 'red',
icon: 'coffee'
});

var scops = $.getJSON('js/scops.json');
scops.then(function(data) {
    var scops = L.geoJson(data);
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
            return feature.properties.category != "Culturel" || "Bar" || "Festival";
        },
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
            }).on('mouseover', function() {
                this.bindPopup(feature.properties.name + "<hr>").openPopup();
            });
        }
    });
    map.fitBounds(scops.getBounds(), {
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

map.locate({setView: true, maxZoom: 40});

function onLocationFound(e) {
    var radius = e.accuracy; //  L.circle(e.latlng, radius).addTo(map);
    L.marker(e.latlng).addTo(map).bindPopup("Vous êtes à " + radius + " mètres de ce lieu").openPopup();
    drawData(e.latlng);
}
map.on('locationfound', onLocationFound);

function onLocationError(e) {drawData({lat:48.85762877,lng:2.348290390007035});}
map.on('locationerror', onLocationError);

function drawData(userLocation) {
   var item, o;
   var items = scops.responseJSON.features;
    for (item in items) {
        var loc = new L.LatLng(items[item].geometry.coordinates[1],items[item].geometry.coordinates[0]);
        createPolyLine(loc, userLocation);
    }
    if (nearestP != null){
       L.Routing.control({
         createMarker: function() { return null; },
        waypoints: [
          L.latLng(nearestP.lat, nearestP.lng),
          L.latLng(userLocation.lat, userLocation.lng)
        ]
      }).addTo(map);

      var s = '<p>Ce lieu est à ' + (nearestP.distanceTo(userLocation)).toFixed(0) + ' m de vous.</p>';
      var marker = L.marker(nearestP).addTo(map);

      if (marker) {
          marker.bindPopup(s);
      }

    }
}

function createPolyLine(loc1, loc2) {
    if (Math.abs(loc1.lng - loc2.lng) > 180) {
        loc1 = loc1.wrap(179, -179);
    }
    var latlongs = [loc1, loc2];

    if(loc1.distanceTo(loc2) < nearest){
      nearest = loc1.distanceTo(loc2);
      nearestP = loc1;
    }



 }
