import './style.css';
import { state, updateSettings } from './state';
import { loadApiKey, saveApiKey, loadApiBase, saveApiBase } from './storage';
import { switchMode, updateCharCount } from './components/ui-helpers';
import { initWaveVisualizer } from './components/wave';
import { initVoiceDesign } from './components/voice-design';
import { initVoiceClone } from './components/voice-clone';
import { initAudioTags } from './components/audio-tags';
import { initDirector } from './components/director';
import { initHistory, importHistory } from './components/history';
import { initTemplates } from './components/templates';
import { initBatch } from './components/batch';
import { initOnboarding, showOnboarding } from './components/onboarding';
import { synthesize, copyAudioUrl, saveToHistory } from './components/synth';
import { initShortcuts, toggleTheme, loadSavedTheme } from './shortcuts';

function init(): void {
    loadSavedTheme();

    // Load saved API base and key
    const savedBase = loadApiBase();
    if (savedBase) (document.getElementById('apiBase') as HTMLInputElement).value = savedBase;

    const savedKey = loadApiKey();
    if (savedKey) (document.getElementById('apiKey') as HTMLInputElement).value = savedKey;

    // Init all modules
    initWaveVisualizer();
    initVoiceDesign();
    initVoiceClone();
    initAudioTags();
    initDirector();
    initHistory();
    initTemplates();
    initBatch();
    initOnboarding();
    initShortcuts();

    // Event bindings
    const textArea = document.getElementById('text') as HTMLTextAreaElement;
    const apiBaseInput = document.getElementById('apiBase') as HTMLInputElement;
    const apiKeyInput = document.getElementById('apiKey') as HTMLInputElement;

    textArea?.addEventListener('input', updateCharCount);
    apiBaseInput?.addEventListener('change', () => saveApiBase(apiBaseInput.value.trim()));
    apiKeyInput?.addEventListener('change', () => saveApiKey(apiKeyInput.value.trim()));

    // Mode switching
    document.querySelectorAll<HTMLElement>('.mode-btn').forEach((btn, i) => {
        btn.addEventListener('click', () => switchMode(['preset', 'design', 'clone'][i] as 'preset' | 'design' | 'clone'));
    });

    // Synthesize button
    document.getElementById('synthesizeBtn')?.addEventListener('click', () => synthesize());

    // Player actions
    document.getElementById('copyUrlBtn')?.addEventListener('click', copyAudioUrl);
    document.getElementById('saveHistoryBtn')?.addEventListener('click', saveToHistory);

    // Style tags
    document.querySelectorAll<HTMLElement>('.style-tag[data-style]').forEach(tag => {
        tag.addEventListener('click', () => {
            const style = tag.dataset.style;
            if (style) setStyle(style);
        });
    });

    // Singing mode
    document.getElementById('toggleSinging')?.addEventListener('click', () => {
        state.isSingingMode = !state.isSingingMode;
        document.getElementById('toggleSinging')?.classList.toggle('active', state.isSingingMode);
        document.getElementById('singingBanner')?.classList.toggle('show', state.isSingingMode);
    });

    // Settings toggles
    document.querySelectorAll<HTMLElement>('.settings-group .toggle[data-setting]').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const key = toggle.dataset.setting as keyof typeof state.settings;
            if (key in state.settings) {
                updateSettings({ [key]: !state.settings[key] });
                toggle.classList.toggle('active', state.settings[key]);
            }
        });
    });

    // Tab switching
    document.querySelectorAll<HTMLElement>('.tab[data-tab]').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById('tab-' + tab.dataset.tab)?.classList.add('active');
        });
    });

    // Theme toggle
    document.querySelector('.icon-btn[data-action="theme"]')?.addEventListener('click', toggleTheme);

    // Help modal
    document.querySelector('.icon-btn[data-action="help"]')?.addEventListener('click', () => {
        document.getElementById('helpModal')?.classList.add('show');
    });
    document.getElementById('closeHelpBtn')?.addEventListener('click', () => {
        document.getElementById('helpModal')?.classList.remove('show');
    });

    // Shortcuts modal
    document.getElementById('closeShortcutsBtn')?.addEventListener('click', () => {
        document.getElementById('shortcutsModal')?.classList.remove('show');
    });

    // Import history
    document.getElementById('importHistoryFile')?.addEventListener('change', (e) => {
        importHistory(e.target as HTMLInputElement);
    });

    // Text drag & drop
    textArea?.addEventListener('dragover', (e) => {
        e.preventDefault();
        textArea.classList.add('text-drop-active');
    });
    textArea?.addEventListener('dragleave', () => textArea.classList.remove('text-drop-active'));
    textArea?.addEventListener('drop', (e) => {
        e.preventDefault();
        textArea.classList.remove('text-drop-active');
        const file = e.dataTransfer?.files[0];
        if (file && file.name.match(/\.(txt|md)$/i)) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                textArea.value = ev.target?.result as string;
                updateCharCount();
            };
            reader.readAsText(file);
        }
    });

    // Init char count
    updateCharCount();

    // Init settings toggles state
    document.querySelectorAll<HTMLElement>('.toggle[data-setting]').forEach(toggle => {
        const key = toggle.dataset.setting as keyof typeof state.settings;
        if (key in state.settings) {
            toggle.classList.toggle('active', state.settings[key]);
        }
    });

    // Show onboarding on first visit
    if (state.settings.onboarding) {
        showOnboarding();
    }
}

function setStyle(style: string): void {
    const input = document.getElementById('style') as HTMLInputElement;
    if (!input) return;
    const current = input.value.trim();
    if (current && !current.includes(style)) {
        input.value = current + '，' + style;
    } else if (!current) {
        input.value = style;
    }
    document.querySelectorAll<HTMLElement>('.style-tag').forEach(tag => {
        tag.classList.toggle('active', tag.dataset.style === style);
    });
}

// Run init on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
