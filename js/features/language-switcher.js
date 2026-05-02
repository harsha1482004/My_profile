// js/features/language-switcher.js
// Switches visible text on the page between English and Kannada

(function () {

    const translations = {
        en: {
            heroName: "Harsha Vardhan",
            heroSubtitle: "Full-Stack developer | MERN enthusiast | Competitive Programmer",
            stat1: "800+ Github commits",
            stat2: "100 LeetCode Questions Solved",
            stat3: "5 live projects completed",
            viewProjects: "View Projects",
            downloadResume: "Download Resume",
            navProjects: "Projects",
            navExperience: "Experience",
            navSkills: "Skills",
            navContact: "Let's talk",
            sectionProjects: "My Projects",
            projectsSubtitle: "Enterprise scale full-stack applications built with modern frameworks",
            searchPlaceholder: "Search projects...",
            sectionExperience: "Education and Experience",
            sectionSkills: "Skills",
        },
        kn: {
            heroName: "ಹರ್ಷ ವರ್ಧನ್",
            heroSubtitle: "ಪೂರ್ಣ-ಸ್ಟಾಕ್ ಡೆವಲಪರ್ | MERN ಉತ್ಸಾಹಿ | ಸ್ಪರ್ಧಾತ್ಮಕ ಪ್ರೋಗ್ರಾಮರ್",
            stat1: "800+ ಗಿಟ್‌ಹಬ್ ಕಮಿಟ್‌ಗಳು",
            stat2: "100 ಲೀಟ್‌ಕೋಡ್ ಪ್ರಶ್ನೆಗಳು ಪರಿಹರಿಸಲಾಗಿದೆ",
            stat3: "5 ಲೈವ್ ಪ್ರಾಜೆಕ್ಟ್‌ಗಳು ಪೂರ್ಣಗೊಂಡಿವೆ",
            viewProjects: "ಪ್ರಾಜೆಕ್ಟ್‌ಗಳನ್ನು ನೋಡಿ",
            downloadResume: "ರೆಸ್ಯೂಮ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
            navProjects: "ಪ್ರಾಜೆಕ್ಟ್‌ಗಳು",
            navExperience: "ಅನುಭವ",
            navSkills: "ಕೌಶಲ್ಯಗಳು",
            navContact: "ಮಾತನಾಡೋಣ",
            sectionProjects: "ನನ್ನ ಪ್ರಾಜೆಕ್ಟ್‌ಗಳು",
            projectsSubtitle: "ಆಧುನಿಕ ಫ್ರೇಮ್‌ವರ್ಕ್‌ಗಳಿಂದ ನಿರ್ಮಿಸಲಾದ ಎಂಟರ್‌ಪ್ರೈಸ್ ಅಪ್ಲಿಕೇಶನ್‌ಗಳು",
            searchPlaceholder: "ಪ್ರಾಜೆಕ್ಟ್‌ಗಳನ್ನು ಹುಡುಕಿ...",
            sectionExperience: "ಶಿಕ್ಷಣ ಮತ್ತು ಅನುಭವ",
            sectionSkills: "ಕೌಶಲ್ಯಗಳು",
        }
    };

    let currentLang = "en";

    // --- Inject the switcher UI below the hero stats row ---
    const statsRow = document.querySelector(".flex.flex-wrap.gap-6.justify-center");
    if (!statsRow) return;

    const switcher = document.createElement("div");
    switcher.className = "flex items-center gap-3 justify-center lg:justify-start mt-6";
    switcher.innerHTML = `
        <span class="text-sm font-semibold text-slate-500">Language:</span>
        <button data-lang="en" class="lang-btn px-4 py-1.5 rounded-full text-sm font-bold border-2 border-blue-400 bg-blue-400 text-white transition-all duration-200">
            English
        </button>
        <button data-lang="kn" class="lang-btn px-4 py-1.5 rounded-full text-sm font-bold border-2 border-blue-400 text-blue-400 bg-white transition-all duration-200">
            ಕನ್ನಡ
        </button>
    `;
    statsRow.insertAdjacentElement("afterend", switcher);

    // --- Map keys to DOM elements ---
    function getElements() {
        return {
            heroName:        document.querySelector("h1"),
            heroSubtitle:    document.querySelector("p.text-xl.lg\\:text-2xl"),
            stat1:           document.querySelectorAll(".flex.flex-wrap.gap-6 span")[0],
            stat2:           document.querySelectorAll(".flex.flex-wrap.gap-6 span")[1],
            stat3:           document.querySelectorAll(".flex.flex-wrap.gap-6 span")[2],
            viewProjects:    document.querySelector("a[href='#projects']"),
            downloadResume:  document.querySelector("a[href='#resume']"),
            navProjects:     document.querySelector("nav ul a[href='#projects']"),
            navExperience:   document.querySelector("nav ul a[href='#experience']"),
            navSkills:       document.querySelector("nav ul a[href='#skills']"),
            navContact:      document.querySelector("nav a[href='#contact']"),
            sectionProjects: document.querySelector("#projects h2"),
            projectsSubtitle:document.querySelector("#projects p.text-xl"),
            searchPlaceholder: document.getElementById("project-search"),
            sectionExperience: document.querySelector("#experience h2"),
            sectionSkills:   document.querySelector("#skills h2"),
        };
    }

    function applyLanguage(lang) {
        const t = translations[lang];
        const el = getElements();

        if (el.heroName)         el.heroName.textContent         = t.heroName;

        // If typing animation is active, just update the static subtitle fallback
        if (el.heroSubtitle) {
            const typedSpan = el.heroSubtitle.querySelector("#typed-text");
            if (typedSpan) {
                typedSpan.textContent = t.heroSubtitle;
            } else {
                el.heroSubtitle.textContent = t.heroSubtitle;
            }
        }

        if (el.stat1)            el.stat1.textContent            = t.stat1;
        if (el.stat2)            el.stat2.textContent            = t.stat2;
        if (el.stat3)            el.stat3.textContent            = t.stat3;
        if (el.viewProjects)     el.viewProjects.textContent     = t.viewProjects;
        if (el.downloadResume)   el.downloadResume.textContent   = t.downloadResume;
        if (el.navProjects)      el.navProjects.textContent      = t.navProjects;
        if (el.navExperience)    el.navExperience.textContent    = t.navExperience;
        if (el.navSkills)        el.navSkills.textContent        = t.navSkills;
        if (el.navContact)       el.navContact.textContent       = t.navContact;
        if (el.sectionProjects)  el.sectionProjects.textContent  = t.sectionProjects;
        if (el.projectsSubtitle) el.projectsSubtitle.textContent = t.projectsSubtitle;
        if (el.searchPlaceholder)el.searchPlaceholder.placeholder= t.searchPlaceholder;
        if (el.sectionExperience)el.sectionExperience.textContent= t.sectionExperience;
        if (el.sectionSkills)    el.sectionSkills.textContent    = t.sectionSkills;

        // Update button styles
        document.querySelectorAll(".lang-btn").forEach(btn => {
            const active = btn.dataset.lang === lang;
            btn.classList.toggle("bg-blue-400", active);
            btn.classList.toggle("text-white", active);
            btn.classList.toggle("bg-white", !active);
            btn.classList.toggle("text-blue-400", !active);
        });

        currentLang = lang;
        document.documentElement.lang = lang === "kn" ? "kn" : "en";
    }

    // --- Button click handler ---
    switcher.addEventListener("click", (e) => {
        const btn = e.target.closest(".lang-btn");
        if (!btn || btn.dataset.lang === currentLang) return;
        applyLanguage(btn.dataset.lang);
    });

})();
