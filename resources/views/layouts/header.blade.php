<header>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark m-auto">
  <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarMenu">
       <span class="navbar-toggler-icon"></span>
   </button>
    <div class="collapse navbar-collapse" id="navbarMenu">
  <ul>
    <li>
            <label>Date Debut:</label> <input type="date" id="dateDeb"value="date de début">
            <label>Heure Debut:</label> <input type="time" id="heureDeb"value="heure de début">
            <label>Catégorie:</label>
            <select name="category" id="category" placeholder='Tous'>
                  <option value="Tous">Tous</option>
                  <option value="Loisirs">Loisirs</option>
                  <option value="Festival">Festival</option>
                  <option value="Culturel">Culturel</option>

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
             <button id='validate-filter' class='btn' type='button' name='button' onclick="filter();filter_list()"> Filtrer</button>


            <button id='reinitialiser'class='btn' type='button' name='re-button'><i class="fas fa-redo-alt"></i></button>

            <label id='rayonkm'> Rayon Km:</label>
            <select name="km" id="km">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
            </select>
    </li>

    <hr>


</ul>
   </div>
</nav>




</header>
