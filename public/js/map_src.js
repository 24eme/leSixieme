// function onEachFeature(feature, layer) {
//     if (feature.properties && feature.properties.popupContent) {
//         layer.bindPopup(feature.properties.popupContent);
//         layer.setIcon(markerInfo).addTo(map);
//     };
// };
var tab1km = [];
var tabMarkersRemoved = [];
var tab2km = [];
var tab3km = [];
var tab4km = [];
var tab5km = [];
var tab6km = [];
var tab7km = [];
var markersTab = [];

var userLocation = [48.853, 2.333];
var rControl = 0;
var clusters = L.markerClusterGroup();

var markers = [];
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


map.locate({setView: true, maxZoom: 40});

function onLocationFound(e) {
    var radius = e.accuracy; //  L.circle(e.latlng, radius).addTo(map);
    userLocation = e.latlng;
    L.marker(e.latlng,{icon:mylocation}).addTo(map)
    L.marker([48.858370,2.294481],{icon:eiffelTower}).addTo(map);
    L.marker([48.8738,2.295],{icon:arcDeTriomphe}).addTo(map);
    L.marker([48.8626481,2.3356961],{icon:louvre}).addTo(map);
    L.marker([48.8868058,2.3430153],{icon:montmartre}).addTo(map);
    L.marker([48.8529371,2.3500501],{icon:cathedrale}).addTo(map);
    //.bindPopup("Vous êtes à " + radius + " mètres de ce lieu").openPopup();
    drawData(e.latlng);

}
map.on('locationfound', onLocationFound);

function onLocationError(e) {
   map.setView([48.853, 2.333], 13);
}
map.on('locationerror', onLocationError);
function drawItinary(userLocation,destination){
//  rControl.hide();
//  map.removeRoutingControl(rControl);
console.log(destination)
   rControl = L.Routing.control({
      createMarker: function() { return null; },
      language:'fr',
      waypoints: [
        L.latLng(destination.lat, destination.lng),
        L.latLng(userLocation.lat, userLocation.lng)
     ]
   }).addTo(map);
}
var events = $.getJSON('js/eventsGeoJson.json');
events.then(function(data) {
    var events = L.geoJson(data);
    var all= L.geoJson(data, {
        filter: function(feature, layer) {
            return feature.properties.category == "all";

        },
        pointToLayer: function(feature, latlng) {
            var marker = L.marker(latlng, {
                icon: culturelIcon
          }).on('click', function() {

             this.bindPopup(feature.properties.title+ "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour+ "<hr>"+feature.properties.price + "<hr>"+feature.properties.address + "<hr>"+"<a href="+feature.properties.url+ "><img width='350px' height='100px' src="+feature.properties.image+"></a>"+ "<hr>" +"<a href="+feature.properties.url+ ">\ud83d\ude33Plus de détails</a>"+"<button type='button' onclick='drawItinary("+userLocation+","+latlng+")'>Itineraire</button>");
            });
            marker._id = feature.properties.id;
            markersTab.push(marker)
            return marker

        }
    });
    clusters.addLayer(all);
    map.addLayer(clusters);

    var culturel= L.geoJson(data, {
        filter: function(feature, layer) {
            return feature.properties.category == "Culturel";

        },
        pointToLayer: function(feature, latlng) {
            var marker = L.marker(latlng, {
                icon: culturelIcon
          }).on('click', function() {
             this.bindPopup(feature.properties.title+ "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour+ "<hr>"+feature.properties.price + "<hr>"+feature.properties.address + "<hr>"+"<a href="+feature.properties.url+ "><img width='350px' height='100px' src="+feature.properties.image+"></a>"+ "<hr>" +"<a href="+feature.properties.url+ ">\ud83d\ude33Plus de détails</a>"+"<button type='button' onclick='drawItinary("+userLocation+","+latlng+")'>Itineraire</button>");
            });
            marker._id = feature.properties.id;
            markersTab.push(marker)
            return marker
        }
    });
//    var clusters = L.markerClusterGroup();
    clusters.addLayer(culturel);
//    map.addLayer(clusters);

    var loisirs = L.geoJson(data, {
        filter: function(feature, layer) {
            return feature.properties.category == "Loisirs";

        },
        pointToLayer: function(feature, latlng) {
            var marker = L.marker(latlng, {
                icon: loisirsIcon
          }).on('click', function() {
             this.bindPopup(feature.properties.title+ "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour+ "<hr>"+feature.properties.price + "<hr>"+feature.properties.address + "<hr>"+"<a href="+feature.properties.url+ "><img width='350px' height='100px' src="+feature.properties.image+"></a>"+ "<hr>" +"<a href="+feature.properties.url+ ">\ud83d\ude33Plus de détails</a>"+"<a  onclick='drawItinary(userLocation,latlng)'>Itineraire</a>");
            });
            marker._id = feature.properties.id;
            markersTab.push(marker)
            return marker
        }
    });
    clusters.addLayer(loisirs);
//    map.addLayer(clusters);

    var festival = L.geoJson(data, {
        filter: function(feature, layer) {
            return feature.properties.category == "Festival";

        },
        pointToLayer: function(feature, latlng) {
            var marker = L.marker(latlng, {
                icon: festivalIcon
          }).on('click', function() {
               this.bindPopup(feature.properties.title+ "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour+ "<hr>"+feature.properties.price + "<hr>"+feature.properties.address + "<hr>"+"<a href="+feature.properties.url+ "><img width='350px' height='100px' src="+feature.properties.image+"></a>"+ "<hr>" +"<a href="+feature.properties.url+ ">\ud83d\ude33Plus de détails</a>"+"<a onclick='drawItinary(userLocation,latlng)'>Itineraire</a>");
            });
            marker._id = feature.properties.id;
            markersTab.push(marker)
            return marker
        }
    });
    clusters.addLayer(festival);

    var others = L.geoJson(data, {
        filter: function(feature, layer) {
            return feature.properties.category != "Loisirs" && feature.properties.category != "Culturel" && feature.properties.category != "Festival" && (feature.properties.arrondissement != document.getElementById("arrondissement").value);
        },
        pointToLayer: function(feature, latlng) {
            var marker = L.marker(latlng, {
    // <img src="feature.properties.image">" + "</a>"
    // "<a href=feature.properties.image>"

            }).on('click', function() {
                this.bindPopup(feature.properties.title+ "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour+ "<hr>"+feature.properties.price + "<hr>"+feature.properties.address + "<hr>"+"<a href="+feature.properties.url+ "><img width='350px' height='100px' src="+feature.properties.image+"></a>"+ "<hr>" +"<a href="+feature.properties.url+ ">\ud83d\ude33Plus de détails</a>"+"<a onclick='drawItinary(userLocation,latlng)'>Itineraire</a>");
            });
            marker._id = feature.properties.id;
            markersTab.push(marker)
            return marker
        }
    });
    clusters.addLayer(others);

    var arrondissement = L.geoJson(data, {
        filter: function(feature, layer) {
            return feature.properties.arrondissement == document.getElementById("arrondissement").value;
        },
        pointToLayer: function(feature, latlng) {
            var marker = L.marker(latlng, {
            }).on('click', function() {
               this.bindPopup(feature.properties.title+ "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour+ "<hr>"+feature.properties.price + "<hr>"+feature.properties.address + "<hr>"+"<a href="+feature.properties.url+ "><img width='350px' height='100px' src="+feature.properties.image+"></a>"+ "<hr>" +"<a href="+feature.properties.url+ ">\ud83d\ude33Plus de détails</a>"+"<a  onclick='drawItinary(userLocation,latlng)'>Itineraire</a>");
            });
            marker._id = feature.properties.id;
            markersTab.push(marker)
            return marker
        }
    });
    //    clusters.addLayer(arrondissement);

    var not_arrondissement = L.geoJson(data, {
        filter: function(feature, layer) {
            return feature.properties.arrondissement != document.getElementById("arrondissement").value;
        },
        pointToLayer: function(feature, latlng) {
            var marker = L.marker(latlng, {
            }).on('click', function() {
               this.bindPopup(feature.properties.title+ "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour+ "<hr>"+feature.properties.price + "<hr>"+feature.properties.address + "<hr>"+"<img width='350px' height='100px' src="+feature.properties.image+">" +"<hr>"+feature.properties.description+ "<hr>" +"<a href="+feature.properties.url+ ">\ud83d\ude33Plus de détails</a>").openPopup();
            });
            marker._id = feature.properties.id;
            markersTab.push(marker)
            return marker
        }
    });

      //  clusters.addLayer(not_arrondissement);


//hono essai pour les dates
    // var input_date_start = document.getElementById("start");
    // var input_date_end = document.getElementById("end");
    // var date = L.geoJson(data, {
    //     filter: function(feature, layer) {
    //         return feature.properties.date >=input_date_start.value
    //         // && feature.properties.date <=input_date_end.value
    //     },
    //     pointToLayer: function(feature, latlng) {
    //         var marker = L.marker(latlng, {
    //         }).on('click', function() {
    //             this.bindPopup(feature.properties.title+ "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour+ "<hr>"+feature.properties.price + "<hr>"+feature.properties.address + "<hr>"+"<a href="+feature.properties.url+ "><img width='350px' height='100px' src="+feature.properties.image+"></a>"+ "<hr>" +"<a href="+feature.properties.url+ ">\ud83d\ude33Plus de détails</a>");
    //         });
    //         marker._id = feature.properties.id;
    //         markersTab.push(marker);
    //         return marker
    //     }
    // });
//    clusters.addLayer(date);
//fin essai dates


    map.fitBounds(events.getBounds(), {
        padding: [50, 50]
    });

    $("#others").click(function() {
        clusters.addLayer(others)
        clusters.removeLayer(loisirs)
        clusters.removeLayer(festival)
        clusters.removeLayer(culturel)
    });
    $("#culturel").click(function() {
        clusters.addLayer(culturel)
        clusters.removeLayer(loisirs)
        clusters.removeLayer(festival)
        clusters.removeLayer(others)
        clusters.removeLayer(arrondissement)
    });
    $("#loisirs").click(function() {
        clusters.addLayer(loisirs)
        clusters.removeLayer(culturel)
        clusters.removeLayer(festival)
        clusters.removeLayer(others)
        clusters.removeLayer(arrondissement)
    });
    $("#festival").click(function() {
        clusters.addLayer(festival)
        clusters.removeLayer(culturel)
        clusters.removeLayer(loisirs)
        clusters.removeLayer(others)
        clusters.removeLayer(arrondissement)
    });

    $("#all").click(function() {
        clusters.addLayer(loisirs)
        clusters.addLayer(culturel)
        clusters.addLayer(festival)
        clusters.addLayer(others)
    });

    document.getElementById("arrondissement").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
        event.preventDefault();
        clusters.removeLayer(culturel)
        clusters.removeLayer(loisirs)
        clusters.removeLayer(festival)
        clusters.removeLayer(others)
        clusters.removeLayer(date)
        };
      });
      $('#filtreDate').click(function(){
        clusters.removeLayer(arrondissement)
        clusters.removeLayer(culturel)
        clusters.removeLayer(loisirs)
        clusters.removeLayer(festival)
        clusters.removeLayer(others)
      });
      $('#btn_1km').click(function(){
        clusters.removeLayer(culturel)
        clusters.removeLayer(loisirs)
        clusters.removeLayer(festival)
        clusters.removeLayer(others)
        clear();
        for (var i = 0; i < tab1km.length; i++) {
          var marker = L.marker(tab1km[i],{icon:festivalIcon}).addTo(map);
          tabMarkersRemoved.push(marker);
        };
      });
      $('#btn_2km').click(function(){
        clusters.removeLayer(culturel)
        clusters.removeLayer(loisirs)
        clusters.removeLayer(festival)
        clusters.removeLayer(others)
        clear();
        for (var i = 0; i < tab2km.length; i++) {
          var marker = L.marker(tab2km[i],{icon:festivalIcon}).addTo(map);
          tabMarkersRemoved.push(marker);
        };
      });

      $('#btn_3km').click(function(){
        clusters.removeLayer(culturel)
        clusters.removeLayer(loisirs)
        clusters.removeLayer(festival)
        clusters.removeLayer(others)
        clear();
        for (var i = 0; i < tab3km.length; i++) {
          var marker = L.marker(tab3km[i],{icon:festivalIcon}).addTo(map);
          tabMarkersRemoved.push(marker);
        };
      });

      $('#btn_4km').click(function(){
        clusters.removeLayer(culturel)
        clusters.removeLayer(loisirs)
        clusters.removeLayer(festival)
        clusters.removeLayer(others)
        clear();
        for (var i = 0; i < tab4km.length; i++) {
          var marker = L.marker(tab4km[i],{icon:festivalIcon}).addTo(map);
          tabMarkersRemoved.push(marker);
        };
      });
      $('#btn_5km').click(function(){
        clusters.removeLayer(culturel)
        clusters.removeLayer(loisirs)
        clusters.removeLayer(festival)
        clusters.removeLayer(others)
        clear();
        for (var i = 0; i < tab5km.length; i++) {
          var marker = L.marker(tab5km[i],{icon:festivalIcon}).addTo(map);
          tabMarkersRemoved.push(marker);
        };
      });
      $('#btn_6km').click(function(){
        clusters.removeLayer(culturel)
        clusters.removeLayer(loisirs)
        clusters.removeLayer(festival)
        clusters.removeLayer(others)
        clear();
        for (var i = 0; i < tab6km.length; i++) {
          var marker = L.marker(tab6km[i],{icon:festivalIcon}).addTo(map);
          tabMarkersRemoved.push(marker);
        };
      });

});


function drawData(userLocation) {
   var item, o;
   var items = events.responseJSON.features;

    for (item in items) {
        var loc = new L.LatLng(items[item].geometry.coordinates[1],items[item].geometry.coordinates[0]);
        createPolyLine(loc, userLocation);
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
    
    if(loc1.distanceTo(loc2).toFixed(0) <= 1000 ){
      tab1km.push(loc1);
    }
    if(loc1.distanceTo(loc2).toFixed(0) <= 2000 ){
      tab2km.push(loc1);
    }
    if(loc1.distanceTo(loc2).toFixed(0) <= 3000 ){
      tab3km.push(loc1);
    }
    if(loc1.distanceTo(loc2).toFixed(0) <= 4000 ){
      tab4km.push(loc1);
    }
    if(loc1.distanceTo(loc2).toFixed(0) <= 5000 ){
      tab5km.push(loc1);
    }
    if(loc1.distanceTo(loc2).toFixed(0) <= 6000 ){
      tab6km.push(loc1);
    }
    if(loc1.distanceTo(loc2).toFixed(0) > 6000){
      tab7km.push(loc1);
    }

 }

 console.log(tab6km)
 console.log(tab2km)

 $(document).ready(function(){
         $.getJSON('js/eventsGeoJson.json', {}, function(data) {
             var nav_events = $('#nav_events');
             $.each(data, function(idx, item){
               for (var i = 0; i < item.length; i++) {
                 if (item[i].properties) {
                   nav_events.append(
                     '<li onclick=""><div class="event_wrapper">'
                   + '<img class="event_img" src="'
                   + item[i].properties.image + '" alt="event_img">'
                   + '<a href="#" onclick="openMarker('+item[i].properties.id+');">'
                   + item[i].properties.title + '</a>'
                   + '<h2>' + item[i].properties.price + '</h2>'
                   + item[i].properties.arrondissement
                   + ''
                   +'</div></li>')
                 }
               }
             });
         });
});


  function openMarker(id){
        markersTab.forEach(function(marker) {
          if (marker._id == id){
               map.setView([marker._latlng.lat, marker._latlng.lng], 40);
               marker.fireEvent('click');
          }
        })
  };
 function clear(){

       for (var i = 0; i < tabMarkersRemoved.length; i++) {
         map.removeLayer(tabMarkersRemoved[i])
       }
 };



     map.addLayer(clusters);
//                   return (feature.properties.date== convertDate(dateDeb) &&
//                   feature.properties.hour.substr(0,5)==convertHour(heureDeb) &&
//                   feature.properties.category == category);
//                   }
//                   if(dateDeb != '' && heureDeb !='' && arrondissement!='Tous'){
//                     // alert('category est vide');
//                     return (feature.properties.date== convertDate(dateDeb) &&
//                     feature.properties.hour.substr(0,5)==convertHour(heureDeb) &&
//                     feature.properties.cp.substr(3,2) == arrondissement);
//                   }
//                   if (dateDeb != '' && arrondissement !='Tous' && category!='Tous'){
//
//                   // alert('heure est vide');
//                   return (feature.properties.date== convertDate(dateDeb) &&
//                   feature.properties.cp.substr(3,2)==arrondissement &&
//                   feature.properties.category == category);
//                   }
//                   if (heureDeb != '' && arrondissement !='Tous' && category!='Tous'){
//                     // alert('date est vide');
//                   return (feature.properties.hour.substr(0,5)==convertHour(heureDeb) &&
//                   feature.properties.cp.substr(3,2)==arrondissement &&
//                   feature.properties.category == category);
//                   }
//                   if (dateDeb !='' && heureDeb != ''){
//                     // alert('arrondissement et category sont vide');
//                     return (feature.properties.date== convertDate(dateDeb) &&
//                     feature.properties.hour.substr(0,5)==convertHour(heureDeb));
//                   }
//                   if (dateDeb !='' && category != 'Tous'){
//                     // alert('arrondissement et heure sont vide');
//                     return (feature.properties.date== convertDate(dateDeb) &&
//                     feature.properties.category == category);
//                   }
//                   if (dateDeb !='' && arrondissement != 'Tous'){
//                     // alert('heure et category sont vide');
//                     return (feature.properties.date== convertDate(dateDeb) &&
//                     feature.properties.cp.substr(3,2)== arrondissement);
//                   }
//                   if (heureDeb !='' && category != 'Tous'){
//                     // alert('arrondissement et date sont vide');
//                     return (feature.properties.hour.substr(0,5)==convertHour(heureDeb) &&
//                     feature.properties.category == category);
//                   }
//                   if (heureDeb !='' && arrondissement != 'Tous'){
//                     // alert('arrondissement et category sont vide');
//                     return (feature.properties.hour.substr(0,5)==convertHour(heureDeb) &&
//                     feature.properties.cp.substr(3,2) == arrondissement);
//                   }
//                   if (category !='Tous' && arrondissement != 'Tous'){
//                     // alert('heure et date sont vide');
//                     return (feature.properties.category==category &&
//                     feature.properties.cp.substr(3,2) == arrondissement);
//                   }
//                   if(dateDeb!=''){
//                     return feature.properties.date== convertDate(dateDeb);
//                   }
//                   if(heureDeb!=''){
//                     return feature.properties.hour.substr(0,5)==convertHour(heureDeb);
//                   }
//                   if(arrondissement!='Tous'){
//                     // alert(arrondissement);
//                     // alert(dateDeb);
//                     return feature.properties.cp.substr(3,2)== arrondissement;
//                   }
//                   if(category!='Tous'){
//                     return feature.properties.category== category;
//                   }
//
//                 }
//
//                 else if(feature.properties.date != null){
//                   return feature.properties.date== convertDate(dateDeb);
//
//                 }
//                 // return initialMap();
//               },
//               pointToLayer: function(feature, latlng) {
//                 if(feature.properties.category=='Culturel'){
//                   icon=culturelIcon;
//                 }
//                 if(feature.properties.category=='Loisirs'){
//                   icon=loisirsIcon;
//                 }
//                 if(feature.properties.category=='Festival'){
//                   icon=festivalIcon;
//                 }
//                 if(feature.properties.category==null){
//                   icon=othersIcon;
//                 }
//                 var marker = L.marker(latlng, {
//                       icon: icon
//                 }).on('click', function() {
//                    this.bindPopup(feature.properties.title+ "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour+ "<hr>"+feature.properties.price + "<hr>"+feature.properties.address + "<hr>"+"<a href="+feature.properties.url+ "><img width='350px' height='100px' src="+feature.properties.image+"></a>"+ "<hr>" +"<a href="+feature.properties.url+ ">\ud83d\ude33Plus de détails</a>");
//                   });
//                   marker._id = feature.properties.id;
//                   markersTab.push(marker);
//                   // markersLayer.addLayer(marker);
//                   console.log(markers);
//                   return marker
//               }
//           });
//
//           clusters.clearLayers();
//           clusters.addLayer(misAJour);
//           // map.addLayer(misAJour);
//       });
// }


function getId(){

}

function filter(){
  // alert('hello');
updateMap();
}


// // markersLayer.addTo(map);
// $(document).ready(function(){
// initialMap();
// });
