// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Add scroll event listener for animations
    window.addEventListener('scroll', function() {
    animateOnScroll();
    });
    
    // Initial call to animateOnScroll to check for elements in view on page load
    animateOnScroll();
    
    // Add text reveal animations for the profile section
    addTextRevealAnimations();
    
    // Initialize typing animation for roles
    initTypingAnimation();
});

// Setup typing animation for roles
function initTypingAnimation() {
    // Replace the original role paragraph with our typing element
    const roleElement = document.querySelector('.section__text__p2');
    if (roleElement) {
    // Create a container for the typing animation
    const typedContainer = document.createElement('div');
    typedContainer.className = 'typed-text';
    typedContainer.id = 'typed-text';
    
    // Insert the typed container where the role text was
    roleElement.parentNode.replaceChild(typedContainer, roleElement);
    
    // Define the roles to cycle through
    const roles = [
        "Aspiring Software Developer",
        "Data Analyst",
        "Android Developer"
    ];
    
    // Start the typing animation
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // base typing speed in ms
    
    function typeText() {
        const currentRole = roles[currentRoleIndex];
        const typedElement = document.getElementById('typed-text');
        
        if (isDeleting) {
        // Deleting text
        typedElement.textContent = currentRole.substring(0, currentCharIndex);
        currentCharIndex--;
        typingSpeed = 50; // faster when deleting
        
        if (currentCharIndex < 0) {
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            typingSpeed = 300; // pause before typing next word
        }
        } else {
        // Typing text
        typedElement.textContent = currentRole.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingSpeed = 100; // normal typing speed
        
        if (currentCharIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 1000; // pause before deleting
        }
        }
        
        setTimeout(typeText, typingSpeed);
    }
    
    // Start the typing animation
    setTimeout(typeText, 1000); // Initial delay to let other animations play first
    }
}

// Add text reveal animations
function addTextRevealAnimations() {
    // Add text reveal for "Hello, I'm" and name
    const profileElements = [
    document.querySelector('.section__text__p1'),
    document.querySelector('#profile .title')
    ];
    
    profileElements.forEach((element, index) => {
    if (element) {
        element.classList.add('text-reveal');
        element.style.animationDelay = (0.3 * index) + 's';
    }
    });
}

// Initialize elements for scroll animations
function initScrollAnimations() {
    // Add scroll-animation class to elements we want to animate on scroll
    const animatedElements = [
    // About section
    document.querySelector('#about .section__text__p1'),
    document.querySelector('#about .title'),
    ...document.querySelectorAll('#about .details-container'),
    document.querySelector('#about .text-container'),
    
    // Experience section
    document.querySelector('#experience .section__text__p1'),
    document.querySelector('#experience .title'),
    ...document.querySelectorAll('#experience .details-container'),
    
    // Projects section
    document.querySelector('#projects .section__text__p1'),
    document.querySelector('#projects .title'),
    ...document.querySelectorAll('#projects .color-container'),
    
    // Contact section
    document.querySelector('#contact .section__text__p1'),
    document.querySelector('#contact .title'),
    document.querySelector('#contact .contact-info-upper-container')
    ];
    
    // Add scroll-animation class to all elements
    animatedElements.forEach(element => {
    if (element) {
        element.classList.add('scroll-animation');
    }
    });
    
    // Add staggered animation delays to grouped elements
    addStaggeredDelays('#about .details-container');
    addStaggeredDelays('#experience .details-container');
    addStaggeredDelays('#projects .color-container');
}

// Add staggered delays to elements
function addStaggeredDelays(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
    element.style.transitionDelay = (0.2 * index) + 's';
    });
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
    rect.bottom >= 0
    );
}

// Animate elements when they come into view
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.scroll-animation');
    
    animatedElements.forEach(element => {
    if (isInViewport(element)) {
        element.classList.add('animate');
    }
    });
}

// Enhanced hamburger menu animation
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
    
    // Animate menu items with delay
    const menuItems = document.querySelectorAll(".menu-links a");
    if (menu.classList.contains("open")) {
    menuItems.forEach((item, index) => {
        item.style.transitionDelay = (0.1 * index) + 's';
    });
    } else {
    menuItems.forEach(item => {
        item.style.transitionDelay = '0s';
    });
    }
}

// Project hover effects
document.addEventListener('DOMContentLoaded', function() {
    const projectContainers = document.querySelectorAll('.color-container');
    projectContainers.forEach(container => {
    container.addEventListener('mouseenter', function() {
        const title = this.querySelector('.project-title');
        if (title) {
        title.style.transform = 'translateY(-5px)';
        }
    });
    
    container.addEventListener('mouseleave', function() {
        const title = this.querySelector('.project-title');
        if (title) {
        title.style.transform = 'translateY(0)';
        }
    });
    });
});

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const menu = document.querySelector(".menu-links");
        if (menu && menu.classList.contains("open")) {
            toggleMenu();
        }
        }
    });
    });
});

// Preloader animation
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
    preloader.classList.add('preloader-finish');
    }
});