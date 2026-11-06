/* Checkout centralizado: preencha somente os seis destinos marcados como PENDENTE. */
(() => {
  "use strict";

  const CHECKOUT_LINKS = Object.freeze({
    bronze: Object.freeze({
      1: "https://pay.paguecerto.click/c/4a481ff6-6b1d-473c-a03f-2925fa076349",
      2: "https://pay.paguecerto.click/c/059cf59c-6e86-4dd2-9d79-b5046cc468cd",
      3: "https://pay.paguecerto.click/c/8303c13d-79ae-4de3-aec2-aa32558ebc53"
    }),
    prata: Object.freeze({
      1: "https://pay.paguecerto.click/c/e3c26304-c93b-424d-aaba-400ed3031835",
      2: "https://pay.paguecerto.click/c/130e2ac5-7a49-4937-87b0-43b10b436355",
      3: "https://pay.paguecerto.click/c/7adbfef4-d691-4cec-b462-3400e6c07181"
    }),
    ouro: Object.freeze({
      1: "https://pay.paguecerto.click/c/275fcb9e-7688-40e4-9ba2-99b893ea4cc0",
      2: "https://pay.paguecerto.click/c/21f31aa3-bb59-449c-9ea1-f4bc1694a634",
      3: "https://pay.paguecerto.click/c/dbaa692f-cea9-4f76-9f3e-3ec9a9987e03"
    })
  });

  const PRICES = Object.freeze({
    bronze: { unit: 49.70, original: 129.90, values: [49.70, 64.61, 82.01] },
    prata:  { unit: 79.90, original: 199.00, values: [79.90, 103.87, 131.84] },
    ouro:   { unit: 99.90, original: 299.00, values: [99.90, 129.87, 164.84] }
  });

  const money = value => Number(value).toLocaleString("pt-BR", {
    minimumFractionDigits: 2, maximumFractionDigits: 2
  });

  function setCheckoutLink(card, product, quantity) {
    const button = card.querySelector("[data-checkout-product]");
    if (!button) return;
    const destination = CHECKOUT_LINKS[product]?.[quantity] || "";
    button.dataset.checkoutQuantity = String(quantity);
    if (destination) {
      button.href = destination;
      button.removeAttribute("aria-disabled");
      button.classList.remove("checkout-pending");
      button.textContent = `Quero a ${PRICES[product].label || product[0].toUpperCase()+product.slice(1)}${quantity > 1 ? ` (${quantity} caixas)` : ""} →`;
      button.insertAdjacentHTML("beforeend", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>');
    } else {
      button.href = "#";
      button.setAttribute("aria-disabled", "true");
      button.classList.add("checkout-pending");
      button.title = `Link de checkout para ${quantity} ${quantity === 1 ? "caixa" : "caixas"} ainda não cadastrado`;
      button.innerHTML = `Checkout de ${quantity} ${quantity === 1 ? "caixa" : "caixas"} pendente <span aria-hidden="true">→</span>`;
    }
  }

  function updateCard(card, product, quantity) {
    const config = PRICES[product];
    if (!config) return;
    const value = config.values[quantity - 1];
    const original = config.original * quantity;
    const saving = original - value;
    const integer = Math.floor(value);
    const cents = Math.round((value - integer) * 100).toString().padStart(2, "0");

    card.querySelector("[data-main-price]").textContent = String(integer);
    card.querySelector("[data-main-cents]").textContent = `,${cents}`;
    card.querySelector("[data-original]").textContent = `R$ ${money(original)}`;
    card.querySelector("[data-saving]").textContent = `R$ ${money(saving)}`;

    card.querySelectorAll("[data-quantity]").forEach(option => {
      const selected = Number(option.dataset.quantity) === quantity;
      option.classList.toggle("is-on", selected);
      option.setAttribute("aria-pressed", selected ? "true" : "false");
    });

    setCheckoutLink(card, product, quantity);
  }

  document.querySelectorAll("[data-plan-product]").forEach(card => {
    const product = card.dataset.planProduct;
    card.querySelectorAll("[data-quantity]").forEach(option => {
      option.addEventListener("click", () => {
        updateCard(card, product, Number(option.dataset.quantity));
      });
    });
    updateCard(card, product, 1);
  });

  document.addEventListener("click", event => {
    const link = event.target.closest("[data-checkout-product]");
    if (!link) return;
    const product = link.dataset.checkoutProduct;
    const quantity = Number(link.dataset.checkoutQuantity || 1);
    if (!CHECKOUT_LINKS[product]?.[quantity]) {
      event.preventDefault();
      alert("O link de checkout desta quantidade ainda não foi configurado. Entre em contato com o suporte ou preencha o destino em assets/checkout-links.js.");
    }
  });

  // Disponibiliza o mapa para conferência e edição sem espalhar URLs pelo HTML.
  window.CHECKOUT_LINKS = CHECKOUT_LINKS;
})();
