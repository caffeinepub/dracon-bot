/* ═══════════════════════════════════════
   Dracon — shared script
═══════════════════════════════════════ */

const THEMES = {
  red:    { accent: '#ef4444', glow: 'rgba(239,68,68,0.25)',    glowStrong: 'rgba(239,68,68,0.4)' },
  cyan:   { accent: '#22d3ee', glow: 'rgba(34,211,238,0.25)',   glowStrong: 'rgba(34,211,238,0.4)' },
  yellow: { accent: '#facc15', glow: 'rgba(250,204,21,0.25)',   glowStrong: 'rgba(250,204,21,0.4)' },
};

function applyTheme(name) {
  const t = THEMES[name] || THEMES.red;
  const root = document.documentElement;
  root.style.setProperty('--accent', t.accent);
  root.style.setProperty('--accent-glow', t.glow);
  root.style.setProperty('--accent-glow-strong', t.glowStrong);
  localStorage.setItem('dracon-theme', name);
  // Update active state in dropdown
  document.querySelectorAll('.theme-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === name);
  });
  // Remount gradient text elements to fix -webkit-background-clip glitch
  document.querySelectorAll('[data-theme-key]').forEach(el => {
    const clone = el.cloneNode(true);
    el.parentNode.replaceChild(clone, el);
  });
}

/* ─── Navbar HTML ─── */
function getNavHTML() {
  const path = window.location.pathname;
  const active = (href) => {
    if (href === '/' && (path === '/' || path.endsWith('index.html'))) return 'active';
    if (href !== '/' && path.includes(href.replace('/', ''))) return 'active';
    return '';
  };

  return `
  <div class="nav-inner">
    <a class="nav-logo" href="/">
      <span class="nav-dot"></span>
      <span class="nav-brand">Dracon</span>
    </a>

    <div class="nav-center">
      <a href="/" class="nav-link ${active('/')}">Home</a>

      <div class="nav-resources">
        <button class="resources-btn" id="resourcesBtn">
          Resources
          <svg class="resources-chevron" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
        <div class="resources-dropdown" id="resourcesDropdown">
          <a href="/" class="dropdown-item">
            <span class="di-icon"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span>
            <span class="di-text"><span class="di-title">Home</span><span class="di-desc">Back to the main page</span></span>
          </a>
          <a href="/commands.html" class="dropdown-item">
            <span class="di-icon"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg></span>
            <span class="di-text"><span class="di-title">Commands</span><span class="di-desc">Browse all bot commands</span></span>
          </a>
          <a href="/support.html" class="dropdown-item">
            <span class="di-icon"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span>
            <span class="di-text"><span class="di-title">Support</span><span class="di-desc">Get help &amp; contact us</span></span>
          </a>
          <a href="/privacy.html" class="dropdown-item">
            <span class="di-icon"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>
            <span class="di-text"><span class="di-title">Privacy policy</span><span class="di-desc">How we handle your data</span></span>
          </a>
          <a href="/terms.html" class="dropdown-item">
            <span class="di-icon"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></span>
            <span class="di-text"><span class="di-title">Terms of service</span><span class="di-desc">Our rules &amp; conditions</span></span>
          </a>
          <a href="https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&scope=bot&permissions=8" class="dropdown-item" target="_blank" rel="noopener">
            <span class="di-icon"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></span>
            <span class="di-text"><span class="di-title">Invite Dracon</span><span class="di-desc">Add the bot to your server</span></span>
          </a>
        </div>
      </div>

      <a href="/commands.html" class="nav-link ${active('/commands.html')}">Commands</a>
    </div>

    <div class="nav-right">
      <a href="/partners.html" class="nav-link ${active('/partners.html')}">Partners</a>
      <a href="/premium.html" class="nav-link nav-premium ${active('/premium.html')}">Premium</a>
      <a href="https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&scope=bot&permissions=8" class="btn-invite" target="_blank" rel="noopener">Invite bot</a>
      <div class="theme-switcher">
        <button class="theme-btn" id="themeBtn" title="Change theme">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
        </button>
        <div class="theme-dropdown" id="themeDropdown">
          <button class="theme-option" data-theme="red"><span class="theme-dot red"></span>Red</button>
          <button class="theme-option" data-theme="cyan"><span class="theme-dot cyan"></span>Cyan</button>
          <button class="theme-option" data-theme="yellow"><span class="theme-dot yellow"></span>Yellow</button>
        </div>
      </div>
      <button class="hamburger-btn" id="hamburgerBtn" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>

  <!-- Mobile Menu -->
  <div class="mobile-menu" id="mobileMenu">
    <div class="mobile-menu-inner">
      <div class="mobile-section-label">Navigation</div>
      <a href="/" class="mobile-nav-link">Home</a>
      <a href="/commands.html" class="mobile-nav-link">Commands</a>
      <a href="/partners.html" class="mobile-nav-link">Partners</a>
      <a href="/premium.html" class="mobile-nav-link mobile-nav-premium">Premium</a>

      <div class="mobile-section-label" style="margin-top:18px;">Resources</div>
      <a href="/" class="mobile-resource-item">
        <span class="di-icon"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span>
        <span class="di-text"><span class="di-title">Home</span><span class="di-desc">Back to the main page</span></span>
      </a>
      <a href="/commands.html" class="mobile-resource-item">
        <span class="di-icon"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg></span>
        <span class="di-text"><span class="di-title">Commands</span><span class="di-desc">Browse all bot commands</span></span>
      </a>
      <a href="/support.html" class="mobile-resource-item">
        <span class="di-icon"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span>
        <span class="di-text"><span class="di-title">Support</span><span class="di-desc">Get help &amp; contact us</span></span>
      </a>
      <a href="/privacy.html" class="mobile-resource-item">
        <span class="di-icon"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>
        <span class="di-text"><span class="di-title">Privacy policy</span><span class="di-desc">How we handle your data</span></span>
      </a>
      <a href="/terms.html" class="mobile-resource-item">
        <span class="di-icon"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></span>
        <span class="di-text"><span class="di-title">Terms of service</span><span class="di-desc">Our rules &amp; conditions</span></span>
      </a>
      <a href="https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&scope=bot&permissions=8" class="mobile-resource-item" target="_blank" rel="noopener">
        <span class="di-icon"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></span>
        <span class="di-text"><span class="di-title">Invite Dracon</span><span class="di-desc">Add the bot to your server</span></span>
      </a>

      <a href="https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&scope=bot&permissions=8" class="btn btn-primary mobile-invite-btn" target="_blank" rel="noopener">Invite bot</a>
    </div>
  </div>`;
}

/* ─── Init Navbar ─── */
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  nav.innerHTML = getNavHTML();

  // Resources dropdown
  const resourcesBtn = document.getElementById('resourcesBtn');
  const resourcesDropdown = document.getElementById('resourcesDropdown');
  resourcesBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    resourcesBtn.classList.toggle('open');
    resourcesDropdown.classList.toggle('open');
    // Close theme dropdown if open
    document.getElementById('themeDropdown').classList.remove('open');
  });

  // Theme dropdown
  const themeBtn = document.getElementById('themeBtn');
  const themeDropdown = document.getElementById('themeDropdown');
  themeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    themeDropdown.classList.toggle('open');
    resourcesBtn.classList.remove('open');
    resourcesDropdown.classList.remove('open');
  });

  // Theme options
  document.querySelectorAll('.theme-option').forEach(btn => {
    btn.addEventListener('click', () => {
      applyTheme(btn.dataset.theme);
      themeDropdown.classList.remove('open');
    });
  });

  // Hamburger / mobile menu
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburgerBtn.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', () => {
    resourcesBtn.classList.remove('open');
    resourcesDropdown.classList.remove('open');
    themeDropdown.classList.remove('open');
    hamburgerBtn.classList.remove('open');
    mobileMenu.classList.remove('open');
  });

  mobileMenu.addEventListener('click', (e) => e.stopPropagation());
}

/* ─── Typewriter ─── */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const words = ['Dracon', 'Convenience', 'Security', 'Automation'];
  let wi = 0, ci = words[0].length, erasing = false;
  el.textContent = words[0];

  function tick() {
    const word = words[wi];
    if (!erasing) {
      if (ci <= word.length) {
        el.textContent = word.slice(0, ci);
        ci++;
        setTimeout(tick, 75);
      } else {
        setTimeout(() => { erasing = true; tick(); }, 2200);
      }
    } else {
      if (ci > 0) {
        ci--;
        el.textContent = word.slice(0, ci);
        setTimeout(tick, 45);
      } else {
        erasing = false;
        wi = (wi + 1) % words.length;
        setTimeout(tick, 280);
      }
    }
  }
  setTimeout(() => { erasing = true; tick(); }, 2200);
}

/* ─── Scroll Animations ─── */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.05, rootMargin: "0px 0px 0px 0px" });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/* ─── FAQ Accordion ─── */
function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

/* ─── Commands Search ─── */
function initCommandsSearch() {
  // Force all command tables visible immediately (bypass scroll trigger)
  document.querySelectorAll(".commands-table").forEach(t => t.classList.add("visible"));
  const input = document.getElementById('cmdSearch');
  if (!input) return;
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    document.querySelectorAll('.cmd-row').forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(q) ? '' : 'none';
    });
  });

  document.querySelectorAll('.cmd-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cmd-cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      document.querySelectorAll('.commands-table').forEach(table => {
        if (cat === 'all') {
          table.style.display = '';
        } else {
          table.style.display = table.dataset.cat === cat ? '' : 'none';
        }
      });
    });
  });
}

/* ─── Body padding for fixed navbar ─── */
function initBodyPad() {
  document.body.style.paddingTop = '0';
}

/* ─── Main Init ─── */
document.addEventListener('DOMContentLoaded', () => {
  // Apply saved theme
  const saved = localStorage.getItem('dracon-theme') || 'red';
  applyTheme(saved);

  initNavbar();
  initTypewriter();
  initScrollAnimations();
  initFAQ();
  initCommandsSearch();
  initBodyPad();
});
