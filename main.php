<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/> 
    <title>Creating...</title>
    <link rel="stylesheet" href="../styles.css">    
    <script>
        window.onload = function () {
            var type = document.getElementById("card-type").value;
            const container = document.getElementById("additional-type");
            //supprimer les éléments pour hero
            if(type === "hero") {
                document.getElementById("hand-cost-div").innerHTML = "";
                document.getElementById("reserve-cost-div").innerHTML = "";
                document.getElementById("card-bonus-div").innerHTML = "";
            } else if (document.getElementById("hand-cost-div").innerHTML === ""){
                document.getElementById("hand-cost-div").innerHTML = '<br/><label for="hand-cost">Hand cost :</label><input type="number" id="hand-cost" name="hand-cost" min="0" value="0" max="10"/><br/>';
                document.getElementById("reserve-cost-div").innerHTML = '<br/><label for="reserve-cost">Reserve cost :</label><input type="number" id="reserve-cost" name="reserve-cost" min="0" value="0" max="10"/><br/>';
                document.getElementById("card-bonus-div").innerHTML = '<br/><label for="card-bonus">Reserve effect :</label><textarea id="card-bonus" name="card-bonus"></textarea><br/>';
            }
            //vérification du type sélectionné au load de la page
            fetch(`update.php?type=${type}`)
                .then(response => response.text())
                .then(html => {
                    container.innerHTML = html;
                    //si on a sélectionné un token on ajoute aussi un listener sur le type du token
                        const token = container.querySelector("#token-type");
                        if(token) {
                            token.addEventListener("change", (e) => {
                                const token_type = e.target.value;
                                fetch(`token_type.php?type=${token_type}`)
                                    .then(response => response.text())
                                    .then(html => {
                                        document.getElementById("additional-token").innerHTML = html;
                                    });
                            });
                        }
                });
            //quand card-type est modifié on ajoute ou supprime le php correspondant au type sélectionné
            document.getElementById("card-type").addEventListener("change", (e) => {
                type = e.target.value;
                //supprimer les éléments pour hero
                if(type === "hero") {
                    document.getElementById("hand-cost-div").innerHTML = "";
                    document.getElementById("reserve-cost-div").innerHTML = "";
                    document.getElementById("card-bonus-div").innerHTML = "";
                } else if (document.getElementById("hand-cost-div").innerHTML === ""){
                    document.getElementById("hand-cost-div").innerHTML = '<br/><label for="hand-cost">Hand cost :</label><input type="number" id="hand-cost" name="hand-cost" min="0" value="0" max="10"/><br/>';
                    document.getElementById("reserve-cost-div").innerHTML = '<br/><label for="reserve-cost">Reserve cost :</label><input type="number" id="reserve-cost" name="reserve-cost" min="0" value="0" max="10"/><br/>';
                    document.getElementById("card-bonus-div").innerHTML = '<br/><label for="card-bonus">Reserve effect :</label><textarea id="card-bonus" name="card-bonus"></textarea><br/>';
                }
                fetch(`update.php?type=${type}`)
                    .then(response => response.text())
                    .then(html => {
                        container.innerHTML = html;
                        //si on a sélectionné un token on ajoute aussi un listener sur le type du token
                        const token = container.querySelector("#token-type");
                        if(token) {
                            token.addEventListener("change", (e) => {
                                const token_type = e.target.value;
                                fetch(`token_type.php?type=${token_type}`)
                                    .then(response => response.text())
                                    .then(html => {
                                        document.getElementById("additional-token").innerHTML = html;
                                    });
                            });
                        }
                    });
            });
        }
        
    </script>
</head>
<body>
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
    <label for="card-background">Faction :</label>
    <select id="card-background" name="card-background">
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
</body>
</html>