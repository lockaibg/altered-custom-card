const COLS = 6;
/*
//solution 1 : compressed
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("save-card").addEventListener("click", async (e) => {
    e.preventDefault();
    const node = document.getElementById("card-preview");


    const canvas = await html2canvas(node, {
      scale: 1,                
      width: WIDTH,
      height: HEIGHT,
      backgroundColor: null,  
      useCORS: true,
      onclone: (doc) => {
        const p = doc.getElementById("card-preview");
        p.style.transform = "none";
        p.style.filter = "none";
      }
    });


    const out = document.createElement("canvas");
    out.width = WIDTH;
    out.height = HEIGHT;
    const ctx = out.getContext("2d", { alpha: true });
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(canvas, 0, 0);


    out.toBlob((blob) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = (document.getElementById("name")?.value || "carte") + ".png";
      a.click();
      URL.revokeObjectURL(a.href);
    }, "image/png");
  });
});

*/

//solution 2 : no compressed but blury, define each element of the canvasone by one before exporting
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("save-card").addEventListener("click", async (e) => {
    e.preventDefault();

    const node = document.getElementById("card-preview");
    const frameImg = document.getElementById("card-background");


    await Promise.all(
      Array.from(node.querySelectorAll("img"))
        .filter(img => !img.complete)
        .map(img => new Promise(res => { img.onload = img.onerror = res; }))
    );


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

    const SCALE_EXPORT = 1;

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

        const illu = doc.getElementById("preview-illustration");
        const illuWrap = illu?.parentElement;
        if (illuWrap && illu) {
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
          illuWrap.style.backgroundImage = `url("${illu.src}")`;
          illuWrap.style.backgroundRepeat = "no-repeat";
          illuWrap.style.backgroundSize = `${drawW}px ${drawH}px`; 
          illuWrap.style.backgroundPosition = `${offsetX}px ${offsetY}px`;
          illuWrap.style.imageRendering = "crisp-edges";
          illuWrap.style.filter = "none";
          illu.style.display = "none";   
        }

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
          frameWrap.style.backgroundPosition = `-${r*WIDTH}px -${c*HEIGHT}px`;  
          frameWrap.style.imageRendering = "crisp-edges";
          frameImg.style.display = "none";
        }

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

        const toTopSelectors = [
          ".card-name", ".zone-effect", ".card-bonus", ".card-type",
          ".card-hand-cost", ".card-reserve-cost"
        ];
        toTopSelectors.forEach(sel => {
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
