document.addEventListener('DOMContentLoaded', () => {

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // --- SMOOTH SCROLLING FOR ALL NAV LINKS ---
    function setupSmoothScrolling() {
        const links = gsap.utils.toArray('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                gsap.to(window, {
                    duration: 1.2,
                    scrollTo: { y: targetId, offsetY: 70 }, // Offset for fixed header
                    ease: 'power2.inOut'
                });
            });
        });
    }

    // --- MOBILE NAVIGATION FUNCTIONALITY ---
    function setupMobileNav() {
        const menuToggle = document.querySelector('.mobile-nav-toggle');
        const mobileNavContainer = document.querySelector('#mobile-nav');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        const body = document.body;

        // Create a GSAP timeline for the animation
        const navTimeline = gsap.timeline({ paused: true, reversed: true });

        navTimeline.to(mobileNavContainer, {
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
        });

        menuToggle.addEventListener('click', () => {
            menuToggle.setAttribute('aria-expanded', !navTimeline.reversed());
            navTimeline.reversed() ? navTimeline.play() : navTimeline.reverse();
        });

        // Close menu when a link is clicked
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (!navTimeline.reversed()) {
                    navTimeline.reverse();
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // --- GSAP SCROLL-TRIGGERED ANIMATIONS ---
    function setupAnimations() {
        // Hero Section Animation on load
        const heroTimeline = gsap.timeline({ defaults: { duration: 0.8, ease: 'power2.out' } });
        heroTimeline
            .to('.anim-hero-title', { y: 0, opacity: 1 }, 0.3)
            .to('.anim-hero-subtitle', { y: 0, opacity: 1 }, 0.5)
            .to('.anim-hero-cta', { y: 0, opacity: 1 }, 0.8);

        // Animate Section Titles on scroll
        const sectionTitles = gsap.utils.toArray('.section-title');
        sectionTitles.forEach(title => {
            gsap.to(title, {
                opacity: 1,
                scrollTrigger: {
                    trigger: title,
                    start: 'top 90%', // Animate when 85% of the viewport is reached
                    toggleActions: 'play none none none'
                }
            });
        });

        // Animate other content sections
        const contentSections = gsap.utils.toArray('.portfolio-section, .about-content, .newsletter-section p, .newsletter-section .btn, .contact-form div .btn');
         contentSections.forEach(content => {
            gsap.from(content.children, {
                opacity: 0,
                y: 30,
                stagger: 0.2,
                duration: 0.6,
                scrollTrigger: {
                    trigger: content,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        });
    }

    // Initialize all functions
    setupSmoothScrolling();
    setupMobileNav();
    setupAnimations();

});