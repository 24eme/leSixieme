// function onEachFeature(feature, layer) {
//     if (feature.properties && feature.properties.popupContent) {
//         layer.bindPopup(feature.properties.popupContent);
//         layer.setIcon(markerInfo).addTo(map);
//
//     };
// };

var tab1km = [];
var tab2km = [];
var tab3km = [];
var tab4km = [];
var tab5km = [];
var tab6km = [];
var tab7km = [];

var tabMarkersRemoved = [];

var markersTab = [];

var clusters = L.markerClusterGroup();

var arrondissements = ["9<sup></sup> Arrondissement","2ème Arrondissement","3ème Arrondissement","4ème Arrondissement","5ème Arrondissement","6ème Arrondissement","7ème Arrondissement","8ème Arrondissement","9ème Arrondissement","10ème Arrondissement","11ème Arrondissement","12ème Arrondissement","13ème Arrondissement","14ème Arrondissement","15ème Arrondissement","16ème Arrondissement","17ème Arrondissement","18ème Arrondissement","19ème Arrondissement","20ème Arrondissement"]

var markers = [];
var nearest = 600000;
var nearestP = null;
var mapboxTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">24ème© les contributeurs d’OpenStreetMap</a>'
});

var map = L.map('map', {
    center: [48.853, 2.333],
    zoom: 9,
    layers: mapboxTiles
});

var mylocation = L.icon({
    iconUrl: 'img/markers/location.png',
    iconSize: [30, 30],
});
var eiffelTower = L.icon({
    iconUrl: 'img/eiffelTower.png',
    iconSize: [50, 50],
});
var arcDeTriomphe = L.icon({
    iconUrl: 'img/arcDeTriomphe.png',
    iconSize: [50, 50],
});
var louvre = L.icon({
    iconUrl: 'img/louvre.png',
    iconSize: [50, 50],
});
var montmartre = L.icon({
    iconUrl: 'img/montmartre.png',
    iconSize: [50, 50],
});
var cathedrale = L.icon({
    iconUrl: 'img/cathedrale.png',
    iconSize: [50, 50],
});
var festivalIcon = L.AwesomeMarkers.icon({
prefix: 'fa',
markerColor: 'black',
icon: 'glass'
});

var culturelIcon = L.AwesomeMarkers.icon({
prefix: 'fa',
markerColor: 'red',
icon: 'comments'
});

var loisirsIcon = L.AwesomeMarkers.icon({
prefix: 'fa',
markerColor: 'green',
icon: 'coffee'
});


L.marker([48.858370,2.294481],{icon:eiffelTower}).addTo(map);
L.marker([48.8738,2.295],{icon:arcDeTriomphe}).addTo(map);
L.marker([48.8626481,2.3356961],{icon:louvre}).addTo(map);
L.marker([48.8868058,2.3430153],{icon:montmartre}).addTo(map);
L.marker([48.8529371,2.3500501],{icon:cathedrale}).addTo(map);

map.locate({setView: true, maxZoom: 40});

function onLocationFound(e) {
    var radius = e.accuracy; //  L.circle(e.latlng, radius).addTo(map);
    L.marker(e.latlng,{icon:mylocation}).addTo(map)
    //.bindPopup("Vous êtes à " + radius + " mètres de ce lieu").openPopup();
    drawData(e.latlng);
}
map.on('locationfound', onLocationFound);

function onLocationError(e) { map.setView([48.853, 2.333], 13);}
map.on('locationerror', onLocationError);
