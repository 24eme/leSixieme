// function onEachFeature(feature, layer) {
//     if (feature.properties && feature.properties.popupContent) {
//         layer.bindPopup(feature.properties.popupContent);
//         layer.setIcon(markerInfo).addTo(map);
//
//     };
// };
//
var nearest = 600000;
var nearestP = null;
var mapboxTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">24ème</a>'
});

var map = L.map('map', {
    center: [48.853, 2.333],
    zoom: 9,
    layers: mapboxTiles
});

var festivalIcon = L.AwesomeMarkers.icon({
prefix: 'fa',
markerColor: 'green',
icon: 'glass'
});

var culturelIcon = L.AwesomeMarkers.icon({
prefix: 'fa',
markerColor: 'red',
icon: 'comments'
});

var loisirsIcon = L.AwesomeMarkers.icon({
prefix: 'fa',
markerColor: 'red',
icon: 'coffee'
});

var events = $.getJSON('js/eventsGeoJson.json');
events.then(function(data) {
    var events = L.geoJson(data);
    var loisirs = L.geoJson(data, {
        filter: function(feature, layer) {
            return feature.properties.category == "Culturel"
             // && feature.properties.category == "Festival"
        },
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                icon: culturelIcon
          }).on('click', function() {
                             this.bindPopup(feature.properties.title+ "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour+ "<hr>"+feature.properties.price + "<hr>"+feature.properties.address + "<hr>"+"<a href="+feature.properties.url+ "><img width='350px' height='100px' src="+feature.properties.image+"></a>"+ "<hr>" +"<a href="+feature.properties.url+ ">\ud83d\ude33Plus de détails</a>").openPopup();
            });
        }
    });
    var others = L.geoJson(data, {
        filter: function(feature, layer) {
            return feature.properties.category != "Culturel" || "Loisirs" || "Festival";
        },
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
            }).on('click', function() {
               this.bindPopup(feature.properties.title+ "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour+ "<hr>"+feature.properties.price + "<hr>"+feature.properties.address + "<hr>"+"<a href="+feature.properties.url+ "><img width='350px' height='100px' src="+feature.properties.image+"></a>"+ "<hr>" +"<a href="+feature.properties.url+ ">\ud83d\ude33Plus de détails</a>").openPopup();
            });
        }
    });
    map.fitBounds(events.getBounds(), {
        padding: [50, 50]
    });
    loisirs.addTo(map)
    others.addTo(map)
    // The JavaScript below is new
    $("#others").click(function() {
        map.addLayer(others)
        map.removeLayer(loisirs)
    });
    $("#culturel").click(function() {
        map.addLayer(loisirs)
        map.removeLayer(others)
    });
    $("#all").click(function() {
        map.addLayer(loisirs)
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

function onLocationError(e) {
   map.setView([48.853, 2.333], 13);
}
map.on('locationerror', onLocationError);

function drawData(userLocation) {
   var item, o;
   var items = events.responseJSON.features;
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
    //  var marker = L.marker(loc1,{icon:loisirsIcon}).addTo(map);
    }
 }
 function search_arrondissement() {
     //See notes about 'which' and 'key'
     // alert('hello');

        var events = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.arrondissement == getElementById('arrondissement');
            }
              });
      // alert();
 }
