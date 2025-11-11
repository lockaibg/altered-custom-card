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
        document.getElementById("hand-cost-div").innerHTML = '<label for="hand-cost">Hand cost :</label><input type="number" id="hand-cost" name="hand-cost" min="0" value="0" max="10"/>';
        document.getElementById("reserve-cost-div").innerHTML = '<label for="reserve-cost">Reserve cost :</label><input type="number" id="reserve-cost" name="reserve-cost" min="0" value="0" max="10"/>';
        document.getElementById("card-bonus-div").innerHTML = '<textarea id="card-bonus" name="card-bonus" placeholder="Reserve effect"></textarea>';
        if(document.getElementById("hand-cost")) {
            document.getElementById("hand-cost").addEventListener("change", (e) => {
                const nb_value = e.target.value;
                updateMana("HAND", nb_value);
            });
        }
        if(document.getElementById("reserve-cost")) {
            document.getElementById("reserve-cost").addEventListener("change", (e) => {
                const nb_value = e.target.value;
                updateMana("RESERVE", nb_value);
            });
        }
        if(document.getElementById("card-bonus")) {
            document.getElementById("card-bonus").addEventListener("input", (e) => {
                updateBonus(e.target.value, document.getElementById("card-background"));
            });
        }
    }
    const fac = document.getElementById("card-faction");
    if(type === "token") {
        fac.innerHTML = '<option value="ordis">Ordis</option><option value="bravos">Bravos</option><option value="muna">Muna</option><option value="lyra">Lyra</option><option value="yzmir">Yzmir</option><option value="axiom">Axiom</option><option value="commun">Commun</option>';
    } else {
        fac.innerHTML = '<option value="ordis">Ordis</option><option value="bravos">Bravos</option><option value="muna">Muna</option><option value="lyra">Lyra</option><option value="yzmir">Yzmir</option><option value="axiom">Axiom</option>';
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
            updateTokenType();
            const token_type = e.target.value;
            if(token_type === "landmark") 
                updateStats(0, "DELETE");
            else 
                updateStats(0, "ALL");
            fetch(`token_type.php?type=${token_type}`)
                .then(response => response.text())
                .then(html => {
                    document.getElementById("additional-token").innerHTML = html;
                    addEventToken(document);
                    addEventStats(document);
                });
        });
    }
}

function updateRarityForm(type) {
    const zone = document.getElementsByClassName("rarity")[0];
    switch(type) {
        case "hero":
            zone.innerHTML = "";
            break;
        case "token":
            zone.innerHTML = "";
            break;
        case "character":
            zone.innerHTML = '<select id="card-rarity" name="card-rarity"><option value="commun">Commun</option><option value="rare">Rare</option><option value="unique">Unique</option></select>';
            break;
        default:
            zone.innerHTML = '<select id="card-rarity" name="card-rarity"><option value="commun">Commun</option><option value="rare">Rare</option></select>';
            break;
    }
    if(document.getElementById("card-rarity")) {
        document.getElementById("card-rarity").addEventListener("change", (e) => {
            updateRarity(e.target.value, document.getElementById("card-background"));
        });
    }
}

window.addEventListener("DOMContentLoaded", () => {
    let type = document.getElementById("card-type").value;
    const container = document.getElementById("additional-type");
    //supprimer les éléments pour hero et token
    updateHeroToken(type);
    updateRarityForm(type);

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
        updateRarityForm(type);

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