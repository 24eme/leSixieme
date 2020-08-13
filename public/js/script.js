var btns = document.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var title = document.getElementById('title_secteur');
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  if (this.value) {
    title.innerHTML = this.value;
  }
  });
};




// function drawData(userLocation) {
//   var events = $.getJSON('eventsGeoJson.json');
//
//    var item, o;
//    var items = events.responseJSON.features;
//     for (item in items) {
//         var loc = new L.LatLng(items[item].geometry.coordinates[1],items[item].geometry.coordinates[0]);
//         createPolyLine(loc, userLocation);
//     }
//     if (nearestP != null){
//        L.Routing.control({
//          createMarker: function() { return null; },
//         waypoints: [
//           L.latLng(nearestP.lat, nearestP.lng),
//           L.latLng(userLocation.lat, userLocation.lng)
//         ]
//       }).addTo(map);
//
//       var marker = L.marker(nearestP).addTo(map);
//     }
// };
//
// function createPolyLine(loc1, loc2) {
//     if (Math.abs(loc1.lng - loc2.lng) > 180) {
//         loc1 = loc1.wrap(179, -179);
//     }
//     var latlongs = [loc1, loc2];
//
//     if(loc1.distanceTo(loc2) < nearest){
//       nearest = loc1.distanceTo(loc2);
//       nearestP = loc1;
//     //  var marker = L.marker(loc1,{icon:loisirsIcon}).addTo(map);
//     }
//
//     switch (loc1.distanceTo(loc2).toFixed(0)) {
//       case 1000:
//         tab1km.push(loc1);
//         break;
//       case 2000:
//         tab2km.push(loc1);
//         break;
//       case 3000:
//         tab3km.push(loc1);
//         break;
//       case 4000:
//         tab4km.push(loc1);
//         break;
//       case 5000:
//         tab5km.push(loc1);
//         break;
//       case 6000:
//         tab6km.push(loc1);
//         break;
//       default:
//         tab7km.push(loc1);
//     }
//  };
//
//  function openMarker(id){
//     markersTab.forEach(function(marker) {
//       if (marker._id == id){
//            marker.fireEvent('click');
//            map.setView([marker.lat],13);
//       }
//     })
//  };
//
//  function clear(){
//    for (var i = 0; i < tabMarkersRemoved.length; i++) {
//      map.removeLayer(tabMarkersRemoved[i])
//      map.setView()
//    }
//  };
//

function openFilter() {
   var filter = document.getElementById('nav_filter');
   var list = document.getElementById('nav_events');

   if (filter.style.display === 'none') {
     filter.style.width = '430px'
     filter.style.display = 'block';
     list.style.display = 'none';

   }
   else {
     filter.style.width = '0px'
     filter.style.display = 'none';
   }
};

function openList() {
   var filter = document.getElementById('nav_filter');
   var list = document.getElementById('nav_events');

   if (list.style.display === 'none') {
     list.style.width = '430px'
     list.style.display = 'block';
     filter.style.display = 'none';
   }
   else {
     list.style.width = '0px'
     list.style.display = 'none';
   }

};
function openFilters(){
   var filters=document.getElementById('open-filters');
   if(filters.style.display=='none'){
       filters.style.display='block';
   }
   else{
       filters.style.display='none';
   }
};
