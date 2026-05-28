export function insertAudioTag(tag: string): void {
    const ta = document.getElementById('text') as HTMLTextAreaElement;
    if (!ta) return;
    const pos = ta.selectionStart;
    const text = ta.value;
    const insert = '[' + tag + ']';
    ta.value = text.slice(0, pos) + insert + text.slice(pos);
    ta.focus();
    ta.selectionStart = ta.selectionEnd = pos + insert.length;
    ta.dispatchEvent(new Event('input'));
}

export function toggleAudioTags(): void {
    document.getElementById('tagsBody')?.classList.toggle('open');
    document.getElementById('tagsToggleIcon')?.classList.toggle('open');
}

export function initAudioTags(): void {
    document.querySelector('.tags-header')?.addEventListener('click', toggleAudioTags);
    document.querySelectorAll<HTMLElement>('.audio-tag[data-tag]').forEach(tag => {
        tag.addEventListener('click', () => {
            const tagName = tag.dataset.tag;
            if (tagName) insertAudioTag(tagName);
        });
    });
}
