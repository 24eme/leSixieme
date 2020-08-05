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
events.then(function(data) {
    var events = L.geoJson(data);
    map.addLayer(clusters);
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


    var category= L.geoJson(data, {
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
          else{
            icon=othersIcon;
          }
          var marker = L.marker(latlng, {
                icon: icon
          }).on('click', function() {
             this.bindPopup(feature.properties.title+ "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour+ "<hr>"+feature.properties.price + "<hr>"+feature.properties.address + "<hr>"+"<a href="+feature.properties.url+ "><img width='350px' height='100px' src="+feature.properties.image+"></a>"+ "<hr>" +"<a href="+feature.properties.url+ ">\ud83d\ude33Plus de détails</a>");
            });
            marker._id = feature.properties.id;
            markersTab.push(marker)
            return marker
        }
    });
    //ajout dans la map et pris en compte par les clusters
    clusters.addLayer(category);

});


var markersTab = [];




function filter(){
  dateDeb=document.getElementById('dateDeb').value;
  dateFin=document.getElementById('dateFin').value;
  heureDeb=document.getElementById('heureDeb').value;
  heureFin=document.getElementById('heureFin').value;
  prix=document.getElementById('prix').value;
  $.when(events,).done(function(data){
        alert('hello');

        var filtres= L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.category == "Culturel";
            }

        });

        var notFiltres= L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.category != "Culturel";
            }
        });
    //    var clusters = L.markerClusterGroup();
        // clusters.removeLayer(notFiltres);
        // clusters.addLayer(filtres);
            // map.fitBounds(events.getBounds(), {
            //     padding: [50, 50]
            // });
        // map.removeLayer(filtres);
        // map.removeLayer(filtres);
        filtres.addTo(map);
        marker.clearLayers();

  });
  // alert("hello");
}
