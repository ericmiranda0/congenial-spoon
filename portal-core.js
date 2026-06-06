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
 * Visitor Activity — Small Group Mode
 * Simula um pequeno grupo de estudantes (5-6) estudando simultaneamente.
 * Sem banco de dados externo — contagem local e orgânica.
 */
function initVisitorStats() {
    // Perfil horário realista para um grupo pequeno (3 a 8 estudantes)
    const hourlyBase = [
        3, 2, 2, 2, 2, 3,  // 00-05h (madrugada)
        4, 5, 5, 6, 6, 6,  // 06-11h (manhã)
        6, 5, 5, 6, 7, 7,  // 12-17h (tarde)
        7, 6, 6, 5, 4, 4   // 18-23h (noite)
    ];

    // Gera histórico realista das últimas 12 horas para o gráfico
    const generateHistory = () => {
        const history = [];
        const now = new Date();
        for (let i = 11; i >= 0; i--) {
            const d = new Date(now.getTime() - i * 60 * 60 * 1000);
            const hr = d.getHours();
            const base = hourlyBase[hr];
            const val = Math.max(1, base + Math.floor(Math.random() * 3) - 1);
            history.push(val);
        }
        return history;
    };

    // Estado inicial — sempre parte do perfil horário real (sem dados velhos de simulação)
    const currentHour = new Date().getHours();
    const baseNow = hourlyBase[currentHour];
    let stats = {
        live: baseNow + (Math.random() < 0.5 ? 0 : 1), // 5 ou 6
        peak: baseNow + 2,
        total: parseInt(localStorage.getItem('portal_total_visits') || '0') + 1,
        history: generateHistory()
    };

    localStorage.setItem('portal_total_visits', stats.total);

    // Injeta indicador no header (ao lado do botão de tema)
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        if (!document.querySelector('.online-indicator')) {
            const indicatorHTML = `
                <div class="online-indicator" style="margin-right: 1.5rem;" title="Estudantes estudando agora neste portal">
                    <span class="pulse-dot"></span>
                    <span><span id="globalLiveCounter">${stats.live}</span> estudando</span>
                </div>
            `;
            themeToggle.insertAdjacentHTML('beforebegin', indicatorHTML);
        }
    }

    // Cache dos elementos do dashboard
    const dashboard = document.getElementById('statsDashboard');
    const liveEl = document.getElementById('liveVisitorCount');
    const peakEl = document.getElementById('peakCount');
    const avgEl = document.getElementById('avgCount');
    const totalEl = document.getElementById('totalCount');
    const chartContainer = document.getElementById('svgChartContainer');
    const chartStatus = document.getElementById('chartStatus');

    let tooltipEl = null;
    if (chartContainer) {
        tooltipEl = document.createElement('div');
        tooltipEl.className = 'chart-tooltip';
        chartContainer.appendChild(tooltipEl);
    }

    const getAvgHistory = () => {
        const sum = stats.history.reduce((a, b) => a + b, 0);
        return Math.round(sum / stats.history.length);
    };

    const updateDashboardDOM = () => {
        const headerCount = document.getElementById('globalLiveCounter');
        if (headerCount) headerCount.textContent = stats.live;

        if (!dashboard) return;

        if (liveEl) liveEl.textContent = stats.live;
        if (peakEl) peakEl.textContent = stats.peak;
        if (avgEl) avgEl.textContent = getAvgHistory();
        if (totalEl) totalEl.textContent = stats.total.toLocaleString('pt-BR');

        if (chartStatus) {
            const realTabs = updateTabActivity();
            const tabNote = realTabs > 1 ? ` (${realTabs} abas)` : '';
            chartStatus.innerHTML = `Ao Vivo${tabNote} · Atualiza em 5s`;
            chartStatus.style.color = '#10B981';
            chartStatus.style.borderColor = 'rgba(16, 185, 129, 0.15)';
        }

        renderSVGChart();
    };

    // Renderiza o gráfico SVG de linha com os dados do histórico
    const renderSVGChart = () => {
        if (!chartContainer) return;

        const width = chartContainer.clientWidth || 550;
        const height = chartContainer.clientHeight || 220;
        const padding = { top: 25, right: 20, bottom: 35, left: 40 };
        const chartW = width - padding.left - padding.right;
        const chartH = height - padding.top - padding.bottom;

        const maxVal = Math.max(...stats.history);
        const maxY = Math.max(10, Math.ceil((maxVal + 3) / 5) * 5);

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

        const points = stats.history.map((val, i) => {
            const x = padding.left + (i * (chartW / (stats.history.length - 1)));
            const y = padding.top + chartH - (val / maxY * chartH);
            return { x, y, val, label: xLabels[i] };
        });

        let linePath = '';
        let areaPath = '';

        if (points.length > 0) {
            linePath = `M ${points[0].x} ${points[0].y}`;
            areaPath = `M ${points[0].x} ${padding.top + chartH} L ${points[0].x} ${points[0].y}`;

            for (let i = 1; i < points.length; i++) {
                const p0 = points[i - 1];
                const p = points[i];
                const cp1x = p0.x + (p.x - p0.x) / 3;
                const cp1y = p0.y;
                const cp2x = p0.x + 2 * (p.x - p0.x) / 3;
                const cp2y = p.y;
                linePath += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p.x} ${p.y}`;
                areaPath += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p.x} ${p.y}`;
            }
            areaPath += ` L ${points[points.length - 1].x} ${padding.top + chartH} Z`;
        }

        let gridHTML = '';
        for (let i = 0; i <= 4; i++) {
            const y = padding.top + (i * (chartH / 4));
            const yVal = Math.round(maxY - (i * (maxY / 4)));
            gridHTML += `
                <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" class="chart-grid-line" />
                <text x="${padding.left - 10}" y="${y + 4}" text-anchor="end" class="chart-axis-text">${yVal}</text>
            `;
        }

        let xLabelHTML = '';
        points.forEach((p, i) => {
            if (i % 2 === 0 || i === points.length - 1) {
                xLabelHTML += `<text x="${p.x}" y="${height - 10}" text-anchor="middle" class="chart-axis-text">${p.label}</text>`;
            }
        });

        let nodesHTML = '';
        points.forEach((p) => {
            nodesHTML += `<circle cx="${p.x}" cy="${p.y}" r="4.5" class="chart-node" />`;
        });

        const svgHTML = `
            <svg class="chart-svg" viewBox="0 0 ${width} ${height}">
                <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#10B981" stop-opacity="0.3"/>
                        <stop offset="100%" stop-color="#10B981" stop-opacity="0.0"/>
                    </linearGradient>
                </defs>
                <g>${gridHTML}</g>
                <g>${xLabelHTML}</g>
                <line id="trackerLine" x1="0" y1="${padding.top}" x2="0" y2="${padding.top + chartH}" class="chart-tooltip-line" style="display: none;" />
                <path d="${areaPath}" class="chart-area" />
                <path d="${linePath}" class="chart-line" />
                <g>${nodesHTML}</g>
            </svg>
        `;

        chartContainer.querySelector('svg')?.remove();
        chartContainer.insertAdjacentHTML('afterbegin', svgHTML);

        const svg = chartContainer.querySelector('.chart-svg');
        const trackerLine = chartContainer.querySelector('#trackerLine');

        svg.addEventListener('mousemove', (e) => {
            const rect = svg.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left) * (width / rect.width);
            let closest = points[0];
            let minDist = Math.abs(mouseX - points[0].x);
            for (let i = 1; i < points.length; i++) {
                const dist = Math.abs(mouseX - points[i].x);
                if (dist < minDist) { minDist = dist; closest = points[i]; }
            }
            if (trackerLine) {
                trackerLine.setAttribute('x1', closest.x);
                trackerLine.setAttribute('x2', closest.x);
                trackerLine.style.display = 'block';
            }
            if (tooltipEl) {
                tooltipEl.innerHTML = `<strong>${closest.label}</strong>: ${closest.val} ativos`;
                tooltipEl.classList.add('visible');
                const cRect = chartContainer.getBoundingClientRect();
                tooltipEl.style.left = `${closest.x * (cRect.width / width)}px`;
                tooltipEl.style.top = `${closest.y * (cRect.height / height)}px`;
            }
        });

        svg.addEventListener('mouseleave', () => {
            if (trackerLine) trackerLine.style.display = 'none';
            if (tooltipEl) tooltipEl.classList.remove('visible');
        });
    };

    // Flutuação orgânica suave — oscila ±1 para parecer natural
    const handleFluctuation = () => {
        const realTabs = updateTabActivity();
        const hour = new Date().getHours();
        const base = hourlyBase[hour];
        const delta = [-1, 0, 0, 1][Math.floor(Math.random() * 4)]; // maioria fica estável
        stats.live = Math.max(3, Math.min(9, base + delta + (realTabs - 1)));
        if (stats.live > stats.peak) stats.peak = stats.live;

        // Incrementa total raramente (~8% por ciclo)
        if (Math.random() < 0.08) {
            stats.total += 1;
            localStorage.setItem('portal_total_visits', stats.total);
        }

        updateDashboardDOM();
    };

    // Insere o valor atual no histórico a cada 10 segundos
    const shiftHistory = () => {
        stats.history.push(stats.live);
        stats.history.shift();
        updateDashboardDOM();
    };

    setInterval(updateTabActivity, 2000);
    setInterval(handleFluctuation, 5000);
    setInterval(shiftHistory, 10000);

    updateTabActivity();
    updateDashboardDOM();

    window.addEventListener('resize', () => {
        if (dashboard) renderSVGChart();
    });
}

