let animFrame: number | null = null;
let audioCtx: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
let source: MediaElementAudioSourceNode | null = null;

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

function connectAudio(audioPlayer: HTMLAudioElement): void {
    if (!audioCtx) {
        audioCtx = new AudioContext();
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 128;
        analyser.smoothingTimeConstant = 0.7;
        analyser.connect(audioCtx.destination);
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();

    try {
        source = audioCtx.createMediaElementSource(audioPlayer);
        if (analyser) source.connect(analyser);
    } catch {
        // already connected
    }
}

export function animateWave(playing: boolean, audioPlayer?: HTMLAudioElement): void {
    if (animFrame) {
        cancelAnimationFrame(animFrame);
        animFrame = null;
    }

    const bars = document.querySelectorAll<HTMLElement>('.wave-bar');

    if (playing && audioPlayer) {
        connectAudio(audioPlayer);

        if (!analyser) {
            animateRandom(bars);
            return;
        }

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        function animate() {
            analyser!.getByteFrequencyData(dataArray);
            const step = Math.floor(dataArray.length / bars.length);
            bars.forEach((bar, i) => {
                const value = dataArray[i * step] || 0;
                const height = Math.max(10, (value / 255) * 50);
                bar.style.height = height + 'px';
            });
            animFrame = requestAnimationFrame(animate);
        }
        animate();
    } else if (playing) {
        animateRandom(bars);
    } else {
        bars.forEach(bar => { bar.style.height = '10px'; });
    }
}

function animateRandom(bars: NodeListOf<HTMLElement>): void {
    function animate() {
        bars.forEach(bar => {
            bar.style.height = (Math.random() * 40 + 10) + 'px';
        });
        animFrame = requestAnimationFrame(animate);
    }
    animate();
}
