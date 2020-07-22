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
  console.log(e.latlng);
    var radius = e.accuracy;
    L.marker(e.latlng).addTo(map).bindPopup("Vous êtes à " + radius + " mètres de ce lieu").openPopup();
    drawData(e.latlng);

//    nearestPoint(e.latlng);
  //  L.circle(e.latlng, radius).addTo(map);
}
map.on('locationfound', onLocationFound);
function onLocationError(e) {
    drawData({lat:48.85762877,lng:2.348290390007035});
}
map.on('locationerror', onLocationError);

//
//   //draw all the data on the map
// function nearestPoint(userLocation) {
//     var item, o; //draw markers for all items
//     items = scops.responseJSON.features;
//     for (var i = 0; i < items.length; i++) {
//       o = items[i]
//       o.lat = o.geometry.coordinates[0];
//       o.lon = o.geometry.coordinates[1];
//       var loc = new L.LatLng(o.lat, o.lon);
//       createPolyLine(loc, userLocation);
//     }
// }
//
// function createPolyLine(loc1, loc2) {
//     if (Math.abs(loc1.lng - loc2.lng) > 180) {
//           loc1 = loc1.wrap(179, -179);
//     }
//     var latlongs = [loc1, loc2];
//     var polyline = new L.Polyline(latlongs, {
//           color: 'green',
//           opacity: 1,
//           weight: 0.5,
//           clickable: false
//     }).addTo(map);
//     var s = 'About ' + (loc1.distanceTo(loc2) / 1000).toFixed(0) + 'km away from you.</p>';
//     var marker = L.marker(loc1, {icon: Icon}).addTo(map);
//     if (marker) {marker.bindPopup(s);}
//
// }

// var polylinePoints = [
//   [48.8745253,2.3415619],
//   [2.3381113, 48.8740412],
// ];
//
// var polyline = L.polyline(polylinePoints).addTo(map);
// var userLocation = [48.8745253,2.3415619];
//
// var marker = new L.Marker(userLocation, {icon: Icon}).addTo(map);
// map.addLayer(marker);
//
//random locations around the world
//draw all the data on the map
function drawData(userLocation) {
    var item, o;
    //draw markers for all items

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
    }
}


function createPolyLine(loc1, loc2) {


    if (Math.abs(loc1.lng - loc2.lng) > 180) {
        loc1 = loc1.wrap(179, -179);
    }
    var latlongs = [loc1, loc2];

    // var polyline = new L.Polyline(latlongs, {
    //     color: 'blue',
    //     opacity: 1,
    //     weight: 0.5,
    //     clickable: false
    // }).addTo(map);

    if(loc1.distanceTo(loc2) < nearest){
      nearest = loc1.distanceTo(loc2);
      nearestP = loc1;
    }

    else{
    }

    var s = '<p>Ce lieu est à ' + (loc1.distanceTo(loc2)).toFixed(0) + ' m de vous.</p>';


    var marker = L.marker(loc1).addTo(map);
    if (marker) {
        marker.bindPopup(s);
    }

    // if (nearestP != null){
    //    L.Routing.control({
    //     waypoints: [
    //       L.latLng(nearestP.lat, nearestP.lng),
    //       L.latLng(loc2.lat, loc2.lng)
    //     ]
    //   }).addTo(map);
    // }
 }
// map.locate({setView: true, maxZoom: 16});
