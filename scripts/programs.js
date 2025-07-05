 // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Category filter functionality
        const categoryTabs = document.querySelectorAll('.category-tab');
        const programCards = document.querySelectorAll('.program-card');
        
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Update active tab
                categoryTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Filter programs
                const category = this.dataset.category;
                programCards.forEach(card => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const nav = document.querySelector('nav ul');
        
        mobileMenuBtn.addEventListener('click', function() {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    nav.style.display = 'none';
                }
            });
        });

        // Responsive adjustments
        function handleResponsive() {
            if (window.innerWidth > 768) {
                nav.style.display = 'flex';
            } else {
                nav.style.display = 'none';
            }
        }

        // Initialize and add resize listener
        handleResponsive();
        window.addEventListener('resize', handleResponsive);