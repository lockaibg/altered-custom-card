<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/> 
    <title>Altered customs - Creating...</title>
    <link rel="stylesheet" href="styles.css">

    <link href="https://fonts.googleapis.com/css2?family=Jali+Greek:opsz,wght@8..144,100..900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

    <link rel="icon" type="image/png" href="favicon.png">
    <link rel="shortcut icon" href="favicon.png" type="image/png">

    <!--script pour mettre a jour le formulaire-->
    <script src="js/update_form.js"></script>
    <!--script pour mettre a jour la preview du document-->
    <script src="js/update_preview.js"></script>
    <!--import de la bibliotheque pour le telchargement de la carte et srcipt correspondant-->
    <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
    <script src="js/save.js"></script>

</head>
<body>
  <header>
    <p>I'm still working on this website, you can already create simple card if you want to try it. If you want to fork : github : https://github.com/lockaibg/altered-custom-card (find the TODO in the README)</p>
  </header>
  <main>
    <div id="form">
      <form>

        <div class="field span-2">
          <input type="text" id="name" name="name" placeholder="Card name"/>
        </div>
        <br/>
        <div class="field type">
          <select id="card-type" name="card-type">
            <option value="permanent">Permanent</option>
            <option value="spell">Spell</option>
            <option value="token">Token</option>
            <option value="hero">Hero</option>
            <option value="character">Character</option>
          </select>
          <input type="text" id="card-add-type" name="card-add-type" placeholder="Additional type"/>
        </div>
        <br/>
        <div class="selects">
          <div class="field faction">
            <select id="card-faction" name="card-faction">
              <option value="ordis">Ordis</option>
              <option value="bravos">Bravos</option>
              <option value="muna">Muna</option>
              <option value="lyra">Lyra</option>
              <option value="yzmir">Yzmir</option>
              <option value="axiom">Axiom</option>
            </select>
          </div>
          <div class="field rarity">
            <select id="card-rarity" name="card-rarity">
              <option value="commun">Commun</option>
              <option value="rare">Rare</option>
              <option value="unique">Unique</option>
            </select>
          </div>
      </div>
        <!-- zone dynamique injectée par JS/PHP -->
        <div class="field span-2" id="additional-type"></div>
        <div class="cost-div">
          <div class="field" id="hand-cost-div">
            <label for="hand-cost">Hand cost&nbsp;:</label>
            <input type="number" id="hand-cost" name="hand-cost" min="0" value="0" max="10"/>
          </div>

          <div class="field" id="reserve-cost-div">
            <label for="reserve-cost">Reserve cost&nbsp;:</label>
            <input type="number" id="reserve-cost" name="reserve-cost" min="0" value="0" max="10"/>
          </div>
      </div>
        <div class="field span-2">
          <label for="card-image">Illustration :</label>
          <input type="file" id="card-image" name="card-image" accept="image/*" />
        </div>
          <br/>
        <div class="button-symbole">
          <button type="button" id="button-leaf">
            <img src="images/leaf_o.png" alt="leaf" width="20" height="20">
          </button>
          <button type="button" id="button-earth">
            <img src="images/earth_o.png" alt="earth" width="20" height="20">
          </button>
          <button type="button" id="button-ocean">
            <img src="images/ocean_o.png" alt="ocean" width="20" height="20">
          </button>
          <button type="button" id="button-discard">
            <img src="images/discard_o.png" alt="discard" width="20" height="20">
          </button>
          <button type="button" id="button-arrow">
            <img src="images/arrow_o.png" alt="arrow" width="20" height="20">
          </button>
          <button type="button" id="button-hand">
            <img src="images/hand_o.png" alt="hand" width="20" height="20">
          </button>
          <button type="button" id="button-reserve">
            <img src="images/reserve2_o.png" alt="reserve" width="20" height="20">
          </button>
          <button type="button" id="button-tap">
            <img src="images/tap_o.png" alt="tap" width="20" height="20">
          </button>
          <button type="button" id="button-infini">
            <img src="images/infini_o.png" alt="infini" width="20" height="20">
          </button>
          <button type="button" id="button-orange">
            <img src="images/orange.png" alt="orange" width="20" height="20">
          </button>
        </div>
          <br/>
        <div class="field span-2">
          <textarea id="card-effect" name="card-effect" placeholder="Effect"></textarea>
        </div>
          <br/>
        <div class="field span-2">
          <textarea id="card-lore" name="card-lore" placeholder="Lore"></textarea>
        </div>
          <br/>
        <div class="field span-2" id="card-bonus-div">
          <textarea id="card-bonus" name="card-bonus" placeholder="Reserve effect"></textarea>
        </div>

        <div class="field span-2" style="display:flex;justify-content:center;">
          <input type="submit" id="save-card" value="Save PNG">
        </div>

      </form>
    </div>

    <div id="card-preview">
      <div class="card-illustration">
        <img alt="Illustration" src="images/test.png" id="preview-illustration" height="520">
      </div>

      <div class="back-card">
        <img alt="Card frame" src="images/ordis.webp" id="card-background">
      </div>

      <div class="card-content">
        <div class="card-name"><span id="preview-name">Nom de la carte</span></div>
        <div class="zone-effect">
          <div class="card-effect"><span id="preview-effect">Texte d’effet</span></div>
          <div class="card-lore"><span id="preview-lore">Texte de Lore</span></div>
        </div>
        <div class="card-bonus"><span id="preview-bonus">Texte bonus</span></div>
        <div class="card-type"><span id="preview-type">Type</span></div>
        <div class="card-hand-cost"><span id="preview-hand-cost">1</span></div>
        <div class="card-reserve-cost"><span id="preview-reserve-cost">1</span></div>
        <div class="card-leaf">
          <div class="fond-stat" id="leaf"><img src="images/leaf_small.png" alt="leaf background" height="31" id="leaf-background"/></div>
          <span id="preview-leaf">0</span>
        </div>
        <div class="card-earth">
          <div class="fond-stat" id="earth"><img src="images/earth_small.png" alt="earth background" height="31" id="earth-background"/></div>
          <span id="preview-earth">0</span>
        </div>
        <div class="card-ocean">
          <div class="fond-stat" id="ocean"><img src="images/ocean_small.png" alt="ocean background" height="31" id="ocean-background"/></div>
          <span id="preview-ocean">0</span>
        </div>
        <div class="card-undermark"><span id="preview-undermark">altered-custom-card.com, &copy; 2025 Equinox</span></div>
      </div>
    </div>
  </main>
  <footer>
    <p>The data presented on this site comes from public sources belonging to Equinox. This site has no official connection with this company.</p>
  </footer>
</body>

</html>