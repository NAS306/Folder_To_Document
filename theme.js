// theme.js

export function applyInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');

    document.documentElement.classList.toggle('theme-dark', theme === 'dark');
    updateThemeButton(theme);
}

export function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('theme-dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeButton(isDark ? 'dark' : 'light');
}

function updateThemeButton(theme) {
    const btn = document.getElementById('themeToggleBtn');
    if (!btn) return;

    if (theme === 'dark') {
        btn.textContent = '☀️Light Mode';
    } else {
        btn.textContent = '🌙Dark Mode';
    }
}