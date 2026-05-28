import { showStatus } from './ui-helpers';

const DIRECTOR_PRESETS: Record<string, { role: string; scene: string; guide: string }> = {
    romance: {
        role: '百年门阀的大小姐，自幼被培养成家族继承人，性格冷傲矜持，说话文白杂糅，带着旧时代的清雅与锋利',
        scene: '在祠堂阴影里，面对一个试图带她私奔的男人，她要用最冷硬的阶级壁垒绞杀对方的感情',
        guide: '冰冷慵懒的低音御姐，语速极慢，每个字都在舌尖滚过才吐出，句间留极长空白。实音重且硬，某些尾音加入轻微气音',
    },
    noir: {
        role: '四十年代上海租界的私家侦探，见过太多人间黑暗，说话带着玩世不恭的疲惫和洞察一切的犀利',
        scene: '深夜办公室，窗外霓虹闪烁，他独自对着录音机讲述最后一个案子的真相',
        guide: '沙哑低沉，语速不紧不慢，像在自言自语。偶尔苦笑，偶尔叹气，带着烟嗓的质感',
    },
    comedy: {
        role: '二十出头的东北小伙子，热情开朗嘴贫，说话像连珠炮，啥事都能往搞笑方向带',
        scene: '在烧烤摊跟哥们吹牛，越说越夸张，自己都快绷不住了',
        guide: '语速快，声音明亮，带着压不住的笑意。重音夸张，偶尔破音，偶尔大笑',
    },
    epic: {
        role: '苍老的帝王，历经沧桑统一六国，站在城墙上俯瞰万里江山',
        scene: '暮年，最后一次登上城楼，回忆一生征战，感慨万千',
        guide: '苍老而威严，语速缓慢沉稳，字字千钧。带着帝王的孤独与苍凉，偶尔长叹',
    },
};

export function toggleDirector(): void {
    const fields = document.getElementById('directorFields');
    const arrow = document.getElementById('directorArrow');
    fields?.classList.toggle('show');
    if (arrow) arrow.textContent = fields?.classList.contains('show') ? '▼' : '▶';
}

export function setDirectorPreset(preset: string): void {
    const p = DIRECTOR_PRESETS[preset];
    if (!p) return;
    (document.getElementById('directorRole') as HTMLTextAreaElement).value = p.role;
    (document.getElementById('directorScene') as HTMLTextAreaElement).value = p.scene;
    (document.getElementById('directorGuide') as HTMLTextAreaElement).value = p.guide;
}

export function composeDirector(): void {
    const role = (document.getElementById('directorRole') as HTMLTextAreaElement)?.value.trim() || '';
    const scene = (document.getElementById('directorScene') as HTMLTextAreaElement)?.value.trim() || '';
    const guide = (document.getElementById('directorGuide') as HTMLTextAreaElement)?.value.trim() || '';

    if (!role && !scene && !guide) {
        showStatus('请先填写角色、场景或指导', 'error');
        return;
    }

    let composed = '';
    if (role) composed += '角色：' + role + '。';
    if (scene) composed += ' 场景：' + scene + '。';
    if (guide) composed += ' 指导：' + guide;

    (document.getElementById('style') as HTMLInputElement).value = composed.trim();
    showStatus('已合成为风格指令', 'success');
}

export function initDirector(): void {
    document.querySelector('.director-toggle')?.addEventListener('click', toggleDirector);
    document.querySelector('.director-presets .btn-outline')?.addEventListener('click', composeDirector);

    document.querySelectorAll<HTMLElement>('.dim-tag[data-director]').forEach(tag => {
        tag.addEventListener('click', () => {
            const name = tag.dataset.director;
            if (name) setDirectorPreset(name);
        });
    });
}
