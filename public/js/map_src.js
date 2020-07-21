// var map = L.map('map', {
//     center: [48.853, 2.333],
//     zoom: 13
// });
//
// L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
// 		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);
//
// var markerInfo = L.icon({
//     iconUrl: 'img/markers/marker.png',
//     iconSize: [50, 50],
// });
//
// function onEachFeature(feature, layer) {
//     if (feature.properties && feature.properties.popupContent) {
//         layer.bindPopup(feature.properties.popupContent);
//         layer.setIcon(markerInfo).addTo(map);
//
//     };
// };
//
// fetch("js/scops.json").then(function(response) {
//   return response.json();
// })
// .then(function(data) {
//   L.geoJSON(data).addTo(map);
// });


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
            return feature.properties.category != "Culturel" || "Bar" || "Festival" || "" || "";
        },
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
              icon: Icon
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

// // var result = scops
// $.getJSON('js/scops.json',
//     function(features) {
//       console.log(features['features'][0])
//       var result = data.features;
//       for (var i = 0; i < result.length; i++) {
//       //  alert(result[i].properties.ID)
//       }
//     });
// console.log(scops['features'][0]);
// function connectDots(scops) {
//   console.log(scops.then())
//     var features = scops.features,
//         feature,
//         c = [],
//         i;
//
//     for (i = 0; i < features.length; i += 1) {
//         feature = features[i];
//         // Make sure this feature is a point.
//         if (feature.geometry === "Point") {
//             c.push(feature.geometry.coordinates);
//         }
//     }
//     return c;
// }
//
// L.polyline(connectDots(scops)).addTo(map);
