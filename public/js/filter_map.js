

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

             this.bindPopup(feature.properties.title+ "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour+ "<hr>"+feature.properties.price + "<hr>"+feature.properties.address + "<hr>"+"<a href="+feature.properties.url+ "><img width='350px' height='100px' src="+feature.properties.image+"></a>"+ "<hr>" +"<a href="+feature.properties.url+ ">\ud83d\ude33Plus de détails</a>");
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
             this.bindPopup(feature.properties.title+ "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour+ "<hr>"+feature.properties.price + "<hr>"+feature.properties.address + "<hr>"+"<a href="+feature.properties.url+ "><img width='350px' height='100px' src="+feature.properties.image+"></a>"+ "<hr>" +"<a href="+feature.properties.url+ ">\ud83d\ude33Plus de détails</a>");
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
             this.bindPopup(feature.properties.title+ "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour+ "<hr>"+feature.properties.price + "<hr>"+feature.properties.address + "<hr>"+"<a href="+feature.properties.url+ "><img width='350px' height='100px' src="+feature.properties.image+"></a>"+ "<hr>" +"<a href="+feature.properties.url+ ">\ud83d\ude33Plus de détails</a>");
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
               this.bindPopup(feature.properties.title+ "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour+ "<hr>"+feature.properties.price + "<hr>"+feature.properties.address + "<hr>"+"<a href="+feature.properties.url+ "><img width='350px' height='100px' src="+feature.properties.image+"></a>"+ "<hr>" +"<a href="+feature.properties.url+ ">\ud83d\ude33Plus de détails</a>");
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
                this.bindPopup(feature.properties.title+ "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour+ "<hr>"+feature.properties.price + "<hr>"+feature.properties.address + "<hr>"+"<a href="+feature.properties.url+ "><img width='350px' height='100px' src="+feature.properties.image+"></a>"+ "<hr>" +"<a href="+feature.properties.url+ ">\ud83d\ude33Plus de détails</a>");
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
               this.bindPopup(feature.properties.title+ "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour+ "<hr>"+feature.properties.price + "<hr>"+feature.properties.address + "<hr>"+"<a href="+feature.properties.url+ "><img width='350px' height='100px' src="+feature.properties.image+"></a>"+ "<hr>" +"<a href="+feature.properties.url+ ">\ud83d\ude33Plus de détails</a>");
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
    var input_date_start = document.getElementById("start");
    var input_date_end = document.getElementById("end");
    var date = L.geoJson(data, {
        filter: function(feature, layer) {
            return feature.properties.date >=input_date_start.value
            // && feature.properties.date <=input_date_end.value
        },
        pointToLayer: function(feature, latlng) {
            var marker = L.marker(latlng, {
            }).on('click', function() {
                this.bindPopup(feature.properties.title+ "<hr>"+feature.properties.date+ "<hr>"+feature.properties.hour+ "<hr>"+feature.properties.price + "<hr>"+feature.properties.address + "<hr>"+"<a href="+feature.properties.url+ "><img width='350px' height='100px' src="+feature.properties.image+"></a>"+ "<hr>" +"<a href="+feature.properties.url+ ">\ud83d\ude33Plus de détails</a>");
            });
            marker._id = feature.properties.id;
            markersTab.push(marker)
            return marker
        }
    });
//    clusters.addLayer(date); 

    map.fitBounds(events.getBounds(), {
        padding: [50, 50]
    });

   //  loisirs.addTo(map)
   //  festival.addTo(map)
   //  culturel.addTo(map)
   // arrondissement.addTo(map)
   //  others.addTo(map)
    //    a ne pas mettre au debut sinon doublon ! car aucune date n'est entre il prend les memes
//    date.addTo(map)
    $("#others").click(function() {
        clusters.addLayer(others)
        clusters.removeLayer(loisirs)
        clusters.removeLayer(festival)
        clusters.removeLayer(culturel)
        //clusters.removeLayer(arrondissement)
      //  clusters.removeLayer(not_arrondissement)
    //    clusters.removeLayer(date)
    });
    $("#culturel").click(function() {
        clusters.addLayer(culturel)
        clusters.removeLayer(loisirs)
        clusters.removeLayer(festival)
        clusters.removeLayer(others)
        clusters.removeLayer(arrondissement)
      //  clusters.removeLayer(not_arrondissement)
        clusters.removeLayer(date)
    });
    $("#loisirs").click(function() {
        clusters.addLayer(loisirs)
        clusters.removeLayer(culturel)
        clusters.removeLayer(festival)
        clusters.removeLayer(others)
        clusters.removeLayer(arrondissement)
        // map.removeLayer(not_arrondissement)
        map.removeLayer(date)
    });
    $("#festival").click(function() {
        clusters.addLayer(festival)
        clusters.removeLayer(culturel)
        clusters.removeLayer(loisirs)
        clusters.removeLayer(others)
        clusters.removeLayer(arrondissement)
    //    clusters.removeLayer(not_arrondissement)
        clusters.removeLayer(date)
    });

    $("#all").click(function() {
        clusters.addLayer(loisirs)
        clusters.addLayer(culturel)
        clusters.addLayer(festival)
        clusters.addLayer(others)
    //    clusters.addLayer(arrondissement)
  //      clusters.addLayer(not_arrondissement)
    //    clusters.addLayer(date)
    });

    document.getElementById("arrondissement").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
        event.preventDefault();
        clusters.addLayer(arrondissement)
        clusters.removeLayer(not_arrondissement)
        clusters.removeLayer(culturel)
        clusters.removeLayer(loisirs)
        clusters.removeLayer(festival)
        clusters.removeLayer(others)
        clusters.removeLayer(date)
        };
      });
      $('#filtreDate').click(function(){
        clusters.addLayer(date)
        clusters.removeLayer(not_arrondissement)
        clusters.removeLayer(arrondissement)
        clusters.removeLayer(culturel)
        clusters.removeLayer(loisirs)
        clusters.removeLayer(festival)
        clusters.removeLayer(others)
      });
      $('#btn_1km').click(function(){
        clusters.removeLayer(date)
        clusters.removeLayer(arrondissement)
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
        clusters.removeLayer(date)
        clusters.removeLayer(arrondissement)
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
        clusters.removeLayer(date)
        clusters.removeLayer(arrondissement)
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
        clusters.removeLayer(date)
        clusters.removeLayer(arrondissement)
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
        clusters.removeLayer(date)
        clusters.removeLayer(arrondissement)
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
        clusters.removeLayer(date)
        clusters.removeLayer(arrondissement)
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



    //
    // $("#others").click(function() {
    //     map.addLayer(others)
    //     map.removeLayer(loisirs)
    //     map.removeLayer(festival)
    //     map.removeLayer(culturel)
    //     map.removeLayer(arrondissement)
    //     // map.removeLayer(not_arrondissement)
    //     map.removeLayer(date)
    // });
    // $("#culturel").click(function() {
    //     map.addLayer(culturel)
    //     map.removeLayer(loisirs)
    //     map.removeLayer(festival)
    //     map.removeLayer(others)
    //     map.removeLayer(arrondissement)
    //     // map.removeLayer(not_arrondissement)
    //     map.removeLayer(date)
    // });
    // $("#loisirs").click(function() {
    //     map.addLayer(loisirs)
    //     map.removeLayer(culturel)
    //     map.removeLayer(festival)
    //     map.removeLayer(others)
    //     map.removeLayer(arrondissement)
    //     // map.removeLayer(not_arrondissement)
    //     map.removeLayer(date)
    // });
    // $("#festival").click(function() {
    //     map.addLayer(festival)
    //     map.removeLayer(culturel)
    //     map.removeLayer(loisirs)
    //     map.removeLayer(others)
    //     map.removeLayer(arrondissement)
    //     // map.removeLayer(not_arrondissement)
    //     map.removeLayer(date)
    // });
    //
    // $("#all").click(function() {
    //     map.addLayer(loisirs)
    //     map.addLayer(culturel)
    //     map.addLayer(festival)
    //     map.addLayer(others)
    //     map.addLayer(arrondissement)
    //     // map.addLayer(not_arrondissement)
    //     map.addLayer(date)
    // });
    //
    // document.getElementById("arrondissement").addEventListener("keyup", function(event) {
    //     if (event.keyCode === 13) {
    //     event.preventDefault();
    //     map.addLayer(arrondissement)
    //     map.removeLayer(not_arrondissement)
    //     map.removeLayer(culturel)
    //     map.removeLayer(loisirs)
    //     map.removeLayer(festival)
    //     map.removeLayer(others)
    //     map.removeLayer(date)
    //     alert(document.getElementById("arrondissement").value);
    //     };
    //   });
    //   $('#filtreDate').click(function(){
    //     map.addLayer(date)
    //     // map.removeLayer(not_arrondissement)
    //     map.removeLayer(arrondissement)
    //     map.removeLayer(culturel)
    //     map.removeLayer(loisirs)
    //     map.removeLayer(festival)
    //     map.removeLayer(others)
    //   });
    // $("#loisirs").click(function() {
    //     map.addLayer(loisirs)
    //     map.removeLayer(culturel)
    //     map.removeLayer(festival)
    //     map.removeLayer(others)
    //     map.removeLayer(arrondissement)
    //     // map.removeLayer(not_arrondissement)
    //     map.removeLayer(date)
    // });
    // $("#festival").click(function() {
    //     map.addLayer(festival)
    //     map.removeLayer(culturel)
    //     map.removeLayer(loisirs)
    //     map.removeLayer(others)
    //     map.removeLayer(arrondissement)
    //     // map.removeLayer(not_arrondissement)
    //     map.removeLayer(date)
    // });
    //
    // $("#all").click(function() {
    //     map.addLayer(loisirs)
    //     map.addLayer(culturel)
    //     map.addLayer(festival)
    //     map.addLayer(others)
    //     map.addLayer(arrondissement)
    //     // map.addLayer(not_arrondissement)
    //     map.addLayer(date)
    // });
    //
    // document.getElementById("arrondissement").addEventListener("keyup", function(event) {
    //     if (event.keyCode === 13) {
    //     event.preventDefault();
    //     map.addLayer(arrondissement)
    //     map.removeLayer(not_arrondissement)
    //     map.removeLayer(culturel)
    //     map.removeLayer(loisirs)
    //     map.removeLayer(festival)
    //     map.removeLayer(others)
    //     map.removeLayer(date)
    //     alert(document.getElementById("arrondissement").value);
    //     };
    //   });
    //   $('#filtreDate').click(function(){
    //     map.addLayer(date)
    //     // map.removeLayer(not_arrondissement)
    //     map.removeLayer(arrondissement)
    //     map.removeLayer(culturel)
    //     map.removeLayer(loisirs)
    //     map.removeLayer(festival)
    //     map.removeLayer(others)
    //   });
    //   // $('#clear').click(function(){
    //   //   map.removeLayer(date)
    //   //   map.removeLayer(arrondissement)
    //   //   map.removeLayer(culturel)
    //   //   map.removeLayer(loisirs)
    //   //   map.removeLayer(festival)
    //   //   map.removeLayer(others)
    //   //
    //   // });
      // $('#btn_1km').click(function(){
      //   map.removeLayer(date)
      //   map.removeLayer(arrondissement)
      //   map.removeLayer(culturel)
      //   map.removeLayer(loisirs)
      //   map.removeLayer(festival)
      //   map.removeLayer(others)
      //   clear();
      //   for (var i = 0; i < tab1km.length; i++) {
      //     var marker = L.marker(tab1km[i],{icon:festivalIcon}).addTo(map);
      //     tabMarkersRemoved.push(marker);
      //   };
      // });
      // $('#btn_2km').click(function(){
      //   map.removeLayer(date)
      //   map.removeLayer(arrondissement)
      //   map.removeLayer(culturel)
      //   map.removeLayer(loisirs)
      //   map.removeLayer(festival)
      //   map.removeLayer(others)
      //   clear();
      //   for (var i = 0; i < tab2km.length; i++) {
      //     var marker = L.marker(tab2km[i],{icon:festivalIcon}).addTo(map);
      //     tabMarkersRemoved.push(marker);
      //   };
      // });
      //
      // $('#btn_3km').click(function(){
      //   map.removeLayer(date)
      //   map.removeLayer(arrondissement)
      //   map.removeLayer(culturel)
      //   map.removeLayer(loisirs)
      //   map.removeLayer(festival)
      //   map.removeLayer(others)
      //   clear();
      //   for (var i = 0; i < tab3km.length; i++) {
      //     var marker = L.marker(tab3km[i],{icon:festivalIcon}).addTo(map);
      //     tabMarkersRemoved.push(marker);
      //   };
      // });
      //
      // $('#btn_4km').click(function(){
      //   map.removeLayer(date)
      //   map.removeLayer(arrondissement)
      //   map.removeLayer(culturel)
      //   map.removeLayer(loisirs)
      //   map.removeLayer(festival)
      //   map.removeLayer(others)
      //   clear();
      //   for (var i = 0; i < tab4km.length; i++) {
      //     var marker = L.marker(tab4km[i],{icon:festivalIcon}).addTo(map);
      //     tabMarkersRemoved.push(marker);
      //   };
      // });
      // $('#btn_5km').click(function(){
      //   map.removeLayer(date)
      //   map.removeLayer(arrondissement)
      //   map.removeLayer(culturel)
      //   map.removeLayer(loisirs)
      //   map.removeLayer(festival)
      //   map.removeLayer(others)
      //   clear();
      //   for (var i = 0; i < tab5km.length; i++) {
      //     var marker = L.marker(tab5km[i],{icon:festivalIcon}).addTo(map);
      //     tabMarkersRemoved.push(marker);
      //   };
      // });
      // $('#btn_6km').click(function(){
      //   map.removeLayer(date)
      //   map.removeLayer(arrondissement)
      //   map.removeLayer(culturel)
      //   map.removeLayer(loisirs)
      //   map.removeLayer(festival)
      //   map.removeLayer(others)
      //   clear();
      //   for (var i = 0; i < tab6km.length; i++) {
      //     var marker = L.marker(tab6km[i],{icon:festivalIcon}).addTo(map);
      //     tabMarkersRemoved.push(marker);
      //   };
      // });


});



map.addLayer(clusters);
