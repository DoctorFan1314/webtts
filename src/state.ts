import type { Settings, HistoryItem, SynthMode } from './types';
import { loadSettings, loadHistory, saveSettings, saveHistory, saveApiKey } from './storage';

export const state = {
    settings: loadSettings(),
    history: loadHistory(),
    currentAudioUrl: null as string | null,
    currentMode: 'preset' as SynthMode,
    isSingingMode: false,
    isBatchMode: false,
    optimizeText: false,
    cloneBase64: null as string | null,
    cloneMimeType: null as string | null,
    abortController: null as AbortController | null,
    isSynthesizing: false,
    onboardingStep: 0,
};

export function updateSettings(partial: Partial<Settings>): void {
    Object.assign(state.settings, partial);
    saveSettings(state.settings);
}

export function addToHistory(item: HistoryItem): void {
    state.history.unshift(item);
    if (state.history.length > 100) state.history = state.history.slice(0, 100);
    saveHistory(state.history);
}

export function removeFromHistory(id: number): void {
    state.history = state.history.filter(h => h.id !== id);
    saveHistory(state.history);
}

export function clearAllHistory(): void {
    state.history = [];
    saveHistory(state.history);
}

export function importHistoryItems(items: HistoryItem[]): void {
    state.history = [...items, ...state.history];
    if (state.history.length > 200) state.history = state.history.slice(0, 200);
    saveHistory(state.history);
}

export function getApiKey(): string {
    return (document.getElementById('apiKey') as HTMLInputElement)?.value?.trim() || '';
}

export function setApiKey(key: string): void {
    const el = document.getElementById('apiKey') as HTMLInputElement;
    if (el) el.value = key;
    saveApiKey(key);
}
