(function () {
  var menuToggle = document.querySelector("[data-menu-toggle]");
  var navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      menuToggle.classList.toggle("open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    var navItems = navLinks.querySelectorAll("a");
    for (var i = 0; i < navItems.length; i += 1) {
      navItems[i].addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
      });
    }
  }

  var carousel = document.querySelector("[data-carousel]");
  if (!carousel) return;

  var slides = carousel.querySelectorAll(".hero-slide");
  var prevButton = carousel.querySelector("[data-carousel-prev]");
  var nextButton = carousel.querySelector("[data-carousel-next]");
  var dotsWrap = carousel.querySelector("[data-carousel-dots]");
  var currentIndex = 0;
  var timer = null;

  if (slides.length < 2 || !dotsWrap) return;

  function setSlide(index) {
    slides[currentIndex].classList.remove("active");
    if (dotsWrap.children[currentIndex]) {
      dotsWrap.children[currentIndex].classList.remove("active");
    }

    currentIndex = (index + slides.length) % slides.length;
    slides[currentIndex].classList.add("active");
    if (dotsWrap.children[currentIndex]) {
      dotsWrap.children[currentIndex].classList.add("active");
    }
  }

  function startTimer() {
    window.clearInterval(timer);
    timer = window.setInterval(function () {
      setSlide(currentIndex + 1);
    }, 3500);
  }

  for (var j = 0; j < slides.length; j += 1) {
    var dot = document.createElement("button");
    dot.className = "carousel-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", "Show product photo " + (j + 1));
    dot.setAttribute("data-slide-index", String(j));
    dot.addEventListener("click", function (event) {
      setSlide(Number(event.currentTarget.getAttribute("data-slide-index")));
      startTimer();
    });
    dotsWrap.appendChild(dot);
  }

  if (prevButton) {
    prevButton.addEventListener("click", function () {
      setSlide(currentIndex - 1);
      startTimer();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      setSlide(currentIndex + 1);
      startTimer();
    });
  }

  setSlide(0);
  startTimer();
}());