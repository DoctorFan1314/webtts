import { state, removeFromHistory, clearAllHistory, importHistoryItems } from '../state';
import { showStatus, escapeHtml } from './ui-helpers';
import { decodeAudioData } from '../api';
import { showToast } from './toast';

export function renderHistory(): void {
    const list = document.getElementById('historyList');
    if (!list) return;

    const query = ((document.getElementById('historySearchInput') as HTMLInputElement)?.value || '').toLowerCase();
    const filtered = query
        ? state.history.filter(h =>
            h.text.toLowerCase().includes(query) ||
            (h.voice || '').toLowerCase().includes(query) ||
            (h.style || '').toLowerCase().includes(query)
        )
        : state.history;

    if (filtered.length === 0) {
        list.innerHTML = `<div class="empty-state">${query ? '无匹配记录' : '暂无历史记录'}</div>`;
        return;
    }

    list.innerHTML = filtered.map(item => `
        <div class="history-item">
            <div class="history-info">
                <div class="history-text">${escapeHtml(item.text)}</div>
                <div class="history-meta">${escapeHtml(item.voice || item.mode || '')} · ${escapeHtml(item.style || '默认风格')} · ${escapeHtml(item.timestamp)}</div>
            </div>
            <div class="history-actions">
                ${item.audioBase64 ? `<button class="history-btn" data-play="${item.id}" title="播放">▶</button>` : ''}
                <button class="history-btn" data-load="${item.id}" title="加载">↩</button>
                <button class="history-btn" data-delete="${item.id}" title="删除">✕</button>
            </div>
        </div>
    `).join('');

    list.querySelectorAll<HTMLElement>('[data-play]').forEach(btn => {
        btn.addEventListener('click', () => playHistoryItem(Number(btn.dataset.play)));
    });
    list.querySelectorAll<HTMLElement>('[data-load]').forEach(btn => {
        btn.addEventListener('click', () => loadHistoryItem(Number(btn.dataset.load)));
    });
    list.querySelectorAll<HTMLElement>('[data-delete]').forEach(btn => {
        btn.addEventListener('click', () => {
            removeFromHistory(Number(btn.dataset.delete));
            renderHistory();
        });
    });
}

function playHistoryItem(id: number): void {
    const item = state.history.find(h => h.id === id);
    if (!item?.audioBase64) return;

    const blob = decodeAudioData(item.audioBase64, item.format);
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play().catch(() => showStatus('播放失败', 'error'));
    audio.addEventListener('ended', () => URL.revokeObjectURL(url));
}

function loadHistoryItem(id: number): void {
    const item = state.history.find(h => h.id === id);
    if (!item) return;

    (document.getElementById('text') as HTMLTextAreaElement).value = item.text;
    (document.getElementById('style') as HTMLInputElement).value = item.style || '';

    if (item.mode === 'preset' && item.voice) {
        const voiceEl = document.getElementById('voice') as HTMLSelectElement;
        if (voiceEl) voiceEl.value = item.voice;
    }

    document.getElementById('text')?.dispatchEvent(new Event('input'));
    showStatus('已加载历史记录', 'success');
}

export function exportHistory(): void {
    const blob = new Blob([JSON.stringify(state.history, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'webtts_history_' + Date.now() + '.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export function importHistory(input: HTMLInputElement): void {
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const imported = JSON.parse(e.target?.result as string);
            if (Array.isArray(imported)) {
                const valid = imported.filter((item: Record<string, unknown>) =>
                    typeof item.id === 'number' && typeof item.text === 'string'
                );
                importHistoryItems(valid);
                renderHistory();
                showToast(`已导入 ${valid.length} 条记录`, 'success');
            }
        } catch {
            showToast('导入失败：文件格式错误', 'error');
        }
    };
    reader.readAsText(file);
    input.value = '';
}

export function initHistory(): void {
    renderHistory();

    document.getElementById('historySearchInput')?.addEventListener('input', renderHistory);
    document.getElementById('exportHistoryBtn')?.addEventListener('click', exportHistory);
    document.getElementById('clearHistoryBtn')?.addEventListener('click', () => {
        if (confirm('确定要清空所有历史记录吗？')) {
            clearAllHistory();
            renderHistory();
        }
    });
}
