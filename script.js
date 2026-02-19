/* ============================================
   GAURAV SONAWANE — PORTFOLIO SCRIPTS
============================================ */

// ── Hamburger Menu ────────────────────────
const hamburger = document.getElementById('hamburger');
const navDrawer = document.getElementById('navDrawer');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navDrawer.classList.toggle('open');
  document.body.style.overflow = navDrawer.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.drawer-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navDrawer.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Custom Cursor ──────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

(function animateFollower() {
  fx += (mx - fx) * 0.1;
  fy += (my - fy) * 0.1;
  follower.style.left = fx + 'px';
  follower.style.top = fy + 'px';
  requestAnimationFrame(animateFollower);
})();

// ── Nav Scroll Effect ──────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
  triggerProficiencyBars();
});

// ── Reveal on Scroll ──────────────────────
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ── Proficiency Bars ──────────────────────
let barsAnimated = false;

function triggerProficiencyBars() {
  if (barsAnimated) return;
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;
  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.8) {
    barsAnimated = true;
    document.querySelectorAll('.prof-fill').forEach(bar => {
      const w = bar.getAttribute('data-width');
      bar.style.width = w + '%';
    });
  }
}

// ── Smooth Active Nav Link ─────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
});

// ── Contact Form Submission ────────────────
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = form.querySelector('button');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    formNote.textContent = '✓ Message sent! I\'ll get back to you soon.';
    form.reset();
    btn.textContent = 'Send Message ↗';
    btn.disabled = false;
    setTimeout(() => formNote.textContent = '', 5000);
  }, 1400);
});

// ── Typing Effect in Hero Tag ──────────────
const heroTag = document.querySelector('.hero-tag');
const phrases = ['Full Stack Developer', 'MERN Stack Engineer', 'RESTful API Builder', 'React.js Developer'];
let pi = 0, ci = 0, deleting = false, wait = false;

function typePhrase() {
  if (wait) return setTimeout(typePhrase, 1800);
  const phrase = phrases[pi];

  if (!deleting) {
    heroTag.textContent = phrase.substring(0, ci + 1);
    ci++;
    if (ci === phrase.length) { deleting = true; wait = true; wait = false; return setTimeout(typePhrase, 2000); }
    setTimeout(typePhrase, 70);
  } else {
    heroTag.textContent = phrase.substring(0, ci - 1);
    ci--;
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    setTimeout(typePhrase, 40);
  }
}

setTimeout(typePhrase, 1500);

// ── Skill Card tilt effect ─────────────────
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-4px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── Scroll progress indicator ─────────────
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed;
  top: 0; left: 0;
  height: 2px;
  background: linear-gradient(90deg, #e8ff47, #ff6b35);
  z-index: 9999;
  width: 0%;
  transition: width 0.1s;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.body.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrolled / total * 100) + '%';
});

// ── Counter animation for stats ───────────
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const t = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target + '+'; clearInterval(t); return; }
    el.textContent = Math.floor(start) + '+';
  }, 16);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(el => {
        const val = parseInt(el.textContent);
        if (!isNaN(val)) animateCounter(el, val);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) statsObserver.observe(statsSection);

// ── Initial load animation ─────────────────
window.addEventListener('load', () => {
  document.querySelectorAll('.reveal').forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setTimeout(() => el.classList.add('visible'), i * 80);
    }
  });
  triggerProficiencyBars();
});
