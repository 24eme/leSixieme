var btns = document.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
};

function drawData(userLocation) {
   var item, o;
   var items = events.responseJSON.features;
    for (item in items) {
        var loc = new L.LatLng(items[item].geometry.coordinates[1],items[item].geometry.coordinates[0]);
        createPolyLine(loc, userLocation);
    }
    if (nearestP != null){
       L.Routing.control({
         createMarker: function() { return null; },
        waypoints: [
          L.latLng(nearestP.lat, nearestP.lng),
          L.latLng(userLocation.lat, userLocation.lng)
        ]
      }).addTo(map);

      var marker = L.marker(nearestP).addTo(map);
    }
};

function createPolyLine(loc1, loc2) {
    if (Math.abs(loc1.lng - loc2.lng) > 180) {
        loc1 = loc1.wrap(179, -179);
    }
    var latlongs = [loc1, loc2];

    if(loc1.distanceTo(loc2) < nearest){
      nearest = loc1.distanceTo(loc2);
      nearestP = loc1;
    //  var marker = L.marker(loc1,{icon:loisirsIcon}).addTo(map);
    }

    switch (loc1.distanceTo(loc2).toFixed(0)) {
      case 1000:
        tab1km.push(loc1);
        break;
      case 2000:
        tab2km.push(loc1);
        break;
      case 3000:
        tab3km.push(loc1);
        break;
      case 4000:
        tab4km.push(loc1);
        break;
      case 5000:
        tab5km.push(loc1);
        break;
      case 6000:
        tab6km.push(loc1);
        break;
      default:
        tab7km.push(loc1);
    }
 };

 function openMarker(id){
    markersTab.forEach(function(marker) {
      if (marker._id == id){
           marker.fireEvent('click');
           map.setView([marker.lat],13);
      }
    })
 };

 function clear(){
   for (var i = 0; i < tabMarkersRemoved.length; i++) {
     map.removeLayer(tabMarkersRemoved[i])
     map.setView()
   }
 };

 function openFilter() {
   var filter = document.getElementById('nav_events');
   var list = document.getElementById('nav_filter');

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
   var filter = document.getElementById('nav_events');
   var list = document.getElementById('nav_filter');

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


 function autocomplete(inp, arr) {
   /*the autocomplete function takes two arguments,
   the text field element and an array of possible autocompleted values:*/
   var currentFocus;
   /*execute a function when someone writes in the text field:*/
   inp.addEventListener("input", function(e) {
       var a, b, i, val = this.value;
       /*close any already open lists of autocompleted values*/
       closeAllLists();
       if (!val) { return false;}
       currentFocus = -1;
       /*create a DIV element that will contain the items (values):*/
       a = document.createElement("DIV");
       a.setAttribute("id", this.id + "autocomplete-list");
       a.setAttribute("class", "autocomplete-items");
       /*append the DIV element as a child of the autocomplete container:*/
       this.parentNode.appendChild(a);
       /*for each item in the array...*/
       for (i = 0; i < arr.length; i++) {
         /*check if the item starts with the same letters as the text field value:*/
         if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
           /*create a DIV element for each matching element:*/
           b = document.createElement("DIV");
           /*make the matching letters bold:*/
           b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
           b.innerHTML += arr[i].substr(val.length);
           /*insert a input field that will hold the current array item's value:*/
           b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
           /*execute a function when someone clicks on the item value (DIV element):*/
               b.addEventListener("click", function(e) {
               /*insert the value for the autocomplete text field:*/
               inp.value = this.getElementsByTagName("input")[0].value;
               /*close the list of autocompleted values,
               (or any other open lists of autocompleted values:*/
               closeAllLists();
           });
           a.appendChild(b);
         }
       }
   });
   /*execute a function presses a key on the keyboard:*/
   inp.addEventListener("keydown", function(e) {
       var x = document.getElementById(this.id + "autocomplete-list");
       if (x) x = x.getElementsByTagName("div");
       if (e.keyCode == 40) {
         /*If the arrow DOWN key is pressed,
         increase the currentFocus variable:*/
         currentFocus++;
         /*and and make the current item more visible:*/
         addActive(x);
       } else if (e.keyCode == 38) { //up
         /*If the arrow UP key is pressed,
         decrease the currentFocus variable:*/
         currentFocus--;
         /*and and make the current item more visible:*/
         addActive(x);
       } else if (e.keyCode == 13) {
         /*If the ENTER key is pressed, prevent the form from being submitted,*/
         e.preventDefault();
         if (currentFocus > -1) {
           /*and simulate a click on the "active" item:*/
           if (x) x[currentFocus].click();
         }
       }
   });
   function addActive(x) {
     /*a function to classify an item as "active":*/
     if (!x) return false;
     /*start by removing the "active" class on all items:*/
     removeActive(x);
     if (currentFocus >= x.length) currentFocus = 0;
     if (currentFocus < 0) currentFocus = (x.length - 1);
     /*add class "autocomplete-active":*/
     x[currentFocus].classList.add("autocomplete-active");
   }
   function removeActive(x) {
     /*a function to remove the "active" class from all autocomplete items:*/
     for (var i = 0; i < x.length; i++) {
       x[i].classList.remove("autocomplete-active");
     }
   }
   function closeAllLists(elmnt) {
     /*close all autocomplete lists in the document,
     except the one passed as an argument:*/
     var x = document.getElementsByClassName("autocomplete-items");
     for (var i = 0; i < x.length; i++) {
       if (elmnt != x[i] && elmnt != inp) {
       x[i].parentNode.removeChild(x[i]);
     }
   }
 }
 /*execute a function when someone clicks in the document:*/
 document.addEventListener("click", function (e) {
     closeAllLists(e.target);
 });
};

  autocomplete(document.getElementById("arrondissement"), arrondissements);
