// js/features/nav-highlight.js
// Highlights the active nav link based on which section is currently in view

(function () {

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav ul a[href^='#']");

    if (!sections.length || !navLinks.length) return;

    function setActiveLink(id) {
        navLinks.forEach(link => {
            const isActive = link.getAttribute("href") === `#${id}`;

            if (isActive) {
                link.classList.add("text-blue-600", "border-b-2", "border-blue-600", "pb-0.5");
                link.classList.remove("hover:text-blue-600");
            } else {
                link.classList.remove("text-blue-600", "border-b-2", "border-blue-600", "pb-0.5");
                link.classList.add("hover:text-blue-600");
            }
        });
    }

    function clearAllActive() {
        navLinks.forEach(link => {
            link.classList.remove("text-blue-600", "border-b-2", "border-blue-600", "pb-0.5");
            link.classList.add("hover:text-blue-600");
        });
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveLink(entry.target.id);
                }
            });
        },
        {
            // Trigger when a section crosses the top 20% of the viewport
            rootMargin: "-20% 0px -70% 0px",
            threshold: 0,
        }
    );

    sections.forEach(section => observer.observe(section));

    // Clear highlights when scrolled back to very top (hero section)
    window.addEventListener("scroll", () => {
        if (window.scrollY < 100) {
            clearAllActive();
        }
    });

})();
