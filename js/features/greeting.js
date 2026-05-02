// =============================================================
// greeting.js
// Injects a time-based greeting above the hero heading.
// Good Morning  → 5 am – 11:59 am
// Good Afternoon → 12 pm – 4:59 pm
// Good Evening  → 5 pm – 8:59 pm
// Good Night    → 9 pm – 4:59 am
// =============================================================

(function () {

  // ── Inject styles ────────────────────────────────────────
  (function injectStyles() {
    if (document.getElementById('greeting-styles')) return;
    const style = document.createElement('style');
    style.id = 'greeting-styles';
    style.textContent = `
      #time-greeting {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        padding: 5px 14px;
        border-radius: 999px;
        margin-bottom: 16px;
        opacity: 0;
        transform: translateY(-8px);
        animation: greetingIn 0.5s ease 0.2s forwards;
      }

      @keyframes greetingIn {
        to { opacity: 1; transform: translateY(0); }
      }

      /* Colour variants */
      #time-greeting.greeting-morning   { background: #fef9c3; color: #a16207; }
      #time-greeting.greeting-afternoon { background: #fed7aa; color: #c2410c; }
      #time-greeting.greeting-evening   { background: #dbeafe; color: #1d4ed8; }
      #time-greeting.greeting-night     { background: #1e293b; color: #94a3b8; }

      /* Dark mode overrides */
      html.dark-mode #time-greeting.greeting-morning   { background: #451a03; color: #fcd34d; }
      html.dark-mode #time-greeting.greeting-afternoon { background: #431407; color: #fb923c; }
      html.dark-mode #time-greeting.greeting-evening   { background: #1e3a5f; color: #93c5fd; }
      html.dark-mode #time-greeting.greeting-night     { background: #0f172a; color: #64748b; }
    `;
    document.head.appendChild(style);
  })();

  // ── Determine greeting from current hour ─────────────────
  function getGreeting() {
    const hour = new Date().getHours();  // 0 – 23

    if (hour >= 5 && hour < 12)  return { text: 'Good Morning',   emoji: '🌤',  cls: 'greeting-morning'   };
    if (hour >= 12 && hour < 17) return { text: 'Good Afternoon', emoji: '☀',  cls: 'greeting-afternoon' };
    if (hour >= 17 && hour < 21) return { text: 'Good Evening',   emoji: '🌆',  cls: 'greeting-evening'   };
    return                               { text: 'Good Night',     emoji: '🌙',  cls: 'greeting-night'     };
  }

  // ── Inject greeting element above the hero <h1> ──────────
  function injectGreeting() {
    // Avoid duplicate on hot-reload / re-init
    if (document.getElementById('time-greeting')) return;

    const h1 = document.querySelector('section h1');
    if (!h1) return;

    const { text, emoji, cls } = getGreeting();

    const el = document.createElement('div');
    el.id        = 'time-greeting';
    el.className = cls;
    el.textContent = emoji + '  ' + text;

    // Insert directly before the <h1>
    h1.parentElement.insertBefore(el, h1);
  }

  // ── Run after DOM is ready ────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectGreeting);
  } else {
    injectGreeting();
  }

})();
