let animFrame: number | null = null;

export function initWaveVisualizer(): void {
    const visualizer = document.getElementById('waveVisualizer');
    if (!visualizer) return;
    for (let i = 0; i < 40; i++) {
        const bar = document.createElement('div');
        bar.className = 'wave-bar';
        bar.style.height = '10px';
        visualizer.appendChild(bar);
    }
}

export function animateWave(playing: boolean): void {
    if (animFrame) {
        cancelAnimationFrame(animFrame);
        animFrame = null;
    }
    if (playing) {
        const bars = document.querySelectorAll<HTMLElement>('.wave-bar');
        function animate() {
            bars.forEach(bar => {
                bar.style.height = (Math.random() * 40 + 10) + 'px';
            });
            animFrame = requestAnimationFrame(animate);
        }
        animate();
    } else {
        document.querySelectorAll<HTMLElement>('.wave-bar').forEach(bar => {
            bar.style.height = '10px';
        });
    }
}
