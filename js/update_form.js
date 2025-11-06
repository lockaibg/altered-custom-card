/* @param type : type de carte
 * @ : si hero ou token suprimer les cout de main et reserve, ainsi que l'effet bonus
 * @return : void
*/
function updateHeroToken(type) {
    if(type === "hero" || type === "token") {
        document.getElementById("hand-cost-div").innerHTML = "";
        document.getElementById("reserve-cost-div").innerHTML = "";
        document.getElementById("card-bonus-div").innerHTML = "";
    } else if (document.getElementById("hand-cost-div").innerHTML === ""){
        document.getElementById("hand-cost-div").innerHTML = '<br/><label for="hand-cost">Hand cost :</label><input type="number" id="hand-cost" name="hand-cost" min="0" value="0" max="10"/><br/>';
        document.getElementById("reserve-cost-div").innerHTML = '<br/><label for="reserve-cost">Reserve cost :</label><input type="number" id="reserve-cost" name="reserve-cost" min="0" value="0" max="10"/><br/>';
        document.getElementById("card-bonus-div").innerHTML = '<br/><label for="card-bonus">Reserve effect :</label><textarea id="card-bonus" name="card-bonus"></textarea><br/>';
    }
}

/* @param container : document.getElementById("additional-type");
 * @ : ajouter l'event listener sur les stats si elles existent
 * @return : void
*/
function addEventStats(container) {
    const ocean = container.querySelectorAll('[name="ocean"]');
    const earth = container.querySelectorAll('[name="earth"]');
    const leaf = container.querySelectorAll('[name="leaf"]');
    if(ocean) {
        ocean.forEach(el => { 
            el.addEventListener("change", (e) => {
                updateStats(e.target.value, 'ocean');
            });
        });
        earth.forEach(el => { 
            el.addEventListener("change", (e) => {
                updateStats(e.target.value, 'earth');
            });
        });
        leaf.forEach(el => { 
            el.addEventListener("change", (e) => {
                updateStats(e.target.value, 'leaf');
            });
        });
    }
}

/* @param container : document.getElementById("additional-type");
 * @ : ajouter l'event listener sur le type du token si il existe
 * @return : void
*/
function addEventToken(container) {
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
}

window.addEventListener("DOMContentLoaded", () => {
    var type = document.getElementById("card-type").value;
    const container = document.getElementById("additional-type");
    //supprimer les éléments pour hero et token
    updateHeroToken(type);

    //vérification du type sélectionné au load de la page
    fetch(`update.php?type=${type}`)
        .then(response => response.text())
        .then(html => {
            container.innerHTML = html;

            //si on a des stats on ajoute un listener sur ces dernières
            addEventStats(container);
            
            //si on a sélectionné un token on ajoute aussi un listener sur le type du token
            addEventToken(container);
        });
    
    //quand card-type est modifié on ajoute ou supprime le php correspondant au type sélectionné
    document.getElementById("card-type").addEventListener("change", (e) => {
        type = e.target.value;
        //supprimer les éléments pour hero
        updateHeroToken(type);

        fetch(`update.php?type=${type}`)
            .then(response => response.text())
            .then(html => {
                container.innerHTML = html;

                //si on a sélectionné un token on ajoute aussi un listener sur le type du token
                addEventToken(container);

                //si on a des stats on ajoute un listener sur ces dernières
                addEventStats(container);
            });
    });
});