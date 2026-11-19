// Hamburger menu toggle
const hamburger = document.querySelector('.nav-hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  const open = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!open));
  navLinks.classList.toggle('nav-links--open');
});

// Navbar: invisible solo al inicio; visible apenas se hace scroll
const navbar = document.querySelector('.navbar');

function updateNavbarState() {
  navbar.classList.toggle('navbar--scrolled', window.scrollY > 30);
}

window.addEventListener('scroll', updateNavbarState, { passive: true });
window.addEventListener('resize', updateNavbarState);
updateNavbarState();

// ─── LÓGICA DE UBICACIÓN ───────────────────────────────────────────────────
// Destinos por producto
const productLinks = {
  fiore: {
    external: 'https://articulo.mercadolibre.com.co/MCO-3760020484-gorra-cachucha-pana-5-paneles-the-fiore-blends-_JM',
    cartagena: 'the-fiore.html'
  },
  club: {
    external: 'https://articulo.mercadolibre.com.co/MCO-1882948833-gorra-cachucha-rayas-5-paneles-club-blend-_JM',
    cartagena: 'club-blend.html'
  },
  fiorepack: {
    external: 'fiore-pack-ciudades.html',
    cartagena: 'fiore-pack.html'
  }
};

const LOCATION_KEY = 'blends_location';

const locationModal   = document.getElementById('locationModal');
const cartagenaButton = document.getElementById('cartagenaButton');
const otherCitiesButton = document.getElementById('otherCitiesButton');

// ── Guardar ubicación y cerrar modal ─────────────────────────────────────
function saveLocation(isCartagena) {
  sessionStorage.setItem(LOCATION_KEY, isCartagena ? 'cartagena' : 'other');
  closeLocationModal();
}

// ── Abrir / cerrar modal ──────────────────────────────────────────────────
function openLocationModal() {
  locationModal.classList.add('is-open');
  locationModal.setAttribute('aria-hidden', 'false');
}

function closeLocationModal() {
  locationModal.classList.remove('is-open');
  locationModal.setAttribute('aria-hidden', 'true');
}

// ── Mostrar modal al cargar si aún no eligió ─────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  if (!sessionStorage.getItem(LOCATION_KEY)) {
    openLocationModal();
  }
});

cartagenaButton.addEventListener('click', () => saveLocation(true));
otherCitiesButton.addEventListener('click', () => saveLocation(false));

// ── Click en producto: redirigir según ubicación guardada ─────────────────
document.querySelectorAll('.buy-trigger').forEach((card) => {
  card.addEventListener('click', () => {
    const productKey = card.dataset.product;
    const links = productLinks[productKey];
    if (!links) return;

    const location = sessionStorage.getItem(LOCATION_KEY);

    if (!location) {
      // Si todavía no eligió, mostrar modal primero y luego redirigir
      openLocationModal();

      function onceChosen(isCartagena) {
        cartagenaButton.removeEventListener('click', handleCartagena);
        otherCitiesButton.removeEventListener('click', handleOther);
        saveLocation(isCartagena);
        const dest = isCartagena ? links.cartagena : links.external;
        if (dest) window.location.href = dest;
      }

      function handleCartagena() { onceChosen(true); }
      function handleOther()     { onceChosen(false); }

      cartagenaButton.addEventListener('click', handleCartagena,   { once: true });
      otherCitiesButton.addEventListener('click', handleOther, { once: true });
      return;
    }

    const dest = location === 'cartagena' ? links.cartagena : links.external;
    if (dest) window.location.href = dest;
  });
});