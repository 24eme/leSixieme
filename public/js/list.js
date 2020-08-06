var events = $.getJSON('js/eventsGeoJson.json');

var initList= function (){
	events.then(function(data){
		list=[];
		$ul = $('#ct');
		for (var i in data['features']){
	        list.push(data['features'][i]['properties']);
	    }
	    for (var i in list){
            $ul.append(
             '<li onclick=""><div class="event_wrapper">'
            + '<img class="event_img" src="'
            + list[i]['image'] + '" alt="event_img">'
            + '<a class="event_date" href="#" onclick="openMarker('+list[i]['id']+');">'
            + list[i]['title'] + '</a>'
            + '<h2>' + list[i]['price'] + '</h2>'
            + '<p>'+list[i]['cp']
            +'</div></li>'
            );
        }

	})
}

var updateList = function(){
	events.then(function(data){
		list=[];
	    document.getElementById('ct').innerHTML="";
	    $ul = $('#ct');
	    dateDeb=document.getElementById('dateDeb').value;
	    heureDeb=document.getElementById('heureDeb').value;
	    category=document.getElementById('category').value;
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


	    for (var i in data['features']){
		    list.push(data['features'][i]['properties']);
		}
		if (dateDeb != ''){
			done=false;
    		while(done==false){
    			done=true;
				list.forEach(function(item, index, array){
					if(item.date!=convertDate(dateDeb)){
						done = false;
						list.splice(index,1);
					}
				})
			}
		}
		if (heureDeb != ''){
			done=false;
    		while(done==false){
    			done=true;
				list.forEach(function(item, index, array){
					if(item.hour.substr(0,5)!=convertHour(heureDeb)){
						done = false;
						list.splice(index,1);
					}
				})
			}
		}
		if (category != 'Tous'){
			done=false;
    		while(done==false){
    			done=true;
				list.forEach(function(item, index, array){
					if(item.category!=category){
						done=false;
						list.splice(index,1);
					}
				})
			}
		}
		if (arrondissement != 'Tous'){
			done=false;
    		while(done==false){
    			done=true;
				list.forEach(function(item, index, array){
					if(item.cp.substr(3,2)!=arrondissement){
						done=false;
						list.splice(index,1);
					}
				})
			}
		}


		for (var i in list){
	      	$ul.append(
	        '<li onclick=""><div class="event_wrapper">'
	        + '<img class="event_img" src="'
            + list[i]['image'] + '" alt="event_img">'
	        + '<a class="event_date" href="#" onclick="openMarker('+list[i]['id']+');">'
	        + list[i]['title'] + '</a>'
	        + '<h2>' + list[i]['price'] + '</h2>'
	        + '<p>'+list[i]['cp']
	        +'</div></li>'
	        );
	    }
	})
}


function filter_list(){
	updateList();
}

$(document).ready(function(){
	initList();
});
