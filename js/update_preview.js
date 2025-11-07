//taille d'une carte
const WIDTH = 372;
const HEIGHT = 520;

//position de la premiere carte de chaque type
const character = 2;
const permanent = 6;
const spell = 10;
const hero = 12;
const token = 13;

let bool_bonus = false; // true si la case de bonus est active false sinon
let current_position; // la position actuelle de la carte sur la spritesheet

/* @param position : position de la carte voulue sur la spritsheet
 * @ : trouver la coordonnée de la carte sur la spritsheet
 * @return : coordinates = {row_coordinates, column coordinates}
*/
function findCoordonates(position) {
    current_position = position;
    const row_position = position % 6;
    const column_position = Math.floor(position / 6);
    const coordinates = {
        row_coordinates: row_position * WIDTH,
        column_coordinates: column_position * HEIGHT
    }
    return (coordinates);
}

/* @param value : type de carte
 * @param img : <img alt="Card frame" src="images/ordis.webp" id="card-background">
 * @ : utilisé pour update le type de carte
 * @return : void
*/
function updateCardType(value, img) {
    var coordinates;
    switch(value) {
        case "character":
            coordinates = findCoordonates(character);
            break;
        case "permanent":
            coordinates = findCoordonates(permanent);
            break;
        case "spell":
            coordinates = findCoordonates(spell);
            break;
        case "hero":
            coordinates = findCoordonates(hero);
            break;
        case "token":
            coordinates = findCoordonates(token);
            break;
    }
    img.style.top = `-${coordinates.column_coordinates}px`;
    img.style.left = `-${coordinates.row_coordinates}px`;
    document.getElementById("preview-type").innerHTML = value;
}

/* @param stat : valeur de la stat (0-10)
 * @param type : "DELETE" : suprimer les valeures or "ALL" mettre tout a 0 or mettre la update la stat de ce type
 * @ : utilisé pour update les stats
 * @return : void
*/
function updateStats(stat, type) {
    if(type === "DELETE") {
        document.getElementById("preview-earth").innerHTML = "";
        document.getElementById("preview-ocean").innerHTML = "";
        document.getElementById("preview-leaf").innerHTML = "";
    } else if (type === "ALL") {
        document.getElementById("preview-earth").innerHTML = stat;
        document.getElementById("preview-ocean").innerHTML = stat;
        document.getElementById("preview-leaf").innerHTML = stat;
    } else {
        var stat_preview = document.getElementById(`preview-${type}`);
        stat_preview.innerHTML = stat;
    }
}

/* @param type : "HAND" or "RESERVE" or "BOTH"
 * @param value : integer
 * @ : changer la valeure d'un ou des couts de mana sur la preview
 * @return : void
*/
function updateMana(type, value) {
    if(type === "BOTH") {
        document.getElementById("preview-hand-cost").innerHTML = value;
        document.getElementById("preview-reserve-cost").innerHTML = value;
    } else {
        document.getElementById(`preview-${type.toLowerCase()}-cost`).innerHTML = value;
    }
}

/* @param img : <img alt="Card frame" src="images/ordis.webp" id="card-background">
 * @param faction : faction a mettre
 * @ : changer la carte pour une autre faction
 * @return : void
*/
function updateFaction(img, faction) {
    img.src = `images/${faction}.webp`;
}

/* @param text : text a mettre a jour
 * @ : utilisé pour update le nom des cartes
 * @return : void
*/
function updateName(text) {
    const zone = document.getElementById("preview-name");
    zone.innerHTML = text;
}

/* @param text : text a mettre a jour
 * @ : utilisé pour update l'effet
 * @return : void
*/
function updateEffect(text) {
    const zone = document.getElementById("preview-effect");
    zone.innerHTML = text;
}

/* @param text : text a mettre a jour
 * @ : utilisé pour update le lore
 * @return : void
*/
function updateLore(text) {
    const zone = document.getElementById("preview-lore");
    if(zone)
        zone.innerHTML = text;
}

/* @param text : text a mettre a jour
 * @param img : <img alt="Card frame" src="images/ordis.webp" id="card-background">
 * @ : utilisé pour update le bonus de reserve
 * @ : monte le text d'effet et de lore de 40px pour ajouter la zone de bonus et la redescent pour l'enlever
 * @return : void
*/
function updateBonus(text, img) {
    if(!bool_bonus && text !== "") { 
        let coordinates = findCoordonates(current_position - 2); // position - 2 = carte avec case d'effet bonus
        img.style.top = `-${coordinates.column_coordinates}px`;
        img.style.left = `-${coordinates.row_coordinates}px`;
        bool_bonus = true;
        let effect = document.getElementsByClassName("card-effect")[0];
        let lore = document.getElementsByClassName("card-lore")[0];
        let currentTopEffect = parseInt(window.getComputedStyle(effect).top);
        let currentTopLore = parseInt(window.getComputedStyle(lore).top)
        console.log(currentTopEffect);
        console.log(currentTopLore);
        effect.style.top = (currentTopEffect - 40) + "px";
        lore.style.top = (currentTopLore - 40) + "px";
    } else if(text === "" && bool_bonus) {
        let coordinates = findCoordonates(current_position + 2); // position + 2 = carte sans case d'effet bonus
        img.style.top = `-${coordinates.column_coordinates}px`;
        img.style.left = `-${coordinates.row_coordinates}px`;
        bool_bonus = false;
        let effect = document.getElementsByClassName("card-effect")[0];
        let lore = document.getElementsByClassName("card-lore")[0];
        let currentTopEffect = parseInt(window.getComputedStyle(effect).top);
        let currentTopLore = parseInt(window.getComputedStyle(lore).top)
        effect.style.top = (currentTopEffect + 40) + "px";
        lore.style.top = (currentTopLore + 40) + "px";
    }
    const zone = document.getElementById("preview-bonus");
    if(zone)
        zone.innerHTML = text;
}

/* @param file : image importé
 * @ : mettre l'image importé par l'utilisateur 
 * @ : TODO : vérifier que c'est bien une image valide
 * @return : void
*/
function updateIllustration(file) {
    const img = document.getElementById("preview-illustration");
    if (!file) return;
    const url = URL.createObjectURL(file);
    img.src = url;
}

window.addEventListener("DOMContentLoaded", () => {
    const img = document.getElementById("card-background");

    //au chargement de la page afficher la carte correspondante
    updateCardType(document.getElementById("card-type").value, img);
    updateFaction(img, document.getElementById("card-faction").value);
    if(document.getElementById("hand-cost"))
        updateMana("HAND", document.getElementById("hand-cost").value);
    if(document.getElementById("reserve-cost"))
        updateMana("RESERVE", document.getElementById("reserve-cost").value);
    updateName(document.getElementById("name").value);
    updateEffect(document.getElementById("card-effect").value);
    updateLore(document.getElementById("card-lore").value);
    if(document.getElementById("card-bonus"))
        updateBonus(document.getElementById("card-bonus").value, img);
    if(document.getElementById("card-image"))
        updateIllustration(document.getElementById("card-image").files[0]);

    if(document.getElementById("card-type").value !== "token" && document.getElementById("card-type").value !== "character") 
        updateStats(0, "DELETE");

    //quand un element est changé faire l'update
    if(document.getElementById("card-type")){
        document.getElementById("card-type").addEventListener("change", (e) => {
            const type_value = e.target.value;
            updateCardType(type_value, img);

            //update des stats en fonction du type sélectionné
            if(type_value !== "character" && type_value !== "token" )
                updateStats(0, "DELETE");
            else 
                updateStats(0, "ALL");
        });
    }
    if(document.getElementById("card-faction")){
        document.getElementById("card-faction").addEventListener("change", (e) => {
            const type_value = e.target.value;
            updateFaction(img, type_value);
        });
    }
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
    if(document.getElementById("name")) {
        document.getElementById("name").addEventListener("input", (e) => {
            updateName(e.target.value);
        });
    }
    if(document.getElementById("card-effect")){
        document.getElementById("card-effect").addEventListener("input", (e) => {
            updateEffect(e.target.value);
        });
    }
    if(document.getElementById("card-lore")){
        document.getElementById("card-lore").addEventListener("input", (e) => {
            updateLore(e.target.value);
        });
    }
    if(document.getElementById("card-bonus")) {
        document.getElementById("card-bonus").addEventListener("input", (e) => {
            updateBonus(e.target.value, img);
        });
    }
    if(document.getElementById("card-image")) {
        document.getElementById("card-image").addEventListener("change", (e) => {
            console.log("qzf");
            const file = e.target.files[0];
            updateIllustration(file);
        });
    }
});