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

        const submitBtn = contactForm.querySelector(
            'button[type="submit"]'
        );

        if (submitBtn) {
            submitBtn.disabled = true;
        }

        if (formStatus) {
            formStatus.className = "form-status info";
            formStatus.textContent =
                currentLang === "es"
                    ? "Enviando..."
                    : "Sending...";
        }

        try {
            const formData = new FormData(contactForm);

            const response = await fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(formData).toString()
            });

            if (!response.ok) {
                throw new Error("Error al enviar");
            }

            if (formStatus) {
                formStatus.className = "form-status success";
                formStatus.textContent =
                    translations[currentLang]["contact-success"];
            }

            contactForm.reset();

        } catch (error) {

            if (formStatus) {
                formStatus.className = "form-status error";
                formStatus.textContent =
                    translations[currentLang]["contact-error"];
            }

            console.error(error);

        } finally {

            if (submitBtn) {
                submitBtn.disabled = false;
            }

        }
    });
}
});
