// script.js

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', () => {
  // --- VARIABLES ---
  const navToggle = document.querySelector('.nav-toggle'); // Bouton hamburger
  const navMenu = document.getElementById('nav-menu');    // Menu nav à afficher/cacher
  const navLinks = document.querySelectorAll('.nav-link'); // Tous les liens de la nav
  const sections = document.querySelectorAll('section');  // Toutes les sections du one-page
  const form = document.getElementById('contact-form');   // Formulaire de contact
  const formResponse = document.getElementById('form-response'); // Zone de message formulaire

  // --- FONCTION: Toggle menu mobile ---
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', !expanded);
    navMenu.classList.toggle('show');
  });

  // --- FONCTION: Fermer menu mobile quand on clique sur un lien ---
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        navToggle.setAttribute('aria-expanded', false);
      }
    });
  });

  // --- FONCTION: ScrollSpy - Met à jour la nav selon la section visible ---
  function scrollSpy() {
    const scrollPos = window.scrollY + 80; // Décalage pour navbar fixe
    sections.forEach(section => {
      if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').substring(1) === section.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', scrollSpy);
  scrollSpy(); // Appel initial au chargement

  // --- FONCTION: Animation des sections au scroll (fade & slide) ---
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    section.classList.add('hidden'); // Cache les sections au départ
    observer.observe(section);
  });

  // --- FONCTION: Validation simple formulaire ---
  form.addEventListener('submit', e => {
    e.preventDefault(); // Empêche le rechargement

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Expression régulière simple pour email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation
    if (!name || !email || !message) {
      formResponse.textContent = 'Merci de remplir tous les champs.';
      formResponse.style.color = '#f44336'; // rouge
      return;
    }

    if (!emailRegex.test(email)) {
      formResponse.textContent = 'Veuillez entrer une adresse email valide.';
      formResponse.style.color = '#f44336'; // rouge
      return;
    }

    // Simulation d’envoi (ici tu peux intégrer un backend ou service)
    formResponse.textContent = 'Envoi en cours...';
    formResponse.style.color = '#7f5af0'; // violet

    setTimeout(() => {
      formResponse.textContent = 'Merci pour votre message ! Je vous répondrai rapidement.';
      formResponse.style.color = '#4caf50'; // vert
      form.reset();
    }, 1500);
  });
});
