<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/> 
    <title>Creating...</title>
    <link rel="stylesheet" href="../styles.css">    
    <script>
        window.onload = function () {
            document.getElementById("card-type").addEventListener("change", (e) => {
                var value = e.target.value;
                switch(value) {
                    case "token":
                        fetch(`update.php?type[]=stats&type[]=token`)
                        .then(response => response.text())
                        .then(html => {
                            document.getElementById("additional-type").innerHTML = html;
                        });
                        break;
                    case "character":
                        fetch(`update.php?type=stats`)
                        .then(response => response.text())
                        .then(html => {
                            document.getElementById("additional-type").innerHTML = html;
                        });
                        break;
                    default:
                        document.getElementById("additional-type").innerHTML = "";
                        break;
                }
            });
        }
    </script>
</head>
<body>
        <label for="name">Card name</label>
        <input type="text" id="lognamein" name="name"/>
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
        <label for="card-background">Faction :</label>
        <select id="card-background" name="card-background">
            <option value="ordis">Ordis</option>
            <option value="bravos">Bravos</option>
            <option value="muna">Muna</option>
            <option value="lyra">Lyra</option>
            <option value="yzmir">Yzmir</option>
            <option value="axiom">Axiom</option>
        </select>
        <br/><br/>
        <label for="hand-cost">Hand cost :</label>
        <input type="number" id="hand-cost" name="hand-cost" min="0" value="0" max="10"/>
        <br/><br/>
        <label for="reserve-cost">Reserve cost :</label>
        <input type="number" id="reserve-cost" name="reserve-cost" min="0" value="0" max="10"/>
        <br/><br/>
        <label for="card-image">Illustration :</label>
        <input type="file" id="card-image" name="card-image" accept="image/*" />
        <br/><br/>
    <form method="POST" action="saveFile.php" id="create-card-form">    
        <input type="submit" value="Save">
    </form>
</body>
</html>