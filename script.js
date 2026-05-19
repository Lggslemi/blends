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

// Selector de ubicación para las gorras
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
// Selector simple: Cartagena o Mercado Libre
const buyTriggers = document.querySelectorAll('.buy-trigger');
const locationModal = document.getElementById('locationModal');
const cartagenaButton = document.getElementById('cartagenaButton');
const otherCitiesButton = document.getElementById('otherCitiesButton');
const closeModalButtons = document.querySelectorAll('[data-close-modal]');

let currentProductKey = null;

function openLocationModal(productKey) {
  currentProductKey = productKey;
  locationModal.classList.add('is-open');
  locationModal.setAttribute('aria-hidden', 'false');
}

function closeLocationModal() {
  locationModal.classList.remove('is-open');
  locationModal.setAttribute('aria-hidden', 'true');
  currentProductKey = null;
}

buyTriggers.forEach((card) => {
  card.addEventListener('click', () => {
    const productKey = card.dataset.product;
    if (!productLinks[productKey]) return;
    openLocationModal(productKey);
  });
});

cartagenaButton.addEventListener('click', () => {
  if (!currentProductKey) return;

  const product = productLinks[currentProductKey];
  if (!product || !product.cartagena) return;

  window.open(product.cartagena, '_blank');
  closeLocationModal();
});

otherCitiesButton.addEventListener('click', () => {
  if (!currentProductKey) return;

  const product = productLinks[currentProductKey];
  if (!product || !product.external) return;

  window.open(product.external, '_blank');
  closeLocationModal();
});

closeModalButtons.forEach((btn) => {
  btn.addEventListener('click', closeLocationModal);
});

locationModal.addEventListener('click', (e) => {
  if (e.target.classList.contains('location-modal__backdrop')) {
    closeLocationModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && locationModal.classList.contains('is-open')) {
    closeLocationModal();
  }
});