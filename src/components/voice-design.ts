import { state } from '../state';

const VOICE_PRESETS: Record<string, string> = {
    asmr: '年轻女性，极端近耳双声道ASMR感，能听到呼吸声和轻微的吞咽声，语速极慢，营造深度放松沉浸体验',
    radio: '深夜电台男主播，嗓音低沉磁性，语速缓慢慵懒，像在和你一个人聊天，温暖治愈',
    narrator: '纪录片旁白，沉稳大气的男声，语速适中，字正腔圆，充满历史厚重感',
    storyteller: '一位年迈的老先生，说带北方口音的普通话，语速缓慢而沉稳，嗓音略带沙哑和沧桑感，仿佛一位饱经风霜的老爷爷在讲故事',
    podcast: '年轻活力的播客主持人，语速偏快，咬字清晰，时而幽默时而认真，像在和老朋友聊天',
    child: '七八岁的小女孩，声音稚嫩清脆，语速偏快，天真活泼，充满好奇心',
};

export function appendVoiceDesc(text: string): void {
    const ta = document.getElementById('voiceDesc') as HTMLTextAreaElement;
    if (!ta) return;
    const current = ta.value.trim();
    ta.value = current ? current + '，' + text : text;
}

export function setVoicePreset(preset: string): void {
    const ta = document.getElementById('voiceDesc') as HTMLTextAreaElement;
    if (ta && VOICE_PRESETS[preset]) {
        ta.value = VOICE_PRESETS[preset];
    }
}

export function toggleOptimizeText(): void {
    state.optimizeText = !state.optimizeText;
    document.getElementById('toggleOptimize')?.classList.toggle('active', state.optimizeText);
}

export function initVoiceDesign(): void {
    document.querySelectorAll<HTMLElement>('.dim-tag[data-voice-desc]').forEach(tag => {
        tag.addEventListener('click', () => {
            const text = tag.dataset.voiceDesc;
            if (text) appendVoiceDesc(text);
        });
    });

    document.querySelectorAll<HTMLElement>('.voice-preset[data-preset]').forEach(preset => {
        preset.addEventListener('click', () => {
            const name = preset.dataset.preset;
            if (name) setVoicePreset(name);
        });
    });

    document.getElementById('toggleOptimize')?.addEventListener('click', toggleOptimizeText);
}
