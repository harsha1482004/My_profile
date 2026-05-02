// =============================================================
// scroll-features.js
// Implements:
//   1. Scroll Progress Indicator
//   2. Active Navigation Highlight (Scroll Spy)
//   3. Back to Top Button
// =============================================================

(function () {

  // ─────────────────────────────────────────────
  // 1. SCROLL PROGRESS INDICATOR
  // ─────────────────────────────────────────────

  // Create the progress bar element and inject it into the page
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress-bar';
  Object.assign(progressBar.style, {
    position:        'fixed',
    top:             '0',
    left:            '0',
    width:           '0%',
    height:          '4px',
    background:      'linear-gradient(90deg, #f87171, #3b82f6)', // red-400 → blue-400 (matches site palette)
    zIndex:          '9999',
    transition:      'width 0.1s linear',
    borderRadius:    '0 2px 2px 0',
    boxShadow:       '0 0 8px rgba(248,113,113,0.6)',
    pointerEvents:   'none',           // never intercepts clicks
  });
  document.body.prepend(progressBar);

  function updateProgressBar() {
    const scrollTop    = window.scrollY;
    const totalHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const percentage   = totalHeight > 0 ? (scrollTop / totalHeight) * 100 : 0;
    progressBar.style.width = percentage + '%';
  }


  // ─────────────────────────────────────────────
  // 2. ACTIVE NAVIGATION HIGHLIGHT (SCROLL SPY)
  // ─────────────────────────────────────────────

  // Collect all sections that have an `id` and are linked from the nav
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('nav a[href^="#"]');

  function updateActiveNav() {
    const scrollMidpoint = window.scrollY + window.innerHeight / 3;

    let currentId = null;

    sections.forEach(section => {
      if (section.offsetTop <= scrollMidpoint) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');

      if (href === currentId) {
        link.classList.add('nav-active');
        // Inline fallback styles so the feature works even without a custom CSS file
        link.style.color          = '#ef4444';   // red-500
        link.style.borderBottom   = '2px solid #ef4444';
        link.style.paddingBottom  = '2px';
      } else {
        link.classList.remove('nav-active');
        link.style.color          = '';
        link.style.borderBottom   = '';
        link.style.paddingBottom  = '';
      }
    });
  }


  // ─────────────────────────────────────────────
  // 3. BACK TO TOP BUTTON
  // ─────────────────────────────────────────────

  const backToTopBtn = document.createElement('button');
  backToTopBtn.id          = 'back-to-top';
  backToTopBtn.title       = 'Back to top';
  backToTopBtn.textContent = '↑';
  backToTopBtn.setAttribute('aria-label', 'Scroll back to top');

  Object.assign(backToTopBtn.style, {
    position:        'fixed',
    bottom:          '105px',          // sits just above the existing contact button (bottom-8 = 32px + 48px btn + 16px gap)
    right:           '40px',
    width:           '44px',
    height:          '44px',
    borderRadius:    '50%',
    background:      '#1e3a5f',       // dark navy — visually distinct from the blue-900 contact button
    color:           '#ffffff',
    border:          'none',
    fontSize:        '18px',
    fontWeight:      'bold',
    cursor:          'pointer',
    boxShadow:       '0 4px 14px rgba(0,0,0,0.25)',
    zIndex:          '9998',
    display:         'none',          // hidden by default
    alignItems:      'center',
    justifyContent:  'center',
    transition:      'opacity 0.3s ease, transform 0.3s ease',
    opacity:         '0',
    transform:       'translateY(10px)',
  });

  // Flex centering requires display:flex, but we start as 'none'.
  // We toggle between 'none' and 'flex' below.
  document.body.appendChild(backToTopBtn);

  function updateBackToTop() {
    const threshold = 400; // px — show after scrolling this far down

    if (window.scrollY > threshold) {
      if (backToTopBtn.style.display === 'none') {
        backToTopBtn.style.display   = 'flex';
        // Trigger transition on next frame
        requestAnimationFrame(() => {
          backToTopBtn.style.opacity   = '1';
          backToTopBtn.style.transform = 'translateY(0)';
        });
      }
    } else {
      backToTopBtn.style.opacity   = '0';
      backToTopBtn.style.transform = 'translateY(10px)';
      // Hide after transition ends to keep it out of tab order
      setTimeout(() => {
        if (window.scrollY <= threshold) {
          backToTopBtn.style.display = 'none';
        }
      }, 300);
    }
  }

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Subtle hover feedback
  backToTopBtn.addEventListener('mouseenter', () => {
    backToTopBtn.style.background  = '#ef4444';   // matches site red accent
    backToTopBtn.style.transform   = 'translateY(-2px) scale(1.08)';
  });
  backToTopBtn.addEventListener('mouseleave', () => {
    backToTopBtn.style.background  = '#1e3a5f';
    backToTopBtn.style.transform   = 'translateY(0) scale(1)';
  });


  // ─────────────────────────────────────────────
  // UNIFIED SCROLL LISTENER (single listener for performance)
  // ─────────────────────────────────────────────

  function onScroll() {
    updateProgressBar();
    updateActiveNav();
    updateBackToTop();
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Run once on load so the state is correct even if the page
  // is refreshed mid-scroll or opened with a hash in the URL.
  onScroll();

})();
