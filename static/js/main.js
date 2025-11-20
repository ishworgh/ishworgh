// static/js/main.js

// --- Theme Logic ---
const themeConfig = {
    palettes: ['catppuccin', 'solarized', 'tokyonight', 'evergreen', 'gruvbox', 'dracula', 'nord', 'onedark', 'rosepine', 'breeze'],
    variants: {
        catppuccin: { light: 'latte', dark: 'mocha' },
        solarized: { light: 'light', dark: 'dark' },
        tokyonight: { light: 'day', dark: 'storm' },
        evergreen: { light: 'light', dark: 'dark' },
        gruvbox: { light: 'light', dark: 'dark' },
        dracula: { light: 'light', dark: 'dark' },
        nord: { light: 'light', dark: 'dark' },
        onedark: { light: 'light', dark: 'dark' },
        rosepine: { light: 'light', dark: 'dark' },
        breeze: { light: 'light', dark: 'dark' }
    },
    colors: {
        catppuccin: '#89b4fa',
        solarized: '#268bd2',
        tokyonight: '#7aa2f7',
        evergreen: '#2ecc71',
        gruvbox: '#83a598',
        dracula: '#bd93f9',
        nord: '#88c0d0',
        onedark: '#61afef',
        rosepine: '#c4a7e7',
        breeze: '#3daee9'
    }
};

// State
let currentMode = localStorage.getItem('themeMode') || 'auto'; // 'light', 'dark', 'auto'
let currentPalette = localStorage.getItem('themePalette') || 'catppuccin';

function getSystemMode() {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log('System theme detected:', isDark ? 'dark' : 'light');
    return isDark ? 'dark' : 'light';
}

function applyTheme() {
    const effectiveMode = currentMode === 'auto' ? getSystemMode() : currentMode;
    const variant = themeConfig.variants[currentPalette][effectiveMode];
    const themeClass = `theme-${currentPalette}-${variant}`;

    console.log('Applying theme:', { mode: currentMode, effectiveMode, palette: currentPalette, class: themeClass });

    document.documentElement.className = themeClass;

    // Update UI if settings modal is open
    if (typeof updateSettingsUI === 'function') {
        updateSettingsUI();
    }
}

function setThemeMode(mode) {
    console.log('Setting theme mode to:', mode);
    currentMode = mode;
    localStorage.setItem('themeMode', mode);
    applyTheme();
}
window.setThemeMode = setThemeMode;

function setPalette(palette) {
    console.log('Setting palette to:', palette);
    currentPalette = palette;
    localStorage.setItem('themePalette', palette);
    applyTheme();
}
window.setPalette = setPalette;

// Apply theme immediately on load
applyTheme();

// Set up system preference listener
if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Modern browsers
    if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', (e) => {
            console.log('System preference changed to:', e.matches ? 'dark' : 'light');
            if (currentMode === 'auto') {
                applyTheme();
            }
        });
    }
    // Older browsers
    else if (mediaQuery.addListener) {
        mediaQuery.addListener((e) => {
            console.log('System preference changed to:', e.matches ? 'dark' : 'light');
            if (currentMode === 'auto') {
                applyTheme();
            }
        });
    }
}


// --- UI Logic for Settings Modal ---
document.addEventListener('DOMContentLoaded', () => {
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettings = document.getElementById('close-settings');

    if (settingsBtn && settingsModal) {
        settingsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            settingsModal.classList.toggle('hidden');
            updateSettingsUI(); // Update UI when opening
        });

        closeSettings.addEventListener('click', () => settingsModal.classList.add('hidden'));

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (!settingsModal.contains(e.target) && !settingsBtn.contains(e.target)) {
                settingsModal.classList.add('hidden');
            }
        });

        // --- Theme Controls Setup ---
        const btnLight = document.getElementById('btn-mode-light');
        const btnAuto = document.getElementById('btn-mode-auto');
        const btnDark = document.getElementById('btn-mode-dark');

        if (btnLight) btnLight.addEventListener('click', () => setThemeMode('light'));
        if (btnAuto) btnAuto.addEventListener('click', () => setThemeMode('auto'));
        if (btnDark) btnDark.addEventListener('click', () => setThemeMode('dark'));

        // Render Palettes once
        const paletteGrid = document.getElementById('palette-grid');
        if (paletteGrid && paletteGrid.children.length === 0) {
            paletteGrid.innerHTML = themeConfig.palettes.map(p => `
            <button onclick="setPalette('${p}')" id="btn-palette-${p}"
                class="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all bg-surface border-border text-secondary hover:border-primary/50 hover:text-text">
                <span class="w-3 h-3 rounded-full" style="background-color: ${themeConfig.colors[p]}"></span>
                ${p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
        `).join('');

            if (typeof feather !== 'undefined') feather.replace();
        }

        // Initial UI Update
        updateSettingsUI();
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
            // Re-render feather icons for the menu button
            feather.replace();
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });

        // Close mobile menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // --- Weather & Time (for Bookmarks page) ---
    if (document.getElementById('clock')) {
        updateTime();
        setInterval(updateTime, 1000);
        fetchWeather();
    }

    // --- Gallery Lightbox ---
    initLightbox();

    // --- Bookmark Search ---
    initBookmarkSearch();

    // --- Scroll to Top Button ---
    initScrollToTop();
});

function updateSettingsUI() {
    // Update Mode Buttons
    const modes = ['light', 'auto', 'dark'];

    modes.forEach(mode => {
        const btn = document.getElementById(`btn-mode-${mode}`);
        if (btn) {
            if (currentMode === mode) {
                btn.className = 'flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all bg-surface shadow-sm text-primary';
            } else {
                btn.className = 'flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all text-secondary hover:text-text';
            }
        }
    });

    // Update Palette Buttons
    themeConfig.palettes.forEach(p => {
        const btn = document.getElementById(`btn-palette-${p}`);
        if (btn) {
            if (currentPalette === p) {
                btn.className = 'flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all bg-primary/10 border-primary text-primary';
            } else {
                btn.className = 'flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all bg-surface border-border text-secondary hover:border-primary/50 hover:text-text';
            }
        }
    });
}


// --- Time & Weather ---
function updateTime() {
    const now = new Date();
    const clock = document.getElementById('clock');
    if (clock) clock.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    const date = document.getElementById('date');
    if (date) date.innerText = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

async function fetchWeather() {
    const weatherEl = document.getElementById('weather');
    if (!weatherEl) return;

    // Hardcoded coords for now (e.g., Kathmandu)
    const lat = 27.7172;
    const lon = 85.3240;

    // Weather code to icon mapping
    const weatherIcons = {
        0: 'sun', 1: 'sun', 2: 'cloud', 3: 'cloud',
        45: 'cloud', 48: 'cloud',
        51: 'cloud-drizzle', 53: 'cloud-drizzle', 55: 'cloud-drizzle',
        61: 'cloud-rain', 63: 'cloud-rain', 65: 'cloud-rain',
        71: 'cloud-snow', 73: 'cloud-snow', 75: 'cloud-snow',
        95: 'cloud-lightning'
    };

    try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const data = await res.json();
        const { temperature, weathercode } = data.current_weather;
        const icon = weatherIcons[weathercode] || 'cloud';
        weatherEl.innerHTML = `<i data-feather="${icon}" class="inline w-5 h-5"></i> ${temperature}°C`;
        feather.replace();
    } catch (e) {
        console.error("Weather fetch failed", e);
        weatherEl.innerHTML = `<i data-feather="cloud-off" class="inline w-5 h-5"></i> --°C`;
        feather.replace();
    }
}

// --- Lightbox ---
function initLightbox() {
    const images = document.querySelectorAll('.gallery-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const downloadBtn = document.getElementById('lightbox-download');
    const closeBtn = document.getElementById('lightbox-close');

    if (!lightbox) return;

    images.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            downloadBtn.href = img.src;
            lightbox.classList.remove('hidden');
        });
    });

    closeBtn.addEventListener('click', () => lightbox.classList.add('hidden'));
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.classList.add('hidden');
    });
}

// --- Bookmark Search ---
function initBookmarkSearch() {
    const searchInput = document.getElementById('bookmark-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const bookmarkCards = document.querySelectorAll('.bookmark-card');

        bookmarkCards.forEach(card => {
            const links = card.querySelectorAll('a');
            let hasMatch = false;

            links.forEach(link => {
                const text = link.textContent.toLowerCase();
                if (text.includes(query)) {
                    link.parentElement.style.display = '';
                    hasMatch = true;
                } else {
                    link.parentElement.style.display = 'none';
                }
            });

            // Show/hide entire card if no matches
            if (!hasMatch && query !== '') {
                card.style.display = 'none';
            } else {
                card.style.display = '';
            }
        });
    });
}

// --- Scroll to Top Button ---
function initScrollToTop() {
    const scrollBtn = document.getElementById('scroll-to-top');
    if (!scrollBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.remove('opacity-0', 'pointer-events-none');
            scrollBtn.classList.add('opacity-100', 'pointer-events-auto');
        } else {
            scrollBtn.classList.add('opacity-0', 'pointer-events-none');
            scrollBtn.classList.remove('opacity-100', 'pointer-events-auto');
        }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

