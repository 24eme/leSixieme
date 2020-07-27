function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
        layer.setIcon(markerInfo).addTo(map);

    };
};
var markers = L.markerClusterGroup();
var markersTab = [];
var id=0;
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


var scops = $.getJSON('js/eventsGeoJson.json');
scops.then(function(data) {
    var scops = L.geoJson(data);
    var cafes = L.geoJson(data, {
        filter: function(feature, layer) {
            return feature.properties.category == "Culturel";
        },
        pointToLayer: function(feature, latlng) {
          id = markersTab.length - 1;
            var marker = L.marker(latlng, {
                icon: culturelIcon
            }).on('click', function() {
<<<<<<< HEAD
              
                  this.bindPopup(feature.properties.title+ "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour+ "<hr>"+feature.properties.price + "<hr>"+feature.properties.address + "<hr>"+"<img width='350px' height='100px' src="+feature.properties.image+">" +"<hr>"+feature.properties.description + "<hr>" +"<a href="+feature.properties.url+ ">\ud83d\ude33Plus de détails</a>").openPopup();
=======
                 this.bindPopup(feature.properties.title+ "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour + "<hr>"+feature.properties.address + "<hr>"+ "<img src="+feature.properties.image+">"+ "<hr>"+feature.properties.description).openPopup();
>>>>>>> Recherche par rayon, cluster, panel en fr, lien list a carte
            });
            marker._id = id;
            markers.addLayer(marker);
            markersTab.push(marker);
          //  return marker;
        }
    });
    var others = L.geoJson(data, {
        filter: function(feature, layer) {
            return feature.properties.category != "Culturel" || "Bar" || "Festival";
        },
        pointToLayer: function(feature, latlng) {
<<<<<<< HEAD
            return L.marker(latlng, {
            }).on('click', function() {
                this.bindPopup(feature.properties.title+ "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour+ "<hr>"+feature.properties.price + "<hr>"+feature.properties.address + "<hr>"+"<img width='350px' height='100px' src="+feature.properties.image+">" +"<hr>"+feature.properties.description+ "<hr>" +"<a href="+feature.properties.url+ ">\ud83d\ude33Plus de détails</a>").openPopup();


=======
            id = markersTab.length - 1;
            var marker = L.marker(latlng, {
            }).on('click', function() {
                 this.bindPopup(feature.properties.title + "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour + "<hr>"+feature.properties.address + "<hr>"+  "<img src="+feature.properties.image+">" + "<hr>"+feature.properties.description).openPopup();
    // <img src="feature.properties.image">" + "</a>"
    // "<a href=feature.properties.image>"
>>>>>>> Recherche par rayon, cluster, panel en fr, lien list a carte
            });
            marker._id = id;
            markers.addLayer(marker);
            markersTab.push(marker) 
        }
    });
//Filtre par distance
    // var others = L.geoJson(data, {
    //     filter: function(feature, layer) {
    //         return feature.properties.category == "Culturel" || "Bar" || "Festival";
    //     },
    //     pointToLayer: function(feature, latlng) {
    //         var marker = L.marker(latlng, {
    //         }).on('mouseover', function() {
    //              this.bindPopup(feature.properties.title + "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour + "<hr>"+feature.properties.address + "<hr>"+  "<img src="+feature.properties.image+">"
    //            + "<hr>"+feature.properties.description).openPopup();
    // // <img src="feature.properties.image">" + "</a>"
    // // "<a href=feature.properties.image>"
    //         });
    //         markers.addLayer(marker);
    //       //  return marker;
    //     }
    // });
    map.fitBounds(scops.getBounds(), {
        padding: [50, 50]
    });
    cafes.addTo(map)
    others.addTo(map)
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
    var radius = e.accuracy; //  L.circle(e.latlng, radius).addTo(map);
    L.marker(e.latlng,{icon:mylocation}).addTo(map)
    //.bindPopup("Vous êtes à " + radius + " mètres de ce lieu").openPopup();
    drawData(e.latlng);
}
map.on('locationfound', onLocationFound);
function onLocationError(e) {
   map.setView([48.853, 2.333], 13);
}
map.on('locationerror', onLocationError);

function drawData(userLocation) {

   var item, o;
   var items = scops.responseJSON.features;

    for (item in items) {
        var loc = new L.LatLng(items[item].geometry.coordinates[1],items[item].geometry.coordinates[0]);
        userLocation.lat = 48.853;
        userLocation.lng = 2.333;
        createPolyLine(loc, userLocation);
    }
    if (nearestP != null){
       L.Routing.control({
         createMarker: function() { return null; },
         routeWhileDragging: true,
         language:'fr',
        waypoints: [
          L.latLng(nearestP.lat, nearestP.lng),
          L.latLng(userLocation.lat, userLocation.lng)
        ]
      }).addTo(map);

      var s = '<p>Ce lieu est à ' + (nearestP.distanceTo(userLocation)).toFixed(0) + ' m de vous.</p>';
      var marker = L.marker(nearestP).addTo(map);
      if (marker) marker.bindPopup(s);
    }

}

var tab1km = [];
var tab2km = [];
var tab3km = [];
var tab4km = [];
var tab5km = [];
var tab6km = [];


function createPolyLine(loc1, loc2) {

    if (Math.abs(loc1.lng - loc2.lng) > 180) loc1 = loc1.wrap(179, -179);

    var latlongs = [loc1, loc2];

    if(loc1.distanceTo(loc2) < nearest){
      nearest = loc1.distanceTo(loc2);
      nearestP = loc1;
    //  var marker = L.marker(loc1,{icon:cafeIcon}).addTo(map);
    }
  //  console.log(loc1.distanceTo(loc2).toFixed(0));
    // if( 0 < loc1.distanceTo(loc2).toFixed(0) <= 1000 ){
    //   tab1km.push(loc1);
    // }
    // if( 1000 < loc1.distanceTo(loc2).toFixed(0) <= 2000 ){
    //   tab1km.push(loc1);
    // }
    // if( 2000 < loc1.distanceTo(loc2).toFixed(0) <= 3000 ){
    //   tab1km.push(loc1);
    // }
    // if( 3000 < loc1.distanceTo(loc2).toFixed(0) <= 4000 ){
    //   tab1km.push(loc1);
    // }
    // if( 4000 < loc1.distanceTo(loc2).toFixed(0) <= 5000 ){
    //   tab1km.push(loc1);
    // }
    // if( 5000 < loc1.distanceTo(loc2).toFixed(0) <= 6000 ){
    //   tab1km.push(loc1);
    // }
    if(loc1.distanceTo(loc2).toFixed(0) > 0 && loc1.distanceTo(loc2).toFixed(0) <= 1000 ){
      tab1km.push(loc1);
    }
    if(loc1.distanceTo(loc2).toFixed(0) > 1000 && loc1.distanceTo(loc2).toFixed(0) <= 2000 ){
      tab2km.push(loc1);
    }
    if(loc1.distanceTo(loc2).toFixed(0) > 2000 && loc1.distanceTo(loc2).toFixed(0) <= 3000 ){
      tab3km.push(loc1);
    }
    if(loc1.distanceTo(loc2).toFixed(0) > 3000 && loc1.distanceTo(loc2).toFixed(0) <= 4000 ){
      tab4km.push(loc1);
    }
    if(loc1.distanceTo(loc2).toFixed(0) > 4000 && loc1.distanceTo(loc2).toFixed(0) <= 5000 ){
      tab5km.push(loc1);
    }
    if(loc1.distanceTo(loc2).toFixed(0) > 5000 && loc1.distanceTo(loc2).toFixed(0) <= 6000 ){
      tab6km.push(loc1);
    }
    // console.log(tab1km)
    // console.log(tab2km)
    // console.log(tab3km)
    // console.log(tab4km)
    // console.log(tab5km)
    // console.log(tab6km)
    console.log('here')

 }




 $(document).ready(function(){
   // var scops = $.getJSON('js/eventsGeoJson.json');
   // scops.then(function(data) {
   //

         $.getJSON('js/eventsGeoJson.json', {}, function(data) {

             var $ul = $('#ct');
             $.each(data, function(idx, item){
               for (var i = 0; i < item.length; i++) {
                 if (item[i].properties) {
                   $ul.append(
                     '<li onclick=""><div class="event_wrapper">'
                   + '<img class="event_img" src="'
                   + item[i].properties.image + '" alt="event_img">'
                   + '<p class="event_date">'
                   + item[i].properties.price + '</p>'
                   + '<h2>' + item[i].properties.title + '</h2>'
                   + '<p class="detail">' + item[i].properties.price
                   + '</p>'
                   // +'<button onclick="openMarker('+ id +')">'
                   // + 'Voir plus</button>'
                   + '<a class="detail" href="#" onclick="openMarker('+i+');">Voir plus</a>'
                   +'</div></li>')
                 }
                 // $ul.append('<li style="color:black">' + item[i]['properties']['title'] + '-' + item['class'] +'</li>')
               }
             });
         });
     });


		map.addLayer(markers);

    function openMarker(id){
       markersTab.forEach(function(marker) {
         // marker.fire('click')
       marker.fireEvent('click', {latlng:marker._latlng});
         if (marker._id == id){
              marker.fireEvent('click', {latlng:marker._latlng});
            //marker.bindPopup('Your message').addTo(map).openPopup();
          //marker.fireEvent("click");
          //console.log(marker._latlng)
    // markers.fire('click');
          //  markers.fire('click', marker);
         }
    })
    };
