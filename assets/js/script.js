document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    
    if(mobileToggle && navMenu) {
        // Função para fechar o menu
        const closeMenu = () => {
            navMenu.classList.remove('active');
        };

        // Função para abrir o menu
        const openMenu = () => {
            navMenu.classList.add('active');
        };

        mobileToggle.addEventListener('click', openMenu);
        
        if(closeMenuBtn) {
            closeMenuBtn.addEventListener('click', closeMenu);
        }

        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu when clicking outside (on the blurred area)
        navMenu.addEventListener('click', (e) => {
            if(e.target === navMenu) {
                closeMenu();
            }
        });
    }

    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Active Link on Scroll ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-menu ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if(pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if(item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // --- Counters Animation ---
    const counters = document.querySelectorAll('.counter');
    const speed = 100; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Use Intersection Observer to trigger counter animation when in view
    const resultadosSection = document.getElementById('resultados');
    if(resultadosSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(resultadosSection);
    }

    // --- Form Submission ---
    const form = document.getElementById('contactForm');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Get form values
            const name = document.getElementById('name').value;
            
            // Simple alert for demonstration
            alert(`Obrigado(a), ${name}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.`);
            form.reset();
        });
    }

    // --- Scroll to Top ---
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
