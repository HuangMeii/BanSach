
// header
document.addEventListener('DOMContentLoaded', function() {
            const menuButton = document.getElementById('menuButton');
            const menuIcon = document.getElementById('menuIcon');
            const menuPanel = document.getElementById('menuPanel');
            let isOpen = false;
            
            // Initialize menu panel
            gsap.set(menuPanel, {
                display: 'none',
                x: '100%',
                opacity: 0
            });
            
            // Toggle menu function
            function toggleMenu() {
                isOpen = !isOpen;
                
                // Toggle icon rotation
                if (isOpen) {
                    menuIcon.classList.add('rotate-90');
                } else {
                    menuIcon.classList.remove('rotate-90');
                }
                
                // Animate menu panel
                if (isOpen) {
                    gsap.set(menuPanel, { display: 'block' });
                    gsap.fromTo(menuPanel,
                        { x: '100%', opacity: 0 },
                        {
                            x: '0%',
                            opacity: 1,
                            duration: 0.8,
                            ease: 'power2.out'
                        }
                    );
                } else {
                    gsap.to(menuPanel, {
                        x: '100%',
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power2.in',
                        onComplete: () => {
                            gsap.set(menuPanel, { display: 'none' });
                        }
                    });
                }
            }
            
            // Add click event to menu button
            menuButton.addEventListener('click', toggleMenu);
            
            // Close menu when clicking on links (optional)
            const menuLinks = document.querySelectorAll('.menu-link');
            menuLinks.forEach(link => {
                link.addEventListener('click', function() {
                    if (isOpen) {
                        toggleMenu();
                    }
                });
            });
        });

