// Initialize Lucide icons
lucide.createIcons();

// Set current year in footer
document.getElementById("current-year").textContent = new Date().getFullYear();

// Mobile menu toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuIcon = document.getElementById("mobile-menu-icon");

mobileMenuButton.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("hidden");
  if (isOpen) {
    mobileMenuIcon.setAttribute("data-lucide", "x");
  } else {
    mobileMenuIcon.setAttribute("data-lucide", "menu");
  }
  lucide.createIcons();
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".mobile-menu-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    mobileMenuIcon.setAttribute("data-lucide", "menu");
    lucide.createIcons();
  });
});

// Carousel functionality
const carouselImages = [
  {
    url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    alt: "Freshly brewed coffee",
    caption: "Freshly brewed coffee made with care",
  },
  {
    url: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    alt: "Coffee shop interior",
    caption: "Our cozy, welcoming interior",
  },
  {
    url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    alt: "Coffee beans",
    caption: "Only the finest coffee beans",
  },
  {
    url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    alt: "Pastries",
    caption: "Delicious pastries baked fresh daily",
  },
];

let currentCarouselIndex = 0;
const carouselContainer = document.querySelector(
  "#carousel-section .carousel-wrapper"
);

function renderCarousel() {
  carouselContainer.innerHTML = `
        <div class="relative h-64 md:h-96 overflow-hidden rounded-lg shadow-lg">
          ${carouselImages
            .map(
              (image, index) => `
            <div class="absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentCarouselIndex ? "opacity-100" : "opacity-0"
            }">
              <img src="${image.url}" alt="${
                image.alt
              }" class="w-full h-full object-cover">
              <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p class="text-white text-lg font-medium">${image.caption}</p>
              </div>
            </div>
          `
            )
            .join("")}
          <button onclick="prevSlide()" class="absolute top-1/2 left-2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors">
            <i data-lucide="chevron-left" class="h-6 w-6"></i>
          </button>
          <button onclick="nextSlide()" class="absolute top-1/2 right-2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors">
            <i data-lucide="chevron-right" class="h-6 w-6"></i>
          </button>
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            ${carouselImages
              .map(
                (_, index) => `
              <button onclick="goToSlide(${index})" class="w-3 h-3 rounded-full transition-colors ${
                  index === currentCarouselIndex ? "bg-white" : "bg-white/50"
                }"></button>
            `
              )
              .join("")}
          </div>
        </div>
      `;
  lucide.createIcons();
}

function nextSlide() {
  currentCarouselIndex = (currentCarouselIndex + 1) % carouselImages.length;
  renderCarousel();
}

function prevSlide() {
  currentCarouselIndex =
    (currentCarouselIndex - 1 + carouselImages.length) % carouselImages.length;
  renderCarousel();
}

function goToSlide(index) {
  currentCarouselIndex = index;
  renderCarousel();
}

// Initialize carousel
if (carouselContainer) {
  renderCarousel();
  // Auto-advance carousel
  setInterval(nextSlide, 5000);
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
      image: "./images/esperso.avif",
    },
    {
      id: 2,
      name: "Cappuccino",
      description:
        "Espresso with steamed milk foam, perfect balance of rich espresso and creamy milk.",
      price: "₹386",
      image: "./images/cappecono.avif",
    },
    {
      id: 3,
      name: "Latte",
      description:
        "Espresso with a large amount of steamed milk and a light layer of foam.",
      price: "₹410",
      image: "./images/latte.avif",
    },
    {
      id: 4,
      name: "Mocha",
      description:
        "Espresso with chocolate and steamed milk, topped with whipped cream.",
      price: "₹450",
      image: "./images/mocha.avif",
    },
    {
      id: 5,
      name: "Cold Brew",
      description:
        "Coffee grounds steeped in cold water for 12+ hours, resulting in a smooth, less acidic flavor.",
      price: "₹410",
      image: "./images/coldbrew.avif",
    },
    {
      id: 6,
      name: "Hazelnut Mocha Supreme",
      description:
        "Our signature drink: Rich espresso blended with chocolate, hazelnut, and topped with whipped cream and caramel drizzle.",
      price: "₹512",
      image: "./images/HazelnutMochaSupreme.avif",
    },
  ],
  food: [
    {
      id: 7,
      name: "Croissant",
      description:
        "Buttery, flaky pastry, perfect companion for your morning coffee.",
      price: "₹280",
      image: "./images/croisant.avif",
    },
    {
      id: 8,
      name: "Blueberry Muffin",
      description:
        "Moist muffin filled with fresh blueberries and topped with a sugar crumble.",
      price: "₹325",
      image: "./images/BlueberryMuffins.jfif",
    },
    {
      id: 9,
      name: "Avocado Toast",
      description:
        "Whole grain toast topped with mashed avocado, cherry tomatoes, and microgreens.",
      price: "₹685",
      image: "./images/AvocadoToast.jfif",
    },
    {
      id: 10,
      name: "Chocolate Chip Cookie",
      description: "Freshly baked cookie with semi-sweet chocolate chips.",
      price: "₹255",
      image: "./images/chocochipcookies.avif",
    },
    {
      id: 11,
      name: "Breakfast Sandwich",
      description:
        "Egg, cheese, and your choice of bacon or sausage on a toasted English muffin.",
      price: "₹600",
      image: "./images/breafastSandwich.avif",
    },
    {
      id: 12,
      name: "Fruit & Yogurt Parfait",
      description:
        "Layers of Greek yogurt, granola, and seasonal fresh fruits.",
      price: "₹510",
      image: "./images/fruitandyogurt.avif",
    },
  ],
};

function renderMenuItems(category) {
  const container = document.getElementById("menu-items-container");
  if (!container) return;
  container.innerHTML = menuItems[category]
    .map(
      (item) => `
        <div class="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg menu-item">
          <!-- RULE 5: Added 'image-wrapper' class and used aspect-ratio -->
          <div class="relative aspect-[4/3] image-wrapper">
            <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 transition-opacity duration-300 opacity-0 menu-item-description">
              <p class="text-white text-center">${item.description}</p>
            </div>
          </div>
          <div class="p-4">
            <div class="flex justify-between items-center">
              <!-- RULE 10: h3 for info-box-title -->
              <h3 class="text-lg font-semibold">${item.name}</h3>
              <span class="text-amber-700 font-bold">${item.price}</span>
            </div>
          </div>
        </div>
      `
    )
    .join("");

  // Add hover event listeners
  document.querySelectorAll(".menu-item").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item
        .querySelector(".menu-item-description")
        .classList.remove("opacity-0");
    });
    item.addEventListener("mouseleave", () => {
      item.querySelector(".menu-item-description").classList.add("opacity-0");
    });
  });
}

// Initialize with coffee menu
if (document.getElementById("menu-items-container")) {
  renderMenuItems("coffee");
}

// Tab switching
document.querySelectorAll(".menu-tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");

    // Update active tab styling
    document.querySelectorAll(".menu-tab-button").forEach((btn) => {
      btn.classList.remove("bg-amber-700", "text-white");
      btn.classList.add("bg-white", "text-amber-900", "hover:bg-amber-100");
    });
    button.classList.remove("bg-white", "text-amber-900", "hover:bg-amber-100");
    button.classList.add("bg-amber-700", "text-white");

    // Render items for selected category
    renderMenuItems(category);
  });
});

// Gallery functionality
const galleryImages = [
  {
    thumbnail: "./images/gal1thumb.avif",
    full: "./images/gal1thumb.avif",
    alt: "Coffee beans",
    caption: "Premium coffee beans from around the world",
  },
  {
    thumbnail: "./images/gal2thumb.avif",
    full: "./images/gal2thumb.avif",
    alt: "Barista preparing coffee",
    caption: "Our skilled baristas craft each drink with precision",
  },
  {
    thumbnail: "./images/gal3thumb.avif",
    full: "./images/gal3thumb.avif",
    alt: "Coffee art",
    caption: "Beautiful latte art by our talented team",
  },
  {
    thumbnail: "./images/gal4thumb.avif",
    full: "./images/gal4thumb.avif",
    alt: "Cozy seating area",
    caption: "Comfortable seating for work or relaxation",
  },
  {
    thumbnail: "./images/gal5thumb.avif",
    full: "./images/gal5thumb.avif",
    alt: "Freshly baked pastries",
    caption: "Delicious pastries baked fresh daily",
  },
  {
    thumbnail: "./images/gal6thumb.avif",
    full: "./images/gal6thumb.avif",
    alt: "Coffee shop interior",
    caption: "Our warm and inviting interior",
  },
];

function renderGallery() {
  const container = document.getElementById("gallery-grid");
  if (!container) return;
  container.innerHTML = galleryImages
    .map(
      (image, index) => `
        <!-- RULE 5: Added 'image-wrapper' class and used aspect-ratio -->
        <div class="overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105 image-wrapper aspect-square" onclick="openLightbox(${index})">
          <img src="${image.thumbnail}" alt="${image.alt}" class="w-full h-full object-cover">
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

  lightboxImage.src = galleryImages[index].full;
  lightboxImage.alt = galleryImages[index].alt;
  lightboxCaption.textContent = galleryImages[index].caption;
  lightboxCounter.textContent = `${index + 1} of ${galleryImages.length}`;

  lightbox.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").classList.add("hidden");
  document.body.style.overflow = "auto";
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  openLightbox(currentImageIndex);
}

function prevImage() {
  currentImageIndex =
    (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  openLightbox(currentImageIndex);
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
        <!-- RULE 9: Removed border-b to 'remove dividers' -->
        <div>
          <button class="w-full text-left py-4 flex justify-between items-center focus:outline-none faq-question" data-index="${index}">
            <span class="font-medium text-lg">${item.question}</span>
            <i data-lucide="chevron-down" class="h-5 w-5 text-amber-700 faq-icon"></i>
          </button>
          <div class="overflow-hidden transition-all duration-300 max-h-0 faq-content" id="faq-content-${index}">
            <p class="text-gray-600 pb-4">${item.answer}</p>
          </div>
        </div>
      `
    )
    .join("");

  // Add click event listeners
  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-index");
      const content = document.getElementById(`faq-content-${index}`);
      const icon = button.querySelector(".faq-icon");

      const isOpening = content.classList.contains("max-h-0");

      // Close all other FAQ items
      document.querySelectorAll(".faq-content").forEach((c, i) => {
        if (i.toString() !== index) {
          c.classList.add("max-h-0");
          c.classList.remove("max-h-40", "pb-4");
          const otherIcon = document.querySelector(
            `.faq-question[data-index="${i}"] .faq-icon`
          );
          if (otherIcon) {
            otherIcon.setAttribute("data-lucide", "chevron-down");
          }
        }
      });

      // Toggle the clicked item
      if (isOpening) {
        content.classList.remove("max-h-0");
        content.classList.add("max-h-40"); // Adjust max-height if needed
        icon.setAttribute("data-lucide", "chevron-up");
      } else {
        content.classList.add("max-h-0");
        content.classList.remove("max-h-40");
        icon.setAttribute("data-lucide", "chevron-down");
      }

      lucide.createIcons();
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

    // Reset errors
    document.getElementById("name-error").classList.add("hidden");
    document.getElementById("email-error").classList.add("hidden");
    document.getElementById("message-error").classList.add("hidden");

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    let isValid = true;

    // Validate name
    if (!name) {
      document.getElementById("name-error").classList.remove("hidden");
      isValid = false;
    }

    // Validate email
    if (!email) {
      document.getElementById("email-error").classList.remove("hidden");
      document.getElementById("email-error").textContent = "Email is required";
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      document.getElementById("email-error").classList.remove("hidden");
      document.getElementById("email-error").textContent =
        "Invalid email address";
      isValid = false;
    }

    // Validate message
    if (!message) {
      document.getElementById("message-error").classList.remove("hidden");
      isValid = false;
    }

    if (isValid) {
      // Mock form submission
      console.log("Form submitted:", { name, email, message });

      // Show success message
      document.getElementById("form-success").classList.remove("hidden");

      // Reset form
      contactForm.reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        document.getElementById("form-success").classList.add("hidden");
      }, 5000);
    }
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});
