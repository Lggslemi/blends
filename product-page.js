(function () {
  const data = window.PRODUCT_DATA;
  if (!data) return;

  const $ = (sel) => document.querySelector(sel);

  const title = $("#productTitle");
  const price = $("#productPrice");
  const subtitle = $("#productSubtitle");
  const shipping = $("#shippingBadge");
  const stock = $("#stockBadge");
  const color = $("#colorText");
  const material = $("#materialText");
  const gallery = $("#thumbs");
  const mainImage = $("#mainImage");
  const buyBtn = $("#buyNow");
  const navToggle = $(".nav-hamburger");
  const navLinks = $(".nav-links");
  const navbar = $(".navbar");

  document.title = `${data.name} | Blends`;

  title.textContent = data.name || "";
  subtitle.textContent = data.subtitle || "";
  shipping.textContent = data.shipping || "Descuento solo en Cartagena";
  stock.textContent = data.stock || "Stock disponible limitado";
  color.textContent = data.color || "Disponible";
  material.textContent = data.material || "Edición Blends";

  const currentPrice = data.priceCurrent || data.price || "";
  const oldPrice = data.priceOld || "";
  const promoNote = data.promoNote || "";

  price.innerHTML = `
    <span style="font-size: 1.9rem; font-weight: 700; letter-spacing: -0.03em;">${currentPrice}</span>
    ${
      oldPrice
        ? `<span style="margin-left: 10px; font-size: 0.95rem; text-decoration: line-through; color: var(--color-grey-mid);">
              ${oldPrice}
           </span>`
        : ""
    }
    ${
      promoNote
        ? `<span style="display:block; margin-top: 8px; font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-grey-dark);">
             ${promoNote}
           </span>`
        : ""
    }
  `;

  const images = Array.isArray(data.images) ? data.images.filter(Boolean) : [];
  const fallback = data.fallbackImage || images[0] || "";
  mainImage.src = fallback;

  function setActive(index) {
    const thumbs = gallery.querySelectorAll(".thumb");
    thumbs.forEach((btn, i) => btn.classList.toggle("is-active", i === index));
    mainImage.src = images[index];
  }

  gallery.innerHTML = "";
  images.forEach((src, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "thumb" + (index === 0 ? " is-active" : "");
    button.setAttribute("aria-label", `Ver imagen ${index + 1}`);
    button.innerHTML = `<img src="${src}" alt="${data.name} imagen ${index + 1}" loading="lazy">`;
    button.addEventListener("click", () => setActive(index));
    gallery.appendChild(button);
  });

  if (images.length === 0) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "thumb is-active";
    button.innerHTML = `<img src="${fallback}" alt="${data.name}" loading="lazy">`;
    gallery.appendChild(button);
  }

  const message = encodeURIComponent(
    `${data.whatsappGreeting || "Hola, quiero comprar"} ${data.name}. Precio: ${currentPrice}. Descuento solo en Cartagena.`
  );

  const url =
    data.whatsappNumber && data.whatsappNumber.replace(/\D/g, "")
      ? `https://wa.me/${data.whatsappNumber.replace(/\D/g, "")}?text=${message}`
      : `https://wa.me/?text=${message}`;

  buyBtn.addEventListener("click", () => {
    window.open(url, "_blank", "noopener,noreferrer");
  });

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("nav-links--open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("nav-links--open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle("navbar--scrolled", window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
})();