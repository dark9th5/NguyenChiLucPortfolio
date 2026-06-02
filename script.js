/* ==========================================================================
   PORTFOLIO INTERACTIVE SCRIPT - NGUYỄN CHÍ LỰC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Initialize All Interactive Systems
    initCustomCursor();
    initThemeSystem();
    initTypingEffect();
    initMobileNav();
    initParticleBackground();
    initScrollReveal();
    initContactForm();
    initActiveNavHighlight();
});

/* ==========================================================================
   1. CUSTOM INTERACTIVE CURSOR
   ========================================================================== */
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const outline = document.querySelector('.custom-cursor-outline');
    
    if (!cursor || !outline) return;

    let mouseX = 0, mouseY = 0; // Mouse coords
    let cursorX = 0, cursorY = 0; // Outline coords (buffered for lag)

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Immediate position for inner cursor
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth cursor outline trail using animation loop
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        // Ease calculation
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        
        outline.style.left = cursorX + 'px';
        outline.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects on interactive elements
    const interactives = document.querySelectorAll('a, button, input, textarea, .contact-detail-card, .project-card');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.backgroundColor = 'var(--color-accent-cyan)';
            outline.style.transform = 'translate(-50%, -50%) scale(1.8)';
            outline.style.borderColor = 'var(--color-accent-purple)';
            outline.style.borderWidth = '2px';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'var(--color-text-primary)';
            outline.style.transform = 'translate(-50%, -50%) scale(1)';
            outline.style.borderColor = 'var(--color-accent-cyan)';
            outline.style.borderWidth = '1px';
        });
    });
}

/* ==========================================================================
   2. THEME STORAGE & TOGGLING SYSTEM
   ========================================================================== */
function initThemeSystem() {
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    if (!themeBtn) return;

    // Check cached theme or system preference
    const cachedTheme = localStorage.getItem('luc-portfolio-theme');
    if (cachedTheme) {
        body.className = cachedTheme;
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        body.className = prefersDark ? 'dark-theme' : 'light-theme';
    }

    themeBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('luc-portfolio-theme', 'light-theme');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('luc-portfolio-theme', 'dark-theme');
        }
        
        // Re-draw particles color if canvas active
        if (window.resizeCanvas) {
            window.resizeCanvas();
        }
    });
}

/* ==========================================================================
   3. HERO TYPING EFFECT
   ========================================================================== */
function initTypingEffect() {
    const typedTextEl = document.getElementById('typed-text');
    if (!typedTextEl) return;

    const words = [
        "Android Applications.",
        "Jetpack Compose Interfaces.",
        "Secure MVVM Architectures.",
        "NLP & Chatbot Pipelines."
    ];

    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIdx];
        
        if (isDeleting) {
            typedTextEl.textContent = currentWord.substring(0, charIdx - 1);
            charIdx--;
            typingSpeed = 50;
        } else {
            typedTextEl.textContent = currentWord.substring(0, charIdx + 1);
            charIdx++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIdx === currentWord.length) {
            // Wait before starting backspace
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000); // Initial delay
}

/* ==========================================================================
   4. MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');
    
    if (!toggleBtn || !navLinks) return;

    toggleBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
        toggleBtn.classList.toggle('mobile-active-toggle');
    });

    // Close when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-active');
            toggleBtn.classList.remove('mobile-active-toggle');
        });
    });

    // Header blur background on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* ==========================================================================
   5. HTML5 CANVAS PARTICLE BACKGROUND
   ========================================================================== */
function initParticleBackground() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 120 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 2 + 1;
        }

        draw() {
            const isDark = document.body.classList.contains('dark-theme');
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = isDark ? 'rgba(56, 189, 248, 0.25)' : 'rgba(2, 132, 199, 0.15)';
            ctx.fill();
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off borders
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

            // Mouse interaction
            if (mouse.x !== null && mouse.y !== null) {
                let dx = this.x - mouse.x;
                let dy = this.y - mouse.y;
                let distance = Math.sqrt(dx*dx + dy*dy);
                if (distance < mouse.radius) {
                    let force = (mouse.radius - distance) / mouse.radius;
                    // Push particles away
                    this.x += (dx / distance) * force * 1.5;
                    this.y += (dy / distance) * force * 1.5;
                }
            }
        }
    }

    function initParticles() {
        particles = [];
        const count = Math.floor((canvas.width * canvas.height) / 13000);
        const cappedCount = Math.min(count, 120); // Cap performance lag
        for (let i = 0; i < cappedCount; i++) {
            particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
        }
    }

    // Handle screen resize
    window.resizeCanvas = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    };
    window.addEventListener('resize', window.resizeCanvas);
    window.resizeCanvas();

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        drawLines();
        requestAnimationFrame(animate);
    }

    function drawLines() {
        const isDark = document.body.classList.contains('dark-theme');
        const maxDist = 120;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let dist = Math.sqrt(dx*dx + dy*dy);
                
                if (dist < maxDist) {
                    let alpha = (maxDist - dist) / maxDist * 0.12;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = isDark 
                        ? `rgba(168, 85, 247, ${alpha})` 
                        : `rgba(124, 58, 237, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
    }

    animate();
}

/* ==========================================================================
   6. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's a skills section card, trigger skill bar animation
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
            }
        });
    }, {
        threshold: 0.02 // Lower threshold to ensure triggering on all screens
    });

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });

    // Fallback: Force reveal all sections after 1.5 seconds as a backup
    setTimeout(() => {
        reveals.forEach(reveal => {
            reveal.classList.add('visible');
        });
    }, 1500);
}

function animateSkillBars() {
    const bars = document.querySelectorAll('.skill-bar-fill');
    bars.forEach(bar => {
        const targetWidth = bar.getAttribute('style').match(/width:\s*(\d+)%/)[1];
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = targetWidth + '%';
        }, 100);
    });
}

/* ==========================================================================
   7. COPY TEXT & TOAST NOTIFICATION
   ========================================================================== */
window.copyText = function(text, successMessage) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(successMessage || 'Copied to clipboard!');
    }).catch(err => {
        console.error('Error copying text: ', err);
    });
};

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/* ==========================================================================
   8. ACTIVE NAV MENU HIGHLIGHTING
   ========================================================================== */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 120) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   9. CONTACT FORM VALIDATION & SIMULATED SENDING
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');
    
    if (!form || !feedback) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.btn-submit');
        const originalBtnHTML = submitBtn.innerHTML;
        
        // Show spinner / loading feedback
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending Message...</span> <i data-lucide="loader" class="animate-spin"></i>`;
        if (typeof lucide !== 'undefined') lucide.createIcons();
        
        // Simulate networking latency (1.5 seconds)
        setTimeout(() => {
            // Form success feedback
            feedback.textContent = 'Thank you! Your message has been sent successfully. Lực will get back to you shortly.';
            feedback.className = 'form-feedback success';
            
            // Show toast message
            showToast('Message sent successfully!');

            // Reset form
            form.reset();
            
            // Restore button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHTML;
            if (typeof lucide !== 'undefined') lucide.createIcons();
            
            // Clear feedback after 6 seconds
            setTimeout(() => {
                feedback.className = 'form-feedback';
                feedback.textContent = '';
            }, 6000);
            
        }, 1500);
    });
}
