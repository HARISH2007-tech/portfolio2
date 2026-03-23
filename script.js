// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU TOGGLE =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(10, 10, 15, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(255, 0, 85, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // ===== SKILL PROGRESS BARS ANIMATION =====
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillProgressBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = `${level}%`;
        });
    }
    
    // Animate skill bars when they come into view
    const skillsSection = document.querySelector('#skills');
    
    const observerOptions = {
        threshold: 0.3
    };
    
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // ===== REVEAL ON SCROLL ANIMATION =====
    const revealElements = document.querySelectorAll('.skill-card, .project-card, .about-content, .contact-content');
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Set initial state for reveal elements
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(element);
    });
    
    // ===== BUTTON RIPPLE EFFECT =====
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // ===== FORM SUBMISSION HANDLER =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.querySelector('span').textContent;
            const originalIcon = submitBtn.querySelector('i').className;
            
            // Show loading state
            submitBtn.querySelector('span').textContent = 'Sending...';
            submitBtn.querySelector('i').className = 'fas fa-spinner fa-spin';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form submission)
            setTimeout(() => {
                // Show success state
                submitBtn.querySelector('span').textContent = 'Message Sent!';
                submitBtn.querySelector('i').className = 'fas fa-check';
                submitBtn.style.backgroundColor = '#00cc00';
                
                // Reset form
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.querySelector('span').textContent = originalText;
                    submitBtn.querySelector('i').className = originalIcon;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
    
    // ===== RANDOM GLOW EFFECTS =====
    function createRandomGlow() {
        const glows = document.querySelectorAll('.random-glow');
        glows.forEach(glow => glow.remove());
        
        for (let i = 0; i < 5; i++) {
            const glow = document.createElement('div');
            glow.className = 'random-glow';
            glow.style.position = 'fixed';
            glow.style.width = Math.random() * 100 + 50 + 'px';
            glow.style.height = Math.random() * 100 + 50 + 'px';
            glow.style.background = `radial-gradient(circle, var(--neon-red-light) 0%, transparent 70%)`;
            glow.style.borderRadius = '50%';
            glow.style.top = Math.random() * 100 + '%';
            glow.style.left = Math.random() * 100 + '%';
            glow.style.zIndex = '-1';
            glow.style.opacity = '0.3';
            glow.style.pointerEvents = 'none';
            
            document.body.appendChild(glow);
            
            // Animate glow movement
            animateGlow(glow);
        }
    }
    
    function animateGlow(glow) {
        let x = parseFloat(glow.style.left);
        let y = parseFloat(glow.style.top);
        let xDirection = Math.random() > 0.5 ? 1 : -1;
        let yDirection = Math.random() > 0.5 ? 1 : -1;
        
        function move() {
            x += (Math.random() * 0.1) * xDirection;
            y += (Math.random() * 0.1) * yDirection;
            
            // Bounce off edges
            if (x <= 0 || x >= 100) xDirection *= -1;
            if (y <= 0 || y >= 100) yDirection *= -1;
            
            glow.style.left = x + '%';
            glow.style.top = y + '%';
            
            requestAnimationFrame(move);
        }
        
        move();
    }
    
    // Create initial random glows
    createRandomGlow();
    
    // Refresh glows every 30 seconds
    setInterval(createRandomGlow, 30000);
    
    // ===== PROJECT CARD HOVER EFFECT ENHANCEMENT =====
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleY = (x - centerX) * 0.008;
            const angleX = (centerY - y) * 0.008;
            
            const glowX = (x / rect.width) * 100;
            const glowY = (y / rect.height) * 100;
            
            this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
            this.style.boxShadow = `
                ${-angleY * 2}px ${angleX * 2}px 30px var(--neon-red-glow),
                0 0 30px var(--neon-red-glow)
            `;
            
            const overlay = this.querySelector('.project-overlay');
            if (overlay) {
                overlay.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255, 0, 85, 0.9) 0%, rgba(255, 0, 85, 0.7) 100%)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)';
            this.style.boxShadow = '0 0 30px var(--neon-red-glow)';
            
            const overlay = this.querySelector('.project-overlay');
            if (overlay) {
                overlay.style.background = 'rgba(255, 0, 85, 0.8)';
            }
        });
    });
    
    // ===== TYPING EFFECT FOR HERO SUBTITLE =====
    const subtitle = document.querySelector('.subtitle');
    const originalText = subtitle.innerHTML;
    const words = ['neon', 'cyber', 'futuristic', 'immersive', 'cutting-edge'];
    let currentWordIndex = 0;
    
    function changeWord() {
        const currentWord = words[currentWordIndex];
        const nextWord = words[(currentWordIndex + 1) % words.length];
        
        subtitle.innerHTML = originalText.replace(
            `<span class="neon-red">${currentWord}</span>`, 
            `<span class="neon-red">${nextWord}</span>`
        );
        
        currentWordIndex = (currentWordIndex + 1) % words.length;
    }
    
    // Change word every 3 seconds
    setInterval(changeWord, 3000);
    
    // ===== INITIALIZE =====
    updateActiveNavLink(); // Set initial active nav link
});
