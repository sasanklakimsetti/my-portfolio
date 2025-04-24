// Enhanced smooth fade transitions for entire cards/content containers
document.addEventListener('DOMContentLoaded', function() {
    // Get all sections and content containers
    const sections = document.querySelectorAll('section');
    const contentContainers = document.querySelectorAll('.details-container, .color-container, .contact-info-upper-container, .about-details-container');
    
    // Set initial state for sections
    sections.forEach((section, index) => {
        section.style.transition = "opacity 1.2s cubic-bezier(0.645, 0.045, 0.355, 1.000)";
        if (index === 0) {
            section.style.opacity = "1";
        } else {
            section.style.opacity = "0";
        }
    });
    
    // Set initial state for content containers - all start invisible
    contentContainers.forEach(container => {
        container.style.opacity = "0";
        container.style.transition = "opacity 1.2s cubic-bezier(0.645, 0.045, 0.355, 1.000)";
    });
    
    // After a short delay, fade in the visible section's content
    setTimeout(() => {
        const visibleSection = document.querySelector('#profile');
        if (visibleSection) {
            const visibleContainers = visibleSection.querySelectorAll('.details-container, .color-container, .contact-info-upper-container, .about-details-container');
            visibleContainers.forEach((container, i) => {
                setTimeout(() => {
                    container.style.opacity = "1";
                }, i * 200); // Staggered animation for each container
            });
        }
    }, 500);
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const threshold = 0.25; // 25% of the element must be visible
        
        return (
            rect.top <= (window.innerHeight * (1 - threshold)) &&
            rect.bottom >= (window.innerHeight * threshold)
        );
    }
    
    // Function to handle scroll and fade animations
    function handleScroll() {
        sections.forEach(section => {
            if (isInViewport(section)) {
                // Fade in section when it comes into view
                section.style.opacity = "1";
                
                // Then fade in its content containers with staggered timing
                const containers = section.querySelectorAll('.details-container, .color-container, .contact-info-upper-container, .about-details-container');
                containers.forEach((container, i) => {
                    setTimeout(() => {
                        container.style.opacity = "1";
                    }, i * 200); // Staggered animation for each container
                });
            } else {
                // Fade out section and its containers when not in view
                section.style.opacity = "0.2";
                
                const containers = section.querySelectorAll('.details-container, .color-container, .contact-info-upper-container, .about-details-container');
                containers.forEach(container => {
                    container.style.opacity = "0";
                });
            }
        });
    }
    
    // Set up smooth scrolling with fade transitions
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Fade out all sections and their content
                sections.forEach(section => {
                    if (section.id !== targetId.substring(1)) {
                        section.style.opacity = "0";
                        
                        const containers = section.querySelectorAll('.details-container, .color-container, .contact-info-upper-container, .about-details-container');
                        containers.forEach(container => {
                            container.style.opacity = "0";
                        });
                    }
                });
                
                // Wait for fade-out effect before scrolling
                setTimeout(() => {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Fade in target section
                    setTimeout(() => {
                        targetElement.style.opacity = "1";
                        
                        // Then fade in its content containers with staggered timing
                        const containers = targetElement.querySelectorAll('.details-container, .color-container, .contact-info-upper-container, .about-details-container');
                        containers.forEach((container, i) => {
                            setTimeout(() => {
                                container.style.opacity = "1";
                            }, i * 200); // Staggered animation for each container
                        });
                    }, 400);
                    
                    // Close mobile menu if open
                    const menu = document.querySelector(".menu-links");
                    if (menu && menu.classList.contains("open")) {
                        toggleMenu();
                    }
                }, 500);
            }
        });
    });
    
    // Debounce function to limit scroll event firing
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }
    
    // Add scroll event listener with debounce for smoother performance
    window.addEventListener('scroll', debounce(function() {
        handleScroll();
    }, 20));
    
    // Initial call to handle elements in view on page load
    handleScroll();
    
    // Enhanced fade animation for arrow navigation
    document.querySelectorAll('.arrow').forEach(arrow => {
        arrow.addEventListener('click', function(e) {
            // Prevent default behavior
            e.preventDefault();
            e.stopPropagation();
            
            // Extract the target href
            let targetHref = '';
            const onclickAttr = this.getAttribute('onclick');
            if (onclickAttr) {
                const match = onclickAttr.match(/location\.href\s*=\s*['"]([^'"]+)['"]/);
                if (match && match[1]) {
                    targetHref = match[1];
                }
            }
            
            const currentSection = this.closest('section');
            const targetElement = document.querySelector(targetHref);
            
            if (currentSection && targetElement) {
                // Fade out current section and its content
                currentSection.style.opacity = "0";
                const currentContainers = currentSection.querySelectorAll('.details-container, .color-container, .contact-info-upper-container, .about-details-container');
                currentContainers.forEach(container => {
                    container.style.opacity = "0";
                });
                
                // Wait for fade out, then scroll, then fade in target
                setTimeout(() => {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                    
                    setTimeout(() => {
                        // Fade in target section
                        targetElement.style.opacity = "1";
                        
                        // Then fade in its content with staggered timing
                        const targetContainers = targetElement.querySelectorAll('.details-container, .color-container, .contact-info-upper-container, .about-details-container');
                        targetContainers.forEach((container, i) => {
                            setTimeout(() => {
                                container.style.opacity = "1";
                            }, i * 200); // Staggered animation for each container
                        });
                    }, 500);
                }, 700);
                
                // Prevent the default onclick behavior
                return false;
            }
        });
    });
});