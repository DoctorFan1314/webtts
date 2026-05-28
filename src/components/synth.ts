import type { AudioFormat, ChatMessage } from '../types';
import { state, addToHistory, getApiKey, setApiKey, getApiBase, setApiBase } from '../state';
import { callSynthAPI, decodeAudioData, buildMessages } from '../api';
import { showStatus, getCurrentVoice, getCurrentFormat } from './ui-helpers';
import { animateWave } from './wave';
import { renderHistory } from './history';
import { synthesizeBatch } from './batch';

export async function synthesize(): Promise<void> {
    const apiBase = getApiBase();
    const apiKey = getApiKey();
    if (!apiKey) { showStatus('请输入 API Key', 'error'); return; }
    setApiBase(apiBase);
    setApiKey(apiKey);

    if (state.isBatchMode) {
        await synthesizeBatch(apiBase, apiKey);
        return;
    }

    const text = (document.getElementById('text') as HTMLTextAreaElement)?.value.trim();
    if (!text) { showStatus('请输入要合成的文本', 'error'); return; }

    const style = (document.getElementById('style') as HTMLInputElement)?.value.trim() || '';
    const format = getCurrentFormat();

    let model: string;
    let audioConfig: Record<string, unknown>;
    let messages: ChatMessage[];

    if (state.currentMode === 'preset') {
        const voice = (document.getElementById('voice') as HTMLSelectElement)?.value || '冰糖';
        model = 'mimo-v2.5-tts';
        audioConfig = { format, voice };
        messages = buildMessages(style, text, state.isSingingMode);
    } else if (state.currentMode === 'design') {
        const voiceDesc = (document.getElementById('voiceDesc') as HTMLTextAreaElement)?.value.trim();
        if (!voiceDesc) { showStatus('请输入音色描述', 'error'); return; }
        model = 'mimo-v2.5-tts-voicedesign';
        audioConfig = { format, optimize_text_preview: state.optimizeText };
        messages = [{ role: 'user' as const, content: voiceDesc }];
        if (!state.optimizeText) {
            messages.push({ role: 'assistant' as const, content: text });
        }
        if (style) {
            messages.unshift({ role: 'user' as const, content: style });
        }
    } else {
        if (!state.cloneBase64) { showStatus('请先上传音频样本', 'error'); return; }
        model = 'mimo-v2.5-tts-voiceclone';
        audioConfig = { format, voice: `data:${state.cloneMimeType};base64,${state.cloneBase64}` };
        messages = buildMessages(style, text, state.isSingingMode);
    }

    await doSynthesize(apiBase, apiKey, model, messages, audioConfig as { format: AudioFormat; voice?: string; optimize_text_preview?: boolean }, text, style);
}

async function doSynthesize(
    apiBase: string,
    apiKey: string,
    model: string,
    messages: ChatMessage[],
    audioConfig: { format: AudioFormat; voice?: string; optimize_text_preview?: boolean },
    text: string,
    style: string,
): Promise<void> {
    const btn = document.getElementById('synthesizeBtn') as HTMLButtonElement;
    state.abortController = new AbortController();
    state.isSynthesizing = true;

    btn.disabled = true;
    btn.innerHTML = '⏹ 取消合成';
    btn.className = 'btn btn-block btn-cancel';
    btn.onclick = cancelSynthesis;

    showStatus('正在调用 API，请稍候...', 'loading');
    animateWave(true);

    try {
        const response = await callSynthAPI(apiBase, apiKey, model, messages, audioConfig, state.abortController.signal);

        if (response.choices?.[0]?.message?.audio?.data) {
            const blob = decodeAudioData(response.choices[0].message.audio.data, audioConfig.format);
            const url = URL.createObjectURL(blob);
            state.currentAudioUrl = url;

            const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;
            if (audioPlayer) audioPlayer.src = url;

            const downloadLink = document.getElementById('downloadLink') as HTMLAnchorElement;
            if (downloadLink) {
                downloadLink.href = url;
                downloadLink.download = `webtts_${Date.now()}.${audioConfig.format}`;
            }

            document.getElementById('playerSection')?.classList.add('show');

            if (state.settings.autoplay) {
                audioPlayer?.play();
                animateWave(true);
            }
            if (state.settings.autodownload) {
                setTimeout(() => downloadLink?.click(), 500);
            }

            addToHistory({
                id: Date.now(), text, style, voice: getCurrentVoice(),
                format: audioConfig.format, audioUrl: url,
                mode: state.currentMode, timestamp: new Date().toLocaleString(),
            });
            renderHistory();
            showStatus('合成成功！', 'success');
        } else {
            throw new Error('返回数据格式错误');
        }
    } catch (error: unknown) {
        if (error instanceof Error && error.name === 'AbortError') {
            showStatus('已取消合成', 'loading');
        } else {
            console.error('Error:', error);
            showStatus('错误: ' + (error instanceof Error ? error.message : String(error)), 'error');
        }
    } finally {
        state.isSynthesizing = false;
        state.abortController = null;
        btn.disabled = false;
        btn.innerHTML = '▶ 开始合成';
        btn.className = 'btn btn-block';
        btn.onclick = () => { synthesize(); };
        setTimeout(() => animateWave(false), 2000);
    }
}

export function cancelSynthesis(): void {
    state.abortController?.abort();
}

export function copyAudioUrl(): void {
    if (state.currentAudioUrl) {
        navigator.clipboard.writeText(state.currentAudioUrl).then(() => {
            showStatus('链接已复制', 'success');
        }).catch(() => showStatus('复制失败', 'error'));
    }
}

export function saveToHistory(): void {
    const text = (document.getElementById('text') as HTMLTextAreaElement)?.value.trim() || '';
    const style = (document.getElementById('style') as HTMLInputElement)?.value.trim() || '';

    if (state.currentAudioUrl) {
        addToHistory({
            id: Date.now(), text, style, voice: getCurrentVoice(),
            format: getCurrentFormat(), audioUrl: state.currentAudioUrl,
            mode: state.currentMode, timestamp: new Date().toLocaleString(),
        });
        renderHistory();
        showStatus('已保存到历史记录', 'success');
    }
}
