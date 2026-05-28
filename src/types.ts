export type SynthMode = 'preset' | 'design' | 'clone';
export type AudioFormat = 'wav' | 'mp3';
export type StatusType = 'loading' | 'success' | 'error';

export interface Settings {
    autoplay: boolean;
    autodownload: boolean;
    savehistory: boolean;
    charcount: boolean;
    onboarding: boolean;
}

export interface HistoryItem {
    id: number;
    text: string;
    style: string;
    voice: string;
    format: AudioFormat;
    audioUrl: string;
    mode: SynthMode;
    timestamp: string;
}

export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export interface AudioConfig {
    format: AudioFormat;
    voice?: string;
    optimize_text_preview?: boolean;
}

export interface SynthRequest {
    model: string;
    messages: ChatMessage[];
    audio: AudioConfig;
}

export interface SynthResponse {
    choices?: {
        message?: {
            audio?: {
                data: string;
            };
        };
    }[];
    error?: {
        message: string;
    };
}
