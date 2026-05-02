// js/features/project-search.js
// Live search that filters project cards as the user types

(function () {

    const searchInput = document.getElementById("project-search");
    const container   = document.getElementById("projects-container");

    if (!searchInput || !container) return;

    // --- No results message element ---
    const noResults = document.createElement("div");
    noResults.id = "no-results-msg";
    noResults.className = "hidden col-span-full text-center py-20";
    noResults.innerHTML = `
        <p class="text-5xl mb-4">🔍</p>
        <p class="text-2xl font-bold text-slate-600 mb-2">No projects found</p>
        <p class="text-slate-400">Try a different keyword</p>
    `;
    container.insertAdjacentElement("afterend", noResults);

    // --- Core filter function ---
    function filterProjects(query) {
        const keyword = query.trim().toLowerCase();

        // Get cards fresh each time (in case project-render.js adds them dynamically)
        const cards = container.querySelectorAll("[data-title], [data-tags], .project-card");

        let visibleCount = 0;

        cards.forEach(card => {
            // Support both data-attribute and text-content based cards
            const title = (
                card.dataset.title ||
                card.querySelector("h3")?.textContent ||
                ""
            ).toLowerCase();

            const tags = (
                card.dataset.tags ||
                [...card.querySelectorAll("span, .tag, [data-tag]")]
                    .map(el => el.textContent)
                    .join(" ") ||
                ""
            ).toLowerCase();

            const description = (
                card.dataset.description ||
                card.querySelector("p")?.textContent ||
                ""
            ).toLowerCase();

            const matches = !keyword ||
                title.includes(keyword) ||
                tags.includes(keyword) ||
                description.includes(keyword);

            if (matches) {
                card.style.display  = "";
                card.style.opacity  = "1";
                card.style.transform = "scale(1)";
                visibleCount++;
            } else {
                card.style.display   = "none";
                card.style.opacity   = "0";
                card.style.transform = "scale(0.95)";
            }
        });

        // Toggle no-results message
        noResults.classList.toggle("hidden", visibleCount > 0);
        container.classList.toggle("hidden", visibleCount === 0);
    }

    // --- Debounce to avoid firing on every single keystroke ---
    function debounce(fn, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    const debouncedFilter = debounce(filterProjects, 200);

    // --- Listen for input ---
    searchInput.addEventListener("input", (e) => {
        debouncedFilter(e.target.value);
    });

    // --- Clear search on Escape key ---
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            searchInput.value = "";
            filterProjects("");
            searchInput.blur();
        }
    });

    // --- Style the search input a bit better ---
    searchInput.classList.add(
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-blue-400",
        "transition-all",
        "duration-200"
    );

})();
