const SCALE_EXPORT = 4; // 2x

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("save-card").addEventListener("click", async (e) => {
    e.preventDefault();

    const node = document.getElementById("card-preview");
    const frameImg = document.getElementById("card-background");

    // Attendre le chargement de toutes les <img> utilisées dans la carte
    await Promise.all(
      Array.from(node.querySelectorAll("img"))
        .filter(img => !img.complete)
        .map(img => new Promise(res => { img.onload = img.onerror = res; }))
    );

    // Dimensions natives de la spritesheet
    const natW = frameImg.naturalWidth;
    const natH = frameImg.naturalHeight;
    const tileSrcW = natW / COLS;
    const s = WIDTH / tileSrcW;

    // Indices de tuile
    const rowIndex = current_position % COLS;
    const colIndex = Math.floor(current_position / COLS);

    // Marqueurs pour onclone
    frameImg.dataset.exportScale = String(s);
    frameImg.dataset.exportRow = String(rowIndex);
    frameImg.dataset.exportCol = String(colIndex);
    frameImg.dataset.naturalWidth = String(natW);
    frameImg.dataset.naturalHeight = String(natH);

    // Rendu @2x
    const canvas = await html2canvas(node, {
      useCORS: true,
      allowTaint: false,
      backgroundColor: null,
      scale: SCALE_EXPORT,
      foreignObjectRendering: false,
      onclone: (doc) => {
        const preview = doc.getElementById("card-preview");
        preview.style.position = "relative";
        preview.style.width = WIDTH + "px";
        preview.style.height = HEIGHT + "px";
        preview.style.overflow = "hidden";
        preview.style.transform = "none";
        preview.style.filter = "none";
        preview.style.backdropFilter = "none";

        // === Illustration en <img> (pas en background) ===
        const illu = doc.getElementById("preview-illustration");
        const illuWrap = illu?.parentElement;

        if (illuWrap && illu) {
          // Important : ne PAS forcer width/height en CSS ailleurs
          // On fixe ici la taille de DESSIN finale, pas un background-size.
          const natW = illu.naturalWidth;
          const natH = illu.naturalHeight;

          const ratio = Math.max(WIDTH / natW, HEIGHT / natH);
          const drawW = Math.round(natW * ratio);
          const drawH = Math.round(natH * ratio);
          const offsetX = Math.round((WIDTH - drawW) / 2);
          const offsetY = Math.round((HEIGHT - drawH) / 2);

          illuWrap.style.position = "absolute";
          illuWrap.style.inset = "0";
          illuWrap.style.zIndex = "1";
          illuWrap.style.overflow = "hidden";

          illu.style.display = "block";          // on garde l’<img>
          illu.style.position = "absolute";
          illu.style.left = offsetX + "px";
          illu.style.top = offsetY + "px";
          illu.style.width = drawW + "px";       // taille de dessin finale
          illu.style.height = drawH + "px";
          illu.style.transform = "none";
          illu.style.filter = "none";
          illu.style.backdropFilter = "none";
          illu.style.objectFit = "fill";         // pas de cover/contain ici
          illu.style.imageRendering = "auto";    // évite 'pixelated'/'crisp-edges' pour photo
        }

        // === Frame / spritesheet (inchangé) ===
        const frameImg = doc.getElementById("card-background");
        const frameWrap = doc.querySelector(".back-card");
        if (frameImg && frameWrap) {
          const r = parseInt(frameImg.dataset.exportRow || "0", 10);
          const c = parseInt(frameImg.dataset.exportCol || "0", 10);
          const natW = parseFloat(frameImg.dataset.naturalWidth || "0");
          const natH = parseFloat(frameImg.dataset.naturalHeight || "0");

          const bgW = Math.round(COLS * WIDTH);
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
          frameWrap.style.backgroundPosition = `-${r * WIDTH}px -${c * HEIGHT}px`;
          frameWrap.style.imageRendering = "crisp-edges";
          frameImg.style.display = "none";
        }

        // === Contenu texte au-dessus (inchangé) ===
        const content = doc.querySelector(".card-content");
        if (content) {
          content.style.position = "absolute";
          content.style.inset = "0";
          content.style.zIndex = "auto";
          content.style.transform = "none";
          content.style.filter = "none";
          content.style.backdropFilter = "none";
        }

        const fondStats = content?.getElementsByClassName("fond-stat") || [];
        Array.prototype.forEach.call(fondStats, (el) => {
          const parent_icon = el.parentNode;
          parent_icon.style.position = "absolute";
          parent_icon.style.zIndex = "2";
        });

        [".card-name", ".zone-effect", ".card-bonus", ".card-type", ".card-hand-cost", ".card-reserve-cost"]
          .forEach(sel => {
            const nodes = content?.querySelectorAll(sel) || [];
            nodes.forEach(n => {
              n.style.position = "absolute";
              n.style.zIndex = "4";
              n.style.transform = "none";
              n.style.filter = "none";
            });
          });
      }
    });

    // (Optionnel) éviter l’aperçu géant sur la page après rendu
    canvas.style.width = WIDTH + "px";
    canvas.style.height = HEIGHT + "px";

    const suffix = SCALE_EXPORT === 1 ? "" : `@${SCALE_EXPORT}x`;
    canvas.toBlob((blob) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = (document.getElementById("name")?.value || "carte") + `${suffix}.png`;
      a.click();
      URL.revokeObjectURL(a.href);
    }, "image/png");
  });
});
