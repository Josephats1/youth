// Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const nav = document.querySelector('nav ul');
        
        mobileMenuBtn.addEventListener('click', function() {
            nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    nav.style.display = 'none';
                }
            });
        });

        // Donation tabs functionality
        const donationTabs = document.querySelectorAll('.donation-tab');
        const donationSections = {
            'one-time': document.getElementById('one-time-donations'),
            'monthly': document.getElementById('monthly-donations'),
            'custom': document.getElementById('custom-donation')
        };
        
        donationTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Update active tab
                donationTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding section
                const tabToShow = this.dataset.tab;
                Object.keys(donationSections).forEach(key => {
                    if (key === tabToShow) {
                        donationSections[key].style.display = key === 'custom' ? 'block' : 'grid';
                    } else {
                        donationSections[key].style.display = 'none';
                    }
                });
            });
        });

        // Amount options selection
        const amountOptions = document.querySelectorAll('.amount-option');
        amountOptions.forEach(option => {
            option.addEventListener('click', function() {
                amountOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Frequency options selection
        const frequencyOptions = document.querySelectorAll('.frequency-option');
        frequencyOptions.forEach(option => {
            option.addEventListener('click', function() {
                frequencyOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Payment method selection
        const paymentMethods = document.querySelectorAll('.payment-method');
        paymentMethods.forEach(method => {
            method.addEventListener('click', function() {
                paymentMethods.forEach(m => m.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Form submission
        const donationForm = document.querySelector('.donation-form');
        if (donationForm) {
            donationForm.addEventListener('submit', function(e) {
                e.preventDefault();
                // Here you would normally process the donation
                alert('Thank you for your donation! A confirmation has been sent to your email.');
                // In a real implementation, you would connect to a payment processor here
            });
        }

        // Newsletter form
        const newsletterForm = document.querySelector('.newsletter form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = document.getElementById('newsletter-email').value;
                // Here you would normally send this to your email service
                alert(`Thank you for subscribing with ${email}!`);
                this.reset();
            });
        }