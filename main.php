<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/> 
    <title>Creating...</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Jali+Greek:opsz,wght@8..144,100..900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">


    <!--script pour mettre a jour le formulaire-->
    <script src="js/update_form.js"></script>
    <!--script pour mettre a jour la preview du document-->
    <script src="js/update_preview.js"></script>
</head>
<body>
    <div id="form">
        <label for="name">Card name</label>
        <input type="text" id="name" name="name"/>
        <br/><br/>   
        <!--en js : modifier le formulaire pour ajouter des options ou non en fonction du type sélectionné-->
        <label for="card-type">Type :</label>
        <select id="card-type" name="card-type">
            <option value="permanent">Permanent</option>
            <option value="spell">Spell</option>
            <option value="token">Token</option>
            <option value="hero">Hero</option>
            <option value="character">Character</option>
        </select>
        <br/>
        <div id="additional-type"></div>
        <br/>
        <label for="card-faction">Faction :</label>
        <select id="card-faction" name="card-faction">
            <option value="ordis">Ordis</option>
            <option value="bravos">Bravos</option>
            <option value="muna">Muna</option>
            <option value="lyra">Lyra</option>
            <option value="yzmir">Yzmir</option>
            <option value="axiom">Axiom</option>
        </select>
        <br/><div id="hand-cost-div">
            <br/>
            <label for="hand-cost">Hand cost :</label>
            <input type="number" id="hand-cost" name="hand-cost" min="0" value="0" max="10"/>
            <br/>
        </div>
        <div id="reserve-cost-div">
            <br/>
            <label for="reserve-cost">Reserve cost :</label>
            <input type="number" id="reserve-cost" name="reserve-cost" min="0" value="0" max="10"/>
            <br/>
        </div>
        <br/>
        <label for="card-image">Illustration :</label>
        <input type="file" id="card-image" name="card-image" accept="image/*" />
        <br/><br/>
        <label for="card-effect">Effect :</label>
        <textarea id="card-effect" name="card-effect"   ></textarea>
        <br/><br/>
        <label for="card-lore">Lore :</label>
        <textarea id="card-lore" name="card-lore"></textarea>
        <br/><div id="card-bonus-div">
            <br/>
            <label for="card-bonus">Reserve effect :</label>
            <textarea id="card-bonus" name="card-bonus"></textarea>
            <br/>
        </div>
        <br/>
        <form method="POST" action="saveFile.php" id="create-card-form">    
            <input type="submit" value="Save">
        </form>
    </div>
    <div id="card-preview">
        <div class="card-illustration">
            <img alt="Illustration" src="images/test.png" id="preview-illustration">
        </div>

        <div class="back-card">
            <img alt="Card frame" src="images/ordis.webp" id="card-background">
        </div>

        <div class="card-content">
            <div class="card-name"><span id="preview-name">Nom de la carte</span></div>
            <div class="card-effect"><span id="preview-effect">Texte d’effet</span></div>
            <div class="card-type"><span id="preview-type">Type</span></div>
            <div class="card-hand-cost"><span id="preview-hand-cost">1</span></div>
            <div class="card-reserve-cost"><span id="preview-reserve-cost">1</span></div>
            <div class="card-earth"><span id="preview-earth">0</span></div>
            <div class="card-leaf"><span id="preview-leaf">0</span></div>
            <div class="card-ocean"><span id="preview-ocean">0</span></div>
        </div>
    </div>
</body>
</html>