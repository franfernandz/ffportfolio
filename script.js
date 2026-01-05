// --- SMOOTH SCROLLING FOR ALL NAV LINKS ---
function setupSmoothScrolling() {
    if (typeof gsap !== 'undefined') {
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
}

// --- MOBILE NAVIGATION FUNCTIONALITY ---
function setupMobileNav() {
    const menuToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNavContainer = document.querySelector('#mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (!menuToggle || !mobileNavContainer) return;

    // Create a GSAP timeline for the animation if GSAP is available
    let navTimeline;
    if (typeof gsap !== 'undefined') {
        navTimeline = gsap.timeline({ paused: true, reversed: true });
        navTimeline.to(mobileNavContainer, {
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    }

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);

        if (navTimeline) {
            navTimeline.reversed() ? navTimeline.play() : navTimeline.reverse();
        } else {
            // Fallback if GSAP fails
            mobileNavContainer.style.transform = isExpanded ? 'translateY(-100%)' : 'translateY(0)';
        }
    });

    // Close menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navTimeline && !navTimeline.reversed()) {
                navTimeline.reverse();
            }
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// --- GSAP SCROLL-TRIGGERED ANIMATIONS ---
function setupAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

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

// --- LIGHTBOX FUNCTIONALITY ---
function setupLightbox() {
    console.log('Initializing Lightbox...');
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';

    const img = document.createElement('img');
    const caption = document.createElement('p'); // Create caption element
    caption.className = 'lightbox-caption';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '&times;';

    lightbox.appendChild(img);
    lightbox.appendChild(caption); // Append caption to lightbox
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);

    // Open lightbox
    const portfolioThumbs = document.querySelectorAll('.portfolio-thumb');
    console.log('Found thumbnails:', portfolioThumbs.length);

    portfolioThumbs.forEach(thumb => {
        thumb.addEventListener('click', (e) => {
            console.log('Thumbnail clicked');
            e.preventDefault();
            img.src = thumb.src;

            // Get caption text
            // The image is now inside a <figure>, so we look for the sibling <figcaption>
            // We need to handle cases where it might still be a bare img (fallback)
            let captionText = '';
            const parentFigure = thumb.closest('figure');
            if (parentFigure) {
                const figcaption = parentFigure.querySelector('figcaption');
                if (figcaption) {
                    captionText = figcaption.textContent;
                }
            } else {
                // Fallback: try alt text if not in a figure
                captionText = thumb.alt || '';
            }

            caption.textContent = captionText;

            lightbox.classList.add('active');
        });
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        // Close if clicking on background or caption, but not image
        if (e.target === lightbox || e.target === caption) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// Initialize
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}
setupSmoothScrolling();
setupMobileNav();
setupAnimations();
setupLightbox();