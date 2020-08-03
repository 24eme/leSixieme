<header>

<nav class="nav_filter navbar navbar-light" id="nav_filter">
  <ul class="">

    <!-- <li class="nav-item"><label for="">Nom :</label><input type="text" name="name_search" value="Recherche par nom"></li> -->
    <!-- <li class="nav-item"><label for="">Secteur :</label><select class="" name=""><option id="culture" value="Culture">Culture</option><option id="fete" value="Informatique">Fete</option></select></li> -->
    <!-- <li class="nav-item"><form autocomplete="off" action="/action_page.php"><span id="text_container"><label>750</label><input id="myInput" type="text" name="arrondissement" placeholder="75009"></span></form></li> -->
    <!-- <li class="nav-item"><input type="text" name="arrondissement" placeholder="75009"></li> -->
    <li class="nav-item"><label for="">Arrondissement :</label><input type="text" id="arrondissement" placeholder="09"></li>
    <li class="nav-item"><label for="">Date de début: </label></li>
    <li class="nav-item"><input type="date" id="start" name="trip-start" value="2020-01-01"></li>
    <li class="nav-item"><label for="">Date de fin: </label></li>
    <li class="nav-item"><input type="date" id="end" name="trip-end" value="2020-01-01"></li>
    <button type="button" id="btn_filtrer" class="btn  active">Filtrer</button>


  </ul>
</nav>

<div class="icon_wrapper">
  <button id="filter-icon" class="btn" type="button" name="button" onclick="openFilter()"><i class="fas fa-filter"></i></button>
  <button id="list-icon" class="btn" type="button" name="button" onclick="openList()"><i class="fas fa-list-ul"></i></button>
</div>

<ul class="nav_top">
  <div class="dropdown">
    <li class="btn dropdown-toggle" data-toggle="dropdown">Par secteur :</li>
    <div class="dropdown-menu">
        <button type="button" id="all" class="dropdown-item btn btn-primary active">Tout afficher</button>
        <button type="button" id="culturel" class="dropdown-item btn btn-secondary">Culturels</button>
        <button type="button" id="loisirs" class="dropdown-item btn btn-secondary">Loisirs</button>
        <button type="button" id="festival" class="dropdown-item btn btn-secondary">Festivals</button>
        <button type="button" id="others" class="dropdown-item btn btn-secondary">Autres</button>
    </div>
  </div>
  <div class="dropdown">
    <li class="btn dropdown-toggle" data-toggle="dropdown">Par distance :</li>
    <div class="dropdown-menu">
      <button type="button" id="btn_1km active" class="dropdown-item btn">< 1 km</button>
      <button type="button" id="btn_2km" class="dropdown-item btn">< 2 km</button>
      <button type="button" id="btn_3km" class="dropdown-item btn">< 3 km</button>
      <button type="button" id="btn_4km" class="dropdown-item btn">< 4 km</button>
      <button type="button" id="btn_5km" class="dropdown-item btn">< 5 km</button>
      <button type="button" id="btn_6km" class="dropdown-item btn">< 6 km</button>
    </div>
  </div>
</ul>

</header>
