<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/> 

    <title>Créateur de cartes Altered personnalisées</title>

    <meta name="description" content="Créez vos propres cartes Altered personnalisées ! Configurez-les avec toutes les options possibles puis téléchargez-les.">
    <meta name="keywords" content="Altered, custom cards, card maker, tcg, custom, Altered Creator, altered, altered custom card, card maker, TCG, card builder">
    <meta name="author" content="github/lockaibg">
    <meta name="robots" content="index, follow">

    <link rel="stylesheet" href="../styles.css">

    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" type="image/webp" href="../images/favicon.webp" sizes="260x260">

    <!-- Données structurées pour le logo -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "url": "https://altered-custom-card.com",
      "logo": "https://altered-custom-card.com/images/favicon.webp",
      "name": "Altered Custom Cards"
    }
    </script>

</head>
<body>
  <header>
    <p>Je travaille encore sur ce site, mais vous pouvez déjà créer presque tout ce que vous voulez.</p>
    <a href="../">Version anglaise&nbsp;:&nbsp;<img src="../images/english.webp" alt="english flag" height="16"></a>
  </header>
  <h1>Altered Custom Cards</h1>
  <main>
    <div id="form">
      <form>

        <div class="field span-2">
          <input type="text" id="name" name="name" placeholder="Nom de la carte"/>
        </div>
        <br/>
        <div class="field type">
          <select id="card-type" name="card-type">
            <option value="permanent">Permanent</option>
            <option value="spell">Sort</option>
            <option value="token">Jeton</option>
            <option value="hero">Héros</option>
            <option value="character">Personnage</option>
          </select>
          <input type="text" id="card-add-type" name="card-add-type" placeholder="Type additionnel"/>
          <div class="additional-permanent">
            <select id="permanent-type" name="permanent-type">
              <option value="landmark">Repère</option>
              <option value="expedition">Expédition</option>
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
            <label for="hand-cost">Coût de main&nbsp;:</label>
            <input type="number" id="hand-cost" name="hand-cost" min="0" value="0" max="10"/>
          </div>

          <div class="field" id="reserve-cost-div">
            <label for="reserve-cost">Coût de réserve&nbsp;:</label>
            <input type="number" id="reserve-cost" name="reserve-cost" min="0" value="0" max="10"/>
          </div>
      </div>
        <div class="field span-2">
          <label for="card-image">Illustration&nbsp;:</label>
          <input type="file" id="card-image" name="card-image" accept="image/*" />
        </div>
        <div class="illu-controls">
          <div class="illus">
            <label for="illu-zoom">Taille de l’illustration</label>
            <input type="range" id="illu-zoom" name="illu-zoom" min="50" max="200" value="100">
          </div>
          <div class="illus">
            <label for="illu-offset-x">Déplacement X</label>
            <input type="range" id="illu-offset-x" name="illu-offset-x" min="-150" max="150" value="0">
          </div>
          <div class="illus">
            <label for="illu-offset-y">Déplacement Y</label>
            <input type="range" id="illu-offset-y" name="illu-offset-y" min="-150" max="150" value="0">
          </div>
        </div>

        <br/>
        <div class = "field span-2 illustration-position">
          
        </div>
        <br/>
        <div class="button-symbole">
          <button type="button" id="button-leaf">
            <img src="../images/leaf_o.webp" alt="feuille" width="20" height="20">
          </button>
          <button type="button" id="button-earth">
            <img src="../images/earth_o.webp" alt="terre" width="20" height="20">
          </button>
          <button type="button" id="button-ocean">
            <img src="../images/ocean_o.webp" alt="mer" width="20" height="20">
          </button>
          <button type="button" id="button-discard">
            <img src="../images/discard_o.webp" alt="défausse" width="20" height="20">
          </button>
          <button type="button" id="button-arrow">
            <img src="../images/arrow_o.webp" alt="flèche" width="20" height="20">
          </button>
          <button type="button" id="button-hand">
            <img src="../images/hand_o.webp" alt="main" width="20" height="20">
          </button>
          <button type="button" id="button-reserve">
            <img src="../images/reserve2_o.webp" alt="réserve" width="20" height="20">
          </button>
          <button type="button" id="button-tap">
            <img src="../images/tap_o.webp" alt="incliner" width="20" height="20">
          </button>
          <button type="button" id="button-infini">
            <img src="../images/infini_o.webp" alt="infini" width="20" height="20">
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
            <img src="../images/orange.webp" alt="orange" width="20" height="20">
          </button>
        </div>
          <br/>
        <div class="field span-2">
          <textarea id="card-effect" name="card-effect" placeholder="Effet"></textarea>
        </div>
          <br/>
        <div class="field span-2">
          <textarea id="card-lore" name="card-lore" placeholder="Lore"></textarea>
        </div>
          <br/>
        <div class="field span-2" id="card-bonus-div">
          <textarea id="card-bonus" name="card-bonus" placeholder="Effet de réserve"></textarea>
        </div>

        <div class="field span-2" style="display:flex;justify-content:center;">
          <input type="submit" id="save-card" value="Télécharger le PNG">
        </div>

      </form>
    </div>

    <div id="card-preview">
      <div class="card-illustration">
        <img alt="Illustration" src="" id="preview-illustration" height="520">
      </div>

      <div class="back-card">
        <img alt="Cadre de la carte" src="images/ordis.webp" id="card-background">
      </div>

      <div class="card-content">
        <div class="card-name"><span id="preview-name">Nom de la carte</span></div>
        <div class="card-permanent-info"><span id="preview-permanent-info"></span></div>
        <div class="zone-effect">
          <div class="card-effect"><span id="preview-effect">Texte d’effet</span></div>
          <div class="card-lore"><span id="preview-lore">Texte de lore</span></div>
        </div>
        <div class="card-bonus"><span id="preview-bonus">Texte bonus</span></div>
        <div class="card-type"><span id="preview-type">Type</span></div>
        <div class="card-hand-cost"><span id="preview-hand-cost">1</span></div>
        <div class="card-reserve-cost"><span id="preview-reserve-cost">1</span></div>
        <div class="card-leaf">
          <div class="fond-stat" id="leaf"><img src="images/leaf_small.webp" alt="fond feuille" height="31" id="leaf-background"/></div>
          <span id="preview-leaf">0</span>
        </div>
        <div class="card-earth">
          <div class="fond-stat" id="earth"><img src="images/earth_small.webp" alt="fond terre" height="31" id="earth-background"/></div>
          <span id="preview-earth">0</span>
        </div>
        <div class="card-ocean">
          <div class="fond-stat" id="ocean"><img src="images/ocean_small.webp" alt="fond mer" height="31" id="ocean-background"/></div>
          <span id="preview-ocean">0</span>
        </div>
        <div class="card-undermark"><span id="preview-undermark">altered-custom-card.com, &copy; 2025 Equinox</span></div>
      </div>
    </div>
  </main>
  <footer>
    <p>Les données présentées sur ce site proviennent de sources publiques appartenant à Equinox. Ce site n’a aucun lien officiel avec cette société.</p>
    <ul>
      <li><img src="https://github.com/favicon.ico" alt="logo GitHub" height="16">&nbsp;<a href="https://github.com/lockaibg/altered-custom-card">GitHub</a></li>
      <li><img src="../images/discord.webp" alt="logo Discord" height="14">&nbsp;<a href="https://discordapp.com/users/517005573124784141">Discord</a></li>
    </ul>
  </footer>
  <!--script pour mettre a jour le formulaire-->
  <script src="js/update_form.js"></script>
  <!--script pour mettre a jour la preview du document-->
  <script src="js/update_preview.js"></script>
  <!--import de la bibliotheque pour le telchargement de la carte et srcipt correspondant-->
  <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
  <script src="js/save.js"></script>
</body>

</html>
