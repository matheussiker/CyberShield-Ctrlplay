// ==============================
// PARTICLES
// ==============================
function createParticles() {
  const container = document.getElementById("particles");
  const count = 40;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    const x = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 15;
    const size = Math.random() * 3 + 1;

    particle.style.left = x + "%";
    particle.style.bottom = "-10px";
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.animationDuration = duration + "s";
    particle.style.animationDelay = "-" + delay + "s";
    particle.style.opacity = (Math.random() * 0.7 + 0.3).toString();

    container.appendChild(particle);
  }
}

// ==============================
// COUNTER ANIMATION
// ==============================
function animateCounter(element, target, duration) {
  duration = duration || 2000;
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(function () {
    start += increment;
    if (start >= target) {
      element.textContent = target + (target >= 10 ? "+" : "");
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// ==============================
// GLITCH EFFECT
// ==============================
function triggerGlitch() {
  const title = document.getElementById("mainTitle");
  title.classList.add("glitch-active");
  setTimeout(function () {
    title.classList.remove("glitch-active");
  }, 300);
}

// ==============================
// PLAY BUTTON
// ==============================
function handlePlay() {
  // --- CÓDIGO DO SOM ADICIONADO AQUI ---
  const somInicio = document.getElementById("som-inicio");
  somInicio.currentTime = 0; // Reseta o som se a pessoa clicar rápido de novo
  somInicio.play(); // Toca o som
  // ------------------------------------

  const btn = document.querySelector(".play-btn");

  // Visual feedback
  btn.style.transform = "scale(0.95)";
  btn.style.boxShadow =
    "0 0 60px rgba(0, 212, 255, 0.9), 0 0 100px rgba(0, 212, 255, 0.5)";

  setTimeout(function () {
    btn.style.transform = "";
    btn.style.boxShadow = "";
  }, 300);

  // Trigger glitch
  triggerGlitch();

  // Flash effect on screen
  const flash = document.createElement("div");
  flash.style.position = "fixed";
  flash.style.inset = "0";
  flash.style.background = "rgba(0, 212, 255, 0.1)";
  flash.style.zIndex = "9998";
  flash.style.pointerEvents = "none";
  flash.style.animation = "flashFade 0.5s ease-out forwards";

  document.body.appendChild(flash);

  // ✅ Efeito termina normalmente e SÓ DEPOIS redireciona
  setTimeout(function () {
    window.location.href = "./public/pagina1.html";
  }, 1000);
}

// ==============================
// MOBILE MENU TOGGLE
// ==============================
function toggleMenu() {
  const links = document.querySelector(".nav-links");

  if (links.style.display === "flex") {
    links.style.display = "none";
  } else {
    links.style.display = "flex";
    links.style.flexDirection = "column";
    links.style.position = "fixed";
    links.style.top = "70px";
    links.style.left = "0";
    links.style.width = "100%";
    links.style.background = "rgba(9, 21, 36, 0.98)";
    links.style.padding = "20px";
    links.style.gap = "20px";
    links.style.borderBottom = "1px solid rgba(0, 212, 255, 0.2)";
  }
}

// ==============================
// MOUSE PARALLAX ON LOGO
// ==============================
document.addEventListener("mousemove", function (e) {
  const logo = document.querySelector(".logo-img");
  if (!logo) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  logo.style.transform =
    "perspective(500px) rotateY(" + x + "deg) rotateX(" + -y + "deg)";
});

// ==============================
// INIT ON LOAD
// ==============================
window.addEventListener("load", function () {
  createParticles();

  // Start counters after delay
  setTimeout(function () {
    animateCounter(document.getElementById("stat1"), 47, 2000);
    animateCounter(document.getElementById("stat2"), 6, 1500);
    animateCounter(document.getElementById("stat3"), 12, 1800);
  }, 1500);

  // Random glitch every ~5s
  setInterval(function () {
    if (Math.random() < 0.3) {
      triggerGlitch();
    }
  }, 5000);
});
