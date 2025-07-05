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

        // View toggle functionality
        const viewToggleButtons = document.querySelectorAll('.view-toggle button');
        const eventsGridView = document.getElementById('events-grid-view');
        const eventsListView = document.getElementById('events-list-view');
        
        viewToggleButtons.forEach(button => {
            button.addEventListener('click', function() {
                viewToggleButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                if (this.dataset.view === 'grid') {
                    eventsGridView.classList.add('active');
                    eventsListView.classList.remove('active');
                } else {
                    eventsGridView.classList.remove('active');
                    eventsListView.classList.add('active');
                }
            });
        });

        // Event filtering functionality
        const categoryFilter = document.getElementById('event-category');
        const dateFilter = document.getElementById('event-date');
        const locationFilter = document.getElementById('event-location');
        const eventCards = document.querySelectorAll('.event-card, .event-card-list');
        
        function filterEvents() {
            const categoryValue = categoryFilter.value;
            const dateValue = dateFilter.value;
            const locationValue = locationFilter.value;
            
            eventCards.forEach(card => {
                const cardCategory = card.dataset.category;
                const cardDate = card.dataset.date;
                const cardLocation = card.dataset.location;
                
                const categoryMatch = categoryValue === 'all' || cardCategory === categoryValue;
                const dateMatch = dateValue === 'all' || cardDate === dateValue;
                const locationMatch = locationValue === 'all' || cardLocation === locationValue;
                
                if (categoryMatch && dateMatch && locationMatch) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }
        
        categoryFilter.addEventListener('change', filterEvents);
        dateFilter.addEventListener('change', filterEvents);
        locationFilter.addEventListener('change', filterEvents);

        // Calendar functionality
        function generateCalendar(year, month) {
            const calendarDays = document.getElementById('calendar-days');
            calendarDays.innerHTML = '';
            
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const daysInPrevMonth = new Date(year, month, 0).getDate();
            
            // Previous month days
            for (let i = firstDay - 1; i >= 0; i--) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day other-month';
                dayElement.textContent = daysInPrevMonth - i;
                calendarDays.appendChild(dayElement);
            }
            
            // Current month days
            const eventDates = [15, 22, 30]; // Dates with events
            const today = new Date();
            
            for (let i = 1; i <= daysInMonth; i++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.textContent = i;
                
                if (eventDates.includes(i)) {
                    dayElement.classList.add('event');
                }
                
                if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                    dayElement.classList.add('today');
                }
                
                calendarDays.appendChild(dayElement);
            }
            
            // Next month days
            const totalCells = firstDay + daysInMonth;
            const remainingCells = 42 - totalCells; // 6 rows x 7 days
            
            for (let i = 1; i <= remainingCells; i++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day other-month';
                dayElement.textContent = i;
                calendarDays.appendChild(dayElement);
            }
        }
        
        // Initialize calendar
        const currentDate = new Date();
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
        
        // Calendar navigation
        document.getElementById('prev-month').addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            document.querySelector('.calendar-header h3').textContent = 
                new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentDate);
            generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
        });
        
        document.getElementById('next-month').addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            document.querySelector('.calendar-header h3').textContent = 
                new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentDate);
            generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
        });