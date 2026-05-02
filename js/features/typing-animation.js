// js/features/typing-animation.js
// Cycles through a list of roles with a typewriter effect on the hero subtitle

(function () {

    const roles = [
        "Full-Stack Developer",
        "MERN Enthusiast",
        "Competitive Programmer",
        "React Developer",
        "Problem Solver",
    ];

    const target = document.querySelector("p.text-xl.lg\\:text-2xl");

    if (!target) return;

    // Preserve the original styling, just replace inner content with typing span
    target.innerHTML = `<span id="typed-text"></span><span id="cursor" class="inline-block w-0.5 h-6 bg-slate-600 ml-1 align-middle animate-pulse"></span>`;

    const typedEl = document.getElementById("typed-text");

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const TYPE_SPEED = 80;       // ms per character while typing
    const DELETE_SPEED = 40;     // ms per character while deleting
    const PAUSE_AFTER_TYPE = 1800; // ms to wait after fully typed
    const PAUSE_AFTER_DELETE = 400; // ms to wait after fully deleted

    function tick() {
        const currentRole = roles[roleIndex];

        if (!isDeleting) {
            // Type one character
            charIndex++;
            typedEl.textContent = currentRole.slice(0, charIndex);

            if (charIndex === currentRole.length) {
                // Fully typed — pause, then start deleting
                setTimeout(() => {
                    isDeleting = true;
                    tick();
                }, PAUSE_AFTER_TYPE);
                return;
            }

            setTimeout(tick, TYPE_SPEED);

        } else {
            // Delete one character
            charIndex--;
            typedEl.textContent = currentRole.slice(0, charIndex);

            if (charIndex === 0) {
                // Fully deleted — move to next role
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;

                setTimeout(tick, PAUSE_AFTER_DELETE);
                return;
            }

            setTimeout(tick, DELETE_SPEED);
        }
    }

    // Kick off after a short initial delay
    setTimeout(tick, 600);

})();
