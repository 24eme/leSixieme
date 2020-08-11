<header>
<nav class="navbar navbar-expand-lg navbar-dark ">
  <a class="navbar-brand" href="#">Les6ème</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">

    <form class="form-inline my-2 my-lg-0">
      <!-- <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"> -->
        <label>Date Debut:</label>
        <input type="date" class="form-control"  id="dateDeb"value="date de début">
      <!-- <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> -->
    </form>
    <form class="form-inline my-2 my-lg-0">
      <!-- <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"> -->
      <label>Heure Debut:</label>
      <input type="time" class="form-control"  id="heureDeb"value="heure de début">
      <!-- <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> -->
    </form>
    <form class="form-inline my-2 my-lg-0 ">
      <!-- <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"> -->
      <label>Catégorie:</label>
      <select name="category" class="form-control" id="category" placeholder='Tous'>
            <option value="Tous">Tous</option>
            <option value="Loisirs">Loisirs</option>
            <option value="Festival">Festival</option>
            <option value="Culturel">Culturel</option>

      </select>
      <!-- <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> -->
    </form>
    <form class="form-inline my-2 my-lg-0 col-xs-12">
      <!-- <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"> -->
      <label>Arrondissement:</label>
      <select name="arrondissement" class="form-control" id="arrondissement">
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
      <!-- <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> -->
    </form>
    <form class="form-inline my-2 my-lg-0">
      <!-- <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"> -->
         <button id='validate-filter' class='btn bg-success' type='button' name='button' onclick="filter();filter_list()"> Filtrer</button>
         <button id='reinitialiser'class='btn bg-primary' type='button' name='re-button'><i class="fas fa-redo-alt"></i></button>
      <!-- <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> -->
    </form>

    
    <form class="form-inline my-2 my-lg-0">

      <label id='rayonkm'> Rayon Km:</label>
      <select name="km" class="form-control"  id="km">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
      </select>

    </form>

  </div>
</nav>
</header>
