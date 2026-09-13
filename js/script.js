// ===== HAMBURGER NAVIGATION (all pages) =====
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
}

// ===== DYNAMIC FOOTER YEAR (all pages) =====
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ===== ACCORDION (menu.html) =====
const accordionToggles = document.querySelectorAll('.accordion-toggle');

accordionToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const panel = toggle.nextElementSibling;
    const isOpen = panel.classList.contains('open');

    // close all panels first
    document.querySelectorAll('.accordion-panel').forEach(p => p.classList.remove('open'));
    document.querySelectorAll('.accordion-toggle').forEach(t => t.setAttribute('aria-expanded', 'false'));

    // open the clicked one if it wasn't already open
    if (!isOpen) {
      panel.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });
});

// ===== CAROUSEL (gallery.html) =====
const carouselTrack = document.getElementById('carouselTrack');

if (carouselTrack) {
  const slides = carouselTrack.children;
  const dotsContainer = document.getElementById('carouselDots');
  let currentSlide = 0;

  // build dots dynamically
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  function goToSlide(index) {
    currentSlide = index;
    carouselTrack.style.transform = `translateX(-${index * 100}%)`;
    document.querySelectorAll('.carousel-dots span').forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
  }

  document.getElementById('nextBtn').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
  });

  document.getElementById('prevBtn').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(currentSlide);
  });

  // auto-advance every 5 seconds
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
  }, 5000);
}

// ===== LIGHTBOX (gallery.html) =====
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

if (lightbox) {
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.querySelector('img').src;
      const imgAlt = item.querySelector('img').alt;
      lightboxImg.src = imgSrc;
      lightboxImg.alt = imgAlt;
      lightbox.classList.add('open');
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('open');
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('open');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lightbox.classList.remove('open');
  });
}

// ===== CONTACT FORM VALIDATION (contact.html) =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const guests = document.getElementById('guests');
    const message = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const guestsError = document.getElementById('guestsError');
    const messageError = document.getElementById('messageError');
    const formSuccess = document.getElementById('formSuccess');

    // reset errors
    [nameError, emailError, guestsError, messageError].forEach(el => el.textContent = '');
    formSuccess.classList.remove('show');

    // name check
    if (name.value.trim().length < 2) {
      nameError.textContent = 'Please enter your full name.';
      isValid = false;
    }

    // email check (basic pattern)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      emailError.textContent = 'Please enter a valid email address.';
      isValid = false;
    }

    // guests check
    const guestCount = Number(guests.value);
    if (!guests.value || guestCount < 1 || guestCount > 20) {
      guestsError.textContent = 'Party size must be between 1 and 20.';
      isValid = false;
    }

    // message check
    if (message.value.trim().length < 10) {
      messageError.textContent = 'Message should be at least 10 characters.';
      isValid = false;
    }

    if (isValid) {
      formSuccess.classList.add('show');
      contactForm.reset();
    }
  });
}