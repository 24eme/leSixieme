var clusters = L.markerClusterGroup();

var markers = [];
var nearest = 600000;
var nearestP = null;
//initialisation de la map avec les points qui ont chaqun leur couleur en fonction de la category
var mapboxTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">24ème</a>'
});

var map = L.map('map', {
    center: [48.853, 2.333],
    zoom: 9,
    layers: mapboxTiles
});
var events = $.getJSON('js/eventsGeoJson.json');
var markersLayer = new L.LayerGroup(); // NOTE: Layer is created here!
var initialMap=function(){
      events.then(function(data) {
          var events = L.geoJson(data);
          map.addLayer(clusters);
          markersLayer.clearLayers();
          map.fitBounds(events.getBounds(), {
              padding: [50, 50]
          });
          var culturelIcon = L.AwesomeMarkers.icon({
          prefix: 'fa',
          markerColor: 'red',
          icon: 'comments'
          });
          var festivalIcon = L.AwesomeMarkers.icon({
          prefix: 'fa',
          markerColor: 'black',
          icon: 'glass'
          });
          var loisirsIcon = L.AwesomeMarkers.icon({
          prefix: 'fa',
          markerColor: 'green',
          icon: 'coffee'
          });
          var othersIcon = L.AwesomeMarkers.icon({
            markerColor: 'blue',
          });

          markersLayer.clearLayers();
          var initialisation= L.geoJson(data, {
              filter: function(feature, layer) {
                if(feature.properties.category=='Culturel'){
                  return feature.properties.category == "Culturel";
                }
                if(feature.properties.category=='Loisirs'){
                  return feature.properties.category == "Loisirs";
                }
                if(feature.properties.category=='Festival'){
                  return feature.properties.category == "Festival";
                }
                else{
                  return feature.properties.category != "Loisirs" && feature.properties.category != "Culturel" && feature.properties.category != "Festival" && (feature.properties.arrondissement != document.getElementById("arrondissement").value);
                }
              },
              pointToLayer: function(feature, latlng) {
                if(feature.properties.category=='Culturel'){
                  icon=culturelIcon;
                }
                if(feature.properties.category=='Loisirs'){
                  icon=loisirsIcon;
                }
                if(feature.properties.category=='Festival'){
                  icon=festivalIcon;
                }
                if(feature.properties.category==null){
                  icon=othersIcon;
                }
                var marker = L.marker(latlng, {
                      icon: icon
                }).on('click', function() {
                   this.bindPopup(feature.properties.title+ "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour+ "<hr>"+feature.properties.price + "<hr>"+feature.properties.address + "<hr>"+"<a href="+feature.properties.url+ "><img width='350px' height='100px' src="+feature.properties.image+"></a>"+ "<hr>" +"<a href="+feature.properties.url+ ">\ud83d\ude33Plus de détails</a>");
                  });
                  marker._id = feature.properties.id;
                  markersTab.push(marker);
                  markersLayer.addLayer(marker);
                  console.log(markers);
                  return marker
              }
          });
          //ajout dans la map et pris en compte par les clusters
          // notInitialisation.clearLayers();
          // clusters.clearLayers(notInitialisation);
          // markersLayer.clearLayers();
          clusters.clearLayers();
          clusters.addLayer(initialisation);
          // map.removeLayer(initialisation);
      });
      var markersTab = [];

}


var updateMap =function(){
      events.then(function(data) {
          var events = L.geoJson(data);
          map.addLayer(clusters);
          var markersTab = [];
          markersLayer.clearLayers();
          map.fitBounds(events.getBounds(), {
              padding: [50, 50]
          });
          var culturelIcon = L.AwesomeMarkers.icon({
          prefix: 'fa',
          markerColor: 'red',
          icon: 'comments'
          });
          var festivalIcon = L.AwesomeMarkers.icon({
          prefix: 'fa',
          markerColor: 'black',
          icon: 'glass'
          });
          var loisirsIcon = L.AwesomeMarkers.icon({
          prefix: 'fa',
          markerColor: 'green',
          icon: 'coffee'
          });
          var othersIcon = L.AwesomeMarkers.icon({
            markerColor: 'blue',
          });

          markersLayer.clearLayers();
          dateDeb=document.getElementById('dateDeb').value;
          dateFin=document.getElementById('dateFin').value;
          heureDeb=document.getElementById('heureDeb').value;
          category=document.getElementById('category').value;
          // prix=document.getElementById('prix').value;

          function convertDate(date){ //2020-03-01
           var year= date.substr(0, 4);
           var month=date.substr(5,2);
           var day=date.substr(8,2);
           var date=day+'/'+month+'/'+year;
           return date;
          }

          function convertHour(hour){
            var hour=hour.substr(0,5);
            // alert(hour);
            return hour;
          }

          var misAJour= L.geoJson(data, {
              filter: function(feature, layer) {
                if(feature.properties.hour != null && feature.properties.date != null && feature.properties.category != null){
                  return (feature.properties.date== convertDate(dateDeb) &&
                  feature.properties.hour.substr(0,5)==convertHour(heureDeb) &&
                  feature.properties.category == category );
                }

                else if(feature.properties.date != null){
                  return feature.properties.date== convertDate(dateDeb);

                }
              },
              pointToLayer: function(feature, latlng) {
                if(feature.properties.category=='Culturel'){
                  icon=culturelIcon;
                }
                if(feature.properties.category=='Loisirs'){
                  icon=loisirsIcon;
                }
                if(feature.properties.category=='Festival'){
                  icon=festivalIcon;
                }
                if(feature.properties.category==null){
                  icon=othersIcon;
                }
                var marker = L.marker(latlng, {
                      icon: icon
                }).on('click', function() {
                   this.bindPopup(feature.properties.title+ "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour+ "<hr>"+feature.properties.price + "<hr>"+feature.properties.address + "<hr>"+"<a href="+feature.properties.url+ "><img width='350px' height='100px' src="+feature.properties.image+"></a>"+ "<hr>" +"<a href="+feature.properties.url+ ">\ud83d\ude33Plus de détails</a>");
                  });
                  marker._id = feature.properties.id;
                  markersTab.push(marker);
                  markersLayer.addLayer(marker);
                  console.log(markers);
                  return marker
              }
          });

          clusters.clearLayers();
          clusters.addLayer(misAJour);
      });
}

function getId(){

}

function filter(){
  // alert('hello');
updateMap();
}


markersLayer.addTo(map);
$(document).ready(function(){
initialMap();
});
