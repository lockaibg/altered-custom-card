const COLS = 6;
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
});