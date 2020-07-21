var map = L.map('map', {
    center: [48.853, 2.333],
    zoom: 13
});

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var markerInfo = L.icon({
    iconUrl: 'img/markers/marker.png',
    iconSize: [50, 50],
});

function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
        layer.setIcon(markerInfo).addTo(map);

    };
};

fetch("js/scops.json").then(function(response) {
  return response.json();
})
.then(function(data) {
  L.geoJSON(data).addTo(map);
});
