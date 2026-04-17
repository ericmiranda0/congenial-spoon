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
            Reportar Erro
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
