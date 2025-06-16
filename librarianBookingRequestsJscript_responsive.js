// Merged JavaScript for LibraNet Booking Requests - Mobile Responsive
document.addEventListener('DOMContentLoaded', function() {
    const bookingRequestsBtn = document.getElementById("booking-requests");
    // Sample data for booking requests
    const bookingRequests = [
        { id: 1, studentName: "Bashayer Faraj", studentId: "23000123", requestType: "Meeting Room", requestedDate: "24/May/2025", submittedOn: "22/May/2025", state: "Pending", roomNumber: "203", capacity: "6 Students", timeSlot: "10:15 AM - 1:15 PM", reason: "Preparation for group project presentation" },
        { id: 2, studentName: "Fatima Majid", studentId: "23000501", requestType: "Book", requestedDate: "19/May/2025", submittedOn: "18/May/2025", state: "Accepted" },
        { id: 3, studentName: "Nada Ibrahim", studentId: "23000141", requestType: "Book", requestedDate: "14/May/2025", submittedOn: "13/May/2025", state: "Pending" },
        { id: 4, studentName: "Leen Hassan", studentId: "23000150", requestType: "Meeting Room", requestedDate: "13/May/2025", submittedOn: "12/May/2025", state: "Pending", roomNumber: "204", capacity: "4 Students", timeSlot: "1:30 PM - 4:30 PM", reason: "Study group meeting" },
        { id: 5, studentName: "Yusuf Kamal", studentId: "23000292", requestType: "Book", requestedDate: "13/May/2025", submittedOn: "12/May/2025", state: "Accepted" },
        { id: 6, studentName: "Olivia Carter", studentId: "23000861", requestType: "Book", requestedDate: "13/May/2025", submittedOn: "12/May/2025", state: "Pending" },
        { id: 7, studentName: "Fayza Ali", studentId: "23000571", requestType: "Book", requestedDate: "12/May/2025", submittedOn: "10/May/2025", state: "Rejected" },
        { id: 8, studentName: "Sultan Ahmad", studentId: "23000214", requestType: "Meeting Room", requestedDate: "11/May/2025", submittedOn: "10/May/2025", state: "Pending", roomNumber: "201", capacity: "8 Students", timeSlot: "9:00 AM - 12:00 PM", reason: "Project discussion" },
        { id: 9, studentName: "Aghiad Murad", studentId: "23000321", requestType: "Book", requestedDate: "11/May/2025", submittedOn: "10/May/2025", state: "Accepted" },
        { id: 10, studentName: "Haya Salem", studentId: "23000354", requestType: "Book", requestedDate: "11/May/2025", submittedOn: "10/May/2025", state: "Pending" },
        { id: 11, studentName: "Lily Thompson", studentId: "23000601", requestType: "Book", requestedDate: "11/May/2025", submittedOn: "9/May/2025", state: "Pending" },
        { id: 12, studentName: "Ethan Scott", studentId: "23000283", requestType: "Book", requestedDate: "11/May/2025", submittedOn: "9/May/2025", state: "Pending" },
        { id: 13, studentName: "Kareem Essa", studentId: "23000554", requestType: "Meeting Room", requestedDate: "10/May/2025", submittedOn: "9/May/2025", state: "Pending", roomNumber: "202", capacity: "5 Students", timeSlot: "4:00 PM - 7:00 PM", reason: "Team brainstorming" },
    ];

    // Sample notification data
    let notifications = [
        { 
            id: 1,
            message: "Meeting room 203 scheduled for maintenance on 23/May/2025 from 10:00 AM - 2:00 PM",
            action: "viewRequest",
            requestId: 1,
            read: false,
            completed: false
        },
        { 
            id: 2,
            message: "Room booking from Sara – Room 201",
            action: "viewRequest",
            requestId: 8,
            read: false,
            completed: false
        },
        { 
            id: 3,
            message: "Meeting room 204 scheduled for maintenance on 25/May/2025 from 9:00 AM - 1:00 PM",
            action: "viewRequest",
            requestId: 4,
            read: false,
            completed: false
        }
    ];

    // Available time slots
    const availableTimeSlots = {
        "24/May/2025": ["10:15 AM - 1:15 PM", "4:45 PM - 7:45 PM"],
        "26/May/2025": ["7:00 AM - 10:00 AM", "10:15 AM - 1:15 PM"],
        "27/May/2025": ["7:00 AM - 10:00 AM", "10:15 AM - 1:15 PM", "1:30 PM - 4:30 PM"]
    };

    // State management
    const selectedFilters = {
        type: [],
        state: []
    };
    let currentSort = 'Newest';
    let searchQuery = '';
    let currentMobilePage = 1;
    const rowsPerMobilePage = 11;
    let unreadNotifications = notifications.filter(n => !n.read).length;

    // Check URL parameters to show breadcrumb
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('from') && urlParams.get('from') === 'suggestion') {
        const breadcrumb = document.getElementById('breadcrumb');
        if (breadcrumb) breadcrumb.classList.remove('hidden');
    }

    // Initialize the application
    function init() {
        setupMobileMenu();
        setupNotificationDropdown();
        setupDropdowns();
        setupSearch();
        setupFilters();
        updateTable();
        updateNotificationCounter();
        populateInitialData();
    }

    // Mobile menu functionality
    function setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const sidebarMobile = document.getElementById('sidebar-mobile');
        const mobileOverlay = document.getElementById('mobile-overlay');
        
        if (hamburger && sidebarMobile && mobileOverlay) {
            hamburger.addEventListener('click', function(e) {
                e.stopPropagation();
                sidebarMobile.classList.toggle('open');
                mobileOverlay.classList.toggle('active');
                document.body.style.overflow = sidebarMobile.classList.contains('open') ? 'hidden' : '';
            });
            
            mobileOverlay.addEventListener('click', function() {
                sidebarMobile.classList.remove('open');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            // Close mobile menu when clicking menu items
            document.querySelectorAll('.menu-item').forEach(item => {
                item.addEventListener('click', function() {
                    if (window.innerWidth <= 768) {
                        sidebarMobile.classList.remove('open');
                        mobileOverlay.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                });
            });
            
            // Handle window resize
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768) {
                    sidebarMobile.classList.remove('open');
                    mobileOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    }

    // Notification dropdown functionality
    function setupNotificationDropdown() {
        const notifToggle = document.getElementById('notification-toggle');
        const notifToggleMobile = document.getElementById('notification-toggle-mobile');
        const notifDropdown = document.getElementById('notification-dropdown');
        
        function toggleNotifications(e) {
            e.stopPropagation();
            if (notifDropdown) {
                notifDropdown.style.display = notifDropdown.style.display === 'block' ? 'none' : 'block';
                renderNotifications();
            }
        }
        
        if (notifToggle) notifToggle.addEventListener('click', toggleNotifications);
        if (notifToggleMobile) notifToggleMobile.addEventListener('click', toggleNotifications);

        // Close dropdowns when clicking outside
        document.addEventListener('click', function() {
            if (notifDropdown) notifDropdown.style.display = 'none';
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
            });
        });
    }

    // Render notifications in dropdown
    function renderNotifications() {
        const notifDropdown = document.getElementById('notification-dropdown');
        if (!notifDropdown) return;
        
        notifDropdown.innerHTML = '';
        
        // Filter out completed notifications
        const activeNotifications = notifications.filter(notification => !notification.completed);
        
        if (activeNotifications.length === 0) {
            const emptyMsg = document.createElement('div');
            emptyMsg.className = 'notification-item';
            emptyMsg.textContent = 'No new notifications';
            notifDropdown.appendChild(emptyMsg);
        } else {
            activeNotifications.forEach(notification => {
                const notifItem = document.createElement('div');
                notifItem.className = `notification-item ${notification.read ? '' : 'unread'}`;
                notifItem.innerHTML = `
                    • ${notification.message}<br>
                    <a href="#" class="text-blue-600 underline" data-notification-id="${notification.id}">View</a>
                `;
                notifItem.addEventListener('click', function(e) {
                    if (e.target.tagName === 'A') return;
                    markNotificationAsRead(notification.id);
                    handleNotificationAction(notification);
                });
                
                const viewLink = notifItem.querySelector('a');
                viewLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    markNotificationAsRead(notification.id);
                    handleNotificationAction(notification);
                });
                
                notifDropdown.appendChild(notifItem);
            });
        }
        
        // Add See All button
        const seeAllBtn = document.createElement('div');
        seeAllBtn.className = 'notification-footer';
        seeAllBtn.innerHTML = '<a href="#" class="text-[#554b8e] underline font-medium">See All Requests &gt;</a>';
        seeAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Reset filters to show all requests
            selectedFilters.type = [];
            selectedFilters.state = [];
            updateFilterChips();
            updateTable();
            notifDropdown.style.display = 'none';
        });
        notifDropdown.appendChild(seeAllBtn);
    }

    // Mark notification as read
    function markNotificationAsRead(notificationId) {
        const notification = notifications.find(n => n.id === notificationId);
        if (notification && !notification.read) {
            notification.read = true;
            unreadNotifications = notifications.filter(n => !n.read).length;
            updateNotificationCounter();
        }
    }

    // Mark notification as completed
    function completeNotification(notificationId) {
        const notification = notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.completed = true;
            unreadNotifications = notifications.filter(n => !n.read).length;
            updateNotificationCounter();
            renderNotifications();
        }
    }

    // Update notification counter
    function updateNotificationCounter() {
        const counter = document.getElementById('notification-counter');
        const counterMobile = document.getElementById('notification-counter-mobile');
        
        [counter, counterMobile].forEach(el => {
            if (el) {
                if (unreadNotifications > 0) {
                    el.textContent = unreadNotifications;
                    el.style.display = 'flex';
                } else {
                    el.style.display = 'none';
                }
            }
        });
    }

    // Handle notification action
    function handleNotificationAction(notification) {
        if (notification.action === 'viewRequest') {
            const request = bookingRequestsBtn.find(r => r.id === notification.requestId);
            if (request) {
                showRequestDetails(request, notification.id);
            }
        }
        const notifDropdown = document.getElementById('notification-dropdown');
        if (notifDropdown) notifDropdown.style.display = 'none';
    }

    // Setup all dropdowns
    function setupDropdowns() {
        const setupDropdown = (buttonId, menuId) => {
            const button = document.getElementById(buttonId);
            const menu = document.getElementById(menuId);
            
            if (button && menu) {
                button.addEventListener('click', function(e) {
                    e.stopPropagation();
                    // Close other dropdowns
                    document.querySelectorAll('.dropdown-menu').forEach(m => {
                        if (m !== menu) m.style.display = 'none';
                    });
                    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                });
            }
        };

        // Initialize dropdowns
        setupDropdown('type-button', 'type-menu');
        setupDropdown('state-button', 'state-menu');
        setupDropdown('sort-button', 'sort-menu');
        setupDropdown('mobile-sort-button', 'mobile-sort-menu');

        // Handle dropdown option clicks
        document.querySelectorAll('.dropdown-option').forEach(option => {
            option.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                const menuId = this.closest('.dropdown-menu').id;
                
                if (menuId === 'type-menu') {
                    if (selectedFilters.type.includes(value)) {
                        selectedFilters.type = selectedFilters.type.filter(t => t !== value);
                    } else {
                        selectedFilters.type.push(value);
                    }
                } else if (menuId === 'state-menu') {
                    if (selectedFilters.state.includes(value)) {
                        selectedFilters.state = selectedFilters.state.filter(s => s !== value);
                    } else {
                        selectedFilters.state.push(value);
                    }
                } else if (menuId === 'sort-menu' || menuId === 'mobile-sort-menu') {
                    currentSort = value;
                    const sortLabel = document.getElementById('sort-label');
                    const mobileSortLabel = document.getElementById('mobile-sort-label');
                    if (sortLabel) sortLabel.textContent = value;
                    if (mobileSortLabel) mobileSortLabel.textContent = value;
                }
                
                updateFilterChips();
                updateTable();
                
                // Close dropdown
                this.closest('.dropdown-menu').style.display = 'none';
            });
        });
    }

    // Setup search functionality
    function setupSearch() {
        const desktopSearch = document.getElementById('desktop-search-input');
        const mobileSearch = document.getElementById('mobile-search-input');
        
        function handleSearch(e) {
            searchQuery = e.target.value;
            updateTable();
        }
        
        if (desktopSearch) {
            desktopSearch.addEventListener('input', handleSearch);
        }
        
        if (mobileSearch) {
            mobileSearch.addEventListener('input', handleSearch);
        }
    }

    // Setup mobile filters
    function setupFilters() {
        const mobileFilterToggle = document.getElementById('mobile-filter-toggle');
        const mobileFilterPanel = document.getElementById('mobile-filter-panel');
        const applyFiltersBtn = document.getElementById('apply-mobile-filters');
        const clearFiltersBtn = document.getElementById('clear-mobile-filters');
        
        if (mobileFilterToggle && mobileFilterPanel) {
            mobileFilterToggle.addEventListener('click', function() {
                mobileFilterPanel.classList.toggle('hidden');
            });
        }
        
        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', function() {
                // Get selected mobile filters
                selectedFilters.type = [];
                selectedFilters.state = [];
                
                document.querySelectorAll('.mobile-filter-type:checked').forEach(checkbox => {
                    selectedFilters.type.push(checkbox.value);
                });
                
                document.querySelectorAll('.mobile-filter-state:checked').forEach(checkbox => {
                    selectedFilters.state.push(checkbox.value);
                });
                
                updateFilterChips();
                updateTable();
                if (mobileFilterPanel) mobileFilterPanel.classList.add('hidden');
            });
        }
        
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', function() {
                selectedFilters.type = [];
                selectedFilters.state = [];
                
                document.querySelectorAll('.mobile-filter-type').forEach(checkbox => {
                    checkbox.checked = false;
                });
                
                document.querySelectorAll('.mobile-filter-state').forEach(checkbox => {
                    checkbox.checked = false;
                });
                
                updateFilterChips();
                updateTable();
                if (mobileFilterPanel) mobileFilterPanel.classList.add('hidden');
            });
        }
    }

    // Filter chips functionality
    function updateFilterChips() {
        const filterChips = document.getElementById('filter-chips');
        if (!filterChips) return;
        
        filterChips.innerHTML = '';
        
        selectedFilters.type.forEach(type => {
            const chip = document.createElement('div');
            chip.className = 'filter-chip';
            chip.innerHTML = `
                ${type}
                <button onclick="removeFilter('type', '${type}')">
                    <i class="fas fa-times text-xs"></i>
                </button>
            `;
            filterChips.appendChild(chip);
        });
        
        selectedFilters.state.forEach(state => {
            const chip = document.createElement('div');
            chip.className = 'filter-chip';
            chip.innerHTML = `
                ${state}
                <button onclick="removeFilter('state', '${state}')">
                    <i class="fas fa-times text-xs"></i>
                </button>
            `;
            filterChips.appendChild(chip);
        });
        
        // Add clear all button if any filters are active
        if (selectedFilters.type.length > 0 || selectedFilters.state.length > 0) {
            const clearAll = document.createElement('button');
            clearAll.className = 'text-blue-600 underline text-sm ml-2';
            clearAll.textContent = 'Clear All';
            clearAll.onclick = () => {
                selectedFilters.type = [];
                selectedFilters.state = [];
                updateFilterChips();
                updateTable();
            };
            filterChips.appendChild(clearAll);
        }
    }
    
    // Add removeFilter to window for button onclick
    window.removeFilter = function(filterType, value) {
        if (filterType === 'type') {
            selectedFilters.type = selectedFilters.type.filter(t => t !== value);
        } else if (filterType === 'state') {
            selectedFilters.state = selectedFilters.state.filter(s => s !== value);
        }
        updateFilterChips();
        updateTable();
    };

    // Parse date string to Date object for sorting
    function parseDate(dateString) {
        const parts = dateString.split('/');
        if (parts.length === 3) {
            const day = parseInt(parts[0]);
            const monthNames = {
                'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
                'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
            };
            const month = monthNames[parts[1]] || 0;
            const year = parseInt(parts[2]);
            return new Date(year, month, day);
        }
        return new Date(dateString);
    }

    // Filter and sort table data
    function updateTable() {
        let filteredRequests = [...bookingRequests];

        // Apply type filters
        if (selectedFilters.type.length > 0) {
            filteredRequests = filteredRequests.filter(request => 
                selectedFilters.type.includes(request.requestType)
            );
        }

        // Apply state filters
        if (selectedFilters.state.length > 0) {
            filteredRequests = filteredRequests.filter(request => 
                selectedFilters.state.includes(request.state)
            );
        }

        // Apply search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            filteredRequests = filteredRequests.filter(request => {
                const searchableText = [
                    request.studentName,
                    request.studentId,
                    request.requestType,
                    request.requestedDate,
                    request.submittedOn,
                    request.state
                ].join(' ').toLowerCase();
                
                return searchableText.includes(query);
            });
        }

        // Apply sorting
        filteredRequests.sort((a, b) => {
            switch (currentSort) {
                case 'Newest':
                    return parseDate(b.submittedOn) - parseDate(a.submittedOn);
                case 'Oldest':
                    return parseDate(a.submittedOn) - parseDate(b.submittedOn);
                case 'Name (A-Z)':
                    return a.studentName.localeCompare(b.studentName);
                default:
                    return 0;
            }
        });

        // Update result counts
        const desktopResultCount = document.getElementById('desktop-result-count');
        const mobileResultCount = document.getElementById('mobile-result-count');
        
        [desktopResultCount, mobileResultCount].forEach(el => {
            if (el) el.textContent = `Showing ${filteredRequests.length} results`;
        });

        // Populate desktop table
        populateDesktopTable(filteredRequests);
        
        // Populate mobile cards
        populateMobileCards(filteredRequests);
    }

    // Populate desktop table
    function populateDesktopTable(requests) {
        const tableBody = document.getElementById('desktop-table-body');
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
        
        requests.forEach(request => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-4 py-3">${request.studentName}</td>
                <td class="px-4 py-3">${request.studentId}</td>
                <td class="px-4 py-3">${request.requestType}</td>
                <td class="px-4 py-3">${request.requestedDate}</td>
                <td class="px-4 py-3">${request.submittedOn}</td>
                <td class="px-4 py-3">
                    <span class="state-${request.state.toLowerCase()}">
                        <i class="fas fa-circle text-xs mr-1"></i> ${request.state}
                    </span>
                </td>
                <td class="px-4 py-3">
                    <a href="#" class="view-link">View ></a>
                </td>
            `;
            
            // Add click handler to the view link
            row.querySelector('.view-link').addEventListener('click', function(e) {
                e.preventDefault();
                showRequestDetails(request);
            });
            
            tableBody.appendChild(row);
        });
    }

    // Populate mobile cards
    function populateMobileCards(requests) {
        const cardsContainer = document.getElementById('mobile-cards-container');
        if (!cardsContainer) return;
        
        cardsContainer.innerHTML = '';
        
        requests.forEach(request => {
            const card = document.createElement('div');
            card.className = `mobile-card ${request.state.toLowerCase()}`;
            card.innerHTML = `
                <div class="card-header">
                    <div>
                        <div class="card-title">${request.studentName}</div>
                        <div class="card-id">ID: ${request.studentId}</div>
                    </div>
                    <div class="card-status ${request.state.toLowerCase()}">
                        <i class="fas fa-circle text-xs"></i>
                        ${request.state}
                    </div>
                </div>
                <div class="card-details">
                    <div class="card-detail">
                        <div class="card-detail-label">Type</div>
                        <div class="card-detail-value">${request.requestType}</div>
                    </div>
                    <div class="card-detail">
                        <div class="card-detail-label">Requested Date</div>
                        <div class="card-detail-value">${request.requestedDate}</div>
                    </div>
                    <div class="card-detail">
                        <div class="card-detail-label">Submitted On</div>
                        <div class="card-detail-value">${request.submittedOn}</div>
                    </div>
                    ${request.timeSlot ? `
                    <div class="card-detail">
                        <div class="card-detail-label">Time Slot</div>
                        <div class="card-detail-value">${request.timeSlot}</div>
                    </div>
                    ` : ''}
                </div>
                <div class="card-actions">
                    <a href="#" class="view-link">View Details ></a>
                </div>
            `;
            
            // Add click handler to the view link
            card.querySelector('.view-link').addEventListener('click', function(e) {
                e.preventDefault();
                showRequestDetails(request);
            });
            
            cardsContainer.appendChild(card);
        });
    }

    // Populate initial data (for demonstration)
    function populateInitialData() {
        updateTable();
    }

    // Show request details modal
    function showRequestDetails(request, notificationId = null) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">Student Request Details</h2>
                    <button class="modal-close close-modal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="request-details-grid">
                    <div><strong>Student Name:</strong> ${request.studentName}</div>
                    <div><strong>Student ID:</strong> ${request.studentId}</div>
                    <div><strong>Request Type:</strong> ${request.requestType}</div>
                    ${request.roomNumber ? `<div><strong>Room Number:</strong> ${request.roomNumber}</div>` : ''}
                    ${request.capacity ? `<div><strong>Capacity Needed:</strong> ${request.capacity}</div>` : ''}
                    <div><strong>Requested Date:</strong> ${request.requestedDate}</div>
                    ${request.timeSlot ? `<div><strong>Time Slot:</strong> ${request.timeSlot}</div>` : ''}
                    <div><strong>Request Reason:</strong> ${request.reason || 'N/A'}</div>
                </div>
                
                <div class="alert-section">
                    <div class="mt-4">
                        <label class="block mb-2">Write a comment (optional)</label>
                        <textarea class="w-full border rounded p-2 message-textarea" rows="3"></textarea>
                    </div>
                    
                    <div class="action-buttons mt-4">
                        <div>
                            <button class="btn btn-reject reject-btn">Reject</button>
                            <button class="btn btn-accept accept-btn ml-2">Accept</button>
                        </div>
                        <button class="btn btn-suggest suggest-btn">
                            Suggest New Time
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        modal.querySelector('.reject-btn').addEventListener('click', () => {
            request.state = 'Rejected';
            updateTable();
            showToast('Request rejected successfully');
            if (notificationId) completeNotification(notificationId);
            modal.remove();
        });

        modal.querySelector('.accept-btn').addEventListener('click', () => {
            request.state = 'Accepted';
            updateTable();
            showToast('Request accepted successfully');
            if (notificationId) completeNotification(notificationId);
            modal.remove();
        });

        modal.querySelector('.suggest-btn').addEventListener('click', () => {
            showSuggestTimeModal(request, notificationId);
            modal.remove();
        });

        document.body.appendChild(modal);
    }

    // Show suggest time modal
    function showSuggestTimeModal(request, notificationId = null) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">Suggest New Time Slots</h2>
                    <button class="modal-close close-modal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="request-details-grid">
                    <div><strong>Student Name:</strong> ${request.studentName}</div>
                    <div><strong>Request Type:</strong> ${request.requestType}</div>
                    <div><strong>Original Date:</strong> ${request.requestedDate}</div>
                    <div><strong>Original Time:</strong> ${request.timeSlot || 'N/A'}</div>
                </div>
                
                <div class="time-slots-container">
                    <h3 class="font-bold mb-2">Available Time Slots:</h3>
                    ${Object.entries(availableTimeSlots).map(([date, slots]) => `
                        <div class="time-slot-day">${date}</div>
                        <div class="time-slot-options">
                            ${slots.map(slot => `
                                <div class="time-slot-option" data-date="${date}" data-slot="${slot}">
                                    ${slot}
                                </div>
                            `).join('')}
                        </div>
                    `).join('')}
                </div>
                
                <div class="message-container">
                    <div class="message-header">
                        <div class="message-field">
                            <label>Subject</label>
                            <input type="text" value="Alternative Time Suggestion for ${request.requestType} Request">
                        </div>
                        <div class="message-field">
                            <label>To</label>
                            <input type="text" value="${request.studentName} (${request.studentId})">
                        </div>
                    </div>
                    <label class="block mb-2">Message</label>
                    <textarea class="message-textarea" placeholder="Dear ${request.studentName}, we have reviewed your request and would like to suggest alternative time slots..."></textarea>
                </div>
                
                <div class="action-buttons">
                    <button class="btn btn-cancel cancel-btn">Cancel</button>
                    <button class="btn btn-send send-btn">Send Suggestion</button>
                </div>
            </div>
        `;

        // Add event listeners
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });

        modal.querySelector('.cancel-btn').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Time slot selection
        modal.querySelectorAll('.time-slot-option').forEach(option => {
            option.addEventListener('click', function() {
                modal.querySelectorAll('.time-slot-option').forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
            });
        });

        modal.querySelector('.send-btn').addEventListener('click', () => {
            const selectedSlot = modal.querySelector('.time-slot-option.selected');
            if (selectedSlot) {
                showToast('Time suggestion sent successfully');
                if (notificationId) completeNotification(notificationId);
                modal.remove();
            } else {
                alert('Please select a time slot before sending the suggestion.');
            }
        });

        document.body.appendChild(modal);
    }

    // Show toast notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('toast-fadeout');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // Initialize the application
    init();

    // Redirect to libranet3.html when "Booking Requests" is clicked
  bookingRequestsBtn.addEventListener("click", function () {
    window.location.href = "librarianDashboard_responsive.html";
  });
  
});





