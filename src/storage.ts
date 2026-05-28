import type { Settings, HistoryItem } from './types';

const SETTINGS_KEY = 'webtts_settings';
const HISTORY_KEY = 'webtts_history';
const API_KEY_KEY = 'webtts_apikey';
const API_BASE_KEY = 'webtts_apibase';
const THEME_KEY = 'webtts_theme';

const DEFAULT_SETTINGS: Settings = {
    autoplay: true,
    autodownload: false,
    savehistory: true,
    charcount: true,
    onboarding: true,
};

export function loadSettings(): Settings {
    try {
        const saved = localStorage.getItem(SETTINGS_KEY);
        return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : { ...DEFAULT_SETTINGS };
    } catch {
        return { ...DEFAULT_SETTINGS };
    }
}

export function saveSettings(settings: Settings): void {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function loadApiKey(): string {
    return localStorage.getItem(API_KEY_KEY) || '';
}

export function saveApiKey(key: string): void {
    localStorage.setItem(API_KEY_KEY, key);
}

export function loadApiBase(): string {
    return localStorage.getItem(API_BASE_KEY) || 'https://api.xiaomimimo.com/v1';
}

export function saveApiBase(base: string): void {
    localStorage.setItem(API_BASE_KEY, base);
}

export function loadHistory(): HistoryItem[] {
    try {
        const saved = localStorage.getItem(HISTORY_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
}

export function saveHistory(history: HistoryItem[]): void {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function loadTheme(): string {
    return localStorage.getItem(THEME_KEY) || '';
}

export function saveTheme(theme: string): void {
    localStorage.setItem(THEME_KEY, theme);
}
