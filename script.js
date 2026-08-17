const menuToggle = document.querySelector("[data-menu-toggle]");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
    });
  });
}

const carousel = document.querySelector("[data-carousel]");
const heroSlides = carousel ? [...carousel.querySelectorAll("img")] : [];
const prevButton = document.querySelector("[data-carousel-prev]");
const nextButton = document.querySelector("[data-carousel-next]");
const dotsWrap = document.querySelector("[data-carousel-dots]");
let heroSlideIndex = 0;
let heroTimer;

function showHeroSlide(index) {
  if (!heroSlides.length) return;
  heroSlides[heroSlideIndex].classList.remove("active");
  dotsWrap?.children[heroSlideIndex]?.classList.remove("active");
  heroSlideIndex = (index + heroSlides.length) % heroSlides.length;
  heroSlides[heroSlideIndex].classList.add("active");
  dotsWrap?.children[heroSlideIndex]?.classList.add("active");
}

function restartHeroTimer() {
  window.clearInterval(heroTimer);
  heroTimer = window.setInterval(() => showHeroSlide(heroSlideIndex + 1), 3500);
}

if (heroSlides.length > 1 && dotsWrap) {
  heroSlides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "carousel-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Show product photo ${index + 1}`);
    dot.addEventListener("click", () => {
      showHeroSlide(index);
      restartHeroTimer();
    });
    dotsWrap.appendChild(dot);
  });

  prevButton?.addEventListener("click", () => {
    showHeroSlide(heroSlideIndex - 1);
    restartHeroTimer();
  });

  nextButton?.addEventListener("click", () => {
    showHeroSlide(heroSlideIndex + 1);
    restartHeroTimer();
  });

  showHeroSlide(0);
  restartHeroTimer();
}