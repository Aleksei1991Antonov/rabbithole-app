import React, { useEffect, useRef } from 'react';
import { getMaxUserData } from '../components/maxBridge';

const UserMatrixBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // 1. ПОДГОТОВКА ИМЕНИ
        const userData = getMaxUserData();
        const rawName = (userData?.fullName || "SYSTEM").toUpperCase();
        const cleanName = rawName.replace(/СУБЪЕКТ[:\s]*/gi, '').trim();

        // ИЗМЕНЕНО: ровно один пробел в конце для минимального отступа
        const nameArray = ("♥" + cleanName + "").split('');

        let animationFrameId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        const fontSize = 18;
        const columns = Math.floor(canvas.width / fontSize);

        const drops: number[] = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * -canvas.height;
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `bold ${fontSize}px monospace`;
            ctx.textBaseline = 'top';

            for (let i = 0; i < drops.length; i++) {
                const step = Math.floor(drops[i] / fontSize);
                const charIndex = Math.abs(step) % nameArray.length;
                const text = nameArray[charIndex];

                ctx.fillStyle = '#00ffcc';
                ctx.globalAlpha = 0.5;

                const yPos = (step * fontSize) % (Math.floor(canvas.height / fontSize) * fontSize + fontSize);

                if (yPos >= 0) {
                    ctx.fillText(
                        text,
                        i * fontSize,
                        yPos
                    );
                }

                drops[i] += 1.0;

                if (drops[i] > canvas.height) {
                    drops[i] = 0;
                }
            }
            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 0, background: 'black' }}
        />
    );
};

export default UserMatrixBackground;