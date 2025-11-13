<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/> 

    <meta name="description" content="Create your own altered cards ! Custom it to the end with every possible options then download it">
    <meta name="keywords" content="Altered, custom cards, card maker, tcg, altered creator">
    <meta name="author" content="github/lockaibg">
    <meta name="robots" content="index, follow">

    <title>Altered Custom Cards Creator</title>

    <link rel="stylesheet" href="styles.css">

    <link rel="stylesheet" href="https://use.typekit.net/wzf2bom.css">
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" type="image/png" href="images/favicon.png" sizes="260x260">


    <!--script pour mettre a jour le formulaire-->
    <script src="js/update_form.js"></script>
    <!--script pour mettre a jour la preview du document-->
    <script src="js/update_preview.js"></script>
    <!--import de la bibliotheque pour le telchargement de la carte et srcipt correspondant-->
    <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
    <script src="js/save.js"></script>

    <!-- Données structurées pour le logo -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "url": "https://altered-custom-card.com",
      "logo": "https://altered-custom-card.com/images/favicon.png",
      "name": "Altered Custom Cards"
    }
    </script>

</head>
<body>
  <header>
    <p>I'm still working on this website, you can already create almost everything you want.</p>
  </header>
  <h1>Altered Custom Cards</h1>
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
          <div class="additional-permanent">
            <select id="permanent-type" name="permanent-type">
              <option value="landmark">Landmarks</option>
              <option value="expedition">expedition</option>
            </select>
          </div>
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
        <!-- zone dynamique injectée par JS -->
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
        <div class="illu-controls">
          <div class="illus">
            <label for="illu-zoom">Illustration size</label>
            <input type="range" id="illu-zoom" name="illu-zoom" min="50" max="200" value="100">
          </div>
          <div class="illus">
            <label for="illu-offset-x">X transformation</label>
            <input type="range" id="illu-offset-x" name="illu-offset-x" min="-150" max="150" value="0">
          </div>
          <div class="illus">
            <label for="illu-offset-y">Y transformation</label>
            <input type="range" id="illu-offset-y" name="illu-offset-y" min="-150" max="150" value="0">
          </div>
        </div>

        <br/>
        <div class = "field span-2 illustration-position">
          
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
          <div class="number-select">
            <!-- ton vrai select, utilisé par le JS -->
            <select id="number" name="number">
              <option value="x">X</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </div>

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
        <div class="card-permanent-info"><span id="preview-permanent-info"></span></div>
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
    <ul>
      <li><img src="https://github.com/favicon.ico" alt="github logo" height="16">&nbsp;<a href="https://github.com/lockaibg/altered-custom-card">GitHub</a></li>
      <li><img src="images/discord.png" alt="discord logo" height="14">&nbsp;<a href="https://discordapp.com/users/517005573124784141">Discord</a></li>
    </ul>
  </footer>
</body>

</html>