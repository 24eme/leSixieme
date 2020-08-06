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

<nav class="nav_filter navbar navbar-light" id="nav_filter">
  <ul class="">

    <!-- <li class="nav-item"><form autocomplete="off" action="/action_page.php"><span id="text_container"><label>750</label><input id="myInput" type="text" name="arrondissement" placeholder="75009"></span></form></li> -->
    <li class="nav-item"><input type="search" id="address-input" placeholder="Où allez-vous ?"/></li>
    <li class="nav-item"><label for="">Adresse :</label><input type="text" id="adresse" placeholder="75009"></li>
    <li class="nav-item"><label for="">Arrondissement :</label><input type="text" id="arrondissement" placeholder="09"></li>
     <li class="nav-item"><label for="">Date : </label></li>

    <!-- <li class="nav-item"><label for="">Date de début: </label></li>
    <li class="nav-item"><input type="date" id="start" name="trip-start" value="2020-01-01"></li>
    <li class="nav-item"><label for="">Date de fin: </label></li>
    <li class="nav-item"><input type="date" id="end" name="trip-end" value="2020-01-01"></li> -->
    <li class="nav-item"><input type="" id="end" name="dates" value=""></li>
    <button type="button" id="btn_filtrer" class="btn  active">Filtrer</button>


  </ul>
</nav>

<div class="icon_wrapper">
  <button id="filter-icon" class="btn-icon" type="button" name="button" onclick="openFilter()"><i class="fas fa-filter"></i></button>
  <button id="list-icon" class="btn-icon" type="button" name="button" onclick="openList()"><i class="fas fa-list-ul"></i></button>
</div>

<ul class="nav_top">
  <div class="dropdown">
    <li id="title_secteur" class="btn dropdown-toggle" data-toggle="dropdown">Par secteur :</li>
    <div class="dropdown-menu">
        <button type="button" id="all" class="dropdown-item btn btn-primary active" value="Tout">Tout afficher</button>
        <button type="button" id="culturel" class="dropdown-item btn btn-secondary" value="Culturels">Culturels</button>
        <button type="button" id="loisirs" class="dropdown-item btn btn-secondary" value="Loisirs">Loisirs</button>
        <button type="button" id="festival" class="dropdown-item btn btn-secondary" value="Festivals">Festivals</button>
        <button type="button" id="others" class="dropdown-item btn btn-secondary" value="Autres">Autres</button>
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
</header>
