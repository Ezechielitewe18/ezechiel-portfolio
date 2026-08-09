import "./style.css";

const navbar = document.getElementById("navbar");

function onScroll() {
  const scrolled = window.scrollY > 40;
  navbar.classList.toggle("bg-night/90", scrolled);
  navbar.classList.toggle("backdrop-blur", scrolled);
  navbar.classList.toggle("shadow-lg", scrolled);
  navbar.classList.toggle("shadow-violet-brand/10", scrolled);
  navbar.classList.toggle("border-b", scrolled);
  navbar.classList.toggle("border-white/5", scrolled);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const iconOpen = document.getElementById("icon-open");
const iconClose = document.getElementById("icon-close");

menuBtn.addEventListener("click", () => {
  const isOpen = !mobileMenu.classList.contains("hidden");
  mobileMenu.classList.toggle("hidden", isOpen);
  iconOpen.classList.toggle("hidden", !isOpen);
  iconClose.classList.toggle("hidden", isOpen);
});

document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    iconOpen.classList.remove("hidden");
    iconClose.classList.add("hidden");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".scroll-reveal").forEach((el) => revealObserver.observe(el));

const particlesCanvas = document.getElementById("particles");
const ctx = particlesCanvas.getContext("2d");
let particles = [];
const COLORS = ["123, 63, 242", "59, 130, 246", "255, 255, 255"];

function resizeCanvas() {
  particlesCanvas.width = particlesCanvas.offsetWidth;
  particlesCanvas.height = particlesCanvas.offsetHeight;
}

function createParticles() {
  particles = [];
  const count = Math.min(70, Math.floor(particlesCanvas.width / 18));
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * particlesCanvas.width,
      y: Math.random() * particlesCanvas.height,
      radius: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > particlesCanvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > particlesCanvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color}, 0.7)`;
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 110) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(${p.color}, ${0.14 * (1 - dist / 110)})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});

if (particlesCanvas) {
  resizeCanvas();
  createParticles();
  drawParticles();
}

document.getElementById("year").textContent = new Date().getFullYear();
