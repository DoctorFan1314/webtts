import type { StatusType, SynthMode, AudioFormat } from '../types';
import { state } from '../state';

export function showStatus(message: string, type: StatusType): void {
    const status = document.getElementById('status');
    if (!status) return;
    status.innerHTML = (type === 'loading' ? '<div class="spinner"></div>' : '') + message;
    status.className = 'status show ' + type;
}

export function hideStatus(): void {
    const status = document.getElementById('status');
    if (status) status.className = 'status';
}

export function updateCharCount(): void {
    const text = (document.getElementById('text') as HTMLTextAreaElement)?.value || '';
    const charEl = document.getElementById('charCount');
    const durEl = document.getElementById('duration');
    if (charEl) charEl.textContent = String(text.length);
    if (durEl) durEl.textContent = String(Math.ceil(text.length / 5));
}

export function escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

export function switchMode(mode: SynthMode): void {
    state.currentMode = mode;
    const modes: SynthMode[] = ['preset', 'design', 'clone'];
    document.querySelectorAll<HTMLElement>('.mode-btn').forEach((btn, i) => {
        btn.classList.toggle('active', modes[i] === mode);
    });
    document.querySelectorAll<HTMLElement>('.mode-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('panel-' + mode)?.classList.add('active');
}

export function getCurrentVoice(): string {
    if (state.currentMode === 'preset') {
        return (document.getElementById('voice') as HTMLSelectElement)?.value || '';
    }
    if (state.currentMode === 'design') return '音色设计';
    return '音色克隆';
}

export function getCurrentFormat(): AudioFormat {
    const id = state.currentMode === 'preset' ? 'format'
        : state.currentMode === 'design' ? 'format-design'
        : 'format-clone';
    return ((document.getElementById(id) as HTMLSelectElement)?.value as AudioFormat) || 'wav';
}
