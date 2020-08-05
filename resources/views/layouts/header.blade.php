<header>
<nav >
  <ul>
    <li>
      <label>Adresse :</label><input type="text" name="adresse_search"value="votre adresse">
      <label>Km:</label>
      <select name="km" id="km">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
      </select>
      <label>Filtres :</label>
      <button id='filter-icon' class='btn-primary' type='button' name='button' onclick="openFilters()"><i class='fas fa-filter'></i></button>

      </li>

      <nav id='open-filters' style="display:none">
            <hr>
            <li>
              <label>Date Debut:</label> <input type="date" id="dateDeb"value="date de début">
              <!-- <label>Date Fin:</label> <input type="date" id="dateFin"value="date de fin"> -->
              <label>Heure Debut:</label> <input type="time" id="heureDeb"value="heure de début">

            </li>
            <nav>
              <!-- <label>Price :</label> <input type="text" id="prix"value="prix"> -->
              <label>Category:</label>
              <select name="category" id="category" placeholder='Tous'>
                    <option value="Tous">Tous</option>
                    <option value="Loisirs">Loisirs</option>
                    <option value="Festival">Festival</option>
                    <option value="Culturel">Culturel</option>
                    <!-- <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option> -->
              </select>
              <label>Arrondissement:</label>
              <select name="arrondissement" id="arrondissement">
                <option value="Tous">Tous</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
              </select>
            </li>
            <button id='validate-filter' class='btn-primary' type='button' name='button' onclick="filter()"> Filtrer</button>


          </nav>
          </nav>


     </ul>
   </nav>

     <script>
     function openFilters(){
       var filters=document.getElementById('open-filters');
       if(filters.style.display=='none'){
         filters.style.display='block';
       }
       else{
           filters.style.display='none';
       }
     }
     </script>


<!-- <nav class="navbar navbar-light bg-light">
  <ul class=""> -->

    <!-- <li class="nav-item"><label for="">Nom :</label><input type="text" name="name_search" value="Recherche par nom"></li> -->
    <!-- <li class="nav-item"><label for="">Secteur :</label><select class="" name=""><option id="culture" value="Culture">Culture</option><option id="fete" value="Informatique">Fete</option></select></li> -->
    <!-- <li class="nav-item"><label for="">Arrondisement :</label><input type="text" id="arrondissement" placeholder="09"></li>
    <li class="nav-item"><label for="">Date de début: </label><input type="date" id="start" name="trip-start" value="2020-01-01"></li>
    <li class="nav-item"><label for="">Date de fin: </label><input type="date" id="end" name="trip-end" value="2020-01-01"></li>
    <li class="nav-item"><label for=""></label> <button type="button" id="filtreDate" class="btn btn-primary active">Filtrer</button></li>

  </ul>
</nav>

<div class="btn-group floating-group">
    <button type="button" id="all" class="btn btn-primary active">Tout afficher</button>
    <button type="button" id="culturel" class="btn btn-secondary">Culturels</button>
    <button type="button" id="loisirs" class="btn btn-secondary">Loisirs</button>
    <button type="button" id="festival" class="btn btn-secondary">Festivals</button>
    <button type="button" id="others" class="btn btn-secondary">Autres</button>

</div>
<div class="btn-group">
    <button type="button" id="btn_1km" class="btn active">< 1 km</button>
    <button type="button" id="btn_2km" class="btn">< 2 km</button>
    <button type="button" id="btn_3km" class="btn">< 3 km</button>
    <button type="button" id="btn_4km" class="btn">< 4 km</button>
    <button type="button" id="btn_5km" class="btn">< 5 km</button>
    <button type="button" id="btn_6km" class="btn">< 6 km</button>
</div> -->

<!--
<ul>
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
</ul> -->

  <!-- <li >Par secteur :</li>
  <li>Par distance:</li>
</ul>
<button class="btn" type="button" name="button"><span><i class="fas fa-list-ul"></i></span></button>

<div class="btn-group floating-group">
    <button type="button" id="all" class="btn btn-primary active">Tout afficher</button>
    <button type="button" id="culturel" class="btn btn-secondary">Culturels</button>
    <button type="button" id="loisirs" class="btn btn-secondary">Loisirs</button>
    <button type="button" id="festival" class="btn btn-secondary">Festivals</button>
    <button type="button" id="familial" class="btn btn-secondary">Familial</button>
    <button type="button" id="others" class="btn btn-secondary">Autres</button>
</div>
<div class="btn-group">
    <button type="button" id="btn_1km active" class="btn">< 1 km</button>
    <button type="button" id="btn_2km" class="btn">< 2 km</button>
    <button type="button" id="btn_3km" class="btn">< 3 km</button>
    <button type="button" id="btn_4km" class="btn">< 4 km</button>
    <button type="button" id="btn_5km" class="btn">< 5 km</button>
    <button type="button" id="btn_6km" class="btn">< 6 km</button>
</div> -->

</header>
