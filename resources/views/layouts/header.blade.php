<header>
<nav class="navbar navbar-expand-lg navbar-dark m-auto">

  <a class="navbar-brand" href="#" style="font-size:20px;" >Le6ème</a>
  <button class="navbar-toggler d-xl-none d-lg-none" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
   <span class="navbar-toggler-icon"></span>
 </button>

  <div class="collapse navbar-collapse ml-xl-5" id="navbarSupportedContent">

    <form class="form-inline my-2 my-lg-0">

        <label>Date de Début: </label>
        <input  type="date" class="form-control i"  id="dateDeb"value="date de début">

    </form>

    <form class="form-inline my-2 my-lg-0">

      <label>Heure de Début: </label>
      <input type="time" class="form-control i"  id="heureDeb"value="heure de début">

    </form>

    <form class="form-inline my-2 my-lg-0 ">

      <label>Catégorie: </label>
      <select  name="category" class="form-control i custom-select h-50" id="category" placeholder='Tous'>
            <option value="Tous">Tous</option>
            <option value="Loisirs">Loisirs</option>
            <option value="Festival">Festival</option>
            <option value="Culturel">Culturel</option>

      </select>
    </form>
     <form class="form-inline my-2 my-lg-0">
      <label>Prix Maximum: </label>
      <select name="price" class="form-control i custom-select h-50" id="price" placeholder='Tous'>
            <option value="Tous">Tous</option>
            <option value="Gratuit">Gratuit</option>
            <option value="Moins de 10€"> Moins de 10€</option>
            <option value="Moins de 50€">Moins de 50€</option>
            <option value="Moins de 100€">Moins de 100€</option>
      </select>

    </form>
    <form class="form-inline my-2 my-lg-0 mb-2">

      <label>Arrondissement: </label>
      <select  name="arrondissement" class="form-control i custom-select h-50 " id="arrondissement" placeholder='Tous'>
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

    </form>
    <form class="form-inline my-2 my-lg-0">

         <button id='validate-filter' class='btn i'  type='button' name='button' onclick="filter();filter_list()"> Filtrer</button>
    </form>

    <form class="form-inline my-2 my-lg-0">

         <button id='reinitialiser'class='btn i'  type='button' name='re-button'><i class="fas fa-redo-alt"></i></button>

    </form>

    <form class="form-inline my-2 my-lg-0">

      <label id='rayonkm'> Rayon Km:</label>
      <select name="km" class="form-control i custom-select h-50"  id="km">
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
