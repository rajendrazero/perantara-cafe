// ===============================
// FORMAT RUPIAH
// ===============================
const rupiah = (angka) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(angka);

// ===============================
// DATA MENU
// ===============================
const shopItemsData = [
  { id: 1, name: "Burger", description: "Juicy beef burger", price: 25000, type: "Makanan", color: "#FFD0A6", image: "menu1.jpg" },
  { id: 2, name: "Pizza", description: "Cheesy pizza slice", price: 35000, type: "Makanan", color: "#FFD7A6", image: "menu2.jpg" },
  { id: 3, name: "Sushi", description: "Fresh sushi set", price: 48000, type: "Makanan", color: "#D0FFB2", image: "menu3.jpg" },
  { id: 4, name: "Cappuccino", description: "Hot cappuccino coffee", price: 22000, type: "Minuman", color: "#C0E8FF", image: "menu4.jpg" },
  { id: 5, name: "French Fries", description: "Crispy fries", price: 18000, type: "Snack", color: "#FFF1A6", image: "menu5.jpg" }
];

// ===============================
// ELEMENT
// ===============================
const shopContainer = document.getElementById("shop-items");
const cartContainer = document.getElementById("cart-items");
const emptyCart = document.getElementById("empty-cart");
const checkoutBtn = document.getElementById("checkout-btn");
const totalPriceEl = document.getElementById("total-price");
const sortSelect = document.getElementById("sort-select");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("search-input");

let searchKeyword = "";
let cartItems = [];

// ===============================
// STATE SORT & FILTER
// ===============================
let currentFilter = "all";
let currentSort = "";

// ===============================
// APPLY FILTER + SORT
// ===============================
function applyFilterAndSort() {
  let items = [...shopItemsData];

  // SEARCH
  if (searchKeyword) {
    items = items.filter(item =>
      item.name.toLowerCase().includes(searchKeyword) ||
      item.description.toLowerCase().includes(searchKeyword)
    );
  }

  // FILTER
  if (currentFilter !== "all") {
    items = items.filter(item => item.type === currentFilter);
  }

  // SORT
  if (currentSort === "name") {
    items.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (currentSort === "price") {
    items.sort((a, b) => a.price - b.price);
  }
  if (currentSort === "type") {
    items.sort((a, b) => a.type.localeCompare(b.type));
  }

  renderShop(items);
}


// ===============================
// RENDER SHOP
// ===============================
function renderShop(items) {
  shopContainer.innerHTML = "";

  items.forEach(item => {
    const itemEl = document.createElement("div");
    itemEl.className = "item";
    itemEl.dataset.id = item.id;

    const isInCart = cartItems.some(ci => ci.id === item.id);

    itemEl.innerHTML = `
      <div class="image-area" style="background-color:${item.color}">
        <img src="./assets/images/${item.image}" alt="${item.name}">
      </div>
      <div class="name">${item.name}</div>
      <div class="description">${item.description}</div>
      <div class="bottom-area">
        <div class="price">${rupiah(item.price)}</div>
        <div class="button ${isInCart ? "-active" : ""}">
          ${isInCart ? "✔" : "ADD TO CART"}
        </div>
      </div>
    `;

    shopContainer.appendChild(itemEl);

    const button = itemEl.querySelector(".button");
    button.addEventListener("click", () => addToCart(item, itemEl, button));
  });
}

// ===============================
// FILTER BUTTON EVENT
// ===============================
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("-active"));
    btn.classList.add("-active");

    currentFilter = btn.dataset.type;
    applyFilterAndSort();
  });
});

// ===============================
// SORT EVENT
// ===============================
sortSelect.addEventListener("change", () => {
  currentSort = sortSelect.value;
  applyFilterAndSort();
});

// ===============================
// SEARCH EVENT
// ===============================
searchInput.addEventListener("input", e => {
  searchKeyword = e.target.value.toLowerCase();
  applyFilterAndSort();
});


// ===============================
// ADD TO CART + ANIMATION
// ===============================
function addToCart(item, itemEl, button) {
  if (cartItems.find(ci => ci.id === item.id)) return;

  const img = itemEl.querySelector("img");
  const imgClone = img.cloneNode(true);
  const rect = img.getBoundingClientRect();

  Object.assign(imgClone.style, {
    position: "absolute",
    top: rect.top + "px",
    left: rect.left + "px",
    width: rect.width + "px",
    height: rect.height + "px",
    zIndex: 1000
  });

  document.body.appendChild(imgClone);

  const cartRect = document.getElementById("cart-screen").getBoundingClientRect();

  gsap.to(imgClone, {
    duration: 0.7,
    top: cartRect.top + 20,
    left: cartRect.left + 20,
    width: 50,
    height: 50,
    opacity: 0.7,
    rotation: 20,
    ease: "power1.inOut",
    onComplete: () => {
      document.body.removeChild(imgClone);
      cartItems.push({ ...item, count: 1 });
      renderCart();
      button.classList.add("-active");
      button.textContent = "✔";
    }
  });
}

// ===============================
// RENDER CART
// ===============================
function renderCart() {
  cartContainer.innerHTML = "";

  if (cartItems.length === 0) {
    emptyCart.style.display = "block";
    checkoutBtn.style.display = "none";
    totalPriceEl.textContent = "";
    return;
  }

  emptyCart.style.display = "none";
  checkoutBtn.style.display = "block";

  let total = 0;

  cartItems.forEach(item => {
    total += item.price * item.count;

    const cartEl = document.createElement("div");
    cartEl.className = "cart-item";

    cartEl.innerHTML = `
      <div class="cart-image">
        <img src="./assets/images/${item.image}" alt="${item.name}">
      </div>
      <div class="right">
        <div class="name">${item.name}</div>
        <div class="price">
          ${rupiah(item.price)} × ${item.count} = ${rupiah(item.price * item.count)}
        </div>
        <div class="count">
          <div class="button decrement">−</div>
          <div class="number">${item.count}</div>
          <div class="button increment">+</div>
        </div>
      </div>
    `;

    cartContainer.appendChild(cartEl);

    cartEl.querySelector(".decrement").addEventListener("click", () => {
      item.count--;
      if (item.count === 0) {
        cartItems = cartItems.filter(ci => ci.id !== item.id);
        const shopBtn = document.querySelector(`.item[data-id="${item.id}"] .button`);
        if (shopBtn) {
          shopBtn.classList.remove("-active");
          shopBtn.textContent = "ADD TO CART";
        }
      }
      renderCart();
    });

    cartEl.querySelector(".increment").addEventListener("click", () => {
      item.count++;
      renderCart();
    });

    gsap.from(cartEl, { opacity: 0, x: 40, duration: 0.4 });
  });

  totalPriceEl.textContent = "Total: " + rupiah(total);
}

// ===============================
// WHATSAPP CHECKOUT
// ===============================
checkoutBtn.addEventListener("click", () => {
  if (cartItems.length === 0) return;

  const note = document.getElementById("cart-note").value.trim();
  let message = "Halo, saya ingin memesan:%0A";

  cartItems.forEach(item => {
    message += `- ${item.name} (${item.type}) x${item.count} = ${rupiah(item.price * item.count)}%0A`;
  });

  const total = cartItems.reduce((a, b) => a + b.price * b.count, 0);
  message += `%0ATotal: ${rupiah(total)}`;

  if (note) message += `%0ACatatan: ${note}`;

  const phone = "081370728787";
  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
});

// ===============================
// INIT
// ===============================
applyFilterAndSort();
