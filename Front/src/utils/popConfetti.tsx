import confetti from 'canvas-confetti';
export default function PopConfetti() {
    for (let index = 0; index < 10; index++) {
        confetti({
            particleCount: 7,
            origin: { x: Math.random() - 0.1, y: Math.random() - 0.1, },
        });
    }
}
