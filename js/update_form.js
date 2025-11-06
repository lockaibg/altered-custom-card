window.addEventListener("DOMContentLoaded", () => {
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
    
    //affichage de la bonne carte au chargement de la page

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
});