import type { ChatMessage, AudioConfig, SynthResponse, AudioFormat } from './types';

export async function callSynthAPI(
    apiBase: string,
    apiKey: string,
    model: string,
    messages: ChatMessage[],
    audio: AudioConfig,
    signal?: AbortSignal,
): Promise<SynthResponse> {
    const url = apiBase.replace(/\/+$/, '') + '/chat/completions';

    const timeoutController = new AbortController();
    const timeoutId = setTimeout(() => timeoutController.abort(), 60000);

    const combinedSignal = signal
        ? AbortSignal.any([signal, timeoutController.signal])
        : timeoutController.signal;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({ model, messages, audio }),
            signal: combinedSignal,
        });

        if (!response.ok) {
            const errorData: SynthResponse = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `API 请求失败: ${response.status}`);
        }

        return response.json();
    } finally {
        clearTimeout(timeoutId);
    }
}

export function decodeAudioData(base64Data: string, format: AudioFormat): Blob {
    const audioBytes = atob(base64Data);
    const byteArray = new Uint8Array(audioBytes.length);
    for (let i = 0; i < audioBytes.length; i++) {
        byteArray[i] = audioBytes.charCodeAt(i);
    }
    const mimeType = format === 'mp3' ? 'audio/mpeg' : 'audio/wav';
    return new Blob([byteArray], { type: mimeType });
}

export function buildMessages(style: string, text: string, singing: boolean): ChatMessage[] {
    let finalText = text;
    if (singing && !finalText.startsWith('(唱歌)')) {
        finalText = '(唱歌)' + finalText;
    }
    const messages: ChatMessage[] = [];
    if (style) messages.push({ role: 'user', content: style });
    messages.push({ role: 'assistant', content: finalText });
    return messages;
}
