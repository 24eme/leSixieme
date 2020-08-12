@extends('layouts.layout')
@section('content') 
<div id="selectionBar" class="button-group">
    <div id="btn-walk" onclick="setData('walk')" class="button">walk</div>
    <div id="btn-bike" onclick="setData('bike')" class="button active">bike</div>
    <div id="btn-car" onclick="setData('car')" class="button">car</div>
    <div id="btn-transit" onclick="setData('transit')" class="button">transit</div>
</div>
<!-- <button type="button" id="others" class="btn btn-secondary btn_searchZone">Recherche dans cette zone</button> -->
<div id="map"></div>
<ul  class="nav_events" id="nav_events"></ul>
<ul class="nav_restaurants" id="nav_restaurants"></ul>

@endsection
