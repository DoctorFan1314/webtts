import type { Settings, HistoryItem } from './types';

const SETTINGS_KEY = 'webtts_settings';
const HISTORY_KEY = 'webtts_history';
const API_KEY_KEY = 'webtts_apikey';
const THEME_KEY = 'webtts_theme';

const DEFAULT_SETTINGS: Settings = {
    autoplay: true,
    autodownload: false,
    savehistory: true,
    charcount: true,
    onboarding: true,
};

export function loadSettings(): Settings {
    const saved = localStorage.getItem(SETTINGS_KEY);
    return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : { ...DEFAULT_SETTINGS };
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

export function loadHistory(): HistoryItem[] {
    const saved = localStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
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
