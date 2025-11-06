function updateFormColumns() {
  const form = document.getElementById('form');
  if (!form) return;

  // marge de sécurité (en px) autour du formulaire dans la fenêtre
  const margin = 40;

  const viewportH = window.innerHeight;
  const formH = form.scrollHeight;

  // Passe en 2 colonnes si le formulaire dépasse la hauteur visible
  const shouldTwoCol = formH > (viewportH - margin) && window.innerWidth >= 700;

  form.classList.toggle('two-col', shouldTwoCol);
}

// au chargement et au redimensionnement
window.addEventListener('load', updateFormColumns);
window.addEventListener('resize', updateFormColumns);
