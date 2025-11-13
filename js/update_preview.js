//taille d'une carte
const WIDTH = 372;
const HEIGHT = 519;

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
    "{i}": "images/infini",
    "{x}": "images/chiffres/x",
    "{1}": "images/chiffres/one",
    "{2}": "images/chiffres/two",
    "{3}": "images/chiffres/three",
    "{4}": "images/chiffres/four",
    "{5}": "images/chiffres/five",
    "{6}": "images/chiffres/six",
    "{7}": "images/chiffres/seven",
    "{8}": "images/chiffres/eight",
    "{9}": "images/chiffres/nine",
    "[": "<b>",
    "]": "</b>",
    "#": '<span style="color: #826841;" id="orange-text">',
    "*": "</span>",
    "##": '<span style="color: #eccd8d;" id="orange-text">',
    "**": "</span>"
};

const emojis_reversed = {
    "ocean": "{o}",
    "earth": "{e}",
    "leaf": "{l}",
    "discard": "{d}",
    "arrow": "{f}",
    "reserve": "{r}",
    "hand": "{h}",
    "tap": "{t}",
    "infini": "{i}",
    "x": "{x}",
    "1": "{1}",
    "2": "{2}",
    "3": "{3}",
    "4": "{4}",
    "5": "{5}",
    "6": "{6}",
    "7": "{7}",
    "8": "{8}",
    "9": "{9}"
}
let bool_bonus = false; // true si la case de bonus est active false sinon
let current_position; // la position actuelle de la carte sur la spritesheet
let current_rarity = ""; // la rareté actuelle
let current_faction = "ordis";
let bool_augmented_text_area = false; // booléen pour savoir si la zone de text est grande ou pas

let lastFocusedTextarea = null; // valeur du dernier textarea focus

/* @param texte : texte a convertir en emojis
 * @ remplacer tout les {...} du texte par les emojis correspondants
 * @return : texte_without_emoji
*/ 
function convertWithEmojis(texte, is_bonus) {
    let retour = "";
    let orange = false;
    for(let i = 0; i < texte.length; i++) {
        if(texte[i] === '#') {
            if(!is_bonus)
                retour += emojis["#"];
            else
                retour += emojis["##"];
            orange = true;
            continue;
        }
        else if(texte[i] === '*') {
            if(!is_bonus)
                retour += emojis["*"];
            else
                retour += emojis["**"];
            orange = false;
            continue;
        } else if(texte[i] === '[' || texte[i] === ']') {
            retour += emojis[texte[i]];
            continue;
        }
        else if(texte[i] === "{" && i + 2 < texte.length) {
            const key = texte.substring(i, i+3);
            if(texte.substring(i+2, i+3) === '}') {
                if(orange) {
                    if(!is_bonus)
                        retour = retour + `<img src="${emojis[key]}_o.png" alt="${key}" class="emoji">`;
                    else 
                        retour = retour + `<img src="${emojis[key]}_or.png" alt="${key}" class="emoji">`;
                }
                else if(is_bonus || current_rarity === "unique") {
                    retour = retour + `<img src="${emojis[key]}_b.png" alt="${key}" class="emoji">`;
                } else {
                    retour = retour + `<img src="${emojis[key]}.png" alt="${key}" class="emoji">`;
                }
                i+=2;
                continue;
            }
        }
        retour+=texte[i];
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
    const with_caps = value[0].toUpperCase() + value.substring(1); // majuscule
    document.getElementById("preview-type").innerHTML = with_caps;
    var coordinates;
    const effect = document.getElementsByClassName("zone-effect")[0];
    const name = document.getElementsByClassName("card-name")[0];
    const type = document.getElementsByClassName("card-type")[0];
    const hand_cost = document.getElementById("preview-hand-cost");
    const reserve_cost = document.getElementById("preview-reserve-cost");

    const infos = document.getElementById("preview-permanent-info");
    switch(value) {
        case "character":
            coordinates = findCoordonates(character);
            effect.style.top = "365px";
            name.style.top = "30px";
            type.style.top = "53px";
            hand_cost.innerHTML = "0";
            reserve_cost.innerHTML = "0";
            infos.innerHTML = "";
            break;
        case "permanent":
            coordinates = findCoordonates(permanent);
            effect.style.top = "405px";
            name.style.top = "291px";
            type.style.top = "314px";
            hand_cost.innerHTML = "0";
            reserve_cost.innerHTML = "0";
            infos.innerHTML = "(Play me  in your Landmarks.  I can't gain Fleeting.)"
            break;
        case "spell":
            coordinates = findCoordonates(spell);
            effect.style.top = "365px";
            name.style.top = "30px";
            type.style.top = "53px";
            hand_cost.innerHTML = "0";
            reserve_cost.innerHTML = "0";
            infos.innerHTML = "";
            break;
        case "hero":
            coordinates = findCoordonates(hero);
            effect.style.top = "360px";
            name.style.top = "36px";
            type.style.top = "62px";
            hand_cost.innerHTML = "";
            reserve_cost.innerHTML = "";
            current_rarity = "commun";
            infos.innerHTML = "";
            break;
        case "token":
            coordinates = findCoordonates(token);
            effect.style.top = "418px";
            name.style.top = "30px";
            type.style.top = "53px";
            hand_cost.innerHTML = "";
            reserve_cost.innerHTML = "";
            current_rarity = "commun";
            document.getElementById("preview-type").innerHTML = with_caps + " Character";
            infos.innerHTML = "";
            break;
    }
    img.style.top = `-${coordinates.column_coordinates}px`;
    img.style.left = `-${coordinates.row_coordinates}px`;
    if(value === "hero") 
        document.getElementById("preview-type").innerHTML = "Héros " + document.getElementById("card-faction").value[0].toUpperCase() + document.getElementById("card-faction").value.substring(1);
    bool_augmented_text_area = false;
    updateAdditionalType();
    updateEffect(document.getElementById("card-effect").value);
    if(document.getElementById("hand-cost")) {
        updateMana("HAND", document.getElementById("hand-cost").value);
        updateMana("RESERVE", document.getElementById("reserve-cost").value);
    }

    updateAdditionalType(document.getElementById("card-add-type").value);

    if(current_faction !== "commun") 
        updateFaction(img, current_faction);
    else
        updateFaction(img, "ordis");

    //update le listener sur cardbonus si il avait disparu a cause de hero ou de token
    if(document.getElementById("card-bonus")) {
        document.getElementById("card-bonus").addEventListener("focus", (e) => {
            lastFocusedTextarea = e.target;
        });
    }
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
            el.innerHTML = `<img src="images/${el.id}_zero.png" alt="${el.id} background" height="35" id="${el.id}-background"/>`;
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
        let smaller = false;
        //un plus petit
        if(earth_stat < ocean_stat && earth_stat < leaf_stat) {
            modified["earth"] = true;
            smaller = true;
            document.getElementById("earth").innerHTML = '<img src="images/earth_small.png" alt="earth background" height="35" id="earth-background"/>';
        } else if(ocean_stat < earth_stat && ocean_stat < leaf_stat) {
            modified["ocean"] = true;
            smaller = true;
            document.getElementById("ocean").innerHTML = '<img src="images/ocean_small.png" alt="ocean background" height="35" id="ocean-background"/>';
        } else if(leaf_stat < ocean_stat && leaf_stat < earth_stat) {
            modified["leaf"] = true;
            smaller = true;
            document.getElementById("leaf").innerHTML = '<img src="images/leaf_small.png" alt="leaf background" height="35" id="leaf-background"/>';
        }
        //un plus grand
        if(smaller) {
            if(earth_stat > ocean_stat && earth_stat > leaf_stat) {
                modified["earth"] = true;
                document.getElementById("earth").innerHTML = '<img src="images/earth_large_o.png" alt="earth background" height="35" id="earth-background"/>';
            } else if(ocean_stat > earth_stat && ocean_stat > leaf_stat) {
                modified["ocean"] = true;
                document.getElementById("ocean").innerHTML = '<img src="images/ocean_large_o.png" alt="ocean background" height="35" id="ocean-background"/>';
            } else if(leaf_stat > ocean_stat && leaf_stat > earth_stat) {
                modified["leaf"] = true;
                document.getElementById("leaf").innerHTML = '<img src="images/leaf_large_o.png" alt="leaf background" height="35" id="leaf-background"/>';
            }
        } else {
            if(earth_stat > ocean_stat && earth_stat > leaf_stat) {
                modified["ocean"] = true;
                modified["leaf"] = true;
                document.getElementById("leaf").innerHTML = '<img src="images/leaf_small.png" alt="leaf background" height="35" id="leaf-background"/>';
                document.getElementById("ocean").innerHTML = '<img src="images/ocean_small.png" alt="ocean background" height="35" id="ocean-background"/>';
            } else if(ocean_stat > earth_stat && ocean_stat > leaf_stat) {
                modified["earth"] = true;
                modified["leaf"] = true;
                document.getElementById("leaf").innerHTML = '<img src="images/leaf_small.png" alt="leaf background" height="35" id="leaf-background"/>';
                document.getElementById("earth").innerHTML = '<img src="images/earth_small.png" alt="earth background" height="35" id="earth-background"/>';
            } else if(leaf_stat > ocean_stat && leaf_stat > earth_stat) {
                modified["ocean"] = true;
                modified["earth"] = true;
                document.getElementById("ocean").innerHTML = '<img src="images/ocean_small.png" alt="ocean background" height="35" id="ocean-background"/>';
                document.getElementById("earth").innerHTML = '<img src="images/earth_small.png" alt="earth background" height="35" id="earth-background"/>';
            }
        }
        
        
        if(earth_stat === 0) {
            modified["earth"] = true;
            document.getElementById("earth").innerHTML = '<img src="images/earth_zero.png" alt="earth background" height="35" id="earth-background"/>';
        }
        if(leaf_stat === 0) {
            modified["leaf"] = true;
            document.getElementById("leaf").innerHTML = '<img src="images/leaf_zero.png" alt="leaf background" height="35" id="leaf-background"/>';
        }
        if(ocean_stat === 0) {
            modified["ocean"] = true;
            document.getElementById("ocean").innerHTML = '<img src="images/ocean_zero.png" alt="ocean background" height="35" id="ocean-background"/>';
        }
        //si aucune des conditions précédentes
        if(!modified["earth"])
            document.getElementById("earth").innerHTML = '<img src="images/earth_normal.png" alt="earth background" height="35" id="earth-background"/>';
        if(!modified["leaf"])
            document.getElementById("leaf").innerHTML = '<img src="images/leaf_normal.png" alt="leaf background" height="35" id="leaf-background"/>';
        if(!modified["ocean"])
            document.getElementById("ocean").innerHTML = '<img src="images/ocean_normal.png" alt="ocean background" height="35" id="ocean-background"/>';

    }
}

/* @param 
 * @ : utilisé pour update le type de tokens
 * @return : void
*/
function updateTokenType() {
    const name = document.getElementsByClassName("card-name")[0];
    const type_preview = document.getElementsByClassName("card-type")[0];
    const effect = document.getElementsByClassName("zone-effect")[0];

    const img = document.getElementById("card-background");
    const type = document.getElementById("token-type").value;
    if(type === "landmark") {

        document.getElementById("preview-type").innerHTML = "Token Landmark";
        updateFaction(img, "commun");
        document.getElementById("card-faction").value = "commun";

        const coordinates = findCoordonates(1);
        img.style.top = `-${coordinates.column_coordinates}px`;
        img.style.left = `-${coordinates.row_coordinates}px`;

        effect.style.top = "405px";        
        name.style.top = "291px";
        type_preview.style.top = "314px";
    } else if(current_faction === "commun") {
        document.getElementById("preview-type").innerHTML = "Token Character";
        const coordinates = findCoordonates(7);
        img.style.top = `-${coordinates.column_coordinates}px`;
        img.style.left = `-${coordinates.row_coordinates}px`;

        name.style.top = "30px";
        type_preview.style.top = "53px";
        effect.style.top = "418px";
    } else {
        document.getElementById("preview-type").innerHTML = "Token Character";
        const coordinates = findCoordonates(13);
        img.style.top = `-${coordinates.column_coordinates}px`;
        img.style.left = `-${coordinates.row_coordinates}px`;
    
        name.style.top = "30px";
        type_preview.style.top = "53px";
        effect.style.top = "418px";
    }

    updateAdditionalType(document.getElementById("card-add-type").value);    
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
                document.getElementsByClassName(`card-${type.toLowerCase()}-cost`)[0].style.left = "57px";                
            }
            break;
        case "10":
            if(type === "HAND") {
                document.getElementsByClassName(`card-${type.toLowerCase()}-cost`)[0].style.left = "21px";
            } else {
                document.getElementsByClassName(`card-${type.toLowerCase()}-cost`)[0].style.left = "51px";                
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
    if(document.getElementById("token-type")) {
        if(document.getElementById("token-type").value === "landmark" && faction !== "commun") {
            return;
        }
    }
    current_faction = faction;

    if(faction === "commun") {
        const coordinates = findCoordonates(7);
        img.style.top = `-${coordinates.column_coordinates}px`;
        img.style.left = `-${coordinates.row_coordinates}px`;
        img.src = `images/${faction}.webp`;
    } else if(document.getElementById("card-type").value === "token") {
        const coordinates = findCoordonates(token);
        img.style.top = `-${coordinates.column_coordinates}px`;
        img.style.left = `-${coordinates.row_coordinates}px`;
        img.src = `images/${faction}.webp`;
    } else {
        img.src = `images/${faction}.webp`;
    }
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
    text_emoji = convertWithEmojis(text, false).replace(/\n/g, "<br>");
    zone.innerHTML = text_emoji;
    if(document.getElementById("card-type").value !== "hero" && document.getElementById("card-type").value !== "token") {
        const lore_zone = document.getElementById("preview-lore");
        let max_ligne
        if(document.getElementById("card-type").value === "permanent") {
            if(!bool_bonus) 
                max_ligne = 80;
            else
                max_ligne = 60;
        } else {
            if(!bool_bonus) 
                max_ligne = 120;
            else
                max_ligne = 98;
        }
        if(zone.offsetHeight + lore_zone.offsetHeight > max_ligne && !bool_augmented_text_area) {
            const img = document.getElementById("card-background");
            coordinates = findCoordonates(current_position + 1);
            img.style.top = `-${coordinates.column_coordinates}px`;
            img.style.left = `-${coordinates.row_coordinates}px`;

            const effect = document.getElementsByClassName("zone-effect")[0];
            const current_top_effect = parseInt(window.getComputedStyle(effect).top);
            effect.style.top = (current_top_effect - 40) + "px";

            bool_augmented_text_area = true;
            if(document.getElementById("card-type").value === "permanent") {
                const name = document.getElementsByClassName("card-name")[0];
                const type = document.getElementsByClassName("card-type")[0];
                const infos = document.getElementsByClassName("card-permanent-info")[0];
                const current_top_info = parseInt(window.getComputedStyle(infos).top);
                const name_current_top = parseInt(window.getComputedStyle(name).top);
                const type_current_top = parseInt(window.getComputedStyle(type).top);
                if(!bool_bonus) {
                    name.style.top = (name_current_top - 37) + "px";
                    type.style.top = (type_current_top - 37) + "px";
                    infos.style.top = (current_top_info - 43) + "px";
                } else {
                    name.style.top = (name_current_top - 39) + "px";
                    type.style.top = (type_current_top - 39) + "px";
                    infos.style.top = (current_top_info - 39) + "px";
                }
            }
        } else if (zone.offsetHeight + lore_zone.offsetHeight <= max_ligne && bool_augmented_text_area) {
            const img = document.getElementById("card-background");
            coordinates = findCoordonates(current_position - 1);
            img.style.top = `-${coordinates.column_coordinates}px`;
            img.style.left = `-${coordinates.row_coordinates}px`;

            const effect = document.getElementsByClassName("zone-effect")[0];
            const current_top_effect = parseInt(window.getComputedStyle(effect).top);
            effect.style.top = (current_top_effect + 40) + "px";

            bool_augmented_text_area = false;

            if(document.getElementById("card-type").value === "permanent") {
                const name = document.getElementsByClassName("card-name")[0];
                const type = document.getElementsByClassName("card-type")[0];
                const infos = document.getElementsByClassName("card-permanent-info")[0];
                const current_top_info = parseInt(window.getComputedStyle(infos).top);
                const name_current_top = parseInt(window.getComputedStyle(name).top);
                const type_current_top = parseInt(window.getComputedStyle(type).top);
                if(!bool_bonus) {
                    name.style.top = (name_current_top + 37) + "px";
                    type.style.top = (type_current_top + 37) + "px";
                    infos.style.top = (current_top_info + 43) + "px";
                } else {
                    name.style.top = (name_current_top + 39) + "px";
                    type.style.top = (type_current_top + 39) + "px";
                    infos.style.top = (current_top_info + 39) + "px";
                }
            }
        }
    }
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
                zone.innerHTML = ('<span style="display:inline-block; width:230px; border-bottom:1px solid black ;"></span><br/>' + text).replace(/\n/g, "<br>");
            else
                 zone.innerHTML = ('<span style="display:inline-block; width:230px; border-bottom:1px solid white ;"></span><br/>' + text).replace(/\n/g, "<br>");
        }  
    }
    if(document.getElementById("card-type").value !== "hero" && document.getElementById("card-type").value !== "token") {
        const lore_zone = document.getElementById("preview-effect");
        let max_ligne
        if(!bool_bonus) 
            max_ligne = 120;
        else
            max_ligne = 98;
        if(zone.offsetHeight + lore_zone.offsetHeight > max_ligne && !bool_augmented_text_area) {
            const img = document.getElementById("card-background");
            coordinates = findCoordonates(current_position + 1);
            img.style.top = `-${coordinates.column_coordinates}px`;
            img.style.left = `-${coordinates.row_coordinates}px`;

            const effect = document.getElementsByClassName("zone-effect")[0];
            const current_top_effect = parseInt(window.getComputedStyle(effect).top);
            effect.style.top = (current_top_effect - 40) + "px";

            bool_augmented_text_area = true;
            if(document.getElementById("card-type").value === "permanent") {
                const name = document.getElementsByClassName("card-name")[0];
                const type = document.getElementsByClassName("card-type")[0];
                const name_current_top = parseInt(window.getComputedStyle(name).top);
                const type_current_top = parseInt(window.getComputedStyle(type).top);
                name.style.top = (name_current_top - 35) + "px";
                type.style.top = (type_current_top - 35) + "px";
            }
        } else if (zone.offsetHeight + lore_zone.offsetHeight <= max_ligne && bool_augmented_text_area) {
            const img = document.getElementById("card-background");
            coordinates = findCoordonates(current_position - 1);
            img.style.top = `-${coordinates.column_coordinates}px`;
            img.style.left = `-${coordinates.row_coordinates}px`;

            const effect = document.getElementsByClassName("zone-effect")[0];
            const current_top_effect = parseInt(window.getComputedStyle(effect).top);
            effect.style.top = (current_top_effect + 40) + "px";

            bool_augmented_text_area = false;

            if(document.getElementById("card-type").value === "permanent") {
                const name = document.getElementsByClassName("card-name")[0];
                const type = document.getElementsByClassName("card-type")[0];
                const name_current_top = parseInt(window.getComputedStyle(name).top);
                const type_current_top = parseInt(window.getComputedStyle(type).top);
                name.style.top = (name_current_top + 35) + "px";
                type.style.top = (type_current_top + 35) + "px";
            }
        }
    }
}

let did_with_augmented = false;

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
            const title = document.getElementsByClassName("card-name")[0];
            const type = document.getElementsByClassName("card-type")[0];
            const infos = document.getElementsByClassName("card-permanent-info")[0];
            const current_top_info = parseInt(window.getComputedStyle(infos).top);
            const current_top_title = parseInt(window.getComputedStyle(title).top);
            const current_top_type = parseInt(window.getComputedStyle(type).top);
            if(!bool_augmented_text_area) {
                infos.style.top = (current_top_info - 43) + "px";
                title.style.top = (current_top_title - 34) + "px";
                type.style.top = (current_top_type - 34) + "px";
                did_with_augmented = false;
            } else {
                did_with_augmented = true;
                infos.style.top = (current_top_info - 38) + "px";
                title.style.top = (current_top_title - 38) + "px";
                type.style.top = (current_top_type - 38) + "px";
            }
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
            const title = document.getElementsByClassName("card-name")[0];
            const type = document.getElementsByClassName("card-type")[0];
            const infos = document.getElementsByClassName("card-permanent-info")[0];
            const current_top_info = parseInt(window.getComputedStyle(infos).top);
            const current_top_title = parseInt(window.getComputedStyle(title).top);
            const current_top_type = parseInt(window.getComputedStyle(type).top);
            if(!bool_augmented_text_area) {
                infos.style.top = (current_top_info + 43) + "px";
                title.style.top = (current_top_title + 34) + "px";
                type.style.top = (current_top_type + 34) + "px";
            } else {
                infos.style.top = (current_top_info + 38) + "px";
                title.style.top = (current_top_title + 38) + "px";
                type.style.top = (current_top_type + 38) + "px";
            }
        }
    }
    const zone = document.getElementById("preview-bonus");
    text_emoji = convertWithEmojis(text, true);
    if(zone)
        zone.innerHTML = text_emoji.replace(/\n/g, "<br>");
    updateEffect(document.getElementById("card-effect").value);
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
    const name = document.getElementsByClassName("card-name")[0];
    const type = document.getElementsByClassName("card-type")[0];
    const hand_cost = document.getElementsByClassName("card-hand-cost")[0];
    const reserve_cost = document.getElementsByClassName("card-reserve-cost")[0];

    const leaf = document.getElementsByClassName("card-leaf")[0];
    const earth = document.getElementsByClassName("card-earth")[0];
    const ocean = document.getElementsByClassName("card-ocean")[0];
    switch(rarity) {
        case "rare":
            if(current_rarity === "commun" || current_rarity === "") {
                current_rarity = "rare";
                if(document.getElementById("permanent-type")) {
                    if(document.getElementById("permanent-type").value === "expedition")
                        coordinates = findCoordonates(current_position + 4);
                    else
                        coordinates = findCoordonates(current_position + 14);
                } else {
                    coordinates = findCoordonates(current_position + 14);
                }
                img.style.top = `-${coordinates.column_coordinates}px`;
                img.style.left = `-${coordinates.row_coordinates}px`;
            } else if(current_rarity === "unique") {
                current_rarity = "rare";
                coordinates = findCoordonates(current_position - 12);
                img.style.top = `-${coordinates.column_coordinates}px`;
                img.style.left = `-${coordinates.row_coordinates}px`;
            }                
            
            if(document.getElementById("card-type").value !== "permanent") {
                name.style.top = "31px"
                type.style.top = "54px"
                reserve_cost.style.top = "43px";
                hand_cost.style.top = "20px";
                effect.style.color = "#000";
            }  else {
                reserve_cost.style.top = "41px";
                hand_cost.style.top = "18px";
                type.style.top = "314px";
                name.style.top = "291px";
                effect.style.color = "#000";
            }
            if(document.getElementById("card-type").value === "character") {
                leaf.style.top = "109px";
                earth.style.top = "142px";
                ocean.style.top = "175px";
            }
            break;
        case "commun":
            if(current_rarity === "rare") {
                current_rarity = "commun";
                if(document.getElementById("permanent-type")) {
                    if(document.getElementById("permanent-type").value === "expedition")
                        coordinates = findCoordonates(current_position - 4);
                    else
                        coordinates = findCoordonates(current_position - 14);
                } else {
                    coordinates = findCoordonates(current_position - 14);
                }
                img.style.top = `-${coordinates.column_coordinates}px`;
                img.style.left = `-${coordinates.row_coordinates}px`;
            } else if(current_rarity === "unique") {
                current_rarity = "commun";
                coordinates = findCoordonates(current_position - 26);
                img.style.top = `-${coordinates.column_coordinates}px`;
                img.style.left = `-${coordinates.row_coordinates}px`;

            }
            
            if(document.getElementById("card-type").value !== "permanent") {    
                name.style.top = "30px"
                type.style.top = "53px"
                reserve_cost.style.top = "42px";
                hand_cost.style.top = "18px";
                effect.style.color = "#000";
            } else {
                reserve_cost.style.top = "41px";
                hand_cost.style.top = "18px";
                type.style.top = "314px";
                name.style.top = "291px";
                effect.style.color = "#000";
            }
            if(document.getElementById("card-type").value === "character") {
                leaf.style.top = "108px";
                earth.style.top = "141px";
                ocean.style.top = "174px";
            }
            break;
        case "unique": 
        
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
            reserve_cost.style.top = "43px";
            hand_cost.style.top = "20px";
            name.style.top = "30px"
            type.style.top = "54px"
            leaf.style.top = "110px";
            earth.style.top = "143px";
            ocean.style.top = "176px";
            break;
    }
    updateLore(document.getElementById("card-lore").value);
    document.getElementById("preview-effect").innerHTML = convertWithEmojis(document.getElementById("card-effect").value, false);
}

/* @param text : user's entry
 * @ : modify additional types for the card
 * @return : void
*/
function updateAdditionalType(text) {
    let type = document.getElementById("card-type").value[0].toUpperCase() + document.getElementById("card-type").value.substring(1);
    const value = document.getElementById("preview-type");
    if(document.getElementById("card-type").value === "token") {
        if(document.getElementById("token-type"))
            type += ' ' + document.getElementById("token-type").value[0].toUpperCase() + document.getElementById("token-type").value.substring(1);
    }
    if(text !== "")
        value.innerHTML = type + " - " + text;
    else 
        value.innerHTML = type;
}


function applyIllustrationTransform() {
    const illu = document.getElementById("preview-illustration");
    if (!illu) return;

    const zoom_input = document.getElementById("illu-zoom");
    const offset_x_input = document.getElementById("illu-offset-x");
    const offset_y_input = document.getElementById("illu-offset-y");

    const scale = zoom_input ? parseFloat(zoom_input.value) / 100 : 1;
    const offset_x = offset_x_input ? parseInt(offset_x_input.value, 10) : 0;
    const offset_y = offset_y_input ? parseInt(offset_y_input.value, 10) : 0;

    // translate en px puis scale (comme ça les déplacements restent "réels")
    illu.style.transform = `translate(${offset_x}px, ${offset_y}px) scale(${scale})`;
}


function updateIllustration(file) {
    const img = document.getElementById("preview-illustration");
    if (!file || !img) return;
    const url = URL.createObjectURL(file);
    img.src = url;

    // Quand on change d'image, on réapplique la transform actuelle
    img.onload = () => {
        applyIllustrationTransform();
    };
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
    updateAdditionalType(document.getElementById("card-add-type").value);
    applyIllustrationTransform();

    if(document.getElementById("card-bonus"))
        updateBonus(document.getElementById("card-bonus").value, img);
    else 
        updateBonus("", img);
    if(document.getElementById("card-image"))
        updateIllustration(document.getElementById("card-image").files[0]);

    if(document.getElementById("card-type").value !== "token" && document.getElementById("card-type").value !== "character") 
        updateStats(0, "DELETE");
    else
        updateStats(0, "ALL");
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
    document.querySelectorAll("textarea").forEach(t => {
        t.addEventListener("focus", () => {
            lastFocusedTextarea = t;
        });
    });
    if(document.getElementsByClassName("button-symbole")) {
        const els = document.getElementsByClassName("button-symbole")[0].children;
        
        Array.prototype.forEach.call(els, function(el) {
            el.addEventListener("click", (e) => {

                if(e.target.id) {
                    if(e.target.id === "number")
                        return;
                }
                const textarea = lastFocusedTextarea;

                if(textarea) {
                    if(textarea.id !== "card-lore"){
                        let src_image;
                        if(e.srcElement.children[0])
                            src_image = e.srcElement.alt || e.srcElement.children[0].alt;
                        else
                            src_image = e.target.value;
                        if(src_image === "infini" || src_image === "discard" || src_image === "orange" || textarea.id !== "card-bonus" || src_image === "x" || src_image === "1" || src_image === "2" || src_image === "3" || src_image === "4" || src_image === "5" || src_image === "6" || src_image === "7" || src_image === "8" || src_image === "9") {
                            const text_to_insert = emojis_reversed[src_image];
                            console.log(text_to_insert);
                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;

                            const before = textarea.value.substring(0, start);
                            const after = textarea.value.substring(end);
                            if(src_image === "orange") {
                                const beetwin = textarea.value.substring(start, end);

                                textarea.value = before + "#" + beetwin + "*" + after;
                                textarea.selectionStart = textarea.selectionEnd = end + 1;
                            } else {
                                textarea.value = before + text_to_insert + after;
                                textarea.selectionStart = textarea.selectionEnd = start + text_to_insert.length;
                            }
                            updateEffect(document.getElementById("card-effect").value);
                            updateLore(document.getElementById("card-lore").value);
                            if(document.getElementById("card-bonus"))
                                updateBonus(document.getElementById("card-bonus").value, img);
                            textarea.focus();
                        }
                    }
                }
            });      
        }); 
    }
    if(document.getElementById("card-add-type")) {
        document.getElementById("card-add-type").addEventListener("input", (e) => {
            updateAdditionalType(e.target.value);
        });
    }

    const zoomInput = document.getElementById("illu-zoom");
    const offsetXInput = document.getElementById("illu-offset-x");
    const offsetYInput = document.getElementById("illu-offset-y");

    if (zoomInput) {
        zoomInput.addEventListener("input", applyIllustrationTransform);
    }
    if (offsetXInput) {
        offsetXInput.addEventListener("input", applyIllustrationTransform);
    }
    if (offsetYInput) {
        offsetYInput.addEventListener("input", applyIllustrationTransform);
    }
});