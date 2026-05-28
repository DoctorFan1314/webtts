import { synthesize } from './components/synth';

export function initShortcuts(): void {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
        const tag = (e.target as HTMLElement)?.tagName;
        const isInput = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';

        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            synthesize();
        }
        if (e.key === 's' && e.ctrlKey && !e.shiftKey) {
            e.preventDefault();
            const link = document.getElementById('downloadLink') as HTMLAnchorElement;
            if (link?.href && link.href !== '#') link.click();
        }
        if (e.key === 'S' && e.ctrlKey && e.shiftKey) {
            e.preventDefault();
            document.getElementById('saveHistoryBtn')?.click();
        }
        if (e.key === 'd' && e.ctrlKey) {
            e.preventDefault();
            toggleTheme();
        }
        if (e.key === 'Escape') {
            document.querySelectorAll<HTMLElement>('.modal-overlay.show, .onboarding-overlay.show')
                .forEach(m => m.classList.remove('show'));
        }
        if (e.key === '?' && !isInput) {
            e.preventDefault();
            document.getElementById('shortcutsModal')?.classList.add('show');
        }
    });
}

export function toggleTheme(): void {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? '' : 'dark');
    localStorage.setItem('webtts_theme', isDark ? '' : 'dark');
}

export function loadSavedTheme(): void {
    const saved = localStorage.getItem('webtts_theme');
    if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
}
