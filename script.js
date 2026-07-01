// AI Bubble Index - Interactive JavaScript with Multi-language Support

// Current language
let currentLang = 'zh';
let trendChart = null;

// Language translations
const translations = {
    zh: {
        chartLabel: 'AI泡沫指数',
        tooltipDate: '日期: ',
        tooltipValue: '泡沫指数: ',
        statusHigh: '高风险区域',
        statusMedium: '中等风险',
        statusLow: '低风险区域',
        consoleMessage: '实时监控AI行业估值泡沫风险',
        riskCritical: '极高风险',
        riskHigh: '高风险',
        riskMedium: '中等风险',
        bubbleChartX: '预估营收 (亿美元)',
        bubbleChartY: '估值 (亿美元)',
        bubbleChartSize: '泡沫评分',
        sectorLabels: {
            'LLM': '大模型',
            'Infra': 'AI基础设施',
            'Robotics': '机器人',
            'Vision': '计算机视觉',
            'Voice': '语音AI',
            'Search': 'AI搜索',
            'Video': 'AI视频',
            'Coding': 'AI编程',
            'Enterprise': '企业AI',
            'Chip': 'AI芯片',
            'Data': '数据平台',
            'Safety': 'AI安全'
        }
    },
    en: {
        chartLabel: 'AI Bubble Index',
        tooltipDate: 'Date: ',
        tooltipValue: 'Bubble Index: ',
        statusHigh: 'High Risk Zone',
        statusMedium: 'Medium Risk',
        statusLow: 'Low Risk Zone',
        consoleMessage: 'Real-time monitoring of AI industry valuation bubble risk',
        riskCritical: 'Critical',
        riskHigh: 'High',
        riskMedium: 'Medium',
        bubbleChartX: 'Est. Revenue ($B)',
        bubbleChartY: 'Valuation ($B)',
        bubbleChartSize: 'Bubble Score',
        sectorLabels: {
            'LLM': 'LLM',
            'Infra': 'AI Infra',
            'Robotics': 'Robotics',
            'Vision': 'Computer Vision',
            'Voice': 'Voice AI',
            'Search': 'AI Search',
            'Video': 'AI Video',
            'Coding': 'AI Coding',
            'Enterprise': 'Enterprise AI',
            'Chip': 'AI Chip',
            'Data': 'Data Platform',
            'Safety': 'AI Safety'
        }
    }
};

// Switch language function
function switchLanguage(lang) {
    currentLang = lang;
    
    // Update all elements with data-zh and data-en attributes
    document.querySelectorAll('[data-zh]').forEach(el => {
        if (el.hasAttribute('data-en')) {
            el.textContent = el.getAttribute(`data-${lang}`);
        }
    });
    
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Update document language attribute
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    
    // Update time display format
    updateTimeDisplay();
    
    // Update chart if exists
    if (trendChart) {
        updateChartLanguage();
    }
    
    // Update status text based on current risk level
    updateStatusText();
}

// Update status text based on current language and risk level
function updateStatusText() {
    const statusText = document.querySelector('.status-text');
    const statusIndicator = document.querySelector('.status-indicator');
    
    if (!statusText || !statusIndicator) return;
    
    const isHigh = statusIndicator.classList.contains('high');
    const isMedium = statusIndicator.classList.contains('medium');
    const isLow = statusIndicator.classList.contains('low');
    
    if (isHigh) {
        statusText.textContent = translations[currentLang].statusHigh;
        statusText.style.color = '#ff4757';
    } else if (isMedium) {
        statusText.textContent = translations[currentLang].statusMedium;
        statusText.style.color = '#ffa502';
    } else if (isLow) {
        statusText.textContent = translations[currentLang].statusLow;
        statusText.style.color = '#2ed573';
    }
}

// Update chart language
function updateChartLanguage() {
    if (!trendChart) return;
    
    const t = translations[currentLang];
    
    trendChart.data.datasets[0].label = t.chartLabel;
    trendChart.options.plugins.tooltip.callbacks.title = function(context) {
        return t.tooltipDate + context[0].label;
    };
    trendChart.options.plugins.tooltip.callbacks.label = function(context) {
        return t.tooltipValue + context.raw;
    };
    
    trendChart.update();
    
    // Also re-render companies table and bubble chart
    renderCompaniesTable(currentFilter);
    if (bubbleChart) {
        updateBubbleChartLanguage();
    }
}

// ===== Bubble Companies Data =====
let bubbleChart = null;
let currentFilter = 'all';

const companiesData = [
    { name: 'OpenAI', sector: 'LLM', valuation: 860, revenue: 6.5, score: 95, risk: 'critical', color: '#10a37f' },
    { name: 'xAI', sector: 'LLM', valuation: 500, revenue: 1.0, score: 92, risk: 'critical', color: '#1d9bf0' },
    { name: 'Anthropic', sector: 'LLM', valuation: 400, revenue: 4.0, score: 88, risk: 'critical', color: '#d97757' },
    { name: 'Perplexity', sector: 'Search', valuation: 90, revenue: 0.08, score: 85, risk: 'critical', color: '#20b8cd' },
    { name: 'Mistral AI', sector: 'LLM', valuation: 65, revenue: 0.03, score: 83, risk: 'critical', color: '#fa520f' },
    { name: 'Cohere', sector: 'LLM', valuation: 55, revenue: 0.05, score: 78, risk: 'high', color: '#39594d' },
    { name: 'Figure', sector: 'Robotics', valuation: 26, revenue: 0.01, score: 76, risk: 'high', color: '#1a1a2e' },
    { name: 'Glean', sector: 'Enterprise', valuation: 46, revenue: 0.15, score: 74, risk: 'high', color: '#7c3aed' },
    { name: 'Runway', sector: 'Video', valuation: 30, revenue: 0.05, score: 72, risk: 'high', color: '#000000' },
    { name: 'Adept', sector: 'Enterprise', valuation: 10, revenue: 0.02, score: 70, risk: 'high', color: '#6366f1' },
    { name: 'Inflection AI', sector: 'LLM', valuation: 40, revenue: 0.01, score: 69, risk: 'high', color: '#ff6b6b' },
    { name: 'Scale AI', sector: 'Data', valuation: 140, revenue: 5.0, score: 68, risk: 'high', color: '#8b5cf6' },
    { name: 'Replit', sector: 'Coding', valuation: 12, revenue: 0.03, score: 65, risk: 'high', color: '#f26207' },
    { name: 'ElevenLabs', sector: 'Voice', valuation: 33, revenue: 0.08, score: 63, risk: 'medium', color: '#000000' },
    { name: 'Pika', sector: 'Video', valuation: 5, revenue: 0.01, score: 60, risk: 'medium', color: '#6c2bd9' },
    { name: 'Harvey', sector: 'Enterprise', valuation: 36, revenue: 0.1, score: 58, risk: 'medium', color: '#4f46e5' },
    { name: 'Poolside', sector: 'Coding', valuation: 28, revenue: 0.005, score: 55, risk: 'medium', color: '#0ea5e9' },
    { name: 'Anysphere', sector: 'Coding', valuation: 25, revenue: 0.04, score: 52, risk: 'medium', color: '#f59e0b' }
];

// Render companies table
function renderCompaniesTable(filter) {
    const tbody = document.getElementById('companiesTableBody');
    if (!tbody) return;
    
    const t = translations[currentLang];
    const filtered = filter === 'all' ? companiesData : companiesData.filter(c => c.risk === filter);
    
    tbody.innerHTML = filtered.map(company => {
        const psRatio = company.revenue > 0 ? (company.valuation / company.revenue).toFixed(0) : 'N/A';
        const psClass = psRatio > 80 ? 'extreme' : psRatio > 40 ? 'high' : 'moderate';
        const riskText = company.risk === 'critical' ? t.riskCritical : company.risk === 'high' ? t.riskHigh : t.riskMedium;
        const sectorText = t.sectorLabels[company.sector] || company.sector;
        const revenueStr = company.revenue < 0.1 ? (company.revenue * 1000).toFixed(0) + 'M' : '$' + company.revenue.toFixed(1) + 'B';
        const valuationStr = '$' + company.valuation + 'B';
        const initials = company.name.substring(0, 2).toUpperCase();
        
        return `
            <tr data-risk="${company.risk}">
                <td>
                    <div class="company-name">
                        <div class="company-logo" style="background: ${company.color}">${initials}</div>
                        <span class="company-name-text">${company.name}</span>
                    </div>
                </td>
                <td><span class="sector-tag">${sectorText}</span></td>
                <td class="valuation-cell">${valuationStr}</td>
                <td>${revenueStr}</td>
                <td><span class="ps-ratio ${psClass}">${psRatio}x</span></td>
                <td>
                    <div class="bubble-score-cell">
                        <div class="bubble-score-bar">
                            <div class="bubble-score-fill ${company.risk}" style="width: ${company.score}%"></div>
                        </div>
                        <span class="bubble-score-num" style="color: ${company.risk === 'critical' ? '#ff4757' : company.risk === 'high' ? '#ffa502' : '#2ed573'}">${company.score}</span>
                    </div>
                </td>
                <td><span class="risk-badge ${company.risk}">${riskText}</span></td>
            </tr>
        `;
    }).join('');
    
    // Animate score bars
    setTimeout(() => {
        document.querySelectorAll('.bubble-score-fill').forEach(fill => {
            fill.style.width = fill.style.width;
        });
    }, 100);
}

// Update summary counts
function updateSummaryCounts() {
    const critical = companiesData.filter(c => c.risk === 'critical').length;
    const high = companiesData.filter(c => c.risk === 'high').length;
    const medium = companiesData.filter(c => c.risk === 'medium').length;
    const total = companiesData.length;
    
    const criticalEl = document.getElementById('criticalCount');
    const highEl = document.getElementById('highCount');
    const mediumEl = document.getElementById('mediumCount');
    const totalEl = document.getElementById('totalCount');
    
    if (criticalEl) criticalEl.textContent = critical;
    if (highEl) highEl.textContent = high;
    if (mediumEl) mediumEl.textContent = medium;
    if (totalEl) totalEl.textContent = total;
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentFilter = this.dataset.filter;
        renderCompaniesTable(currentFilter);
    });
});

// Initialize bubble chart
function initBubbleChart() {
    const ctx = document.getElementById('bubbleChart');
    if (!ctx) return;
    
    const t = translations[currentLang];
    
    const criticalData = companiesData.filter(c => c.risk === 'critical').map(c => ({
        x: c.revenue, y: c.valuation, r: Math.sqrt(c.score) * 2, company: c.name
    }));
    const highData = companiesData.filter(c => c.risk === 'high').map(c => ({
        x: c.revenue, y: c.valuation, r: Math.sqrt(c.score) * 2, company: c.name
    }));
    const mediumData = companiesData.filter(c => c.risk === 'medium').map(c => ({
        x: c.revenue, y: c.valuation, r: Math.sqrt(c.score) * 2, company: c.name
    }));
    
    bubbleChart = new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [
                {
                    label: t.riskCritical,
                    data: criticalData,
                    backgroundColor: 'rgba(255, 71, 87, 0.6)',
                    borderColor: '#ff4757',
                    borderWidth: 2
                },
                {
                    label: t.riskHigh,
                    data: highData,
                    backgroundColor: 'rgba(255, 165, 2, 0.6)',
                    borderColor: '#ffa502',
                    borderWidth: 2
                },
                {
                    label: t.riskMedium,
                    data: mediumData,
                    backgroundColor: 'rgba(46, 213, 115, 0.6)',
                    borderColor: '#2ed573',
                    borderWidth: 2
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
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: { size: 12 },
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 15, 25, 0.9)',
                    titleColor: '#00f5ff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(0, 245, 255, 0.3)',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        title: function(context) {
                            return context[0].raw.company;
                        },
                        label: function(context) {
                            const t = translations[currentLang];
                            return [
                                t.bubbleChartY + ': $' + context.raw.y + 'B',
                                t.bubbleChartX + ': $' + context.raw.x + 'B',
                                t.bubbleChartSize + ': ' + companiesData.find(c => c.name === context.raw.company).score
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: t.bubbleChartX,
                        color: 'rgba(255, 255, 255, 0.5)',
                        font: { size: 12 }
                    },
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        font: { size: 11 },
                        callback: function(value) { return '$' + value + 'B'; }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: t.bubbleChartY,
                        color: 'rgba(255, 255, 255, 0.5)',
                        font: { size: 12 }
                    },
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        font: { size: 11 },
                        callback: function(value) { return '$' + value + 'B'; }
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Update bubble chart language
function updateBubbleChartLanguage() {
    if (!bubbleChart) return;
    
    const t = translations[currentLang];
    
    bubbleChart.data.datasets[0].label = t.riskCritical;
    bubbleChart.data.datasets[1].label = t.riskHigh;
    bubbleChart.data.datasets[2].label = t.riskMedium;
    bubbleChart.options.scales.x.title.text = t.bubbleChartX;
    bubbleChart.options.scales.y.title.text = t.bubbleChartY;
    
    bubbleChart.update();
}

// Language switch button event listeners
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        switchLanguage(this.dataset.lang);
    });
});

// Update time display
function updateTimeDisplay() {
    const now = new Date();
    const locale = currentLang === 'zh' ? 'zh-CN' : 'en-US';
    const timeStr = now.toLocaleString(locale, {
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
        
        const locale = currentLang === 'zh' ? 'zh-CN' : 'en-US';
        data.push({
            date: date.toLocaleDateString(locale, { month: 'short', day: 'numeric' }),
            value: Math.round(value * 10) / 10
        });
    }
    
    return data;
}

// Initialize Chart
function initChart() {
    const ctx = document.getElementById('trendChart').getContext('2d');
    const t = translations[currentLang];
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(0, 245, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(0, 245, 255, 0.0)');
    
    trendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: bubbleIndexData.history.map(d => d.date),
            datasets: [{
                label: t.chartLabel,
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
                            return t.tooltipDate + context[0].label;
                        },
                        label: function(context) {
                            return t.tooltipValue + context.raw;
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
    
    // Initialize companies section
    updateSummaryCounts();
    renderCompaniesTable('all');
    initBubbleChart();
    
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
    } else if (bubbleIndexData.current > 60) {
        statusIndicator.className = 'status-indicator medium';
    } else {
        statusIndicator.className = 'status-indicator low';
    }
    
    // Update status text based on language
    updateStatusText();
}

// Update index every 5 seconds for demo
setInterval(simulateIndexChange, 5000);

// Console welcome message
console.log('%c AI Bubble Index System ', 'background: linear-gradient(135deg, #00f5ff, #ff00ff); color: #fff; font-size: 20px; padding: 10px;');
console.log('%c ' + translations[currentLang].consoleMessage, 'color: #00f5ff; font-size: 14px;');