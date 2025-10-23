alert ("Bienvenue sur mon site !")

window.addEventListener('scroll', function() {
  const nav = document.getElementById('nav-bar');

  if (window.scrollY > 50) {
    nav.classList.add('active');
  } else {
    nav.classList.remove('active');
  }
});

const text = ">_ C:\\Quinio";
const title = document.getElementById('typed-title');
let index = 0;
let isDeleting = false;
let speed = 150; // vitesse de frappe

function type() {
  if (!isDeleting && index <= text.length) {
    // Ecriture progressive
    title.textContent = text.substring(0, index);
    index++;
    if (index > text.length) {
      // Pause avant effacement
      isDeleting = true;
      setTimeout(type, 1000);
      return;
    }
  } else if (isDeleting && index >= 0) {
    // Effacement progressif
    title.textContent = text.substring(0, index);
    index--;
    if (index < 0) {
      isDeleting = false;
      setTimeout(type, 500);
      return;
    }
  }
  setTimeout(type, speed);
}

type();

document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('#my-button');

  button.addEventListener('click', () => {
    // Ajoute la classe grow pour grossir
    button.classList.add('grow');

    // Change la couleur de fond
    button.classList.add('color-change');

    // Après 300ms (durée de l'animation), enlève les classes pour revenir à la normale
    setTimeout(() => {
      button.classList.remove('grow', 'color-change');
    }, 300);
  });
});
