<header><nav >
  <ul>
    <li>
      <!-- <label>Adresse :</label><input type="text" name="adresse_search"value="votre adresse"> -->
      <!-- <div class="dropdown">
  <li id="title_secteur" class="btn dropdown-toggle" data-toggle="dropdown">Par secteur :</li>
  <div class="dropdown-menu">
      <button type="button" id="all" class="dropdown-item btn btn-primary active" value="Tout afficher">Tout afficher</button>
      <button type="button" id="culturel" class="dropdown-item btn btn-secondary" value="Culturels">Culturels</button>
      <button type="button" id="loisirs" class="dropdown-item btn btn-secondary" value="Loisirs">Loisirs</button>
      <button type="button" id="festival" class="dropdown-item btn btn-secondary" value="Festivals">Festivals</button>
      <button type="button" id="others" class="dropdown-item btn btn-secondary" value="Autres">Autres</button>
  </div>
     </div> -->
     <!-- <div class="dropdown">
   <li id="title_distance" class="btn dropdown-toggle" data-toggle="dropdown">Par distance :</li>
   <div class="dropdown-menu">
     <button type="button" id="btn_1km active" class="dropdown-item btn-km">1 km</button>
     <button type="button" id="btn_2km" class="dropdown-item btn-km" value="2">2 km</button>
     <button type="button" id="btn_3km" class="dropdown-item btn-km" value="3">3 km</button>
     <button type="button" id="btn_4km" class="dropdown-item btn-km" value="4">4 km</button>
     <button type="button" id="btn_5km" class="dropdown-item btn-km" value="5">5 km</button>
     <button type="button" id="btn_6km" class="dropdown-item btn-km" value="6">6 km</button>
   </div>
      </div> -->
      <!-- <select name="km" id="km">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select></li> -->
                      <!-- <label>Km</label>
                      <select name="km" id="km">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                      </select> -->

                      <label> Filtres:</label>
                      <button id='filter-icon' class='btn-primary' type='button' name='button' onclick="openFilters()"><i class='fas fa-filter'></i></button>
      <button id='reinitialiser' class='btn-primary' type='button' name='re-button'><i class="fas fa-redo-alt"></i></button>
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
<button id='validate-filter' class='btn-primary' type='button' name='button' onclick="filter();filter_list()"> Filtrer</button>


</nav>
</nav>


</ul>
</nav>
 

</header>
