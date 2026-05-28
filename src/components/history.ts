import { state, removeFromHistory, clearAllHistory, importHistoryItems } from '../state';
import { showStatus, escapeHtml } from './ui-helpers';

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
                <div class="history-meta">${item.voice || item.mode || ''} · ${item.style || '默认风格'} · ${item.timestamp}</div>
            </div>
            <div class="history-actions">
                <button class="history-btn" data-load="${item.id}" title="加载">↩</button>
                <button class="history-btn" data-delete="${item.id}" title="删除">✕</button>
            </div>
        </div>
    `).join('');

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
}

export function importHistory(input: HTMLInputElement): void {
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const imported = JSON.parse(e.target?.result as string);
            if (Array.isArray(imported)) {
                importHistoryItems(imported);
                renderHistory();
                showStatus(`已导入 ${imported.length} 条记录`, 'success');
            }
        } catch {
            showStatus('导入失败：文件格式错误', 'error');
        }
    };
    reader.readAsText(file);
    input.value = '';
}

export function initHistory(): void {
    renderHistory();

    document.getElementById('historySearchInput')?.addEventListener('input', renderHistory);
    document.querySelector('.history-actions-bar .btn-outline')?.addEventListener('click', exportHistory);
    document.querySelector('.history-actions-bar .btn-danger')?.addEventListener('click', () => {
        if (confirm('确定要清空所有历史记录吗？')) {
            clearAllHistory();
            renderHistory();
        }
    });
}
