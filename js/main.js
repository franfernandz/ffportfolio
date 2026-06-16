document.addEventListener("DOMContentLoaded", () => {
    // 1. Language Translation Logic
    const langToggleBtn = document.getElementById("lang-toggle");
    
    // Get stored language or detect browser language
    let currentLang = localStorage.getItem("lang");
    if (!currentLang) {
        const browserLang = navigator.language || navigator.userLanguage || "en";
        currentLang = browserLang.startsWith("es") ? "es" : "en";
    }

    function translatePage(lang) {
        document.documentElement.setAttribute("lang", lang);
        
        // Translate text elements
        const elements = document.querySelectorAll("[data-i18n]");
        elements.forEach(elem => {
            const key = elem.getAttribute("data-i18n");
            if (translations[lang] && translations[lang][key]) {
                elem.textContent = translations[lang][key];
            }
        });

        // Translate placeholder elements
        const placeholders = document.querySelectorAll("[data-i18n-placeholder]");
        placeholders.forEach(elem => {
            const key = elem.getAttribute("data-i18n-placeholder");
            if (translations[lang] && translations[lang][key]) {
                elem.setAttribute("placeholder", translations[lang][key]);
            }
        });

        // Update Toggle Button Text
        if (langToggleBtn) {
            langToggleBtn.textContent = lang === "es" ? "EN" : "ES";
        }
        
        localStorage.setItem("lang", lang);
    }

    // Initialize translations
    translatePage(currentLang);

    // Toggle language on click
    if (langToggleBtn) {
        langToggleBtn.addEventListener("click", () => {
            currentLang = currentLang === "es" ? "en" : "es";
            translatePage(currentLang);
        });
    }

    // 2. Contact Form Handling
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            // Visual feedback - loading state
            if (submitBtn) submitBtn.disabled = true;
            if (formStatus) {
                formStatus.className = "form-status info";
                formStatus.textContent = currentLang === "es" ? "Enviando..." : "Sending...";
            }

            const formData = new FormData(contactForm);
            
            const key = "YOUR_ACCESS_KEY_HERE"; // User should replace this with their Web3Forms key
            
            try {
                if (key === "YOUR_ACCESS_KEY_HERE") {
                    // Out-of-the-box demo mode: simulate API submission
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    if (formStatus) {
                        formStatus.className = "form-status success";
                        formStatus.textContent = translations[currentLang]["contact-success"];
                    }
                    contactForm.reset();
                } else {
                    // Production mode: make real API request to Web3Forms
                    const response = await fetch("https://api.web3forms.com/submit", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify({
                            access_key: key,
                            name: formData.get("name"),
                            email: formData.get("email"),
                            message: formData.get("message")
                        })
                    });

                    if (response.ok) {
                        if (formStatus) {
                            formStatus.className = "form-status success";
                            formStatus.textContent = translations[currentLang]["contact-success"];
                        }
                        contactForm.reset();
                    } else {
                        throw new Error("Form submission failed");
                    }
                }
            } catch (error) {
                if (formStatus) {
                    formStatus.className = "form-status error";
                    formStatus.textContent = translations[currentLang]["contact-error"];
                }
            } finally {
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    }
});
