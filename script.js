/* ═══════════════════════════════════════════════════════════════
   DHIRAJ RAJ — PORTFOLIO  |  script.js
   Theme: Deep Dark & Gold (Max Contrast)
   Handles: typewriter, cursor, nav, reveal, tabs, skill bars,
            particles (gold), cards, ripple, tilt, count-up
═══════════════════════════════════════════════════════════════ */

'use strict';

/* ── Typewriter Effect for Hero Name ── */
(function initTypewriter() {
  const nameEl = document.getElementById('heroName');
  if (!nameEl) return;

  const whiteSpan  = nameEl.querySelector('.name-white');
  const accentSpan = nameEl.querySelector('.name-accent');
  if (!whiteSpan || !accentSpan) return;

  const firstName = 'Dhiraj ';
  const lastName  = 'Raj';

  whiteSpan.textContent = '';
  accentSpan.textContent = '';

  let charIndex = 0;
  const fullText = firstName + lastName;
  const speed = 90;

  function type() {
    if (charIndex < fullText.length) {
      const char = fullText[charIndex];
      if (charIndex < firstName.length) {
        whiteSpan.textContent += char;
      } else {
        accentSpan.textContent += char;
      }
      charIndex++;
      const nextSpeed = char === ' ' ? 250 : speed + Math.random() * 40 - 20;
      setTimeout(type, nextSpeed);
    }
  }

  setTimeout(type, 500);
})();

/* ── Cursor Glow ── */
(function initCursor() {
  const glow = document.getElementById('cursor-glow');
  if (!glow || window.matchMedia('(hover: none)').matches) return;
  let x = 0, y = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; });
  function tick() {
    cx += (x - cx) * 0.12;
    cy += (y - cy) * 0.12;
    glow.style.left = cx + 'px';
    glow.style.top  = cy + 'px';
    requestAnimationFrame(tick);
  }
  tick();
})();

/* ── Navbar ── */
(function initNav() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu= document.getElementById('mobileMenu');
  const navLinks  = document.querySelectorAll('.nav-link');
  const sections  = ['hero','about','skills','projects','experience','education','achievements','contact'];

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    let current = sections[0];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 160) current = id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
})();

/* ── Scroll Reveal ── */
(function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-fade')
    .forEach(el => observer.observe(el));
})();

/* ── Skill Bars ── */
(function initSkillBars() {
  const bars = document.querySelectorAll('.bar-fill');
  if (!bars.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.w + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(bar => observer.observe(bar));
})();

/* ── Tabs ── */
(function initTabs() {
  const tabBtns  = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const pane = document.getElementById('tab-' + target);
      if (pane) {
        pane.classList.add('active');
        if (target === 'coding') {
          pane.querySelectorAll('.bar-fill').forEach(bar => { bar.style.width = bar.dataset.w + '%'; });
          pane.querySelectorAll('.reveal-up').forEach(el => el.classList.add('visible'));
        }
      }
    });
  });
})();

/* ── Project Card Expand ── */
(function initProjectCards() {
  document.querySelectorAll('.expand-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const card = btn.closest('.proj-card');
      const desc = card.querySelector('.proj-desc');
      if (!desc) return;
      const isOpen = desc.classList.contains('open');
      desc.classList.toggle('open', !isOpen);
      desc.classList.toggle('collapsed', isOpen);
      btn.classList.toggle('rotated', !isOpen);
    });
  });
  document.querySelectorAll('.proj-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.expand-btn') || e.target.closest('.chip')) return;
      const desc = card.querySelector('.proj-desc');
      const btn  = card.querySelector('.expand-btn');
      if (!desc) return;
      const isOpen = desc.classList.contains('open');
      desc.classList.toggle('open', !isOpen);
      desc.classList.toggle('collapsed', isOpen);
      if (btn) btn.classList.toggle('rotated', !isOpen);
    });
  });
})();

/* ── Button Ripple ── */
(function initRipple() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top  = (e.clientY - rect.top  - size / 2) + 'px';
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
})();

/* ── 3D Card Tilt ── */
(function initCardTilt() {
  const cards = document.querySelectorAll('.proj-card, .edu-card, .ach-card-sm');
  if (window.matchMedia('(hover: none)').matches) return;
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const rotateX = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -4;
      const rotateY = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 4;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();

/* ── Count-Up Stats ── */
(function initCountUp() {
  const statNums = document.querySelectorAll('.stat-num');
  if (!statNums.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const text = el.textContent.trim();
      observer.unobserve(el);
      const num = parseFloat(text);
      if (isNaN(num)) return;
      const decimals = text.includes('.') ? text.split('.')[1].length : 0;
      const duration = 1500;
      const start = performance.now();
      function animate(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = (num * eased).toFixed(decimals);
        if (progress < 1) requestAnimationFrame(animate);
        else el.textContent = text;
      }
      el.textContent = (0).toFixed(decimals);
      requestAnimationFrame(animate);
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => observer.observe(el));
})();

/* ── Contact Form ── */
function handleSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const subject = document.getElementById('cSubject').value.trim() || 'Message from Portfolio';
  const message = document.getElementById('cMessage').value.trim();
  const note = document.getElementById('formNote');
  window.location.href = `mailto:dhiraj.raj@stonybrook.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
  note.textContent = '✓ Opening your email client…';
  setTimeout(() => { note.textContent = ''; }, 4000);
}

/* ── Particle Canvas (Gold dots on dark hero) ── */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  if (window.innerWidth < 600) { canvas.style.display = 'none'; return; }

  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }

  function createParticles() {
    particles = [];
    const count = Math.min(100, Math.floor(W * H / 15000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.2 + 0.2, // Smaller, dust-like dots
        vx: (Math.random() - 0.5) * 0.1, vy: (Math.random() - 0.5) * 0.1, // Slower movement
        alpha: Math.random() * 0.3 + 0.05, // Softer opacity
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212,168,67,${p.alpha})`; /* Gold dust */
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
    });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) { // Shorter connection distance
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(212,168,67,${(1 - dist / 80) * 0.05})`; // Very faint lines
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  resize(); createParticles(); draw();
  window.addEventListener('resize', () => { resize(); createParticles(); }, { passive: true });
})();

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.getElementById(link.getAttribute('href').slice(1));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  });
});

/* ── SVG project placeholders ── */
(function generatePlaceholders() {
  [1,2,3,4,5].forEach(id => {
    const img = document.querySelector(`.proj-thumb-${id} img`);
    if (!img) return;
    if (img.src && !img.src.startsWith('data:') && img.complete && img.naturalWidth > 0) return;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300">
      <rect width="600" height="300" fill="#101520"/>
      <pattern id="g${id}" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(212,168,67,0.05)" stroke-width="0.5"/></pattern>
      <rect width="600" height="300" fill="url(#g${id})"/>
      <circle cx="300" cy="150" r="50" fill="none" stroke="rgba(212,168,67,0.15)" stroke-width="1"/>
      <circle cx="300" cy="150" r="5" fill="rgba(212,168,67,0.3)"/>
      <text x="300" y="250" text-anchor="middle" font-family="monospace" font-size="10" fill="rgba(212,168,67,0.3)">images/project${id}.png</text>
    </svg>`;
    img.setAttribute('src', 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg))));
    img.style.display = 'block';
    img.removeAttribute('onerror');
  });
})();

/* ── Profile placeholder ── */
(function generateProfilePlaceholder() {
  const img = document.querySelector('.profile-img');
  if (!img) return;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="540" viewBox="0 0 400 540">
    <rect width="400" height="540" fill="#101520"/>
    <circle cx="200" cy="190" r="62" fill="rgba(212,168,67,0.1)"/>
    <ellipse cx="200" cy="400" rx="100" ry="80" fill="rgba(212,168,67,0.06)"/>
    <text x="200" y="195" text-anchor="middle" dominant-baseline="middle" font-family="'Bebas Neue',sans-serif" font-size="56" fill="rgba(212,168,67,0.3)">DR</text>
  </svg>`;
  img.setAttribute('src', 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg))));
  img.style.display = 'block';
  img.removeAttribute('onerror');
  const fallback = img.nextElementSibling;
  if (fallback && fallback.classList.contains('avatar-fallback')) fallback.style.display = 'none';
})();
