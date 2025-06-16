document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  
  // Initialize chart
  let myChart;
  const initChart = () => {
    const ctx = document.getElementById('myChart').getContext('2d');
    
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'New Students',
            data: [10, 20, 30, 25, 40, 35],
            borderColor: '#FFFFFF',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            pointBackgroundColor: '#FFFFFF',
            pointBorderColor: '#FFFFFF',
            fill: true,
            tension: 0.4
          },
          {
            label: 'Books Borrowed',
            data: [50, 60, 80, 65, 90, 100],
            borderColor: '#EAE0D5',
            backgroundColor: 'rgba(234, 224, 213, 0.3)',
            pointBackgroundColor: '#EAE0D5',
            pointBorderColor: '#EAE0D5',
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#FFFFFF',
              font: {
                size: 12
              },
              padding: 10
            }
          }
        },
        scales: {
          x: {
            ticks: { 
              color: '#FFFFFF',
              font: {
                size: 10
              }
            },
            grid: { 
              color: 'rgba(255,255,255,0.1)',
              drawBorder: false
            }
          },
          y: {
            ticks: { 
              color: '#FFFFFF',
              font: {
                size: 10
              }
            },
            grid: { 
              color: 'rgba(255,255,255,0.1)',
              drawBorder: false
            }
          }
        }
      }
    });
  };

  // Initialize chart
  myChart = initChart();

  // Responsive chart handling
  const chartContainer = document.querySelector('.chart-container');
  if (chartContainer) {
    new ResizeObserver(() => {
      myChart.resize();
    }).observe(chartContainer);
  }

  // Mobile menu toggle
  mobileMenuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.toggle('mobile-visible');
    mobileMenuToggle.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (window.innerWidth < 768 && 
        !e.target.closest('.sidebar') && 
        !e.target.closest('.mobile-menu-toggle')) {
      sidebar.classList.remove('mobile-visible');
      mobileMenuToggle.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });

  // Sidebar navigation
  const sidebarItems = document.querySelectorAll('.sidebar ul li:not(.submenu-toggle)');
  const submenuToggle = document.querySelector('.submenu-toggle');
  const submenu = document.querySelector('.submenu');

  function clearActiveSidebar() {
    sidebarItems.forEach(item => item.classList.remove('active'));
  }

  // Submenu toggle
  submenuToggle?.addEventListener('click', function(e) {
    e.stopPropagation();
    submenu.classList.toggle('show');
    submenuToggle.classList.toggle('active');
  });

  // Close submenu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.submenu-toggle') && !e.target.closest('.submenu')) {
      submenu?.classList.remove('show');
      submenuToggle?.classList.remove('active');
    }
  });

  sidebarItems.forEach(item => {
    item.addEventListener('click', function() {
      if (window.innerWidth < 768) {
        sidebar.classList.remove('mobile-visible');
        mobileMenuToggle.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
      clearActiveSidebar();
      this.classList.add('active');
    });
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      sidebar.classList.remove('mobile-visible');
      mobileMenuToggle.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });
});