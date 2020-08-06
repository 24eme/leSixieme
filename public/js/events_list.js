$.getJSON('js/eventsGeoJson.json', {}, function(data) {
var nav_events = $('#nav_events');

$.each(data, function(idx, item){
  for (var i = 0; i < item.length; i++) {
    if (item[i].properties) {
      nav_events.append('<li onclick=""><div class="event_wrapper">'
               + '<div class="img_wrapper"><img class="event_img" src="'
               + item[i].properties.image + '" alt="event_img"></div>'
               + '<a href="#" onclick="openMarker('+item[i].properties.id+');">'
               + item[i].properties.title + '</a>'
               + '<h2>' + item[i].properties.price + '</h2>'
               + + item[i].properties.arrondissement
               + '</p>'
               +'</div></li>')
    }
  }
});

});
