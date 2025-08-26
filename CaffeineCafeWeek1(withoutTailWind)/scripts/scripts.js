// Initialize Lucide icons
lucide.createIcons();

// Set current year in footer
document.getElementById("current-year").textContent = new Date().getFullYear();

// Mobile menu toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuIcon = document.getElementById("mobile-menu-icon");

mobileMenuButton.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("show");
  mobileMenuIcon.setAttribute("data-lucide", isOpen ? "x" : "menu");
  lucide.createIcons();
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".mobile-menu-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("show");
    mobileMenuIcon.setAttribute("data-lucide", "menu");
    lucide.createIcons();
  });
});

// Carousel functionality
const carouselpublic = [
  {
    url: "./public/carousealimg1.avif",
    alt: "Freshly brewed coffee",
    caption: "Freshly brewed coffee made with care",
  },
  {
    url: "./public/carouselimg2.avif",
    alt: "Coffee shop interior",
    caption: "Our cozy, welcoming interior",
  },
  {
    url: "./public/carouselimg3.avif",
    alt: "Coffee beans",
    caption: "Only the finest coffee beans",
  },
  {
    url: "./public/carouselimg4.avif",
    alt: "Pastries",
    caption: "Delicious pastries baked fresh daily",
  },
];

let currentCarouselIndex = 0;
const carouselContainer = document.querySelector(".carousel");

function renderCarousel() {
  if (!carouselContainer) return;
  carouselContainer.innerHTML = `
    <div class="carousel-inner">
      ${carouselpublic
        .map(
          (image, index) => `
        <div class="carousel-slide ${
          index === currentCarouselIndex ? "opacity-100" : ""
        }">
          <div class="image-wrapper">
            <img src="${image.url}" alt="${image.alt}" loading="lazy">
          </div>
          <div class="caption">
            <p>${image.caption}</p>
          </div>
        </div>
      `
        )
        .join("")}
      <button class="prev" aria-label="Previous slide"><i data-lucide="chevron-left"></i></button>
      <button class="next" aria-label="Next slide"><i data-lucide="chevron-right"></i></button>
      <div class="dots">
        ${carouselpublic
          .map(
            (_, index) => `
          <button type="button" class="${
            index === currentCarouselIndex ? "active" : ""
          }" aria-label="Go to slide ${index + 1}"></button>
        `
          )
          .join("")}
      </div>
    </div>
  `;
  lucide.createIcons();

  carouselContainer.querySelector(".prev").addEventListener("click", prevSlide);
  carouselContainer.querySelector(".next").addEventListener("click", nextSlide);
  carouselContainer.querySelectorAll(".dots button").forEach((btn, idx) => {
    btn.addEventListener("click", () => goToSlide(idx));
  });
}

function nextSlide() {
  currentCarouselIndex = (currentCarouselIndex + 1) % carouselpublic.length;
  renderCarousel();
}

function prevSlide() {
  currentCarouselIndex =
    (currentCarouselIndex - 1 + carouselpublic.length) % carouselpublic.length;
  renderCarousel();
}

function goToSlide(index) {
  currentCarouselIndex = index;
  renderCarousel();
}

// Initialize carousel
if (carouselContainer) {
  renderCarousel();
  // setInterval(nextSlide, 5000);
}

// Menu functionality
const menuItems = {
  coffee: [
    {
      id: 1,
      name: "Espresso",
      description:
        "A concentrated form of coffee served in small, strong shots.",
      price: "₹300",
      image: "../public/esperso.avif",
    },
    {
      id: 2,
      name: "Cappuccino",
      description:
        "Espresso with steamed milk foam, perfect balance of rich espresso and creamy milk.",
      price: "₹386",
      image: "../public/cappecono.avif",
    },
    {
      id: 3,
      name: "Latte",
      description:
        "Espresso with a large amount of steamed milk and a light layer of foam.",
      price: "₹410",
      image: "../public/latte.avif",
    },
    {
      id: 4,
      name: "Mocha",
      description:
        "Espresso with chocolate and steamed milk, topped with whipped cream.",
      price: "₹450",
      image: "../public/mocha.avif",
    },
    {
      id: 5,
      name: "Cold Brew",
      description:
        "Coffee grounds steeped in cold water for 12+ hours, resulting in a smooth, less acidic flavor.",
      price: "₹410",
      image: "../public/coldbrew.avif",
    },
    {
      id: 6,
      name: "Hazelnut Mocha Supreme",
      description:
        "Our signature drink: Rich espresso blended with chocolate, hazelnut, and topped with whipped cream and caramel drizzle.",
      price: "₹512",
      image: "../public/HazelnutMochaSupreme.avif",
    },
  ],
  food: [
    {
      id: 7,
      name: "Croissant",
      description:
        "Buttery, flaky pastry, perfect companion for your morning coffee.",
      price: "₹280",
      image: "../public/croisant.avif",
    },
    {
      id: 8,
      name: "Blueberry Muffin",
      description:
        "Moist muffin filled with fresh blueberries and topped with a sugar crumble.",
      price: "₹325",
      image: "../public/BlueberryMuffins.jfif",
    },
    {
      id: 9,
      name: "Avocado Toast",
      description:
        "Whole grain toast topped with mashed avocado, cherry tomatoes, and microgreens.",
      price: "₹685",
      image: "../public/AvocadoToast.jfif",
    },
    {
      id: 10,
      name: "Chocolate Chip Cookie",
      description: "Freshly baked cookie with semi-sweet chocolate chips.",
      price: "₹255",
      image: "../public/chocochipcookies.avif",
    },
    {
      id: 11,
      name: "Breakfast Sandwich",
      description:
        "Egg, cheese, and your choice of bacon or sausage on a toasted English muffin.",
      price: "₹600",
      image: "../public/breafastSandwich.avif",
    },
    {
      id: 12,
      name: "Fruit & Yogurt Parfait",
      description:
        "Layers of Greek yogurt, granola, and seasonal fresh fruits.",
      price: "₹510",
      image: "../public/fruitandyogurt.avif",
    },
  ],
};

function renderMenuItems(category) {
  const container = document.getElementById("menu-items-container");
  if (!container) return;
  container.innerHTML = menuItems[category]
    .map(
      (item) => `
    <div class="menu-item">
      <div class="image-wrapper menu-item-image">
        <img src="${item.image}" alt="${item.name}">
        <div class="menu-item-description">
          <p>${item.description}</p>
        </div>
      </div>
      <div class="menu-item-content">
        <div>
          <h3>${item.name}</h3>
          <span>${item.price}</span>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// Initialize with coffee menu
if (document.getElementById("menu-items-container")) {
  renderMenuItems("coffee");
}

// Tab switching
document.querySelectorAll(".menu-tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");

    document.querySelectorAll(".menu-tab-button").forEach((btn) => {
      btn.classList.remove("active");
    });
    button.classList.add("active");

    renderMenuItems(category);
  });
});

// Gallery functionality
const gallerypublic = [
  {
    thumbnail: "./public/gal1thumb.avif",
    full: "./public/gal1thumb.avif",
    alt: "Coffee beans",
    caption: "Premium coffee beans from around the world",
  },
  {
    thumbnail: "./public/gal2thumb.avif",
    full: "./public/gal2thumb.avif",
    alt: "Barista preparing coffee",
    caption: "Our skilled baristas craft each drink with precision",
  },
  {
    thumbnail: "./public/gal3thumb.avif",
    full: "./public/gal3thumb.avif",
    alt: "Coffee art",
    caption: "Beautiful latte art by our talented team",
  },
  {
    thumbnail: "./public/gal4thumb.avif",
    full: "./public/gal4thumb.avif",
    alt: "Cozy seating area",
    caption: "Comfortable seating for work or relaxation",
  },
  {
    thumbnail: "./public/gal5thumb.avif",
    full: "./public/gal5thumb.avif",
    alt: "Freshly baked pastries",
    caption: "Delicious pastries baked fresh daily",
  },
  {
    thumbnail: "./public/gal6thumb.avif",
    full: "./public/gal6thumb.avif",
    alt: "Coffee shop interior",
    caption: "Our warm and inviting interior",
  },
];

function renderGallery() {
  const container = document.getElementById("gallery-grid");
  if (!container) return;
  container.innerHTML = gallerypublic
    .map(
      (image, index) => `
    <div class="gallery-item image-wrapper" onclick="openLightbox(${index})">
      <img src="${image.thumbnail}" alt="${image.alt}">
    </div>
  `
    )
    .join("");
}

let currentImageIndex = 0;

function openLightbox(index) {
  currentImageIndex = index;
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxCounter = document.getElementById("lightbox-counter");

  lightboxImage.src = gallerypublic[index].full;
  lightboxImage.alt = gallerypublic[index].alt;
  lightboxCaption.textContent = gallerypublic[index].caption;
  lightboxCounter.textContent = `${index + 1} of ${gallerypublic.length}`;

  lightbox.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("show");
  document.body.style.overflow = "auto";
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % gallerypublic.length;
  updateLightboxImage();
}

function prevImage() {
  currentImageIndex =
    (currentImageIndex - 1 + gallerypublic.length) % gallerypublic.length;
  updateLightboxImage();
}

function updateLightboxImage() {
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxCounter = document.getElementById("lightbox-counter");

  lightboxImage.src = gallerypublic[currentImageIndex].full;
  lightboxImage.alt = gallerypublic[currentImageIndex].alt;
  lightboxCaption.textContent = gallerypublic[currentImageIndex].caption;
  lightboxCounter.textContent = `${currentImageIndex + 1} of ${
    gallerypublic.length
  }`;
}

// Initialize gallery
if (document.getElementById("gallery-grid")) {
  renderGallery();
}

// FAQ functionality
const faqItems = [
  {
    question: "What type of coffee beans do you use?",
    answer:
      "We source our beans from sustainable farms around the world, including regions in Ethiopia, Colombia, and Guatemala. All our coffee is fair trade and organic certified.",
  },
  {
    question: "Do you offer non-dairy milk alternatives?",
    answer:
      "Yes! We offer a variety of non-dairy options including oat milk, almond milk, soy milk, and coconut milk at no extra charge.",
  },
  {
    question: "Do you have gluten-free food options?",
    answer:
      "Absolutely! We have several gluten-free pastries and food items available daily. Just ask our staff for today's gluten-free options.",
  },
  {
    question: "Do you offer Wi-Fi for customers?",
    answer:
      "Yes, we provide complimentary high-speed Wi-Fi for all our customers. The password is available at the counter.",
  },
  {
    question: "Can I book the space for private events?",
    answer:
      "Yes, we offer private event bookings during evening hours. Please contact us at events@brewhaven.example for availability and pricing.",
  },
  {
    question: "Do you sell your coffee beans for home use?",
    answer:
      "Yes, we sell whole bean and ground coffee in various sizes. We can also grind the beans to your preferred consistency upon request.",
  },
];

function renderFAQ() {
  const container = document.getElementById("faq-container");
  if (!container) return;

  container.innerHTML = faqItems
    .map(
      (item, index) => `
    <div class="faq-item">
      <button class="faq-question" aria-expanded="false" aria-controls="faq-content-${index}" data-index="${index}">
        <span>${item.question}</span>
        <i data-lucide="chevron-down" class="faq-icon"></i>
      </button>
      <div class="faq-content" id="faq-content-${index}">
        <p>${item.answer}</p>
      </div>
    </div>
  `
    )
    .join("");
  lucide.createIcons();

  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-index");
      const content = document.getElementById(`faq-content-${index}`);
      const isExpanded = button.getAttribute("aria-expanded") === "true";

      // Close all others
      document.querySelectorAll(".faq-question").forEach((btn) => {
        if (btn !== button) {
          btn.setAttribute("aria-expanded", "false");
          document
            .getElementById(`faq-content-${btn.getAttribute("data-index")}`)
            .classList.remove("show");
        }
      });

      button.setAttribute("aria-expanded", !isExpanded);
      content.classList.toggle("show");
    });
  });
}

// Initialize FAQ
if (document.getElementById("faq-container")) {
  renderFAQ();
}

// Contact form validation
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");

    nameError.classList.remove("show");
    emailError.classList.remove("show");
    messageError.classList.remove("show");

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    let isValid = true;

    if (!name) {
      nameError.classList.add("show");
      isValid = false;
    }

    if (!email) {
      emailError.classList.add("show");
      emailError.textContent = "Email is required";
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      emailError.classList.add("show");
      emailError.textContent = "Invalid email address";
      isValid = false;
    }

    if (!message) {
      messageError.classList.add("show");
      isValid = false;
    }

    if (isValid) {
      console.log("Form submitted:", { name, email, message });

      document.getElementById("form-success").classList.add("show");

      contactForm.reset();

      setTimeout(() => {
        document.getElementById("form-success").classList.remove("show");
      }, 5000);
    }
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");

    // Do not scroll for placeholder links
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});
