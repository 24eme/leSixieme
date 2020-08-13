@extends('layouts.layout')
@section('content')

<div id="selectionBar" class="button-group">
    <!-- <div id="btn-walk" onclick="setData('walk')" class=" btn-routing button"><img class="icon-alt" src="{{ asset('img/biking-icon.png') }}" alt=""></div>
    <div id="btn-bike" onclick="setData('bike')" class="btn-routing button active"><img class="icon-alt" src="{{ asset('img/walking-icon.png') }}" alt=""></div>
    <div id="btn-car" onclick="setData('car')" class=" btn-routing button"><i class="fas fa-car"></i></div> -->
    <!-- <div id="btn-transit" onclick="setData('transit')" class="btn-routing button"><i class="fas fa-train"></i></div> -->
    <div id="btn-transit" onclick="removeArrond()" class="btn-routing button"><img class="icon-alt" src="{{ asset('img/Arrange_layer_layers-512.png') }}" alt=""></div>
</div>
<!-- <div class="legend">
    <div class="container" id="thirty-label"><label for="">5 min</label></div>
    <div class="container" id="fifteen-label"><label for="">15 min</label></div>
    <div class="container" id="five-label"><label for="">30 min</label></div>

</div> -->
<!-- <button type="button" id="others" class="btn btn-secondary btn_searchZone">Recherche dans cette zone</button> -->
<div id="map"></div>
<!-- Sidi -->
<!-- <div class=" col-sm-6 col-xl-8 col-lg-7 col-md-6 m-auto" id="map"></div> -->
<ul  class="nav_events  " id="nav_events"></ul>
<!-- Sidi -->
<!-- <div id='list'><ul  class="nav_events col-lg-4 col-sm-6 col-md" id="ct"></ul></div> -->
@endsection
