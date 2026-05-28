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
    const voice = (document.getElementById('voice') as HTMLSelectElement)?.value || '冰糖';
    const btn = document.getElementById('synthesizeBtn') as HTMLButtonElement;

    btn.disabled = true;
    btn.innerHTML = '<div class="spinner"></div> 批量合成中...';
    showStatus(`批量合成：0 / ${segments.length}`, 'loading');

    let completed = 0;
    let successCount = 0;

    for (let i = 0; i < segments.length; i++) {
        try {
            const messages = buildMessages(style, segments[i], state.isSingingMode);
            const audioConfig = { format, voice };
            const response = await callSynthAPI(apiBase, apiKey, 'mimo-v2.5-tts', messages, audioConfig);

            if (response.choices?.[0]?.message?.audio?.data) {
                const blob = decodeAudioData(response.choices[0].message.audio.data, format);
                const url = URL.createObjectURL(blob);
                addToHistory({
                    id: Date.now() + i, text: segments[i], style, voice, format,
                    audioUrl: url, mode: 'preset',
                    timestamp: new Date().toLocaleString(),
                });
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
