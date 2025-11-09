//taille d'une carte
const WIDTH = 372;
const HEIGHT = 520;

//position de la premiere carte de chaque type
const character = 2;
const permanent = 6;
const spell = 10;
const hero = 12;
const token = 13;

const emojis = {
    "{o}": "images/ocean",
    "{e}": "images/earth",
    "{l}": "images/leaf",
    "{d}": "images/discard",
    "{f}": "images/arrow",
    "{r}": "images/reserve2",
    "{h}": "images/hand",
    "{t}": "images/tap",
    "\\n": "<br/>",
    "[": "<b>",
    "]": "</b>"
};

let bool_bonus = false; // true si la case de bonus est active false sinon
let current_position; // la position actuelle de la carte sur la spritesheet
let current_rarity = ""; // la rareté actuelle

/* @param texte : texte a convertir en emojis
 * @ remplacer tout les {...} du texte par les emojis correspondants
 * @return : texte_without_emoji
*/ 
function convertWithEmojis(texte, is_bonus) {
    let retour = texte;
    for (const [key, value] of Object.entries(emojis)) {
        if(value !== "<br/>" && value !== "<b>" && value !== "</b>" ) {
            if(current_rarity !== "unique" || is_bonus)
                retour = retour.replaceAll(key, `<img src="${value}.png" alt="${key}" class="emoji">&nbsp;`);
            else
                retour = retour.replaceAll(key, `<img src="${value}_b.png" alt="${key}" class="emoji">&nbsp;`);
        } else {
            retour = retour.replaceAll(key, value);
        } 
    }
    return retour;
}

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
    const effect = document.getElementsByClassName("zone-effect")[0];
    const name = document.getElementsByClassName("card-name")[0];
    const type = document.getElementsByClassName("card-type")[0];
    const hand_cost = document.getElementById("preview-hand-cost");
    const reserve_cost = document.getElementById("preview-reserve-cost");
    switch(value) {
        case "character":
            coordinates = findCoordonates(character);
            effect.style.top = "370px";
            name.style.top = "30px";
            type.style.top = "53px";
            hand_cost.innerHTML = "0";
            reserve_cost.innerHTML = "0";
            break;
        case "permanent":
            coordinates = findCoordonates(permanent);
            effect.style.top = "370px";
            name.style.top = "291px";
            type.style.top = "314px";
            hand_cost.innerHTML = "0";
            reserve_cost.innerHTML = "0";
            break;
        case "spell":
            coordinates = findCoordonates(spell);
            effect.style.top = "370px";
            name.style.top = "30px";
            type.style.top = "53px";
            hand_cost.innerHTML = "0";
            reserve_cost.innerHTML = "0";
            break;
        case "hero":
            coordinates = findCoordonates(hero);
            effect.style.top = "358px";
            name.style.top = "36px";
            type.style.top = "62px";
            hand_cost.innerHTML = "";
            reserve_cost.innerHTML = "";
            break;
        case "token":
            coordinates = findCoordonates(token);
            effect.style.top = "415px";
            name.style.top = "30px";
            type.style.top = "53px";
            hand_cost.innerHTML = "";
            reserve_cost.innerHTML = "";
            break;
    }
    img.style.top = `-${coordinates.column_coordinates}px`;
    img.style.left = `-${coordinates.row_coordinates}px`;
    const with_caps = value[0].toUpperCase() + value.substring(1); // majuscule
    document.getElementById("preview-type").innerHTML = with_caps;
    if(value === "hero") 
        document.getElementById("preview-type").innerHTML = "Héros " + document.getElementById("card-faction").value[0].toUpperCase() + document.getElementById("card-faction").value.substring(1);
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
        let els = document.getElementsByClassName("fond-stat")
        Array.prototype.forEach.call(els, function(el) {
            el.innerHTML = "";
        });  
    } else if (type === "ALL") {
        document.getElementById("preview-earth").innerHTML = stat;
        document.getElementById("preview-ocean").innerHTML = stat;
        document.getElementById("preview-leaf").innerHTML = stat;
        let els = document.getElementsByClassName("fond-stat")
        Array.prototype.forEach.call(els, function(el) {
            el.innerHTML = `<img src="images/${el.id}_normal.png" alt="${el.id} background" height="31" id="${el.id}-background"/>`;
        });  
    } else {
        var stat_preview = document.getElementById(`preview-${type}`);
        stat_preview.innerHTML = stat;
        const earth_stat = parseInt(document.getElementById("preview-earth").innerHTML);
        const ocean_stat = parseInt(document.getElementById("preview-ocean").innerHTML);
        const leaf_stat = parseInt(document.getElementById("preview-leaf").innerHTML);
        let modified = {
            "earth": false,
            "leaf": false,
            "ocean": false
        }
        //un plus grand
        if(earth_stat > ocean_stat && earth_stat > leaf_stat) {
            modified["earth"] = true;
            document.getElementById("earth").innerHTML = '<img src="images/earth_large.png" alt="earth background" height="31" id="earth-background"/>';
        } else if(ocean_stat > earth_stat && ocean_stat > leaf_stat) {
            modified["ocean"] = true;
            document.getElementById("ocean").innerHTML = '<img src="images/ocean_large.png" alt="ocean background" height="31" id="ocean-background"/>';
        } else if(leaf_stat > ocean_stat && leaf_stat > earth_stat) {
            modified["leaf"] = true;
            document.getElementById("leaf").innerHTML = '<img src="images/leaf_large.png" alt="leaf background" height="31" id="leaf-background"/>';
        }
        //un plus petit
        if(earth_stat < ocean_stat && earth_stat < leaf_stat) {
            modified["earth"] = true;
            document.getElementById("earth").innerHTML = '<img src="images/earth_small.png" alt="earth background" height="31" id="earth-background"/>';
        } else if(ocean_stat < earth_stat && ocean_stat < leaf_stat) {
            modified["ocean"] = true;
            document.getElementById("ocean").innerHTML = '<img src="images/ocean_small.png" alt="ocean background" height="31" id="ocean-background"/>';
        } else if(leaf_stat < ocean_stat && leaf_stat < earth_stat) {
            modified["leaf"] = true;
            document.getElementById("leaf").innerHTML = '<img src="images/leaf_small.png" alt="leaf background" height="31" id="leaf-background"/>';
        }
        //si ni l'un ni l'autre
        if(!modified["earth"])
            document.getElementById("earth").innerHTML = '<img src="images/earth_normal.png" alt="earth background" height="31" id="earth-background"/>';
        if(!modified["leaf"])
            document.getElementById("leaf").innerHTML = '<img src="images/leaf_normal.png" alt="leaf background" height="31" id="leaf-background"/>';
        if(!modified["ocean"])
            document.getElementById("ocean").innerHTML = '<img src="images/ocean_normal.png" alt="ocean background" height="31" id="ocean-background"/>';

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
    switch(value) {
        case "1":
            if(type === "HAND") {
                document.getElementsByClassName(`card-${type.toLowerCase()}-cost`)[0].style.left = "30px";
            } else {
                document.getElementsByClassName(`card-${type.toLowerCase()}-cost`)[0].style.left = "58px";                
            }
            break;
        case "10":
            if(type === "HAND") {
                document.getElementsByClassName(`card-${type.toLowerCase()}-cost`)[0].style.left = "22px";
            } else {
                document.getElementsByClassName(`card-${type.toLowerCase()}-cost`)[0].style.left = "53px";                
            }
            break;
        default:
            if(type === "HAND") {
                document.getElementsByClassName(`card-${type.toLowerCase()}-cost`)[0].style.left = "29px";
            } else {
                document.getElementsByClassName(`card-${type.toLowerCase()}-cost`)[0].style.left = "57px";                
            }
            break;
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
    text_emoji = convertWithEmojis(text, false);
    zone.innerHTML = text_emoji;
}

/* @param text : text a mettre a jour
 * @ : utilisé pour update le lore
 * @return : void
*/
function updateLore(text) {
    const zone = document.getElementById("preview-lore");
    if(zone) {
        if(text === "")
            zone.innerHTML = "";
        else {
            if(current_rarity !== "unique")
                zone.innerHTML = '<span style="display:inline-block; width:230px; border-bottom:1px solid black ;"></span><br/>' + text;
            else
                 zone.innerHTML = '<span style="display:inline-block; width:230px; border-bottom:1px solid white ;"></span><br/>' + text;
        }  
    }
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

        let effect = document.getElementsByClassName("zone-effect")[0];
        let current_top_effect = parseInt(window.getComputedStyle(effect).top);
        effect.style.top = (current_top_effect - 40) + "px";
        if(document.getElementById("card-type").value === "permanent") {
            let title = document.getElementsByClassName("card-name")[0];
            let type = document.getElementsByClassName("card-type")[0];
            let current_top_title = parseInt(window.getComputedStyle(title).top);
            let current_top_type = parseInt(window.getComputedStyle(type).top);
            title.style.top = (current_top_title - 34) + "px";
            type.style.top = (current_top_type - 34) + "px";
        }
    } else if(text === "" && bool_bonus) {
        let coordinates = findCoordonates(current_position + 2); // position + 2 = carte sans case d'effet bonus
        img.style.top = `-${coordinates.column_coordinates}px`;
        img.style.left = `-${coordinates.row_coordinates}px`;

        bool_bonus = false;

        let effect = document.getElementsByClassName("zone-effect")[0];
        let current_top_effect = parseInt(window.getComputedStyle(effect).top);
        effect.style.top = (current_top_effect + 40) + "px";
        if(document.getElementById("card-type").value === "permanent") {
            let title = document.getElementsByClassName("card-name")[0];
            let type = document.getElementsByClassName("card-type")[0];
            let current_top_title = parseInt(window.getComputedStyle(title).top);
            let current_top_type = parseInt(window.getComputedStyle(type).top);
            title.style.top = (current_top_title + 34) + "px";
            type.style.top = (current_top_type + 34) + "px";
        }
    }
    const zone = document.getElementById("preview-bonus");
    text_emoji = convertWithEmojis(text, true);
    if(zone)
        zone.innerHTML = text_emoji;
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

/* @param rarity : rareté sélectionné
 * @param img : document.getElementById("card-background")
 * @ : modifier la rareté de la carte
 * @return : void
*/
function updateRarity(rarity, img) {
    const effect = document.getElementsByClassName("zone-effect")[0];
    switch(rarity) {
        case "rare":
            if(current_rarity === "commun" || current_rarity === "") {
                current_rarity = "rare";
                coordinates = findCoordonates(current_position + 14);
                img.style.top = `-${coordinates.column_coordinates}px`;
                img.style.left = `-${coordinates.row_coordinates}px`;
            } else if(current_rarity === "unique") {
                current_rarity = "rare";
                coordinates = findCoordonates(current_position - 12);
                img.style.top = `-${coordinates.column_coordinates}px`;
                img.style.left = `-${coordinates.row_coordinates}px`;
            }
            effect.style.color = "#000";
            break;
        case "commun":
            if(current_rarity === "rare") {
                current_rarity = "commun";
                coordinates = findCoordonates(current_position - 14);
                img.style.top = `-${coordinates.column_coordinates}px`;
                img.style.left = `-${coordinates.row_coordinates}px`;
            } else if(current_rarity === "unique") {
                current_rarity = "commun";
                coordinates = findCoordonates(current_position - 26);
                img.style.top = `-${coordinates.column_coordinates}px`;
                img.style.left = `-${coordinates.row_coordinates}px`;
            }
            effect.style.color = "#000";
            break;
        case "unique": 
        //TODO : emoji en blanc et orange
            if(current_rarity === "rare") {
                current_rarity = "unique";
                effect.style.color = "#fff";
                coordinates = findCoordonates(current_position + 12);
                img.style.top = `-${coordinates.column_coordinates}px`;
                img.style.left = `-${coordinates.row_coordinates}px`;
            } else if(current_rarity === "commun" || current_rarity === "") {
                current_rarity = "unique";
                effect.style.color = "#fff";
                coordinates = findCoordonates(current_position + 26);
                img.style.top = `-${coordinates.column_coordinates}px`;
                img.style.left = `-${coordinates.row_coordinates}px`;
            }
            break;
    }
    updateLore(document.getElementById("card-lore").value);
    document.getElementById("preview-effect").innerHTML = convertWithEmojis(document.getElementById("card-effect").value, false);
}

window.addEventListener("DOMContentLoaded", () => {
    const img = document.getElementById("card-background");

    //au chargement de la page afficher la carte correspondante

    updateCardType(document.getElementById("card-type").value, img);    
    if(document.getElementById("card-rarity"))
        updateRarity(document.getElementById("card-rarity").value, img);
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
    else 
        updateBonus("", img);
    if(document.getElementById("card-image"))
        updateIllustration(document.getElementById("card-image").files[0]);

    if(document.getElementById("card-type").value !== "token" && document.getElementById("card-type").value !== "character") 
        updateStats(0, "DELETE");

    //quand un element est changé faire l'update
    if(document.getElementById("card-type")){
        document.getElementById("card-type").addEventListener("change", (e) => {
            const type_value = e.target.value;
            updateCardType(type_value, img);

            //mettre a jour la rareté
            if(type_value !== "hero" && type_value !== "token") {
                current_rarity = "commun";
                updateRarity(document.getElementById("card-rarity").value, img)
            }
            //update des stats en fonction du type sélectionné
            if(type_value !== "character" && type_value !== "token" )
                updateStats(0, "DELETE");
            else 
                updateStats(0, "ALL");
            bool_bonus = false;
            if(document.getElementById("card-bonus"))
                updateBonus(document.getElementById("card-bonus").value, img);
            else 
                updateBonus("", img);
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
            const file = e.target.files[0];
            updateIllustration(file);
        });
    }
    /*if(document.getElementById("card-rarity")) {
        document.getElementById("card-rarity").addEventListener("change", (e) => {
            updateRarity(e.target.value, img);
        });
    }*/
});