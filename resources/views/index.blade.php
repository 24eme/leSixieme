@extends('layouts.layout')
@section('content')
<!-- <div id="selectionBar" class="button-group">
    <div id="btn-walk" onclick="setData('walk')" class="button">walk</div>
    <div id="btn-bike" onclick="setData('bike')" class="button active">bike</div>
    <div id="btn-car" onclick="setData('car')" class="button">car</div>
    <div id="btn-transit" onclick="setData('transit')" class="button">transit</div>
</div> -->
<!-- <button type="button" id="others" class="btn btn-secondary btn_searchZone">Recherche dans cette zone</button> -->
<div id="map"></div>
<!-- Sidi -->
<!-- <div class=" col-sm-6 col-xl-8 col-lg-7 col-md-6 m-auto" id="map"></div> -->
<ul  class="nav_events  " id="nav_events"></ul>
<!-- Sidi -->
<!-- <div id='list'><ul  class="nav_events col-lg-4 col-sm-6 col-md" id="ct"></ul></div> -->
@endsection
