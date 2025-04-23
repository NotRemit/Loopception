// Mobile menu toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Close the menu after a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // Skip if href is just "#"
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Offset for the sticky header
                behavior: 'smooth'
            });
        }
    });
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxVideo = document.getElementById('lightbox-video');
const closeBtn = document.querySelector('.close');

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const video = item.querySelector('video');

        if (img) {
            lightboxImg.src = img.src;
            lightboxImg.style.display = 'block';
            lightboxVideo.style.display = 'none';
        } else if (video) {
            lightboxVideo.src = video.querySelector('source').src;
            lightboxVideo.style.display = 'block';
            lightboxImg.style.display = 'none';
        }

        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
    });
});

closeBtn.addEventListener('click', () => {
    closeLightbox();
});

// Close lightbox when clicking outside content
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close lightbox with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.style.display = 'none';
    lightboxVideo.pause();
    document.body.style.overflow = ''; // Re-enable scrolling
}

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.team-card, .gallery-item');

function checkScroll() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('revealed');
        }
    });
}

// Typewriter animation reset when hero section is in view
function checkHeroVisibility() {
    const heroTitle = document.querySelector('.hero h2');
    const heroTitleTop = heroTitle.getBoundingClientRect().top;
    
    if (heroTitleTop < window.innerHeight && heroTitleTop > 0) {
        // Reset the animation by removing and re-adding it
        heroTitle.style.animation = 'none';
        setTimeout(() => {
            heroTitle.style.animation = 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite';
        }, 50);
    }
}

// Initial check
window.addEventListener('load', () => {
    checkScroll();
    checkHeroVisibility();
});

// Check on scroll
window.addEventListener('scroll', () => {
    checkScroll();
    checkHeroVisibility();
});

// Add active class to current section in navigation
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
