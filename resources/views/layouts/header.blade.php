<header>

<nav class="navbar navbar-light bg-light">
  <ul class="">

    <li class="nav-item"><label for="">Nom :</label><input type="text" name="name_search" value="Recherche par nom"></li>
    <li class="nav-item"><label for="">Secteur :</label><select class="" name=""><option id="culture" value="Culture">Culture</option><option id="fete" value="Informatique">Fete</option></select></li>
    <li class="nav-item"><label for="">Arrondisement :</label><input type="text" id="arrondissement" placeholder="09"></li>
    <li class="nav-item"><label for="">Date de début: </label><input type="date" id="start" name="trip-start" value="2020-01-01"></li>
    <li class="nav-item"><label for="">Date de fin: </label><input type="date" id="end" name="trip-end" value="2020-07-28"></li>
    <li class="nav-item"><label for=""></label> <button type="button" id="filtreDate" class="btn btn-primary active">Filtrer</button></li>

  </ul>
</nav>
<div class="btn-group">
    <button type="button" id="all" class="btn btn-primary active">Tout afficher</button>
    <button type="button" id="culturel" class="btn btn-secondary">Culturels</button>
    <button type="button" id="loisirs" class="btn btn-secondary">Loisirs</button>
    <button type="button" id="festival" class="btn btn-secondary">Festivals</button>
    <!-- <button type="button" id="familial" class="btn btn-secondary">Familial</button> -->
    <button type="button" id="others" class="btn btn-secondary">Autres</button>
</div>
<div class="btn-group">
    <button type="button" id="btn_1km active" class="btn">< 1 km</button>
    <button type="button" id="btn_2km" class="btn">< 2 km</button>
    <button type="button" id="btn_3km" class="btn">< 3 km</button>
    <button type="button" id="btn_4km" class="btn">< 4 km</button>
    <button type="button" id="btn_5km" class="btn">< 5 km</button>
    <button type="button" id="btn_6km" class="btn">< 6 km</button>
</div>

</header>
