// Basic script to confirm JS loading
document.addEventListener('DOMContentLoaded', () => {
    console.log('Website scripts loaded successfully.');

    // Generic Dropdown Handler
    const dropdownTriggers = document.querySelectorAll('.cta-outline'); // Assuming buttons use this class, or add a specific js-trigger class

    // Helper to close all dropdowns
    function closeAllDropdowns() {
        document.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.remove('show'));
    }

    // Specific handler for Download CV
    const downloadBtn = document.getElementById('download-cv-btn');
    const downloadDropdown = document.getElementById('cv-dropdown');

    // Specific handler for Other Projects
    const projectsBtn = document.getElementById('other-projects-btn');
    const projectsDropdown = document.getElementById('other-projects-dropdown');

    [
        { btn: downloadBtn, menu: downloadDropdown },
        { btn: projectsBtn, menu: projectsDropdown }
    ].forEach(({ btn, menu }) => {
        if (btn && menu) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isShown = menu.classList.contains('show');
                closeAllDropdowns(); // Close others first
                if (!isShown) menu.classList.add('show');
            });
        }
    });

    document.addEventListener('click', () => {
        closeAllDropdowns();
    });

    // Mobile Navigation
    const hamburger = document.getElementById('hamburger-btn');
    const navList = document.getElementById('nav-list');

    if (hamburger && navList) {
        hamburger.addEventListener('click', () => {
            navList.classList.toggle('active');

            // Optional: Animate hamburger
            hamburger.children[0].style.transform = navList.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
            hamburger.children[1].style.opacity = navList.classList.contains('active') ? '0' : '1';
            hamburger.children[2].style.transform = navList.classList.contains('active') ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
        });

        // Close menu when clicking a link
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                // Reset hamburger
                hamburger.children[0].style.transform = 'none';
                hamburger.children[1].style.opacity = '1';
                hamburger.children[2].style.transform = 'none';
            });
        });
    }

    // Theme Switcher
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check local storage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        themeToggle.textContent = '☾'; // Moon for dark mode option
    } else {
        themeToggle.textContent = '☀'; // Sun for light mode option
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');

            if (body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = '☾';
            } else {
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = '☀';
            }
        });
    }
    // Modal Logic
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.close-modal');

    if (modal && modalImg) {
        // Open modal
        document.querySelectorAll('.bento-item').forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img) {
                    modal.style.display = "flex";
                    // Small timeout to allow display:flex to apply before opacity transition
                    setTimeout(() => {
                        modal.classList.add('show');
                    }, 10);
                    modalImg.src = img.src;
                }
            });
        });

        // Close modal function
        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = "none";
            }, 300); // Match transition duration
        };

        // Close on button click
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });
    }
});
