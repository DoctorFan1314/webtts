import { updateCharCount, switchMode } from './ui-helpers';
import { showToast } from './toast';

interface Template {
    text: string;
    style: string;
    voice: string;
}

const TEMPLATES: Record<string, Template> = {
    news: {
        text: '观众朋友们大家好，欢迎收看今天的新闻节目。首先来关注国内要闻，近日，我国在科技创新领域取得重大突破，多项核心技术实现自主可控。',
        style: '新闻播报，专业严肃，语速适中',
        voice: '白桦',
    },
    weather: {
        text: '各位观众朋友大家好，欢迎收看今天的天气预报。今天白天到夜间，本市天气晴转多云，气温15到25度，东南风3到4级。出行的朋友请注意防晒。',
        style: '轻松活泼，亲切自然',
        voice: '冰糖',
    },
    story: {
        text: '从前啊，在一个遥远的小村庄里，住着一只可爱的小白兔。小白兔每天都会去森林里采蘑菇，和小鸟们一起唱歌。有一天，它发现了一朵会发光的神奇花朵...',
        style: '温柔讲故事，语速稍慢，充满童趣',
        voice: '茉莉',
    },
    ad: {
        text: '好消息好消息！全新升级的超级产品震撼来袭！采用最新科技，给您带来前所未有的体验。现在购买，更有超值优惠等着你！赶快行动吧！',
        style: '活力四射，激情澎湃，感染力强',
        voice: '苏打',
    },
    meditation: {
        text: '请找一个舒适的位置坐下，轻轻闭上眼睛。深深地吸一口气，感受空气充满你的胸腔。然后缓缓地呼出，让所有的紧张和疲惫都随着这口气离开你的身体。',
        style: '极度舒缓，轻声细语，平静安宁',
        voice: '茉莉',
    },
    education: {
        text: '同学们好，今天我们来学习一个非常有趣的知识点。请大家注意听讲，这个概念在考试中经常出现。我们先从最基础的定义开始，一步步深入理解。',
        style: '清晰讲解，耐心细致，重点突出',
        voice: '苏打',
    },
};

export function useTemplate(type: string): void {
    const t = TEMPLATES[type];
    if (!t) return;

    const textArea = document.getElementById('text') as HTMLTextAreaElement;
    if (textArea?.value.trim()) {
        if (!confirm('加载模板将覆盖当前文本和风格，确定继续？')) return;
    }

    switchMode('preset');

    (document.getElementById('text') as HTMLTextAreaElement).value = t.text;
    (document.getElementById('style') as HTMLInputElement).value = t.style;
    (document.getElementById('voice') as HTMLSelectElement).value = t.voice;
    updateCharCount();
    showToast('已加载模板', 'success');
}

export function initTemplates(): void {
    document.querySelectorAll<HTMLElement>('.template-card').forEach(card => {
        card.addEventListener('click', () => {
            const type = card.dataset.template;
            if (type) useTemplate(type);
        });
    });
}
