// =============================================================
// skills-render.js  (advanced version — mapped to skillsData)
// Reads exactly the fields in skills.js:
//   id, name, shortLabel, description
// No category / level fields assumed — all styling is derived
// from the skill name so nothing is hardcoded / dummy.
// Features:
//   • Gradient icon box per skill (deterministic from name)
//   • Staggered card entrance via IntersectionObserver
//   • Hover tilt on icon box
//   • Clean card layout with description
// =============================================================

(function injectStyles() {
  if (document.getElementById('skills-render-styles')) return;

  const style = document.createElement('style');
  style.id = 'skills-render-styles';
  style.textContent = `
    .skill-card {
      background: #fff;
      border-radius: 20px;
      padding: 1.75rem 1.25rem 1.5rem;
      box-shadow: 0 4px 20px rgba(0,0,0,0.07);
      border: 1px solid rgba(0,0,0,0.05);
      text-align: center;
      position: relative;
      overflow: hidden;
      opacity: 0;
      transform: translateY(22px);
      transition: box-shadow 0.25s ease, transform 0.25s ease;
    }

    .skill-card::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, transparent 60%, rgba(255,255,255,0.06));
      pointer-events: none;
    }

    .skill-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 14px 36px rgba(0,0,0,0.11);
    }

    .skill-card.visible {
      animation: skillCardIn 0.45s ease forwards;
    }

    @keyframes skillCardIn {
      from { opacity: 0; transform: translateY(22px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .skill-icon-box {
      width: 66px;
      height: 66px;
      border-radius: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.1rem;
      font-size: 1.25rem;
      font-weight: 800;
      color: #fff;
      letter-spacing: -0.5px;
      transition: transform 0.25s ease;
      flex-shrink: 0;
    }

    .skill-card:hover .skill-icon-box {
      transform: rotate(-7deg) scale(1.1);
    }

    .skill-name {
      font-size: 1rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 6px;
      text-transform: capitalize;
    }

    .skill-desc {
      font-size: 12.5px;
      color: #94a3b8;
      line-height: 1.6;
      margin: 0;
    }
  `;
  document.head.appendChild(style);
})();

// ── One gradient per skill — derived from the skill name ──────
// Maps known skill names explicitly; any unknown skill gets a
// fallback pulled from a small rotation so nothing is grey/blank.
const SKILL_GRADIENTS = {
  'reactjs':      'linear-gradient(135deg, #38bdf8, #0ea5e9)',
  'tailwind css': 'linear-gradient(135deg, #34d399, #059669)',
  'javascript':   'linear-gradient(135deg, #fbbf24, #f59e0b)',
  'mongodb':      'linear-gradient(135deg, #4ade80, #16a34a)',
  'java':         'linear-gradient(135deg, #f97316, #ea580c)',
  'c progarm':    'linear-gradient(135deg, #a78bfa, #7c3aed)',
  'c program':    'linear-gradient(135deg, #a78bfa, #7c3aed)',
  'sql':          'linear-gradient(135deg, #60a5fa, #2563eb)',
  'python':       'linear-gradient(135deg, #fde68a, #f59e0b)',
};

const FALLBACK_GRADIENTS = [
  'linear-gradient(135deg, #f472b6, #db2777)',
  'linear-gradient(135deg, #818cf8, #4f46e5)',
  'linear-gradient(135deg, #2dd4bf, #0d9488)',
  'linear-gradient(135deg, #fb923c, #dc2626)',
];

function getGradient(skillName, index) {
  const key = skillName.toLowerCase().trim();
  return SKILL_GRADIENTS[key] || FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length];
}

// ── Card entrance via IntersectionObserver ────────────────────
function animateCardIn(card, index) {
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      card.style.animationDelay = (index % 4) * 80 + 'ms';
      card.classList.add('visible');
      observer.disconnect();
    });
  }, { threshold: 0.15 });
  observer.observe(card);
}

// ── Main render ───────────────────────────────────────────────
function renderSkills() {
  const container = document.getElementById('skills-container');

  if (!container) {
    console.warn('Skills container not found.');
    return;
  }

  if (!Array.isArray(skillsData) || skillsData.length === 0) {
    console.warn('skillsData is empty or not defined.');
    return;
  }

  container.innerHTML = '';

  skillsData.forEach(function(skill, index) {

    const gradient = getGradient(skill.name, index);

    // Use shortLabel if present and non-empty, else derive from name
    const label = (skill.shortLabel && skill.shortLabel.trim() !== '')
      ? skill.shortLabel.trim()
      : skill.name.slice(0, 2).toUpperCase();

    // ── Card
    const card = document.createElement('div');
    card.className = 'skill-card';

    // ── Icon box
    const iconBox = document.createElement('div');
    iconBox.className = 'skill-icon-box';
    iconBox.style.background = gradient;
    iconBox.textContent = label;

    // ── Skill name
    const nameEl = document.createElement('h3');
    nameEl.className = 'skill-name';
    nameEl.textContent = skill.name;

    // ── Description
    const descEl = document.createElement('p');
    descEl.className = 'skill-desc';
    descEl.textContent = skill.description;

    // ── Assemble
    card.appendChild(iconBox);
    card.appendChild(nameEl);
    card.appendChild(descEl);
    container.appendChild(card);

    animateCardIn(card, index);
  });

  console.log('Skills rendered successfully — ' + skillsData.length + ' skills.');
}
