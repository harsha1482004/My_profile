// =============================================================
// project-render.js  (advanced version — mapped to projectsData)
// Fields used: id, name, category, description,
//              technologies (array), status, liveDemo, github
// Features:
//   • Category filter tabs (auto-built from data)
//   • Status badge (Live / Demo)
//   • Tech stack pills
//   • Live Demo + GitHub buttons as real anchor tags
//   • Staggered card entrance via IntersectionObserver
//   • data-title / data-tags / data-description on every card
//     so project-search.js keeps working without any changes
// =============================================================

(function injectStyles() {
  if (document.getElementById('project-render-styles')) return;
  const style = document.createElement('style');
  style.id = 'project-render-styles';
  style.textContent = `

    /* ── Filter tabs ── */
    #project-filter-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: center;
      margin-bottom: 2.5rem;
    }
    .proj-tab {
      padding: 7px 20px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 600;
      border: 1.5px solid #e2e8f0;
      background: #fff;
      color: #64748b;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .proj-tab:hover { border-color: #94a3b8; color: #1e293b; }
    .proj-tab.active { background: #1e3a5f; border-color: #1e3a5f; color: #fff; }

    /* ── Card ── */
    .project-card {
      background: #fff;
      border-radius: 20px;
      border: 1px solid rgba(0,0,0,0.06);
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      opacity: 0;
      transform: translateY(24px);
      transition: box-shadow 0.25s ease, transform 0.25s ease;
    }
    .project-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 40px rgba(0,0,0,0.11);
    }
    .project-card.visible {
      animation: projCardIn 0.45s ease forwards;
    }
    @keyframes projCardIn {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ── Colour bar on top of card ── */
    .project-card-bar {
      height: 5px;
      width: 100%;
      flex-shrink: 0;
    }

    /* ── Card body ── */
    .project-card-body {
      padding: 1.4rem 1.4rem 1rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    /* ── Header row: name + status badge ── */
    .project-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
    }
    .project-name {
      font-size: 1rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0;
      line-height: 1.3;
    }
    .project-status {
      flex-shrink: 0;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      padding: 3px 10px;
      border-radius: 999px;
    }
    .status-live  { background: #dcfce7; color: #15803d; }
    .status-demo  { background: #fef9c3; color: #a16207; }
    .status-other { background: #f1f5f9; color: #475569; }

    /* ── Category label ── */
    .project-category {
      font-size: 11px;
      font-weight: 600;
      color: #94a3b8;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin: 0;
    }

    /* ── Description ── */
    .project-desc {
      font-size: 13px;
      color: #64748b;
      line-height: 1.6;
      margin: 0;
      flex: 1;
    }

    /* ── Tech pills ── */
    .project-tech-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 4px;
    }
    .tech-pill {
      font-size: 11px;
      font-weight: 600;
      padding: 3px 10px;
      border-radius: 999px;
      background: #f1f5f9;
      color: #334155;
      border: 1px solid #e2e8f0;
    }

    /* ── Action buttons ── */
    .project-card-footer {
      display: flex;
      gap: 10px;
      padding: 0 1.4rem 1.4rem;
    }
    .proj-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 9px 0;
      border-radius: 10px;
      font-size: 12.5px;
      font-weight: 600;
      text-decoration: none;
      transition: opacity 0.2s ease, transform 0.15s ease;
      cursor: pointer;
    }
    .proj-btn:hover { opacity: 0.85; transform: translateY(-1px); }
    .proj-btn-demo {
      background: #1e3a5f;
      color: #fff;
    }
    .proj-btn-github {
      background: #f1f5f9;
      color: #1e293b;
      border: 1px solid #e2e8f0;
    }

    /* ── Empty state ── */
    #projects-empty {
      display: none;
      width: 100%;
      text-align: center;
      padding: 3rem 0;
      color: #94a3b8;
      font-size: 15px;
    }
  `;
  document.head.appendChild(style);
})();

// ── Category → top-bar gradient ──────────────────────────────
const CATEGORY_BARS = {
  'mern':       'linear-gradient(90deg, #38bdf8, #6366f1)',
  'frontend':   'linear-gradient(90deg, #34d399, #06b6d4)',
  'javascript': 'linear-gradient(90deg, #fbbf24, #f97316)',
  'python':     'linear-gradient(90deg, #fde68a, #f59e0b)',
  'default':    'linear-gradient(90deg, #94a3b8, #64748b)',
};

function getBar(category) {
  return CATEGORY_BARS[(category || '').toLowerCase()] || CATEGORY_BARS.default;
}

// ── Status badge class ────────────────────────────────────────
function statusClass(status) {
  const s = (status || '').toLowerCase();
  if (s === 'live')  return 'status-live';
  if (s === 'demo')  return 'status-demo';
  return 'status-other';
}

// ── Card entrance animation ───────────────────────────────────
function animateCardIn(card, index) {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      card.style.animationDelay = (index % 3) * 90 + 'ms';
      card.classList.add('visible');
      observer.disconnect();
    });
  }, { threshold: 0.12 });
  observer.observe(card);
}

// ── Build one card ────────────────────────────────────────────
function buildCard(project, index) {
  const techArray = Array.isArray(project.technologies)
    ? project.technologies
    : [project.technologies];

  const card = document.createElement('div');
  card.className = 'project-card';

  // data attributes used by project-search.js
  card.dataset.title       = project.name || '';
  card.dataset.tags        = techArray.join(' ') + ' ' + (project.category || '');
  card.dataset.description = project.description || '';

  // ── Colour bar
  const bar = document.createElement('div');
  bar.className = 'project-card-bar';
  bar.style.background = getBar(project.category);
  card.appendChild(bar);

  // ── Body
  const body = document.createElement('div');
  body.className = 'project-card-body';

  // Header: name + status
  const header = document.createElement('div');
  header.className = 'project-header';

  const nameEl = document.createElement('h3');
  nameEl.className = 'project-name';
  nameEl.textContent = project.name;

  const badgeEl = document.createElement('span');
  badgeEl.className = 'project-status ' + statusClass(project.status);
  badgeEl.textContent = project.status;

  header.appendChild(nameEl);
  header.appendChild(badgeEl);
  body.appendChild(header);

  // Category
  const catEl = document.createElement('p');
  catEl.className = 'project-category';
  catEl.textContent = project.category;
  body.appendChild(catEl);

  // Description
  const descEl = document.createElement('p');
  descEl.className = 'project-desc';
  descEl.textContent = project.description;
  body.appendChild(descEl);

  // Tech pills
  const techRow = document.createElement('div');
  techRow.className = 'project-tech-row';
  techArray.forEach(function (tech) {
    const pill = document.createElement('span');
    pill.className = 'tech-pill';
    pill.textContent = tech;
    techRow.appendChild(pill);
  });
  body.appendChild(techRow);

  card.appendChild(body);

  // ── Footer: buttons
  const footer = document.createElement('div');
  footer.className = 'project-card-footer';

  const demoBtn = document.createElement('a');
  demoBtn.className = 'proj-btn proj-btn-demo';
  demoBtn.href = project.liveDemo || '#';
  if (project.liveDemo && project.liveDemo !== '#') demoBtn.target = '_blank';
  demoBtn.innerHTML = '&#9654; Live Demo';

  const githubBtn = document.createElement('a');
  githubBtn.className = 'proj-btn proj-btn-github';
  githubBtn.href = project.github || '#';
  if (project.github && project.github !== '#') githubBtn.target = '_blank';
  githubBtn.innerHTML = '&#60;/&#62; GitHub';

  footer.appendChild(demoBtn);
  footer.appendChild(githubBtn);
  card.appendChild(footer);

  return card;
}

// ── Filter handler ────────────────────────────────────────────
function filterProjects(selectedCat) {
  document.querySelectorAll('.proj-tab').forEach(function (tab) {
    tab.classList.toggle('active', tab.dataset.cat === selectedCat);
  });

  const container = document.getElementById('projects-container');
  const cards = container.querySelectorAll('.project-card');
  let visible = 0;

  cards.forEach(function (card) {
    const match = selectedCat === 'all' ||
      (card.dataset.tags || '').toLowerCase().includes(selectedCat.toLowerCase()) ||
      (card.dataset.title || '').toLowerCase().includes(selectedCat.toLowerCase());

    if (match) {
      card.style.display = '';
      card.classList.remove('visible');
      card.style.animationDelay = (visible % 3 * 90) + 'ms';
      requestAnimationFrame(function () { card.classList.add('visible'); });
      visible++;
    } else {
      card.style.display = 'none';
    }
  });

  const emptyEl = document.getElementById('projects-empty');
  if (emptyEl) emptyEl.style.display = visible === 0 ? 'block' : 'none';
}

// ── Main render function ──────────────────────────────────────
function renderProjects() {
  const container = document.getElementById('projects-container');

  if (!container) {
    console.warn('Projects container not found.');
    return;
  }

  if (!Array.isArray(projectsData) || projectsData.length === 0) {
    console.warn('projectsData is empty or not defined.');
    return;
  }

  // ── Build category filter tabs ──────────────────────────
  const categories = ['all', ...new Set(
    projectsData.map(function (p) { return (p.category || 'other').toLowerCase(); })
  )];

  // Inject tabs into the existing #project-filters div from index.html
  const filtersEl = document.getElementById('project-filters');
  if (filtersEl) {
    filtersEl.innerHTML = '';
    filtersEl.id = 'project-filter-tabs';
    categories.forEach(function (cat) {
      const tab = document.createElement('button');
      tab.className = 'proj-tab' + (cat === 'all' ? ' active' : '');
      tab.dataset.cat = cat;
      tab.textContent = cat === 'all' ? 'All Projects' : cat.charAt(0).toUpperCase() + cat.slice(1);
      tab.addEventListener('click', function () { filterProjects(cat); });
      filtersEl.appendChild(tab);
    });
  }

  // ── Render cards ────────────────────────────────────────
  container.innerHTML = '';

  projectsData.forEach(function (project, index) {
    const card = buildCard(project, index);
    container.appendChild(card);
    animateCardIn(card, index);
  });

  // ── Empty state placeholder ─────────────────────────────
  let emptyEl = document.getElementById('projects-empty');
  if (!emptyEl) {
    emptyEl = document.createElement('p');
    emptyEl.id = 'projects-empty';
    emptyEl.textContent = 'No projects found.';
    container.parentElement.appendChild(emptyEl);
  }

  console.log('Projects rendered successfully — ' + projectsData.length + ' projects.');
}
