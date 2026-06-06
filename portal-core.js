/* ==========================================================================
   SUMMARY HUB - CORE LOGIC
   Safe version: content is ALWAYS visible. Animations are progressive enhancement.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initProgressBar();
    initNavHighlight();
    initScrollReveal();
    initDragScroll();
    initScrollTop();
    initErrorReporting();
    initBottomNav();
    initVisitorStats();
});

/**
 * Theme Management (Dark/Light Mode)
 */
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';

    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('themeIcon');
    if (!icon) return;
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('fill', 'none');
    icon.setAttribute('stroke', 'currentColor');
    icon.setAttribute('stroke-width', '2');
    icon.setAttribute('stroke-linecap', 'round');
    icon.setAttribute('stroke-linejoin', 'round');
    if (theme === 'dark') {
        icon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
    } else {
        icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    }
}

/**
 * Scroll Progress Bar
 */
function initProgressBar() {
    const progressBar = document.getElementById('progressBar');
    if (!progressBar) return;
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        progressBar.style.width = scrolled + '%';
    });
}

/**
 * Nav link highlight on scroll
 */
function initNavHighlight() {
    const navItems = document.querySelectorAll('.nav-item');
    if (navItems.length === 0) return;

    const sections = [];
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && href.startsWith('#')) {
            const section = document.querySelector(href);
            if (section) sections.push({ item, section });
        }
    });

    if (sections.length === 0) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;
        sections.forEach(({ item, section }) => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            if (scrollY >= top && scrollY < bottom) {
                navItems.forEach(n => n.classList.remove('active'));
                item.classList.add('active');
            }
        });
    });
}

/**
 * Scroll Reveal Animation
 * SAFE: content is always visible. Animation is progressive enhancement only.
 * If IntersectionObserver is not available, content stays visible.
 */
function initScrollReveal() {
    if (!window.IntersectionObserver) return; // bail out safely

    const targets = document.querySelectorAll('section, .summary-card, .card');
    if (targets.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

    targets.forEach(el => {
        // Only add animation if element is NOT already in the viewport on load
        const rect = el.getBoundingClientRect();
        const inViewport = rect.top < window.innerHeight && rect.bottom >= 0;
        if (!inViewport) {
            el.classList.add('reveal-hidden');
        }
        observer.observe(el);
    });
}

/**
 * Drag to scroll navigation
 */
function initDragScroll() {
    const navList = document.querySelector('.nav-list');
    if (!navList) return;

    let isDown = false;
    let startX, scrollLeft;

    navList.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - navList.offsetLeft;
        scrollLeft = navList.scrollLeft;
        navList.style.cursor = 'grabbing';
    });
    navList.addEventListener('mouseleave', () => { isDown = false; navList.style.cursor = 'grab'; });
    navList.addEventListener('mouseup', () => { isDown = false; navList.style.cursor = 'grab'; });
    navList.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - navList.offsetLeft;
        navList.scrollLeft = scrollLeft - (x - startX) * 1.5;
    });
}

/**
 * Scroll-to-top floating button
 */
function initScrollTop() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * Global Error Reporting Modal System
 * Automatically injected into all subjects
 */
function initErrorReporting() {
    // 1. Inject Modal HTML into Body
    const modalHTML = `
        <div class="modal-overlay" id="reportOverlay">
            <div class="report-modal">
                <button class="modal-close" id="closeReport">&times;</button>
                <h3>Reportar Erro</h3>
                <p>Encontrou algo errado? Ajude-nos a melhorar este resumo preenchendo os detalhes abaixo.</p>
                
                <form class="modal-form" id="reportForm">
                    <div class="form-group">
                        <label for="reportProblem">Qual o problema?</label>
                        <textarea id="reportProblem" class="modal-input" placeholder="Ex: Informação desatualizada, erro de digitação..." required rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="reportLocation">Onde se encontra?</label>
                        <input type="text" id="reportLocation" class="modal-input" placeholder="Ex: Seção 4.2 - Dosimetria da Pena" required>
                    </div>
                    <div class="form-group">
                        <label for="reportChange">O que deveria mudar?</label>
                        <textarea id="reportChange" class="modal-input" placeholder="Sua sugestão de correção..." required rows="3"></textarea>
                    </div>
                    <button type="submit" class="modal-submit">Enviar para Eric Miranda</button>
                </form>
            </div>
        </div>
        
        <a href="#" class="report-btn" id="openReport">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <span>Reportar Erro</span>
        </a>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // 2. Elements Cache
    const overlay = document.getElementById('reportOverlay');
    const btnOpen = document.getElementById('openReport');
    const btnClose = document.getElementById('closeReport');
    const form = document.getElementById('reportForm');

    // 3. Handlers
    const toggleModal = (e) => {
        if (e) e.preventDefault();
        overlay.classList.toggle('active');
        if (overlay.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    btnOpen.addEventListener('click', toggleModal);
    btnClose.addEventListener('click', toggleModal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) toggleModal(); });

    // 4. Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const problem = document.getElementById('reportProblem').value;
        const locationText = document.getElementById('reportLocation').value;
        const change = document.getElementById('reportChange').value;

        const email = "ericmirandajob@gmail.com";
        const subject = encodeURIComponent(`FEEDBACK: ${document.title}`);
        const bodyText = encodeURIComponent(
            `Olá Eric,\n\nRelato de erro no resumo "${document.title}":\n\n` +
            `🚩 PROBLEMA: ${problem}\n` +
            `📍 LOCAL: ${locationText}\n` +
            `💡 SUGESTÃO: ${change}\n\n` +
            `Link da página: ${window.location.href}`
        );

        window.location.href = `mailto:${email}?subject=${subject}&body=${bodyText}`;

        toggleModal();
        form.reset();
    });
}
/**
 * Mobile Bottom Navigation Injection & Logic
 */
function initBottomNav() {
    const isSubjectPage = window.location.pathname.includes('/subjects/');
    const homePath = isSubjectPage ? '../../index.html' : 'index.html';

    // Inject Bottom Nav HTML
    const bottomNavHTML = `
        <nav class="bottom-nav">
            <a href="${homePath}" class="bottom-nav-item ${!isSubjectPage ? 'active' : ''}">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                <span>Início</span>
            </a>
            <a href="#" class="bottom-nav-item" id="mobileSearch">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <span>Busca</span>
            </a>
            <a href="#" class="bottom-nav-item" id="mobileScrollTop">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l7-7 7 7M5 19l7-7 7 7"></path></svg>
                <span>Topo</span>
            </a>
        </nav>
    `;

    document.body.insertAdjacentHTML('beforeend', bottomNavHTML);

    // Logic for Mobile Search Button
    const btnSearch = document.getElementById('mobileSearch');
    btnSearch.addEventListener('click', (e) => {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => searchInput.focus(), 500);
        } else {
            // If not on hub, maybe redirect to hub search?
            window.location.href = homePath + '#search';
        }
    });
    // Logic for Mobile Scroll Top
    const btnTop = document.getElementById('mobileScrollTop');
    btnTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * Active tab detection system to sync visitor count across multiple open windows
 */
const TAB_ID = Math.random().toString(36).substring(2, 11);

function updateTabActivity() {
    let tabs = JSON.parse(localStorage.getItem('portal_active_tabs') || '{}');
    const now = Date.now();

    // Write activity of current tab
    tabs[TAB_ID] = now;

    // Clean up inactive tabs (no update for more than 6 seconds)
    for (const id in tabs) {
        if (now - tabs[id] > 6000) {
            delete tabs[id];
        }
    }

    localStorage.setItem('portal_active_tabs', JSON.stringify(tabs));
    return Object.keys(tabs).length;
}

/**
 * Visitor Activity Simulation & Chart Visualization
 * Uses realistic daily activity curves and active tab detection
 */
function initVisitorStats() {
    // 0. Supabase Credentials Configuration
    const SUPABASE_KEY = "sb_publishable_ZOCiSTGL9OclOB3n7kZIeQ_Nxy8d9VD";
    const SUPABASE_URL = "https://cmeedfliorpjmxfekayf.supabase.co"; // Substitua por sua URL do projeto Supabase (ex: https://xxxx.supabase.co)

    let isSupabaseActive = false;
    let supabaseChannel = null;

    // Traffic profile (average visitors for each hour 0-23)
    const hourlyAverages = [
        12, 8, 5, 4, 6, 12, // 00:00 - 05:00 (Late Night Valley)
        18, 24, 28, 30, 32, 35, // 06:00 - 11:00 (Morning Rise)
        38, 32, 28, 34, 45, 55, // 12:00 - 17:00 (Afternoon Activity)
        68, 72, 65, 50, 35, 20  // 18:00 - 23:00 (Evening Peak)
    ];

    // Helper to generate a realistic history of the last 12 hours based on real time
    const generateRealisticHistory = () => {
        const history = [];
        const now = new Date();
        for (let i = 11; i >= 0; i--) {
            const d = new Date(now.getTime() - i * 60 * 60 * 1000);
            const hr = d.getHours();
            const base = hourlyAverages[hr];
            // Organic organic fluctuation (+- 4)
            const val = Math.max(3, base + Math.floor(Math.random() * 9) - 4);
            history.push(val);
        }
        return history;
    };

    // 1. Initial State or Load from LocalStorage
    let stats = {
        live: 25,
        peak: 75,
        total: 1240,
        history: [],
        simOffset: 0, // Keeps track of manual user overrides (+ Entrada / - Saída)
        isPaused: false
    };

    const saved = localStorage.getItem('portal_visitor_stats');
    if (saved) {
        try {
            stats = JSON.parse(saved);
        } catch (e) {
            console.error("Failed to parse saved visitor stats", e);
        }
    }

    // Initialize/Fix history array if needed
    if (!stats.history || stats.history.length < 12) {
        stats.history = generateRealisticHistory();
        localStorage.setItem('portal_visitor_stats', JSON.stringify(stats));
    }

    // 2. Automatically Inject Header indicator next to themeToggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        if (!document.querySelector('.online-indicator')) {
            const indicatorHTML = `
                <div class="online-indicator" style="margin-right: 1.5rem;" title="Métricas de acesso: Suas abas abertas + tráfego simulado da faculdade">
                    <span class="pulse-dot"></span>
                    <span><span id="globalLiveCounter">${stats.live}</span> online</span>
                </div>
            `;
            themeToggle.insertAdjacentHTML('beforebegin', indicatorHTML);
        }
    }

    // 3. Cache DOM Elements for Dashboard (If present)
    const dashboard = document.getElementById('statsDashboard');
    const liveEl = document.getElementById('liveVisitorCount');
    const peakEl = document.getElementById('peakCount');
    const avgEl = document.getElementById('avgCount');
    const totalEl = document.getElementById('totalCount');
    const chartContainer = document.getElementById('svgChartContainer');

    const simJoinBtn = document.getElementById('simJoin');
    const simLeaveBtn = document.getElementById('simLeave');
    const simToggleBtn = document.getElementById('simToggle');
    const chartStatus = document.getElementById('chartStatus');

    // Create tooltip element in chart card if container exists
    let tooltipEl = null;
    if (chartContainer) {
        tooltipEl = document.createElement('div');
        tooltipEl.className = 'chart-tooltip';
        chartContainer.appendChild(tooltipEl);
    }

    // Function to calculate average history
    const getAvgHistory = () => {
        const sum = stats.history.reduce((a, b) => a + b, 0);
        return Math.round(sum / stats.history.length);
    };

    // Update DOM indicators
    const updateDashboardDOM = () => {
        // Global header count
        const headerCount = document.getElementById('globalLiveCounter');
        if (headerCount) headerCount.textContent = stats.live;

        // Update online indicator title dynamically based on Supabase state
        const indicator = document.querySelector('.online-indicator');
        if (indicator) {
            indicator.title = isSupabaseActive
                ? "Visitantes online reais via Supabase Realtime"
                : "Métricas de acesso: Suas abas abertas + tráfego simulado da faculdade";
        }

        if (!dashboard) return;

        if (liveEl) liveEl.textContent = stats.live;
        if (peakEl) peakEl.textContent = stats.peak;
        if (avgEl) avgEl.textContent = getAvgHistory();
        if (totalEl) totalEl.textContent = stats.total.toLocaleString();

        if (simToggleBtn) {
            simToggleBtn.innerHTML = stats.isPaused ? '▶️ Iniciar' : '⏸️ Pausar';
        }
        if (chartStatus) {
            if (isSupabaseActive) {
                chartStatus.innerHTML = `Conexão Global (Supabase) · Tempo Real`;
            } else {
                const activeTabs = updateTabActivity();
                const tabText = activeTabs > 1 ? ` (${activeTabs} abas locais)` : '';
                chartStatus.innerHTML = stats.isPaused
                    ? 'Simulação Pausada'
                    : `Tempo Real${tabText} · Atualiza em 5s`;
            }
            chartStatus.style.color = stats.isPaused ? 'var(--text-muted)' : '#10B981';
            chartStatus.style.borderColor = stats.isPaused ? 'var(--border)' : 'rgba(16, 185, 129, 0.15)';
        }

        renderSVGChart();
    };

    // Save state helper
    const saveState = () => {
        localStorage.setItem('portal_visitor_stats', JSON.stringify(stats));
    };

    // 4. Render SVG Line Chart
    const renderSVGChart = () => {
        if (!chartContainer) return;

        const width = chartContainer.clientWidth || 550;
        const height = chartContainer.clientHeight || 220;

        const padding = { top: 25, right: 20, bottom: 35, left: 40 };
        const chartW = width - padding.left - padding.right;
        const chartH = height - padding.top - padding.bottom;

        // Find Y-axis limits
        const maxVal = Math.max(...stats.history);
        const maxY = Math.max(80, Math.ceil((maxVal + 15) / 10) * 10); // Round up to nearest 10, min 80

        // Time labels for X-axis (Last 12 hours)
        const generateTimeLabels = () => {
            const labels = [];
            const now = new Date();
            for (let i = 11; i >= 0; i--) {
                const d = new Date(now.getTime() - i * 60 * 60 * 1000);
                const hrs = String(d.getHours()).padStart(2, '0');
                labels.push(`${hrs}:00`);
            }
            return labels;
        };
        const xLabels = generateTimeLabels();

        // Calculate positions
        const points = stats.history.map((val, i) => {
            const x = padding.left + (i * (chartW / (stats.history.length - 1)));
            const y = padding.top + chartH - (val / maxY * chartH);
            return { x, y, val, label: xLabels[i] };
        });

        // Build SVG Path strings
        let linePath = "";
        let areaPath = "";

        if (points.length > 0) {
            // Smooth curve calculations
            linePath = `M ${points[0].x} ${points[0].y}`;
            areaPath = `M ${points[0].x} ${padding.top + chartH} L ${points[0].x} ${points[0].y}`;

            for (let i = 1; i < points.length; i++) {
                const p0 = points[i - 1];
                const p = points[i];
                // Control points for bezier curves
                const cp1x = p0.x + (p.x - p0.x) / 3;
                const cp1y = p0.y;
                const cp2x = p0.x + 2 * (p.x - p0.x) / 3;
                const cp2y = p.y;

                linePath += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p.x} ${p.y}`;
                areaPath += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p.x} ${p.y}`;
            }

            areaPath += ` L ${points[points.length - 1].x} ${padding.top + chartH} Z`;
        }

        // Draw grid lines (4 horizontal divisions)
        let gridHTML = "";
        const gridDivisions = 4;
        for (let i = 0; i <= gridDivisions; i++) {
            const y = padding.top + (i * (chartH / gridDivisions));
            const yVal = Math.round(maxY - (i * (maxY / gridDivisions)));
            gridHTML += `
                <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" class="chart-grid-line" />
                <text x="${padding.left - 10}" y="${y + 4}" text-anchor="end" class="chart-axis-text">${yVal}</text>
            `;
        }

        // Draw X-axis labels
        let xLabelHTML = "";
        points.forEach((p, i) => {
            if (i % 2 === 0 || i === points.length - 1) {
                xLabelHTML += `
                    <text x="${p.x}" y="${height - 10}" text-anchor="middle" class="chart-axis-text">${p.label}</text>
                `;
            }
        });

        // Draw data nodes/circles
        let nodesHTML = "";
        points.forEach((p, i) => {
            nodesHTML += `
                <circle cx="${p.x}" cy="${p.y}" r="4.5" class="chart-node" data-index="${i}" />
            `;
        });

        // Assemble SVG content
        const svgHTML = `
            <svg class="chart-svg" viewBox="0 0 ${width} ${height}">
                <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#10B981" stop-opacity="0.3"/>
                        <stop offset="100%" stop-color="#10B981" stop-opacity="0.0"/>
                    </linearGradient>
                </defs>
                
                <!-- Y-Axis Gridlines & Labels -->
                <g>${gridHTML}</g>
                
                <!-- X-Axis Labels -->
                <g>${xLabelHTML}</g>
                
                <!-- Hover Tracker Line -->
                <line id="trackerLine" x1="0" y1="${padding.top}" x2="0" y2="${padding.top + chartH}" class="chart-tooltip-line" style="display: none;" />
                
                <!-- Area path below line -->
                <path d="${areaPath}" class="chart-area" />
                
                <!-- Main Trend Line -->
                <path d="${linePath}" class="chart-line" />
                
                <!-- Interactive Nodes -->
                <g>${nodesHTML}</g>
            </svg>
        `;

        chartContainer.querySelector('svg')?.remove();
        chartContainer.insertAdjacentHTML('afterbegin', svgHTML);

        // Tooltip interaction events
        const svg = chartContainer.querySelector('.chart-svg');
        const trackerLine = chartContainer.querySelector('#trackerLine');

        svg.addEventListener('mousemove', (e) => {
            const rect = svg.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left) * (width / rect.width);

            let closest = points[0];
            let minDist = Math.abs(mouseX - points[0].x);

            for (let i = 1; i < points.length; i++) {
                const dist = Math.abs(mouseX - points[i].x);
                if (dist < minDist) {
                    minDist = dist;
                    closest = points[i];
                }
            }

            if (trackerLine) {
                trackerLine.setAttribute('x1', closest.x);
                trackerLine.setAttribute('x2', closest.x);
                trackerLine.style.display = 'block';
            }

            if (tooltipEl) {
                tooltipEl.innerHTML = `<strong>${closest.label}</strong>: ${closest.val} ativos`;
                tooltipEl.classList.add('visible');

                const containerRect = chartContainer.getBoundingClientRect();
                const scaleX = closest.x * (containerRect.width / width);
                const scaleY = closest.y * (containerRect.height / height);

                tooltipEl.style.left = `${scaleX}px`;
                tooltipEl.style.top = `${scaleY}px`;
            }
        });

        svg.addEventListener('mouseleave', () => {
            if (trackerLine) trackerLine.style.display = 'none';
            if (tooltipEl) tooltipEl.classList.remove('visible');
        });
    };

    // 5. Setup Live Sim Fluctuations (Fallback only)
    const handleFluctuation = () => {
        if (stats.isPaused || isSupabaseActive) return;

        const realTabCount = updateTabActivity();
        const currentHour = new Date().getHours();
        const baseAverage = hourlyAverages[currentHour];

        // Dynamic fluctuation (+- 3)
        const fluctuation = Math.floor(Math.random() * 7) - 3;

        // Final count combines: hourly profile + variation + open local tabs + manual user overrides
        stats.live = Math.max(1, baseAverage + fluctuation + (realTabCount - 1) * 4 + stats.simOffset);

        // Update peak
        if (stats.live > stats.peak) stats.peak = stats.live;

        // Occasional access increment
        if (Math.random() < 0.15) {
            stats.total += Math.floor(Math.random() * 2) + 1;
        }

        saveState();
        updateDashboardDOM();
    };

    // Initialize Supabase if URL is configured
    const initSupabase = () => {
        if (SUPABASE_URL === "SUA_URL_DO_SUPABASE_AQUI" || !SUPABASE_URL.startsWith('http')) {
            console.log("Supabase URL não configurada. Usando simulação inteligente e abas locais.");
            return;
        }

        // Load Supabase JS Client dynamically
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
        script.onload = () => {
            try {
                const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
                supabaseChannel = supabaseClient.channel('portal_online_users', {
                    config: {
                        presence: {
                            key: TAB_ID
                        }
                    }
                });

                supabaseChannel
                    .on('presence', { event: 'sync' }, () => {
                        const state = supabaseChannel.presenceState();
                        const globalOnline = Object.keys(state).length;

                        // Use globalOnline as our live traffic count!
                        stats.live = globalOnline;
                        if (stats.live > stats.peak) stats.peak = stats.live;

                        isSupabaseActive = true;
                        saveState();
                        updateDashboardDOM();
                    })
                    .subscribe(async (status) => {
                        if (status === 'SUBSCRIBED') {
                            await supabaseChannel.track({
                                online_at: new Date().toISOString()
                            });
                        }
                    });
            } catch (err) {
                console.error("Erro ao conectar no canal do Supabase Realtime:", err);
            }
        };
        script.onerror = () => {
            console.error("Erro ao carregar Supabase de CDN.");
        };
        document.head.appendChild(script);
    };

    // Update tab activity on load and write initially
    updateTabActivity();

    // Regular live updater (every 3 seconds)
    const updateInterval = setInterval(handleFluctuation, 3000);

    // Dynamic History shifter: Shift visitors count into history list every 10 seconds
    const shiftHistory = () => {
        if (stats.isPaused) return;
        stats.history.push(stats.live);
        stats.history.shift();
        saveState();
        updateDashboardDOM();
    };
    const historyInterval = setInterval(shiftHistory, 10000);

    // Write own tab activity every 2 seconds to keep it alive
    const tabActivityInterval = setInterval(updateTabActivity, 2000);

    // 6. Hook up Simulation Controls
    if (simJoinBtn) {
        simJoinBtn.addEventListener('click', () => {
            stats.simOffset += 5;
            stats.total += 1;
            handleFluctuation();
        });
    }

    if (simLeaveBtn) {
        simLeaveBtn.addEventListener('click', () => {
            stats.simOffset -= 5;
            handleFluctuation();
        });
    }

    if (simToggleBtn) {
        simToggleBtn.addEventListener('click', () => {
            stats.isPaused = !stats.isPaused;
            saveState();
            updateDashboardDOM();
        });
    }

    // Launch Supabase setup
    initSupabase();

    // Initialize DOM
    updateDashboardDOM();

    // Resize chart with window size dynamically
    window.addEventListener('resize', () => {
        if (dashboard) renderSVGChart();
    });
}
