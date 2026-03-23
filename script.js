/* ============================================
   JANIT B — PORTFOLIO SCRIPTS
   ============================================ */

(function () {
    'use strict';

    // --- LIVE CLOCK ---
    const clockEl = document.getElementById('header-clock');
    const dateEl = document.getElementById('header-date');

    function updateClock() {
        const now = new Date();
        let h = now.getHours();
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12;
        h = h ? h : 12; // 0 should be 12
        const hStr = String(h).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        clockEl.textContent = `${hStr}:${m}:${s} ${ampm}`;

        const y = now.getFullYear();
        const mo = String(now.getMonth() + 1).padStart(2, '0');
        const d = String(now.getDate()).padStart(2, '0');
        dateEl.textContent = `${y}.${mo}.${d}`;
    }
    updateClock();
    setInterval(updateClock, 1000);

    // --- STATUS BAR: UPTIME ---
    const uptimeEl = document.getElementById('status-uptime');
    const startTime = Date.now();

    function updateUptime() {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const hrs = String(Math.floor(elapsed / 3600)).padStart(2, '0');
        const mins = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
        const secs = String(elapsed % 60).padStart(2, '0');
        uptimeEl.textContent = `SYS_UPTIME: ${hrs}:${mins}:${secs}`;
    }
    setInterval(updateUptime, 1000);

    // --- STATUS BAR: FAKE PACKETS ---
    const packetsEl = document.querySelector('.packets-value');
    let packetCount = 0;

    function updatePackets() {
        packetCount += Math.floor(Math.random() * 15) + 1;
        packetsEl.textContent = packetCount.toLocaleString();
    }
    setInterval(updatePackets, 800);

    // --- STATUS BAR: THREAT LEVEL ---
    const threatEl = document.querySelector('.threat-value');
    const threatLevels = ['LOW', 'LOW', 'LOW', 'MODERATE', 'LOW', 'LOW', 'ELEVATED', 'LOW'];
    const threatColors = {
        'LOW': '#00ff41',
        'MODERATE': '#ffaa00',
        'ELEVATED': '#ff003c'
    };

    function updateThreat() {
        const level = threatLevels[Math.floor(Math.random() * threatLevels.length)];
        threatEl.textContent = level;
        threatEl.style.color = threatColors[level];
    }
    setInterval(updateThreat, 5000);

    // --- ACCORDION ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.accordion-item');
            const isOpen = item.classList.contains('open');

            // Close all
            document.querySelectorAll('.accordion-item.open').forEach(openItem => {
                openItem.classList.remove('open');
                openItem.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            });

            // Toggle clicked
            if (!isOpen) {
                item.classList.add('open');
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // --- SMOOTH SCROLL NAV ---
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- ACTIVE NAV ON SCROLL ---
    const sections = document.querySelectorAll('.section');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // --- SCROLL REVEAL ---
    const revealElements = document.querySelectorAll(
        '.section-header, .about-intro, .accordion-item, .project-card, .contact-block'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the reveal for sibling elements
                const siblings = Array.from(entry.target.parentElement.children);
                const siblingIndex = siblings.indexOf(entry.target);
                const delay = siblingIndex * 80;

                setTimeout(() => {
                    entry.target.classList.add('reveal');
                }, delay);

                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- CONTINUOUS TEXT SCRAMBLE GLITCH ---
    const glitchTitle = document.querySelector('.glitch');
    if (glitchTitle) {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:<>?~";
        const originalText = glitchTitle.getAttribute('data-text');
        
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance to glitch every 120ms
                let scrambled = "";
                for (let i = 0; i < originalText.length; i++) {
                    if (originalText[i] === " ") {
                        scrambled += " ";
                    } else if (Math.random() < 0.4) {
                        scrambled += letters[Math.floor(Math.random() * letters.length)];
                    } else {
                        scrambled += originalText[i];
                    }
                }
                glitchTitle.textContent = scrambled;
                
                // Reset it quickly
                setTimeout(() => {
                    glitchTitle.textContent = originalText;
                }, 50 + Math.random() * 150); // Reset within 50-200ms
            }
        }, 120);
    }

})();
