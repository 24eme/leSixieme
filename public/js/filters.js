var clusters = L.markerClusterGroup();
var markers = [];
var nearest = 600000;
var nearestP = null;
var rControl = 0;
var userLocation = [48.853, 2.333];
//initialisation de la map avec les points qui ont chaqun leur couleur en fonction de la category
var mapboxTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">OpenStreetMap - 24ème</a>'
});
// var mapboxTiles = L.tileLayer('', {
// 	attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">24ème</a>',
// 	minZoom: 0,
// 	maxZoom: 20,
// 	ext: 'png'
// });

var mylocation = L.icon({
    iconUrl: 'img/markers/location.png',
    iconSize: [30, 30],
});

var myCoordonnees;

var map = L.map('map', {
    center: [48.853, 2.333],
    zoom: 9,
    layers: mapboxTiles
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


L.marker([48.858370,2.294481],{icon:eiffelTower}).addTo(map);
L.marker([48.8738,2.295],{icon:arcDeTriomphe}).addTo(map);
L.marker([48.8626481,2.3356961],{icon:louvre}).addTo(map);
L.marker([48.8868058,2.3430153],{icon:montmartre}).addTo(map);
L.marker([48.8529371,2.3500501],{icon:cathedrale}).addTo(map);

map.locate({setView: true, maxZoom: 40});

function onLocationFound(e) {
    var radius = e.accuracy;
        userLocation = e.latlng;
    L.marker(e.latlng,{icon:mylocation,zIndexOffset:1000}).addTo(map);
    drawData(e.latlng);
    myCoordonnees=e.latlng;
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
        // createPolyLine(loc, userLocation);
          if (Math.abs(loc.lng - userLocation.lng) > 180) {
              loc = loc.wrap(179, -179);
          }
          var latlongs = [loc, userLocation];

          if(loc.distanceTo(userLocation) < nearest){
            nearest = loc.distanceTo(userLocation);
            nearestP = loc;
          }
    }
    if (nearestP != null){
       rControl = L.Routing.control({
         createMarker: function() { return null; },
         language:'fr',
        waypoints: [
          L.latLng(nearestP.lat, nearestP.lng),
          L.latLng(userLocation.lat, userLocation.lng)
        ]
      }).addTo(map);
      var marker = L.marker(nearestP).addTo(map);
    }
};

tab1km = [];
tab2km = [];
tab3km = [];
tab4km = [];
tab5km = [];
tab6km = [];
tab7km = [];


// Rempli le tableau de kms avec les id des points autour de ou je suis en
var kmTabs = function(){
  var item, o;
  var items = events.responseJSON.features;
   for (item in items) {
       var loc = new L.LatLng(items[item].geometry.coordinates[1],items[item].geometry.coordinates[0]);
       // alert(loc);
          if(loc.distanceTo(myCoordonnees).toFixed(0) <= 1000 ){
             // alert( myCoordonnees);
             tab1km.push(items[item].properties.id);
           }
           if(loc.distanceTo(myCoordonnees).toFixed(0) <= 2000 ){
             // alert( myCoordonnees);
             tab2km.push(items[item].properties.id);
           }
           if(loc.distanceTo( myCoordonnees).toFixed(0) <= 3000 ){
              // alert( myCoordonnees);
             tab3km.push(items[item].properties.id);
           }
           if(loc.distanceTo( myCoordonnees).toFixed(0) <= 4000 ){
             // alert( myCoordonnees);
             tab4km.push(items[item].properties.id);
           }
           if( loc.distanceTo( myCoordonnees).toFixed(0) <= 5000 ){
             // alert( myCoordonnees);
             tab5km.push(items[item].properties.id);
           }
           if(loc.distanceTo( myCoordonnees).toFixed(0) <= 6000 ){
             // alert( myCoordonnees);
             tab6km.push(items[item].properties.id);
           }
           if(loc.distanceTo( myCoordonnees).toFixed(0) > 6000){
             tab7km.push(items[item].properties.id);
           }
   }
}


function openMarker(id){
 markersTab.forEach(function(marker) {
   if (marker._id == id){
     // marker.fireEvent('click');
     map.setView([marker._latlng.lat, marker._latlng.lng], 40);

   }
 })
};

function drawItinary(userLocationlat,userLocationlng,destinationlat,destinationlng){
   rControl.hide()
   map.removeControl(rControl);
   rControl = L.Routing.control({
      createMarker: function() { return null; },
      language:'fr',
      waypoints: [
        L.latLng(destinationlat, destinationlng),
        L.latLng(userLocationlat, userLocationlng)
     ]
   }).addTo(map);
};



var events = $.getJSON('js/eventsGeoJson.json');
var markersLayer = new L.LayerGroup();

document.getElementById("km").addEventListener('change',function(event) {
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
      markerColor: 'blue',
      icon: 'comments'
      });
      var festivalIcon = L.AwesomeMarkers.icon({
      prefix: 'fa',
      markerColor: 'blue',
      icon: 'glass'
      });
      var loisirsIcon = L.AwesomeMarkers.icon({
      prefix: 'fa',
      markerColor: 'blue',
      icon: 'coffee'
      });
      var othersIcon = L.AwesomeMarkers.icon({
        markerColor: 'blue',
      });

      var rayonkm= L.geoJson(data, {
          filter: function(feature, layer) {
            var km = document.getElementById("km").value;
            if(km=='1'){
              tab1km=tab1km.splice();
              kmTabs();
              for(i in tab1km){
              return feature.properties.id == tab1km[i];
              }
            }
            if(km =='2'){
              var a;
              tab2km=tab2km.splice();
              kmTabs();
              a=(feature.properties.id == tab2km[0]);
              tab2km.forEach((i) => {
                a = a || feature.properties.id == i;
              });
              return a;
            }
            if(km=='3'){
              var a;
              tab3km=tab3km.splice();
              kmTabs();
              a=(feature.properties.id == tab3km[0]);
              tab3km.forEach((i) => {
                a = a || feature.properties.id == i;
              });
              return a;
            }
            if(km =='4'){
              var a;
              tab4km=tab4km.splice();
              kmTabs();
              a=(feature.properties.id == tab4km[0]);
              tab4km.forEach((i) => {
                a = a || feature.properties.id == i;
              });
              return a;

            }
            if(km =='5'){
              var a;
              tab5km=tab5km.splice();
              kmTabs();
              a=(feature.properties.id == tab5km[0]);
              tab5km.forEach((i) => {
                a = a || feature.properties.id == i;
              });
              return a;
            }
            if(km =='6'){
              var a;
              tab6km=tab6km.splice();
              kmTabs();
              a=(feature.properties.id == tab6km[0]);
              tab6km.forEach((i) => {
                a = a || feature.properties.id == i;
              });
              return a;
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
                  icon: icon,
                  zIndexOffset:1000
            });
            // .on('click', function() {
            //    this.bindPopup(feature.properties.title+ "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour+ "<hr>"+feature.properties.price + "<hr>"+feature.properties.address + "<hr>"+"<a href="+feature.properties.url+ "><img width='350px' height='100px' src="+feature.properties.image+"></a>"+ "<hr>" +"<a href="+feature.properties.url+ ">\ud83d\ude33Plus de détails</a>"+"<button type='button' onclick='drawItinary("+userLocation.lat+","+userLocation.lng+","+latlng.lat+","+latlng.lng+")'>Itineraire</button>");
            //   });
              // map.removeControl(rControl);
              marker._id = feature.properties.id;
              markersTab.push(marker);
              // markersLayer.addLayer(marker);
              // console.log(markers);
              return marker
          }
      });

      clusters.clearLayers();
      clusters.addLayer(rayonkm);
  });
});

 function openMarker(id){
  markersTab.forEach(function(marker) {
    if (marker._id == id){
      // alert(marker);
      marker.fireEvent('click');
      map.setView([marker._latlng.lat, marker._latlng.lng], 40);
      // alert('hello1');

    }
  })
};

function list_km(km){
  if (km==1){
    tab1km=tab1km.splice();
    kmTabs();
    return tab1km;
  }
  if (km==2){
    tab2km=tab2km.splice();
    kmTabs();
    return tab2km;
  }
  if (km==3){
    tab3km=tab3km.splice();
    kmTabs();
    return tab3km;
  }
  if (km==4){
    tab4km=tab4km.splice();
    kmTabs();
    return tab4km;
  }
  if (km==5){
    tab5km=tab5km.splice();
    kmTabs();
    return tab5km;
  }
  if (km==6){
    tab6km=tab6km.splice();
    kmTabs();
    return tab6km;
  }
}


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
          markerColor: 'blue',
          icon: 'comments'
          });
          var festivalIcon = L.AwesomeMarkers.icon({
          prefix: 'fa',
          markerColor: 'blue',
          icon: 'glass'
          });
          var loisirsIcon = L.AwesomeMarkers.icon({
          prefix: 'fa',
          markerColor: 'blue',
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
                      icon: icon,
                      zIndexOffset:1000
                });
                // on('click', function() {
                //    this.bindPopup(feature.properties.title+ "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour+ "<hr>"+feature.properties.price + "<hr>"+feature.properties.address + "<hr>"+"<a href="+feature.properties.url+ "><img width='350px' height='100px' src="+feature.properties.image+"></a>"+ "<hr>" +"<a href="+feature.properties.url+ ">\ud83d\ude33Plus de détails</a>"+"<button type='button' onclick='drawItinary("+userLocation.lat+","+userLocation.lng+","+latlng.lat+","+latlng.lng+")'>Itineraire</button>");
                //   });
                  // map.removeControl(rControl);
                  marker._id = feature.properties.id;
                  markersTab.push(marker);
                  // markersLayer.addLayer(marker);

                  // console.log(markers);

                  return marker
              }
          });
          //ajout dans la map et pris en compte par les clusters
          // notInitialisation.clearLayers();
          // clusters.clearLayers(notInitialisation);
          // markersLayer.clearLayers();;
          clusters.clearLayers();
          clusters.addLayer(initialisation);
          // alert('heelo');
          // map.removeLayer(initialisation);
      });
      markersTab = [];

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
          // dateFin=document.getElementById('dateFin').value;
          heureDeb=document.getElementById('heureDeb').value;
          category=document.getElementById('category').value;
          // prix=document.getElementById('prix').value;
          arrondissement=document.getElementById('arrondissement').value;

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

                if(feature.properties.hour != null){
                  if(dateDeb=='' && heureDeb=='' && category=='Tous' && arrondissement=='Tous'){
                    // alert('tout est vide');
                    return initialMap();
                  }
                  if(dateDeb!='' && heureDeb!='' && category!='Tous' && arrondissement!='Tous'){
                    // alert('rien' est vide');
                    // alert(arrondissement);
                    // alert(feature.properties.cp.substr(3,2));
                    return (feature.properties.date== convertDate(dateDeb) &&
                    feature.properties.hour.substr(0,5)==convertHour(heureDeb) &&
                    feature.properties.category == category &&
                    feature.properties.cp.substr(3,2) == arrondissement);
                  }

                  if (dateDeb != '' && heureDeb !='' && category!='Tous'){
                  // alert('arrondissement est vide');
                  return (feature.properties.date== convertDate(dateDeb) &&
                  feature.properties.hour.substr(0,5)==convertHour(heureDeb) &&
                  feature.properties.category == category);
                  }
                  if(dateDeb != '' && heureDeb !='' && arrondissement!='Tous'){
                    // alert('category est vide');
                    return (feature.properties.date== convertDate(dateDeb) &&
                    feature.properties.hour.substr(0,5)==convertHour(heureDeb) &&
                    feature.properties.cp.substr(3,2) == arrondissement);
                  }
                  if (dateDeb != '' && arrondissement !='Tous' && category!='Tous'){

                  // alert('heure est vide');
                  return (feature.properties.date== convertDate(dateDeb) &&
                  feature.properties.cp.substr(3,2)==arrondissement &&
                  feature.properties.category == category);
                  }
                  if (heureDeb != '' && arrondissement !='Tous' && category!='Tous'){
                    // alert('date est vide');
                  return (feature.properties.hour.substr(0,5)==convertHour(heureDeb) &&
                  feature.properties.cp.substr(3,2)==arrondissement &&
                  feature.properties.category == category);
                  }
                  if (dateDeb !='' && heureDeb != ''){
                    // alert('arrondissement et category sont vide');
                    return (feature.properties.date== convertDate(dateDeb) &&
                    feature.properties.hour.substr(0,5)==convertHour(heureDeb));
                  }
                  if (dateDeb !='' && category != 'Tous'){
                    // alert('arrondissement et heure sont vide');
                    return (feature.properties.date== convertDate(dateDeb) &&
                    feature.properties.category == category);
                  }
                  if (dateDeb !='' && arrondissement != 'Tous'){
                    // alert('heure et category sont vide');
                    return (feature.properties.date== convertDate(dateDeb) &&
                    feature.properties.cp.substr(3,2)== arrondissement);
                  }
                  if (heureDeb !='' && category != 'Tous'){
                    // alert('arrondissement et date sont vide');
                    return (feature.properties.hour.substr(0,5)==convertHour(heureDeb) &&
                    feature.properties.category == category);
                  }
                  if (heureDeb !='' && arrondissement != 'Tous'){
                    // alert('arrondissement et category sont vide');
                    return (feature.properties.hour.substr(0,5)==convertHour(heureDeb) &&
                    feature.properties.cp.substr(3,2) == arrondissement);
                  }
                  if (category !='Tous' && arrondissement != 'Tous'){
                    // alert('heure et date sont vide');
                    return (feature.properties.category==category &&
                    feature.properties.cp.substr(3,2) == arrondissement);
                  }
                  if(dateDeb!=''){
                    return feature.properties.date== convertDate(dateDeb);
                  }
                  if(heureDeb!=''){
                    return feature.properties.hour.substr(0,5)==convertHour(heureDeb);
                  }
                  if(arrondissement!='Tous'){
                    // alert(arrondissement);
                    // alert(dateDeb);
                    return feature.properties.cp.substr(3,2)== arrondissement;
                  }
                  if(category!='Tous'){
                    return feature.properties.category== category;
                  }

                }
                // return initialMap();
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
                      icon: icon,
                      zIndexOffset:1000
                }).on('click', function() {
                   this.bindPopup(feature.properties.title+ "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour+ "<hr>"+feature.properties.price + "<hr>"+feature.properties.address + "<hr>"+"<a href="+feature.properties.url+ "><img width='350px' height='100px' src="+feature.properties.image+"></a>"+ "<hr>" +"<a href="+feature.properties.url+ ">\ud83d\ude33Plus de détails</a>"+"<button type='button' onclick='drawItinary("+userLocation.lat+","+userLocation.lng+","+latlng.lat+","+latlng.lng+")'>Itineraire</button>");
                  });
                  map.removeControl(rControl);
                  marker._id = feature.properties.id;
                  markersTab.push(marker);
                  // markersLayer.addLayer(marker);
                  // console.log(markers);
                  return marker
              }
          });
          // rControl.hide();
          // map.removeControl(rControl);
          clusters.clearLayers();
          clusters.addLayer(misAJour);
          // map.addLayer(misAJour);
      });
}

function filter(){
  // alert('hello');
updateMap();
}


function openFilters(){
  var filters=document.getElementById('open-filters');
  if(filters.style.display=='none'){
    filters.style.display='block';
  }
  else{
      filters.style.display='none';
  }
}

function closeFilters(){
  var filters=document.getElementById('open-filters');
    if(filters.style.display=='block'){
      filters.style.display='none';
  }
}

// markersLayer.addTo(map);
document.getElementById("reinitialiser").addEventListener('click',function(event) {
  closeFilters();
  initialMap();
});
$(document).ready(function(){
initialMap();
});
