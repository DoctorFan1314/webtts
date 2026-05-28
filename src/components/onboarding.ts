import { state, updateSettings } from '../state';

export function showOnboarding(): void {
    state.onboardingStep = 0;
    document.getElementById('onboarding')?.classList.add('show');
    updateOnboardingUI();
}

function updateOnboardingUI(): void {
    document.querySelectorAll<HTMLElement>('.onboarding-step').forEach(s => s.classList.remove('active'));
    document.querySelector(`.onboarding-step[data-step="${state.onboardingStep}"]`)?.classList.add('active');

    document.querySelectorAll<HTMLElement>('.onboarding-dot').forEach((d, i) => {
        d.classList.toggle('active', i === state.onboardingStep);
    });

    const btn = document.getElementById('onboardingNextBtn');
    if (btn) btn.textContent = state.onboardingStep === 3 ? '开始使用' : '下一步';
}

export function onboardingNext(): void {
    state.onboardingStep++;
    if (state.onboardingStep >= 4) {
        onboardingSkip();
        return;
    }
    updateOnboardingUI();
}

export function onboardingSkip(): void {
    document.getElementById('onboarding')?.classList.remove('show');
    updateSettings({ onboarding: false });
}

export function initOnboarding(): void {
    document.getElementById('onboardingNextBtn')?.addEventListener('click', onboardingNext);
    document.querySelector('.onboarding-actions .btn-outline')?.addEventListener('click', onboardingSkip);
}
