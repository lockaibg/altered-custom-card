/*const COLS = 6;
window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("save-card").addEventListener("click", async (e) => {
        e.preventDefault();

        const node = document.getElementById("card-preview");
        const frameImg = document.getElementById("card-background");

        // attendre que les images de la carte soient chargées
        await Promise.all(
            Array.from(node.querySelectorAll("img"))
            .filter(img => !img.complete)
            .map(img => new Promise(res => { img.onload = img.onerror = res; }))
        );


        // taille réelle de l'image source
        const natW = frameImg.naturalWidth;
        const natH = frameImg.naturalHeight;

        const tileSrcW = natW / COLS;

        const s = WIDTH / tileSrcW; 


        const rowIndex = current_position % COLS;
        const colIndex = Math.floor(current_position / COLS);

        frameImg.dataset.exportScale = String(s);
        frameImg.dataset.exportRow = String(rowIndex);
        frameImg.dataset.exportCol = String(colIndex);
        frameImg.dataset.naturalWidth = String(natW);
        frameImg.dataset.naturalHeight = String(natH);

        const canvas = await html2canvas(node, {
            useCORS: true,
            backgroundColor: null,
            scale: 2,
            onclone: (doc) => {
            const preview = doc.getElementById("card-preview");
            preview.style.position = "relative";
            preview.style.width = WIDTH + "px";
            preview.style.height = HEIGHT + "px";
            preview.style.overflow = "hidden";

            const illu = doc.getElementById("preview-illustration");
            const illuWrap = illu?.parentElement;
            if (illuWrap && illu) {
                illuWrap.style.position = "absolute";
                illuWrap.style.inset = "0";
                illuWrap.style.zIndex = "1";
                illuWrap.style.backgroundImage = `url("${illu.src}")`;
                illuWrap.style.backgroundSize = "cover";
                illuWrap.style.backgroundPosition = "center";
                illuWrap.style.backgroundRepeat = "no-repeat";
                illu.style.display = "none";
            }

            const frameWrap = doc.querySelector(".back-card");
            const frame = doc.getElementById("card-background");
            if (frameWrap) {
                frameWrap.style.position = "absolute";
                frameWrap.style.inset = "0";
                frameWrap.style.overflow = "hidden";
                frameWrap.style.pointerEvents = "none";
                frameWrap.style.zIndex = "2";
            }
            if (frame) {
                const ds = frame.dataset;
                const scale = parseFloat(ds.exportScale || "1");
                const r = parseInt(ds.exportRow || "0", 10);
                const c = parseInt(ds.exportCol || "0", 10);
                const natW = parseFloat(ds.naturalWidth || "0");
                const natH = parseFloat(ds.naturalHeight || "0");

                frame.style.position = "absolute";
                frame.style.top = "0";
                frame.style.left = "0";
                frame.style.width = natW + "px";
                frame.style.height = "auto";
                frame.style.objectFit = "none"; 
                frame.style.transformOrigin = "top left";

                const tx = -(r * WIDTH) / scale;
                const ty = -(c * HEIGHT) / scale;
                frame.style.transform = `scale(${scale}) translate(${tx}px, ${ty}px)`;
            }
            const content = doc.querySelector(".card-content");
            if (content) {
                content.style.position = "absolute";
                content.style.inset = "0";
                content.style.zIndex = "3";
            }
            }
        });
        canvas.toBlob((blob) => {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = (document.getElementById("name")?.value || "carte") + ".png";
            a.click();
            URL.revokeObjectURL(a.href);
        }, "image/png");
    });
});*/

const COLS = 6; // ta spritesheet est découpée en 6 colonnes
window.addEventListener("DOMContentLoaded", () => {
document.getElementById("save-card").addEventListener("click", async (e) => {
  e.preventDefault();

  const node = document.getElementById("card-preview");
  const frameImg = document.getElementById("card-background");

  // attendre que les images de la carte soient chargées
  await Promise.all(
    Array.from(node.querySelectorAll("img"))
      .filter(img => !img.complete)
      .map(img => new Promise(res => { img.onload = img.onerror = res; }))
  );

  // --- calcul pour la spritesheet ---
  // taille réelle de l'image source
  const natW = frameImg.naturalWidth;
  const natH = frameImg.naturalHeight;

  // chaque tuile source = natW / COLS en largeur
  const tileSrcW = natW / COLS;

  // on veut que la tuile affichée fasse WIDTH -> scale:
  const s = WIDTH / tileSrcW; // équiv. WIDTH * COLS / natW

  // indices de la tuile actuelle (via ta logique)
  const rowIndex = current_position % COLS;              // colonne (x)
  const colIndex = Math.floor(current_position / COLS);  // ligne (y)

  // on passe ces infos au DOM (html2canvas les lira dans le clone)
  frameImg.dataset.exportScale = String(s);
  frameImg.dataset.exportRow = String(rowIndex);
  frameImg.dataset.exportCol = String(colIndex);
  frameImg.dataset.naturalWidth = String(natW);
  frameImg.dataset.naturalHeight = String(natH);

  // et on lance la capture
  const canvas = await html2canvas(node, {
    useCORS: true,
    backgroundColor: null,
    scale: 2,
    onclone: (doc) => {

  const preview = doc.getElementById("card-preview");
  preview.style.position = "relative";
  preview.style.width = WIDTH + "px";
  preview.style.height = HEIGHT + "px";
  preview.style.overflow = "hidden";
  preview.style.transform = "none";

  // 1️⃣ Illustration derrière (HD et nette)
  const illu = doc.getElementById("preview-illustration");
  const illuWrap = illu?.parentElement;
  if (illuWrap && illu) {
    const natW = illu.naturalWidth;
    const natH = illu.naturalHeight;
    const ratio = Math.max(WIDTH / natW, HEIGHT / natH); // équiv. object-fit: cover
    const drawW = natW * ratio;
    const drawH = natH * ratio;
    const offsetX = (WIDTH - drawW) / 2;
    const offsetY = (HEIGHT - drawH) / 2;

    illuWrap.style.position = "absolute";
    illuWrap.style.inset = "0";
    illuWrap.style.zIndex = "1";
    illuWrap.style.backgroundImage = `url("${illu.src}")`;
    illuWrap.style.backgroundRepeat = "no-repeat";
    // 🟢 Dimensions réelles en pixels pour éviter interpolation
    illuWrap.style.backgroundSize = `${drawW}px ${drawH}px`;
    illuWrap.style.backgroundPosition = `${offsetX}px ${offsetY}px`;
    illuWrap.style.imageRendering = "crisp-edges";
    illuWrap.style.filter = "none";
    illu.style.display = "none";
  }

  // 2️⃣ Frame (spritesheet) net et au-dessus de l’illu
  const frameImg = doc.getElementById("card-background");
  const frameWrap = doc.querySelector(".back-card");
  if (frameImg && frameWrap) {
    const r = parseInt(frameImg.dataset.exportRow || "0", 10);
    const c = parseInt(frameImg.dataset.exportCol || "0", 10);
    const natW = parseFloat(frameImg.dataset.naturalWidth || "0");
    const natH = parseFloat(frameImg.dataset.naturalHeight || "0");

    const bgW = COLS * WIDTH;
    const scale = bgW / natW;
    const bgH = Math.round(natH * scale);

    frameWrap.style.position = "absolute";
    frameWrap.style.inset = "0";
    frameWrap.style.overflow = "hidden";
    frameWrap.style.zIndex = "3";
    frameWrap.style.pointerEvents = "none";
    frameWrap.style.backgroundImage = `url("${frameImg.src}")`;
    frameWrap.style.backgroundRepeat = "no-repeat";
    frameWrap.style.backgroundSize = `${bgW}px ${bgH}px`;
    frameWrap.style.backgroundPosition = `-${r*WIDTH}px -${c*HEIGHT}px`;
    frameWrap.style.imageRendering = "crisp-edges"; // 🔥 pas d’interpolation
    frameImg.style.display = "none";
  }

  // 3️⃣ Contenu
  const content = doc.querySelector(".card-content");
  if (content) {
    content.style.position = "absolute";
    content.style.inset = "0";
    content.style.zIndex = "auto";
    content.style.transform = "none";
    content.style.filter = "none";
    content.style.backdropFilter = "none";
  }

  // 4️⃣ Icônes fond-stat (earth/leaf/ocean)
  const fondStats = content?.getElementsByClassName("fond-stat") || [];
  Array.prototype.forEach.call(fondStats, (el) => {
    const parent_icon = el.parentNode;
    parent_icon.style.position = "absolute";
    parent_icon.style.zIndex = "2";
  });

  // 5️⃣ Contenu supérieur
  const toTopSelectors = [
    ".card-name", ".zone-effect", ".card-bonus", ".card-type",
    ".card-hand-cost", ".card-reserve-cost"
  ];
  toTopSelectors.forEach(sel => {
    const nodes = content?.querySelectorAll(sel) || [];
    nodes.forEach(n => {
      n.style.position = "absolute";
      n.style.zIndex = "4";
    });
  });
}




  });

  canvas.toBlob((blob) => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = (document.getElementById("name")?.value || "carte") + ".png";
    a.click();
    URL.revokeObjectURL(a.href);
  }, "image/png");
});
}); 