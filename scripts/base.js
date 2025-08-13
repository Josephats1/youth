 // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        //emergencies
        document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 15;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 15;
        card.style.transform = `translateY(-10px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(-10px)';
    });
});

        // Animated counters
        function animateCounters() {
            const students = document.getElementById('students-count');
            const programs = document.getElementById('programs-count');
            const stories = document.getElementById('stories-count');
            const partners = document.getElementById('partners-count');
            
            animateValue(students, 0, 10000, 2000);
            animateValue(programs, 0, 120, 2000);
            animateValue(stories, 0, 450, 2000);
            animateValue(partners, 0, 60, 2000);
        }
        
        function animateValue(element, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const value = Math.floor(progress * (end - start) + start);
                element.innerHTML = "+" + value.toLocaleString();
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
        
        // Trigger counters when impact section is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, {threshold: 0.5});
        
        observer.observe(document.querySelector('.impact'));
        
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
        
            const words = ["Dream", "Build", "Inspire", "Create", "Shine"];
    const container = document.getElementById("animatedWord");

    let current = 0;

    function animateWord(index) {
      const word = words[index];
      container.className = `animated-word word-${index}`;
      container.innerHTML = "";

      word.split('').forEach((letter, i) => {
        const span = document.createElement("span");
        span.classList.add("letter");
        span.textContent = letter;
        span.style.animationDelay = `${i * 0.2}s`;
        container.appendChild(span);
      });

      // Go to next word
      const totalDuration = word.length * 200 + 1500;
      setTimeout(() => {
        container.innerHTML = ""; // clear before next
        current = (current + 1) % words.length;
        animateWord(current);
      }, totalDuration);
    }

    animateWord(current);