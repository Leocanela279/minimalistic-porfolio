const year = document.querySelector("[data-year]");
const matrixCanvas = document.querySelector("[data-matrix-canvas]");
const typewriterElements = [...document.querySelectorAll("[data-typewriter]")];
const revealElements = [...document.querySelectorAll(".reveal")];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (year) {
  year.textContent = new Date().getFullYear();
}

function typeText(element, text, speed = 24) {
  if (!element) {
    return Promise.resolve();
  }

  element.textContent = "";

  if (prefersReducedMotion) {
    element.textContent = text;
    return Promise.resolve();
  }

  element.classList.add("is-typing");

  return new Promise((resolve) => {
    let index = 0;
    const timer = window.setInterval(() => {
      element.textContent = text.slice(0, index + 1);
      index += 1;

      if (index >= text.length) {
        window.clearInterval(timer);
        element.classList.remove("is-typing");
        resolve();
      }
    }, speed);
  });
}

function bootTypewriters() {
  typewriterElements.forEach((element, index) => {
    const text = element.dataset.typewriterText || element.textContent.trim();
    const delay = index === 0 ? 250 : 160 + index * 180;

    window.setTimeout(() => {
      typeText(element, text);
    }, delay);
  });
}

function setupReveal() {
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function setupMatrixRain() {
  if (!matrixCanvas || prefersReducedMotion) {
    return;
  }

  const context = matrixCanvas.getContext("2d");
  const glyphs = "01{}[]<>/\\$#_LEOCANELA";
  let columns = [];
  let width = 0;
  let height = 0;
  let lastDraw = 0;

  function resize() {
    const ratio = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    matrixCanvas.width = width * ratio;
    matrixCanvas.height = height * ratio;
    matrixCanvas.style.width = `${width}px`;
    matrixCanvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    columns = Array.from({ length: Math.ceil(width / 20) }, () => Math.random() * height);
  }

  function draw(timestamp = 0) {
    window.requestAnimationFrame(draw);

    if (timestamp - lastDraw < 50) {
      return;
    }

    lastDraw = timestamp;
    context.fillStyle = "rgba(1, 4, 3, 0.16)";
    context.fillRect(0, 0, width, height);
    context.font = "14px IBM Plex Mono";
    context.fillStyle = "rgba(84, 255, 159, 0.58)";

    columns.forEach((y, index) => {
      const glyph = glyphs[Math.floor(Math.random() * glyphs.length)];
      const x = index * 20;
      context.fillText(glyph, x, y);
      columns[index] = y > height + Math.random() * 800 ? 0 : y + 20;
    });
  }

  resize();
  window.requestAnimationFrame(draw);
  window.addEventListener("resize", resize);
}

bootTypewriters();
setupReveal();
setupMatrixRain();
