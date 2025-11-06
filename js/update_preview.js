//taille d'une carte
const WIDTH = 372;
const HEIGHT = 520;

//position de la premiere carte de chaque type
const character = 0;
const permanent = 4;
const spell = 8;
const hero = 12;
const token = 13;

//fonction pour trouver la coordonnée de la carte voulus a partir de se position sur la spritsheet
function findCoordonates(position) {
    const row_position = position % 6;
    const column_position = Math.floor(position / 6);
    const coordinates = {
        row_coordinates: row_position * WIDTH,
        column_coordinates: column_position * HEIGHT
    }
    return (coordinates);
}
//fonction utilisé pour update le type de carte
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

function updateFaction(img, faction) {
    img.src = `images/${faction}.webp`;
}

window.addEventListener("DOMContentLoaded", () => {
    const img = document.getElementById("card-background");

    //au chargement de la page afficher la carte correspondante
    updateCardType(document.getElementById("card-type").value, img);
    updateFaction(img, document.getElementById("card-faction").value);

    //quand le type de carte est changé, changé la carte utilisé
    document.getElementById("card-type").addEventListener("change", (e) => {
        const type_value = e.target.value;
        updateCardType(type_value, img);
    });
    document.getElementById("card-faction").addEventListener("change", (e) => {
        const type_value = e.target.value;
        updateFaction(img, type_value);
    });

});