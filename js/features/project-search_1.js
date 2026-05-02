// =============================================================
// project-search.js
// Live search over project cards rendered by project-render.js
// Reads: data-title, data-tags, data-description on each card
// =============================================================

(function () {

  const searchInput = document.getElementById('project-search');
  const container   = document.getElementById('projects-container');

  if (!searchInput || !container) return;

  // ── No-results message ──────────────────────────────────
  let noResults = document.getElementById('no-results-msg');
  if (!noResults) {
    noResults = document.createElement('div');
    noResults.id = 'no-results-msg';
    noResults.style.cssText = 'display:none; width:100%; text-align:center; padding:3rem 0; color:#94a3b8; font-size:15px;';
    noResults.innerHTML = '<p style="font-size:2.5rem;margin-bottom:8px;">🔍</p><p style="font-weight:700;color:#64748b;margin-bottom:4px;">No projects found</p><p>Try a different keyword</p>';
    container.insertAdjacentElement('afterend', noResults);
  }

  // ── Filter function ─────────────────────────────────────
  function filterProjects(query) {
    const keyword = query.trim().toLowerCase();
    const cards   = container.querySelectorAll('.project-card');
    let   visible = 0;

    cards.forEach(function (card) {
      const title = (card.dataset.title       || '').toLowerCase();
      const tags  = (card.dataset.tags        || '').toLowerCase();
      const desc  = (card.dataset.description || '').toLowerCase();

      const matches = !keyword ||
        title.includes(keyword) ||
        tags.includes(keyword)  ||
        desc.includes(keyword);

      if (matches) {
        card.style.display = '';
        visible++;
      } else {
        card.style.display = 'none';
      }
    });

    noResults.style.display  = visible === 0 ? 'block' : 'none';
    container.style.display  = visible === 0 ? 'none'  : '';
  }

  // ── Debounce ────────────────────────────────────────────
  function debounce(fn, delay) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(this, arguments); }, delay);
    };
  }

  const debouncedFilter = debounce(filterProjects, 200);

  // ── Listeners ───────────────────────────────────────────
  searchInput.addEventListener('input', function (e) {
    debouncedFilter(e.target.value);
  });

  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      searchInput.value = '';
      filterProjects('');
      searchInput.blur();
    }
  });

})();
