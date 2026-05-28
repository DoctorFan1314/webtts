import type { ChatMessage } from '../types';
import { state, addToHistory } from '../state';
import { callSynthAPI, decodeAudioData, buildMessages } from '../api';
import { showStatus, getCurrentFormat } from './ui-helpers';

export function toggleBatchMode(): void {
    state.isBatchMode = !state.isBatchMode;
    document.getElementById('toggleBatch')?.classList.toggle('active', state.isBatchMode);
    document.getElementById('batchSection')?.classList.toggle('show', state.isBatchMode);
}

export async function synthesizeBatch(apiBase: string, apiKey: string): Promise<void> {
    const rawText = (document.getElementById('batchText') as HTMLTextAreaElement)?.value.trim();
    if (!rawText) { showStatus('请输入批量文本', 'error'); return; }

    const segments = rawText.split(/\n---\n|\n---$|^---\n/).map(s => s.trim()).filter(Boolean);
    if (segments.length === 0) { showStatus('无有效文本段', 'error'); return; }

    const style = (document.getElementById('style') as HTMLInputElement)?.value.trim() || '';
    const format = getCurrentFormat();
    const btn = document.getElementById('synthesizeBtn') as HTMLButtonElement;

    let model: string;
    let voice: string;
    let buildMsgs: (text: string) => ChatMessage[];

    if (state.currentMode === 'design') {
        const voiceDesc = (document.getElementById('voiceDesc') as HTMLTextAreaElement)?.value.trim() || '';
        model = 'mimo-v2.5-tts-voicedesign';
        voice = '';
        buildMsgs = (text: string) => {
            const msgs: ChatMessage[] = [{ role: 'user' as const, content: voiceDesc }];
            if (!state.optimizeText) msgs.push({ role: 'assistant' as const, content: text });
            if (style) msgs.unshift({ role: 'user' as const, content: style });
            return msgs;
        };
    } else if (state.currentMode === 'clone') {
        model = 'mimo-v2.5-tts-voiceclone';
        voice = `data:${state.cloneMimeType};base64,${state.cloneBase64}`;
        buildMsgs = (text: string) => buildMessages(style, text, state.isSingingMode);
    } else {
        model = 'mimo-v2.5-tts';
        voice = (document.getElementById('voice') as HTMLSelectElement)?.value || '冰糖';
        buildMsgs = (text: string) => buildMessages(style, text, state.isSingingMode);
    }

    btn.disabled = true;
    btn.innerHTML = '<div class="spinner"></div> 批量合成中...';
    showStatus(`批量合成：0 / ${segments.length}`, 'loading');

    let completed = 0;
    let successCount = 0;

    for (let i = 0; i < segments.length; i++) {
        try {
            const messages = buildMsgs(segments[i]);
            const audioConfig = { format, voice, optimize_text_preview: state.optimizeText };
            const response = await callSynthAPI(apiBase, apiKey, model, messages, audioConfig);

            if (response.choices?.[0]?.message?.audio?.data) {
                const audioBase64 = response.choices[0].message.audio.data;
                const blob = decodeAudioData(audioBase64, format);
                const url = URL.createObjectURL(blob);
                if (state.settings.savehistory) {
                    addToHistory({
                        id: Date.now() + i, text: segments[i], style, voice, format,
                        audioUrl: url, audioBase64, mode: state.currentMode,
                        timestamp: new Date().toLocaleString(),
                    });
                }
                successCount++;
            }
        } catch (err) {
            console.error(`段落 ${i + 1} 失败:`, err);
        }
        completed++;
        showStatus(`批量合成：${completed} / ${segments.length}`, 'loading');
    }

    btn.disabled = false;
    btn.innerHTML = '▶ 开始合成';
    showStatus(`批量合成完成！成功 ${successCount} / ${segments.length}`, 'success');
}

export function initBatch(): void {
    document.getElementById('toggleBatch')?.addEventListener('click', toggleBatchMode);
}
