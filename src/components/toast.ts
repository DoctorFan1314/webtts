import type { StatusType } from '../types';

let container: HTMLElement | null = null;

function getContainer(): HTMLElement {
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        container.setAttribute('aria-live', 'polite');
        document.body.appendChild(container);
    }
    return container;
}

export function showToast(message: string, type: StatusType = 'success', duration = 3000): void {
    const c = getContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    c.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => toast.remove());
    }, duration);
}
