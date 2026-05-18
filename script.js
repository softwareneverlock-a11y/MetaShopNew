const telegramUser = "MetaShop4";

const newsPosts = [
  {
    date: "18.05.2026",
    title: "Meta Shop открыт онлайн",
    text: "Запускаем каталог с жидкостями, POD-системами и аксессуарами. Заказы принимаются через Telegram.",
  },
  {
    date: "18.05.2026",
    title: "Новые вкусы жидкостей",
    text: "В каталоге появились Banana, Blueberry, Cola, Cold Mango, Pink Lemonade и Spearmint.",
  },
  {
    date: "18.05.2026",
    title: "Быстрое оформление заказа",
    text: "Кнопка заказа сразу открывает чат с готовым сообщением и названием выбранного товара.",
  },
];

const products = {
  liquids: [
    { name: "Banana", price: "450 грн", image: "banana.jpg", manufacturer: "Lucky", volume: "15 мл" },
    { name: "Blueberry", price: "450 грн", image: "blueberry.jpg", manufacturer: "Lucky", volume: "15 мл" },
    { name: "Cola", price: "450 грн", image: "cola.jpg", manufacturer: "Lucky", volume: "15 мл" },
    { name: "Cold Mango", price: "450 грн", image: "cold-mango.jpg", manufacturer: "Lucky", volume: "15 мл" },
    { name: "Pink Lemonade", price: "450 грн", image: "pink-lemonade.jpg", manufacturer: "Lucky", volume: "15 мл" },
    { name: "Spearmint", price: "450 грн", image: "spearmint.jpg", manufacturer: "Lucky", volume: "15 мл" },
  ],
  pods: [
    { name: "POD-система Meta One", price: "850 грн", image: "pod-meta-one.jpg", manufacturer: "Lucky", volume: "15 мл" },
    { name: "POD-система Compact Blue", price: "920 грн", image: "pod-compact-blue.jpg", manufacturer: "Lucky", volume: "15 мл" },
    { name: "POD-система Black Air", price: "990 грн", image: "pod-black-air.jpg", manufacturer: "Lucky", volume: "15 мл" },
  ],
  accessories: [
    { name: "Картридж 0.8 Ом", price: "160 грн", image: "cartridge-08.jpg", manufacturer: "Lucky", volume: "15 мл" },
    { name: "Картридж 1.2 Ом", price: "160 грн", image: "cartridge-12.jpg", manufacturer: "Lucky", volume: "15 мл" },
    { name: "USB-C кабель", price: "120 грн", image: "usb-c-cable.jpg", manufacturer: "Lucky", volume: "15 мл" },
  ],
};

const newsGrid = document.querySelector("#newsGrid");
const productsGrid = document.querySelector("#productsGrid");
const tabButtons = document.querySelectorAll(".tab-button");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".nav-links a");
const revealSections = document.querySelectorAll(".section");

function createOrderUrl(product) {
  const message = `Добрый день, я хочу заказать ${product.name}. Производитель: ${product.manufacturer}. Объем: ${product.volume}`;
  return `https://t.me/${telegramUser}?text=${encodeURIComponent(message)}`;
}

function renderNews() {
  newsGrid.innerHTML = newsPosts
    .map(
      (post) => `
        <article class="news-card">
          <time datetime="${post.date.split(".").reverse().join("-")}">${post.date}</time>
          <h3>${post.title}</h3>
          <p>${post.text}</p>
        </article>
      `
    )
    .join("");
}

function renderProducts(category, animate = false) {
  if (animate) {
    productsGrid.classList.add("is-switching");
  }

  window.setTimeout(
    () => {
  productsGrid.innerHTML = products[category]
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-image">
            <img
              src="images/${product.image}"
              alt="${product.name}"
              loading="lazy"
              onerror="this.replaceWith(createImageFallback('${product.name}'))"
            />
          </div>
          <div class="product-body">
            <h3>${product.name}</h3>
            <div class="product-meta">
              <span>Производитель: ${product.manufacturer}</span>
              <span>Объем: ${product.volume}</span>
            </div>
            <p>Доступно для заказа через Telegram.</p>
            <div class="price">${product.price}</div>
            <a class="order-button" href="${createOrderUrl(product)}" target="_blank" rel="noopener">
              Заказать
            </a>
          </div>
        </article>
      `
    )
    .join("");

      productsGrid.classList.remove("is-switching");
    },
    animate ? 180 : 0
  );
}

function createImageFallback(productName) {
  const fallback = document.createElement("div");
  fallback.className = "product-image-fallback";
  fallback.textContent = productName;
  return fallback;
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderProducts(button.dataset.category, true);
  });
});

menuToggle.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

function initSectionReveal() {
  revealSections.forEach((section) => section.classList.add("reveal"));

  if (!("IntersectionObserver" in window)) {
    revealSections.forEach((section) => section.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealSections.forEach((section) => observer.observe(section));
}

renderNews();
renderProducts("liquids");
initSectionReveal();
