import React, { useState } from 'react';
import { Smartphone, ShieldAlert, Copy, Check, Info, Download, Mail } from 'lucide-react';
import UserMatrixBackground from '../components/UserMatrixBackground';

// ВАЖНО: Добавляем интерфейс пропсов для устранения ошибки TS2322
interface DesktopBlockerProps {
    onBypass?: () => void;
}

const DesktopBlocker: React.FC<DesktopBlockerProps> = ({ onBypass }) => {
    const [copied, setCopied] = useState(false);
    const [clickCount, setClickCount] = useState(0); // Счетчик для секретного входа

    const botLink = "max.ru/id760407796785_bot";
    const fullLink = "https://max.ru/id760407796785_bot?startapp=success";
    const downloadLink = "https://max.ru/";
    const supportEmail = "RABBITHOLE.HELP@VK.COM";

    // Функция обработки секретных кликов
    const handleSecretClick = () => {
        const newCount = clickCount + 1;
        if (newCount >= 5) {
            if (onBypass) onBypass();
        } else {
            setClickCount(newCount);
            // Сброс счетчика через 2 секунды бездействия
            setTimeout(() => setClickCount(0), 2000);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(fullLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center h-screen w-full bg-black p-8 text-center overflow-hidden">
            {/* Встроенные стили для устранения мерцания и плавной анимации */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fadeInEntry {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-entry {
                    animation: fadeInEntry 1s ease-out forwards;
                    will-change: transform, opacity;
                }
                /* Убираем мерцание: форсируем отрисовку без лишних слоев */
                canvas {
                    backface-visibility: hidden;
                    transform: translateZ(0);
                    image-rendering: optimizeSpeed;
                }
                * {
                    -webkit-backface-visibility: hidden;
                }
            `}} />

            {/* ФОНОВАЯ МАТРИЦА - Оптимизирована прозрачность */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                <UserMatrixBackground />
            </div>

            {/* ЗАТЕМНЕНИЕ - Убрали backdrop-blur, заменили на чистый градиент/цвет */}
            <div className="absolute inset-0 z-10 bg-black/40" />

            {/* КОНТЕНТ */}
            <div className="relative z-20 flex flex-col items-center space-y-8 animate-entry">

                {/* СЕКРЕТНАЯ ОБЛАСТЬ (Иконка) */}
                <div className="relative cursor-pointer active:scale-95 transition-transform" onClick={handleSecretClick}>
                    {/* Свечение иконки */}
                    <div className="absolute inset-0 bg-[#00ffcc]/20 blur-[60px] rounded-full animate-pulse" />
                    <div className="relative p-6 border border-[#00ffcc]/20 bg-black/60 rounded-[1px]">
                        <Smartphone size={64} className="text-[#00ffcc] opacity-90" />
                        <ShieldAlert size={20} className="absolute -top-1 -right-1 text-black bg-[#00ffcc] rounded-[1px] p-0.5" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-2xl font-black tracking-[0.3em] text-white uppercase font-mono drop-shadow-[0_0_15px_rgba(0,255,204,0.3)]">
                        Доступ ограничен
                    </h1>
                    <div className="h-[1px] w-20 bg-[#00ffcc]/50 mx-auto" />
                    <p className="text-[#00ffcc]/80 text-[11px] leading-relaxed uppercase tracking-[0.25em] font-mono max-w-[320px]">
                        Для активации протокола <br />
                        <span className="text-white">«Кроличья Нора»</span> <br />
                        используйте мобильное приложение MAX на смартфоне
                    </p>
                </div>

                {/* ИНСТРУКЦИЯ И ССЫЛКА */}
                <div className="w-full max-w-[340px] space-y-5">
                    <div className="group relative flex items-center bg-white/5 border border-white/10 p-1 rounded-[1px] transition-all hover:border-[#00ffcc]/50">
                        <div className="flex-1 px-4 py-3 overflow-hidden text-left">
                            <p className="text-[#00ffcc] font-mono text-sm truncate tracking-wider">
                                {botLink}
                            </p>
                        </div>
                        <button
                            onClick={handleCopy}
                            className={`flex items-center justify-center w-12 h-12 transition-all duration-300 rounded-[1px] ${
                                copied
                                    ? 'bg-[#00ffcc] text-black'
                                    : 'bg-white/10 text-white hover:bg-[#00ffcc]/20 hover:text-[#00ffcc]'
                            }`}
                        >
                            {copied ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                    </div>

                    <div className="flex flex-col gap-4 px-2">
                        <div className="flex items-start gap-3 text-left">
                            <div className="mt-1 p-1 bg-[#00ffcc]/10 rounded-[1px]">
                                <Info size={12} className="text-[#00ffcc]" />
                            </div>
                            <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest leading-relaxed">
                                Скопируйте ссылку и вставьте её в поиск <span className="text-white/80">мессенджера MAX</span> на смартфоне.
                            </p>
                        </div>

                        {/* ТЕХ ПОДДЕРЖКА */}
                        <div className="flex items-start gap-3 text-left">
                            <div className="mt-1 p-1 bg-[#00ffcc]/10 rounded-[1px]">
                                <Mail size={12} className="text-[#00ffcc]" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest leading-relaxed">
                                    Техническая поддержка:
                                </p>
                                <a
                                    href={`mailto:${supportEmail}`}
                                    className="text-[10px] text-[#00ffcc] font-mono uppercase tracking-widest border-b border-[#00ffcc]/30 hover:border-[#00ffcc] transition-all"
                                >
                                    {supportEmail}
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 text-left">
                            <div className="mt-1 p-1 bg-white/5 rounded-[1px]">
                                <Download size={12} className="text-white/60" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest leading-relaxed">
                                    Нет приложения?
                                </p>
                                <a
                                    href={downloadLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] text-[#00ffcc] font-mono uppercase tracking-widest border-b border-[#00ffcc]/30 hover:border-[#00ffcc] transition-all"
                                >
                                    Скачать MAX на смартфон
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <p className="text-[9px] text-white/20 font-mono uppercase tracking-[0.3em]">
                        Protocol: Mobile_Only_Access
                    </p>
                </div>
            </div>

            {/* Декоративные системные элементы */}
            <div className="absolute top-6 left-6 text-[10px] text-[#00ffcc]/20 font-mono tracking-widest uppercase">
                Terminal_v1.0.4
            </div>
            <div className="absolute bottom-6 right-6 text-[10px] text-[#00ffcc]/20 font-mono tracking-widest uppercase">
                Auth_Required
            </div>
        </div>
    );
};

export default DesktopBlocker;