// AI Bubble Index - Interactive JavaScript

// Update time display
function updateTimeDisplay() {
    const now = new Date();
    const timeStr = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('updateTime').textContent = timeStr;
}

updateTimeDisplay();
setInterval(updateTimeDisplay, 1000);

// Simulated data for the bubble index
const bubbleIndexData = {
    current: 72.4,
    history: generateHistoricalData(),
    components: {
        valuationRatio: 78,
        fundingHeat: 85,
        mediaOptimism: 62,
        marketVolatility: 71
    }
};

function generateHistoricalData() {
    const data = [];
    const now = new Date();
    
    for (let i = 30; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        // Generate realistic bubble index values with some variation
        const baseValue = 65 + Math.sin(i / 5) * 10;
        const noise = (Math.random() - 0.5) * 8;
        const value = Math.max(40, Math.min(95, baseValue + noise));
        
        data.push({
            date: date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }),
            value: Math.round(value * 10) / 10
        });
    }
    
    return data;
}

// Initialize Chart
function initChart() {
    const ctx = document.getElementById('trendChart').getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(0, 245, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(0, 245, 255, 0.0)');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: bubbleIndexData.history.map(d => d.date),
            datasets: [{
                label: 'AI泡沫指数',
                data: bubbleIndexData.history.map(d => d.value),
                borderColor: '#00f5ff',
                backgroundColor: gradient,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#00f5ff',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: '#ff00ff',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 15, 25, 0.9)',
                    titleColor: '#00f5ff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(0, 245, 255, 0.3)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        title: function(context) {
                            return '日期: ' + context[0].label;
                        },
                        label: function(context) {
                            return '泡沫指数: ' + context.raw;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        font: {
                            size: 11
                        },
                        maxRotation: 0
                    }
                },
                y: {
                    min: 40,
                    max: 100,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        font: {
                            size: 11
                        },
                        stepSize: 10
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Time range buttons
document.querySelectorAll('.time-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // In a real application, this would fetch different data ranges
        // For demo, we just update the visual state
        const range = this.dataset.range;
        console.log('Selected time range:', range);
    });
});

// Smooth scroll for navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update active state
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Animate numbers on scroll
function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easeProgress;
        
        element.textContent = current.toFixed(1);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate stat values
            if (entry.target.classList.contains('stat-card')) {
                const valueEl = entry.target.querySelector('.stat-value');
                if (valueEl && !valueEl.dataset.animated) {
                    valueEl.dataset.animated = 'true';
                    // Keep the original display value
                }
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.stat-card, .data-card, .step, .alert-item').forEach(el => {
    observer.observe(el);
});

// Initialize chart when page loads
document.addEventListener('DOMContentLoaded', function() {
    initChart();
    
    // Add initial animation to main index
    const mainIndexEl = document.querySelector('.value-number');
    if (mainIndexEl) {
        animateValue(mainIndexEl, 0, 72.4, 2000);
    }
});

// Parallax effect for hero glow
document.addEventListener('mousemove', function(e) {
    const glow = document.querySelector('.hero-glow');
    if (glow) {
        const x = (e.clientX / window.innerWidth - 0.5) * 50;
        const y = (e.clientY / window.innerHeight - 0.5) * 50;
        glow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    }
});

// Dynamic index value simulation (for demo)
function simulateIndexChange() {
    const change = (Math.random() - 0.5) * 0.5;
    bubbleIndexData.current = Math.max(50, Math.min(90, bubbleIndexData.current + change));
    
    const indexEl = document.querySelector('.value-number');
    if (indexEl) {
        indexEl.textContent = bubbleIndexData.current.toFixed(1);
    }
    
    // Update status based on value
    const statusIndicator = document.querySelector('.status-indicator');
    const statusText = document.querySelector('.status-text');
    
    if (bubbleIndexData.current > 75) {
        statusIndicator.className = 'status-indicator high';
        statusText.textContent = '高风险区域';
        statusText.style.color = '#ff4757';
    } else if (bubbleIndexData.current > 60) {
        statusIndicator.className = 'status-indicator medium';
        statusText.textContent = '中等风险';
        statusText.style.color = '#ffa502';
    } else {
        statusIndicator.className = 'status-indicator low';
        statusText.textContent = '低风险区域';
        statusText.style.color = '#2ed573';
    }
}

// Update index every 5 seconds for demo
setInterval(simulateIndexChange, 5000);

// Console welcome message
console.log('%c AI Bubble Index System ', 'background: linear-gradient(135deg, #00f5ff, #ff00ff); color: #fff; font-size: 20px; padding: 10px;');
console.log('%c 实时监控AI行业估值泡沫风险 ', 'color: #00f5ff; font-size: 14px;');