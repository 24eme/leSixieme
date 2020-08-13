var clusters = L.markerClusterGroup();
var markers = [];

var temp=null;
// var nearest = 600000;
// var nearestP = null;
var rControl = 0;
var userLocation = [48.853, 2.333];
//initialisation de la map avec les points qui ont chaqun leur couleur en fonction de la category
var mapboxTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">OpenStreetMap - 24ème</a>'
});
var map = L.map('map', {
    center: [48.8738,2.295],
    zoom: 9,
    layers: mapboxTiles
});
map.locate({setView: true, maxZoom: 40});

var mylocation = L.icon({
    iconUrl: 'img/markers/round.png',
    iconSize: [30, 30],
});

var myCoordonnees;

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

const client = new tgm.TargomoClient('france', 'TKT7GDUDYYFW3BOCGQ8G336934266');
const pBar = new mipb({ fg: "#FF8319", style: { zIndex: 500 } });
const center = [48.853, 2.333];
const attributionText = 'Routing by Targomo'
map.attributionControl.addAttribution(attributionText);
const travelTimes = [300, 900, 1800];
const sources = [{ id: 0, lat: center[0], lng: center[1] }];

sources.forEach(source => {
    //L.marker([source.lat, source.lng]).addTo(map)
});

function removeArrond(){
  if (click==false){
    map.removeLayer(geoJSONLayer);
    legend.remove();
    click=true;
  }
  else if(click==true){
    map.addLayer(geoJSONLayer);
    legend.addTo(map);
   click=false;
  }
}

// const polygonOverlayLayer = new tgm.leaflet.TgmLeafletPolygonOverlay({ strokeWidth: 20 });
// polygonOverlayLayer.addTo(map);

// async function setData(mode) {
//     map.removeLayer(geoJSONLayer);
//     //map.remove(legend);
//     pBar.show();
//     const selector = `btn-${mode}`;
//     document.getElementsByClassName('active')[0].classList.remove('active');
//     document.getElementById(selector).classList.add('active');

//     const options = {
//         travelType: mode,
//         travelEdgeWeights: travelTimes,
//         maxEdgeWeight: 1800,
//         edgeWeight: 'time',
//         transitMaxTransfers: mode === 'transit' ? 5 : null,
//         serializer: 'json'
//     };
//     const polygons = await client.polygons.fetch(sources, options);
//     polygonOverlayLayer.setData(polygons);
//     pBar.hide();
//     const bounds = polygons.getMaxBounds();
//     //map.fitBounds(new L.latLngBounds(bounds.northEast, bounds.southWest));
// }




L.marker([48.858370,2.294481],{icon:eiffelTower}).addTo(map);
L.marker([48.8738,2.295],{icon:arcDeTriomphe}).addTo(map);
L.marker([48.8626481,2.3356961],{icon:louvre}).addTo(map);
L.marker([48.8868058,2.3430153],{icon:montmartre}).addTo(map);
L.marker([48.8529371,2.3500501],{icon:cathedrale}).addTo(map);


function onLocationFound(e) {
    var radius = e.accuracy;
        userLocation = e.latlng;
    L.marker(e.latlng,{icon:mylocation,zIndexOffset:1000}).addTo(map);
    drawData(e.latlng);
    myCoordonnees=e.latlng;
    map.setView(e.latlng, 15);
}
map.on('locationfound', onLocationFound,);


function onLocationError(e) {
   map.setView([48.853, 2.333], 12);
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

          // if(loc.distanceTo(userLocation) < nearest){
          //   nearest = loc.distanceTo(userLocation);
          //   nearestP = loc;
          // }
    }
    // if (nearestP != null){
       rControl = L.Routing.control({
         createMarker: function() { return null; },
         language:'fr',
        waypoints: [
          // L.latLng(nearestP.lat, nearestP.lng),
          L.latLng(userLocation.lat, userLocation.lng)
        ]
      }).addTo(map);
      // var marker = L.marker(nearestP).addTo(map);
    // }
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


function drawItinary(userLocationlat,userLocationlng,destinationlat,destinationlng){
   rControl.hide()
   map.removeControl(rControl);
   rControl = L.Routing.control({
      createMarker: function() { return null; },
      language:'fr',
      waypoints: [
        L.latLng(destinationlat, destinationlng),
        L.latLng(userLocation.lat, userLocation.lng)
     ]
   }).addTo(map);
   map.setView([userLocation.lat,userLocation.lng], 8);
};



var events = $.getJSON('js/eventsGeoJson.json');
var arrondissement_map=  $.getJSON('js/arrondissements.geojson');
var markersLayer = new L.LayerGroup();

document.getElementById("km").addEventListener('change',function(event) {
  events.then(function(data) {
      var temp=null;
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
            }).on('click', function() {
              document.getElementById(this.feature.properties.id).scrollIntoView({
                    block: 'center',
                    behavior: 'smooth',
                    inline: 'nearest'
                  });;
                                  //scroll to element document.getElementById(this.feature.properties.id) dans la liste ul
            if(temp!=null){
              document.getElementById(temp).style.border = 'none';
            }
            document.getElementById(this.feature.properties.id).style.border = 'solid';
            temp=this.feature.properties.id;
            // document.getElementById(this.feature.properties.id).style.border = 'solid';
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
 var temp=null;
 function openMarker(id){
  //var temp=null;
  markersTab.forEach(function(marker) {
    if (marker._id == id){
      // marker.fireEvent('click');
      alert(temp);
      if(temp!=null){
        document.getElementById(temp).style.border = 'none';
      }
      document.getElementById(marker._id).style.border = 'solid';
      temp=marker._id;
      map.setView([marker._latlng.lat, marker._latlng.lng], 40);
    }
  })
};



var initialMap=function(){

      events.then(function(data) {
          click=false;
          var temp=null;
          var events = L.geoJson(data);
          map.addLayer(clusters);
          markersLayer.clearLayers();
          // map.fitBounds(events.getBounds(), {
          //     padding: [50, 50]
          // });
          map.setView([48.853, 2.333],12);
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
                }).on('click', function() {
                  document.getElementById(this.feature.properties.id).scrollIntoView({
                    		block: 'center',
                    		behavior: 'smooth',
                    		inline: 'nearest'
                    	});;
                                      //scroll to element document.getElementById(this.feature.properties.id) dans la liste ul
                // if (temp!='null'){
                //   document.getElementById(temp).style.backgroundColor = 'red';
                // }
                // document.getElementById(this.feature.properties.id).style.border = 'solid';
                // temp=this.feature.properties.id;
                if(temp!=null){
                  document.getElementById(temp).style.border = 'none';
                }
                document.getElementById(this.feature.properties.id).style.border = 'solid';
                temp=this.feature.properties.id;


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
          getAllMarkers();

          // alert('heelo');
          // map.removeLayer(initialisation);
      });

      arrondissement_map.then(function (data_ar){
        geoJSONLayer = L.geoJson(data_ar, {
                style: style,
                onEachFeature: onEachFeature
            }).addTo(map);


            legend = L.control({position: 'bottomleft'});

            legend.onAdd = function (map) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0, 25, 50, 100, 150, 200, 250, 400];

                div.innerHTML += '<h6>Flux de personnes en millions de personnes par jour (calculé à partir des données RATP)</h6>';
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                        '<i style="background:'+getColor((grades[i] + 1) * 1000)+'"></i><br/>'
                        +grades[i] + (grades[i + 1] ? 'K-' + grades[i + 1] + 'K <br>' : '+');
                }

                return div;
            };

        legend.addTo(map);

        // var info = L.control();

        // info.onAdd = function (map) {
        //     this._div = L.DomUtil.create('div', 'info');
        //     this.update();
        //     return this._div;
        // };

        // info.update = function (props) {
        //     this._div.innerHTML = '<h5>Affluence des arrondissements - Calcul\u00e9s \u00e0 partir de la fr\u00e9quentation des stations de m\u00e9tro</h5>' +  (props ?
        //         '<b>' + props.l_aroff +' ('+props.l_ar+')</b><br />' + props.affluence.toLocaleString()  + ' personnes/jour'
        //         : 'Passer la souris sur un arrondissement');
        // };

        //info.addTo(map);

        function style(feature) {
        return {
        fillColor: getColor(feature.properties.affluence),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.5
        };
        }

        function getColor(d) {
            return d > 400000 ? '#800026' :
                d > 250000  ? '#BD0026' :
                d > 200000  ? '#E31A1C' :
                d > 150000  ? '#FC4E2A' :
                d > 100000   ? '#FD8D3C' :
                d > 50000   ? '#FEB24C' :
                d > 25000   ? '#FED976' :
                '#FFEDA0';
        }
        function onEachFeature(feature, layer) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight
            });
        }

        function highlightFeature(e) {
            var layer = e.target;

            layer.setStyle({
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.7
            });

            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                layer.bringToFront(); // Permet de garantir que le pays est au-dessus des autres couches de données
            }

            //info.update(layer.feature.properties);
        }

            function resetHighlight(e) {
                geoJSONLayer.resetStyle(e.target);
                //info.update();
            }
      });

      markersTab = [];

}

var updateMap =function(){
      events.then(function(data) {
          var temp=null;
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

          markersLayer.clearLayers();
          dateDeb=document.getElementById('dateDeb').value;
          // dateFin=document.getElementById('dateFin').value;
          heureDeb=document.getElementById('heureDeb').value;
          category=document.getElementById('category').value;
          // prix=document.getElementById('prix').value;
          arrondissement=document.getElementById('arrondissement').value;
          price=document.getElementById('price').value;
          // alert(price);
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

          function pr(price){
            // if (price=='Gratuit'){
            //   return 'ratui';
            // }
            if (price=='Moins de 10€'){
              return 10;
            }
            if (price=='Moins de 50€'){
              return 50;
            }
            if (price=='Moins de 100€'){
              return 100;
            }
          }

          var misAJour= L.geoJson(data, {
              filter: function(feature, layer) {

                if(feature.properties.hour != null){

                  //Tout les element sont manquants
                  if(dateDeb=='' && heureDeb=='' && category=='Tous' && arrondissement=='Tous' && price=='Tous'){
                    // alert('tout est vide');
                    return initialMap();
                  }


                  //Un élément est manquant
                  if(dateDeb!='' && heureDeb!='' && category!='Tous' && arrondissement!='Tous'){
                    return (feature.properties.date== convertDate(dateDeb) &&
                    feature.properties.hour.substr(0,5)==convertHour(heureDeb) &&
                    feature.properties.category == category &&
                    feature.properties.cp.substr(3,2) == arrondissement);
                  } //sans prix


                  if (dateDeb!='' && heureDeb!='' && category!='Tous' && price!='Tous'){
                    return (feature.properties.date== convertDate(dateDeb) &&
                    feature.properties.hour.substr(0,5)==convertHour(heureDeb) &&
                    feature.properties.category == category &&
                    (feature.properties.price.substr(1,5)<pr(price)||feature.properties.price=='Gratuit'));
                  }//sans arr


                  if (dateDeb!='' && heureDeb!='' && arrondissement!='Tous' && price!='Tous'){
                    return (feature.properties.date== convertDate(dateDeb) &&
                    feature.properties.hour.substr(0,5)==convertHour(heureDeb) &&
                    feature.properties.cp.substr(3,2) == arrondissementy &&
                    (feature.properties.price.substr(1,5)<pr(price)||feature.properties.price=='Gratuit'));
                  }


                  if (category!='Tous' && heureDeb!='' && arrondissement!='Tous' && price!='Tous'){
                    return (feature.properties.category == category &&
                    feature.properties.hour.substr(0,5)==convertHour(heureDeb) &&
                    feature.properties.cp.substr(3,2) == arrondissementy &&
                    (feature.properties.price.substr(1,5)<pr(price)||feature.properties.price=='Gratuit'));
                  } //sans date


                  if (category!='Tous' && dateDeb!='' && arrondissement!='Tous' && price!='Tous'){
                    return (feature.properties.category == category &&
                    feature.properties.date== convertDate(dateDeb) &&
                    feature.properties.cp.substr(3,2) == arrondissementy &&
                    (feature.properties.price.substr(1,5)<pr(price)||feature.properties.price=='Gratuit'));
                  } //sans heure


                  //deux éléments sont maquants:

                  if (dateDeb != '' && heureDeb !='' && category!='Tous'){
                  // alert('arrondissement est vide');
                  return (feature.properties.date== convertDate(dateDeb) &&
                  feature.properties.hour.substr(0,5)==convertHour(heureDeb) &&
                  feature.properties.category == category);
                }//prix et arr
                  if(dateDeb != '' && heureDeb !='' && arrondissement!='Tous'){
                    // alert('category est vide');
                    return (feature.properties.date== convertDate(dateDeb) &&
                    feature.properties.hour.substr(0,5)==convertHour(heureDeb) &&
                    feature.properties.cp.substr(3,2) == arrondissement);
                  }//prix et cat

                  if(dateDeb != '' && heureDeb !='' && price!='Tous'){
                    // alert('category est vide');
                    return (feature.properties.date== convertDate(dateDeb) &&
                    feature.properties.hour.substr(0,5)==convertHour(heureDeb) &&
                    (feature.properties.price.substr(1,5)<pr(price)||feature.properties.price=='Gratuit'));
                  }//prix et cat

                  if (dateDeb != '' && arrondissement !='Tous' && category!='Tous'){
                  return (feature.properties.date== convertDate(dateDeb) &&
                  feature.properties.cp.substr(3,2)==arrondissement &&
                  feature.properties.category == category);
                }//

                    if (dateDeb != '' && category !='Tous' && price!='Tous'){

                    // alert('heure est vide');
                    return (feature.properties.date== convertDate(dateDeb) &&
                    feature.properties.category == category &&
                    (feature.properties.price.substr(1,5)<pr(price)||feature.properties.price=='Gratuit'));
                  }//

                  if (dateDeb != '' && arrondissement !='Tous' && price!='Tous'){

                  // alert('heure est vide');
                  return (feature.properties.date== convertDate(dateDeb) &&
                  feature.properties.cp.substr(3,2)==arrondissement &&
                  (feature.properties.price.substr(1,5)<pr(price)||feature.properties.price=='Gratuit'));
                }//



                  if (heureDeb != '' && arrondissement !='Tous' && category!='Tous'){
                    // alert('date est vide');
                  return (feature.properties.hour.substr(0,5)==convertHour(heureDeb) &&
                  feature.properties.cp.substr(3,2)==arrondissement &&
                  feature.properties.category == category);
                  }
                  if (heureDeb != '' && price !='Tous' && category!='Tous'){
                    // alert('date est vide');
                  return (feature.properties.hour.substr(0,5)==convertHour(heureDeb) &&
                  feature.properties.price.substr(1,5)<pr(price)||feature.properties.price=='Gratuit' &&
                  feature.properties.category == category);
                  }
                  if (heureDeb != '' && arrondissement !='Tous' && price !='Tous'){
                    // alert('date est vide');
                  return (feature.properties.hour.substr(0,5)==convertHour(heureDeb) &&
                  feature.properties.cp.substr(3,2)==arrondissement &&
                  (feature.properties.price.substr(1,5)<pr(price)||feature.properties.price=='Gratuit'));
                  }

                  if (category != '' && arrondissement !='Tous' && price !='Tous'){
                    // alert('date est vide');
                  return (feature.properties.category == category &&
                  feature.properties.cp.substr(3,2)==arrondissement &&
                  (feature.properties.price.substr(1,5)<pr(price)||feature.properties.price=='Gratuit'));
                  }

                  //troix manquants

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
                  if (dateDeb !='' && price != 'Tous'){
                    // alert('heure et category sont vide');
                    return (feature.properties.date== convertDate(dateDeb) &&
                    (feature.properties.price.substr(1,5)<pr(price)||feature.properties.price=='Gratuit'));
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
                  if (heureDeb !='' && price != 'Tous'){
                    // alert('arrondissement et category sont vide');
                    return (feature.properties.hour.substr(0,5)==convertHour(heureDeb) &&
                    (feature.properties.price.substr(1,5)<pr(price)||feature.properties.price=='Gratuit'));
                  }
                  if (category !='Tous' && arrondissement != 'Tous'){
                    // alert('heure et date sont vide');
                    return (feature.properties.category==category &&
                    feature.properties.cp.substr(3,2) == arrondissement);
                  }
                  if (category !='Tous' && price != 'Tous'){
                    // alert('heure et date sont vide');
                    return (feature.properties.category==category &&
                    (feature.properties.price.substr(1,5)<pr(price)||feature.properties.price=='Gratuit'));
                  }
                  if (arrondissement !='Tous' && price != 'Tous'){
                    // alert('heure et date sont vide');
                    return (feature.properties.cp.substr(3,2) == arrondissement &&
                    (feature.properties.price.substr(1,5)<pr(price)||feature.properties.price=='Gratuit'));
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
                  if(price!='Tous'){
                    return feature.properties.price.substr(1,5)<pr(price)||feature.properties.price=='Gratuit';
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
                  document.getElementById(this.feature.properties.id).scrollIntoView({
                    		block: 'center',
                    		behavior: 'smooth',
                    		inline: 'nearest'
                    	});;
                                      //scroll to element document.getElementById(this.feature.properties.id) dans la liste ul
              //   if (temp!='null'){
              //
              //   document.getElementById(temp).style.backgroundColor = 'red';
              // }
              //   document.getElementById(this.feature.properties.id).style.border = 'solid';
              //   temp=this.feature.properties.id;
                if(temp!=null){
                  document.getElementById(temp).style.border = 'none';
                }
                document.getElementById(this.feature.properties.id).style.border = 'solid';
                temp=this.feature.properties.id;
                });

                //    this.bindPopup(feature.properties.title+ "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour+ "<hr>"+feature.properties.price + "<hr>"+feature.properties.address + "<hr>"+"<a href="+feature.properties.url+ "><img width='350px' height='100px' src="+feature.properties.image+"></a>"+ "<hr>" +"<a href="+feature.properties.url+ ">\ud83d\ude33Plus de détails</a>"+"<button type='button' onclick='drawItinary("+userLocation.lat+","+userLocation.lng+","+latlng.lat+","+latlng.lng+")'>Itineraire</button>");
                //   });

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
          getAllMarkers();
          // map.addLayer(misAJour);
      });
}

function getAllMarkers() {      //Ne récupére que les ids des  évenements or clusters.
    var allMarkersObjArray = [];
    var allMarkersGeoJsonArray = [];
    $.each(map._layers, function (ml) {
        if (map._layers[ml].feature) {
            allMarkersObjArray.push(this)
            allMarkersGeoJsonArray.push(JSON.stringify(this.toGeoJSON().properties.id))
        }
    })
}

function filter(){
updateMap();
// getAllMarkers();

}
document.getElementById('map').addEventListener('click',function(event){
  getAllMarkers();
});
// markersLayer.addTo(map);
document.getElementById("reinitialiser").addEventListener('click',function(event) {
  // closeFilters();
  initialMap();
  document.getElementById('dateDeb').value='jj/mm/aaaa';
  document.getElementById('heureDeb').value=' : ';
  document.getElementById('category').value='Tous';
  document.getElementById('arrondissement').value='Tous';
  document.getElementById('price').value='Tous';
});
$(document).ready(function(){
initialMap();
});
