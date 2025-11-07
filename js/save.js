function sanitizeFilename(str) {
  return String(str || "carte")
    .replace(/[\\\/:*?"<>|]+/g, "_")
    .trim();
}
window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("save-card").addEventListener("click", async (e) => {
        e.preventDefault();

        const node = document.getElementById("card-preview");

        const origTransform = node.style.transform;
        const origOverflow  = node.style.overflow;

        node.style.transform = "none";
        node.style.overflow  = "hidden"; // verrouille la fenêtre de rendu

        await Promise.all(
            Array.from(node.querySelectorAll("img"))
            .filter(i => !i.complete)
            .map(i => new Promise(res => { i.onload = i.onerror = res; }))
        );

        const canvas = await html2canvas(node, {
            backgroundColor: null,
            scale: 2,          // 1 si tu veux la taille exacte 372×520
            useCORS: true
        });

        node.style.transform = origTransform;
        node.style.overflow  = origOverflow;

        canvas.toBlob((blob) => {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = (document.getElementById("name")?.value || "carte") + ".png";
            a.click();
            URL.revokeObjectURL(a.href);
        }, "image/png");
    });
});