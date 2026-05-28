import { state } from '../state';
import { showStatus } from './ui-helpers';

function processCloneFile(file: File): void {
    if (!file.name.match(/\.(mp3|wav)$/i)) {
        showStatus('仅支持 MP3 和 WAV 格式', 'error');
        return;
    }
    if (file.size > 10 * 1024 * 1024) {
        showStatus('文件大小不能超过 10MB', 'error');
        return;
    }

    state.cloneMimeType = file.name.endsWith('.mp3') ? 'audio/mpeg' : 'audio/wav';

    const reader = new FileReader();
    reader.onload = (e) => {
        const base64Full = e.target?.result as string;
        state.cloneBase64 = base64Full.split(',')[1];

        const player = document.getElementById('cloneAudioPlayer') as HTMLAudioElement;
        if (player) player.src = base64Full;

        const info = document.getElementById('cloneFileInfo');
        if (info) info.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;

        document.getElementById('clonePreview')?.classList.add('show');
        showStatus('音频文件已加载', 'success');
    };
    reader.readAsDataURL(file);
}

export function clearCloneFile(): void {
    state.cloneBase64 = null;
    state.cloneMimeType = null;
    document.getElementById('clonePreview')?.classList.remove('show');
    const input = document.getElementById('cloneFile') as HTMLInputElement;
    if (input) input.value = '';
}

export function initVoiceClone(): void {
    const zone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('cloneFile') as HTMLInputElement;

    if (zone) {
        zone.addEventListener('click', () => fileInput?.click());
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('dragover');
        });
        zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('dragover');
            const file = e.dataTransfer?.files[0];
            if (file) processCloneFile(file);
        });
    }

    if (fileInput) {
        fileInput.addEventListener('change', () => {
            if (fileInput.files?.[0]) processCloneFile(fileInput.files[0]);
        });
    }

    document.querySelector('.clone-preview .btn-outline')?.addEventListener('click', clearCloneFile);
}
