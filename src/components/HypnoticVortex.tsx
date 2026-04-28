import React, { useEffect, useRef } from 'react';

const HypnoticVortex: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Возвращаем alpha: true для прозрачности фона канваса
        const ctx = canvas.getContext('2d', {
            alpha: true,
            desynchronized: true
        });
        if (!ctx) return;

        let animationFrameId: number;
        const particles: Particle[] = [];
        const particleCount = 60;
        const connectionDistance = 140;

        class Particle {
            x: number; y: number; vx: number; vy: number; size: number;
            constructor(w: number, h: number) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.size = Math.random() * 1.5 + 1;
            }
            update(w: number, h: number) {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > w) this.vx *= -1;
                if (this.y < 0 || this.y > h) this.vy *= -1;
            }
        }

        const init = (w: number, h: number) => {
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(w, h));
            }
        };

        let lastWidth = 0;
        let lastHeight = 0;

        const resize = () => {
            const parent = containerRef.current;
            if (!parent) return;

            const { clientWidth: w, clientHeight: h } = parent;

            if (Math.abs(lastWidth - w) > 10 || Math.abs(lastHeight - h) > 10) {
                if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);

                resizeTimerRef.current = setTimeout(() => {
                    canvas.width = w;
                    canvas.height = h;
                    lastWidth = w;
                    lastHeight = h;
                    init(w, h);
                }, 150);
            }
        };

        const draw = () => {
            // ВАЖНО: Используем clearRect вместо fillRect для прозрачности
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.lineWidth = 0.8;

            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                p1.update(canvas.width, canvas.height);

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        const opacity = (1 - dist / connectionDistance) * 0.15;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 255, 204, ${opacity})`;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }

                ctx.beginPath();
                ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 255, 204, 0.3)';
                ctx.fill();
            }
            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);

        const initialParent = containerRef.current;
        if (initialParent) {
            canvas.width = initialParent.clientWidth;
            canvas.height = initialParent.clientHeight;
            lastWidth = canvas.width;
            lastHeight = canvas.height;
            init(canvas.width, canvas.height);
        }

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full pointer-events-none overflow-hidden bg-transparent">
            <canvas
                ref={canvasRef}
                className="block w-full h-full will-change-transform"
                style={{
                    transform: 'translate3d(0,0,0)',
                    backfaceVisibility: 'hidden',
                    imageRendering: 'auto'
                }}
            />
        </div>
    );
};

export default HypnoticVortex;