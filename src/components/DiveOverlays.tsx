import React, { useState } from 'react';
import { Zap, BookOpen, Moon, Headphones, Smartphone, Sparkles, Wind, LogOut, Info, ShieldCheck, Terminal, Fingerprint } from 'lucide-react';

// Описываем интерфейс моста строго, чтобы линтер не ругался на any
interface WebAppBridge {
    HapticFeedback?: {
        impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
    };
}

declare global {
    interface Window {
        WebApp?: WebAppBridge;
    }
}

interface DiveOverlaysProps {
    showConfirmDive: boolean;
    showInstruction: boolean;
    showConfirmExit: boolean;
    onStartDive: (direction: 'ВГЛУБЬ' | 'ВШИРЬ' | 'ВВЕРХ') => void;
    onOpenInstruction: () => void;
    onCloseInstruction: () => void;
    onCancelDive: () => void;
    onConfirmExit: () => void;
    onCancelExit: () => void;
}

const DiveOverlays: React.FC<DiveOverlaysProps> = ({
                                                       showConfirmDive,
                                                       showInstruction,
                                                       showConfirmExit,
                                                       onStartDive,
                                                       onOpenInstruction,
                                                       onCloseInstruction,
                                                       onCancelDive,
                                                       onConfirmExit,
                                                       onCancelExit
                                                   }) => {
    const [showAbout, setShowAbout] = useState(false);

    if (!showConfirmDive && !showInstruction && !showConfirmExit) return null;

    return (
        <div className="absolute inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">

            {/* ГЛАВНОЕ ОКНО ВЫБОРА */}
            {showConfirmDive && !showInstruction && !showAbout && (
                <div className="w-full max-w-xs border border-[#00ffcc]/30 bg-[#00ffcc]/5 p-8 space-y-8 rounded-[1px] animate-in zoom-in-95 duration-300">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="p-3 bg-[#00ffcc]/10 rounded-full text-[#00ffcc]">
                            <Zap size={28} />
                        </div>
                        <h3 className="text-white font-black uppercase tracking-[0.3em] text-[10px]">Подготовка к погружению</h3>
                        <p className="text-[9px] text-white/40 leading-relaxed uppercase tracking-widest text-center">
                            Протокол доступен в режиме раннего доступа
                        </p>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={() => {
                                window.WebApp?.HapticFeedback?.impactOccurred('light');
                                onStartDive('ВГЛУБЬ');
                            }}
                            className="w-full py-5 bg-[#00ffcc] text-black text-[10px] font-black uppercase tracking-[0.1em] active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            <Zap size={14} className="fill-black" />
                            Начать путешествие
                        </button>

                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={onOpenInstruction}
                                className="py-4 bg-white/5 border border-white/10 text-white text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 active:bg-white/10 transition-colors"
                            >
                                <BookOpen size={12} />
                                Инструкция
                            </button>
                            <button
                                onClick={() => setShowAbout(true)}
                                className="py-4 bg-white/5 border border-white/10 text-white text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 active:bg-white/10 transition-colors"
                            >
                                <Info size={12} />
                                Суть
                            </button>
                        </div>

                        <div className="pt-4 space-y-2 text-center border-t border-white/5">
                            <div className="flex items-center justify-center gap-1.5 text-white/30">
                                <ShieldCheck size={10} />
                                <span className="text-[7px] uppercase tracking-widest font-bold">Система: v1.0.0-beta</span>
                            </div>
                            <p className="text-[7px] text-[#00ffcc]/40 leading-relaxed uppercase tracking-[0.15em] font-medium">
                                Обнаружен активный нейропрофиль
                            </p>
                        </div>

                        <button onClick={onCancelDive} className="w-full py-2 text-zinc-600 text-[9px] font-bold uppercase tracking-[0.2em] active:text-zinc-400 transition-colors">
                            Отмена
                        </button>
                    </div>
                </div>
            )}

            {/* ОКНО "СУТЬ ПРОТОКОЛА" */}
            {showAbout && (
                <div className="w-full max-w-sm border border-[#00ffcc]/20 bg-zinc-950 p-8 space-y-6 rounded-[1px] animate-in slide-in-from-bottom-4 overflow-y-auto max-h-[80vh]">
                    <div className="space-y-2 text-center">
                        <Terminal size={24} className="mx-auto text-[#00ffcc] mb-2" />
                        <h2 className="text-[8px] uppercase tracking-[0.4em] text-[#00ffcc]">Интеллектуальный трип</h2>
                        <h1 className="text-lg font-black uppercase text-white tracking-tighter">Суть протокола</h1>
                    </div>
                    <div className="space-y-4 text-[10px] text-white/60 leading-relaxed uppercase tracking-widest">
                        <p>Это <span className="text-white font-bold">цифровой галлюциноген</span> для тех, кто устал от простых ответов. ~80 шагов, которые вывернут привычное понимание «любви» наизнанку.</p>
                        <div className="p-3 bg-[#00ffcc]/5 border border-[#00ffcc]/20 rounded-sm space-y-2">
                            <div className="flex items-center gap-2 text-[#00ffcc]">
                                <Fingerprint size={14} />
                                <span className="text-[9px] font-black uppercase tracking-[0.2em]">Уникальность</span>
                            </div>
                            <p className="text-[8px] text-white/50 leading-relaxed uppercase tracking-widest">
                                Каждое погружение становится уникальным <span className="text-white">благодаря вашим решениям</span>. Выбирая вектор, вы создаете одну из <span className="text-white font-bold">более 300 триллионов</span> возможных версий этой истории.
                            </p>
                        </div>
                        <p>Мы пройдем через инстинкты ДНК, холодный блеск квантовых частиц и тишину цифрового абсолюта.</p>
                        <p className="p-3 bg-white/5 border-l-2 border-[#00ffcc] text-white/80 italic">
                            «Вы не читаете эту историю. Вы становитесь её единственным автором, выбирая вектор движения в пустоте».
                        </p>
                    </div>
                    <button onClick={() => setShowAbout(false)} className="w-full py-4 bg-[#00ffcc]/10 border border-[#00ffcc]/40 text-[#00ffcc] text-[10px] font-black uppercase tracking-[0.2em] active:bg-[#00ffcc]/20 transition-colors">
                        Вернуться к активации
                    </button>
                </div>
            )}

            {/* ОКНО ИНСТРУКЦИИ */}
            {showInstruction && (
                <div className="w-full max-w-sm border border-white/10 bg-zinc-950 p-8 space-y-6 rounded-[1px] animate-in slide-in-from-bottom-4">
                    <div className="space-y-2 text-center">
                        <h2 className="text-[8px] uppercase tracking-[0.4em] text-[#00ffcc]">Протокол тишины</h2>
                        <h1 className="text-lg font-black uppercase text-white">Инструкция</h1>
                    </div>
                    <div className="space-y-5">
                        <div className="flex items-center gap-4 text-white/60">
                            <Moon size={18} className="text-[#00ffcc] shrink-0" />
                            <span className="text-[9px] uppercase tracking-wider leading-relaxed">Найдите тихое место. Рекомендуется положение лежа.</span>
                        </div>
                        <div className="flex items-center gap-4 text-white/60">
                            <Headphones size={18} className="text-[#00ffcc] shrink-0" />
                            <span className="text-[9px] uppercase tracking-wider leading-relaxed">Используйте наушники для полной изоляции.</span>
                        </div>
                        <div className="flex items-center gap-4 text-white/60">
                            <Smartphone size={18} className="text-[#00ffcc] shrink-0" />
                            <span className="text-[9px] uppercase tracking-wider leading-relaxed">Включите режим «Не беспокоить».</span>
                        </div>
                        <div className="p-4 bg-[#00ffcc]/5 border border-[#00ffcc]/20 rounded-sm space-y-2">
                            <div className="flex items-center gap-2 text-[#00ffcc]">
                                <Sparkles size={14} />
                                <span className="text-[9px] font-black uppercase tracking-[0.2em]">Золотой час</span>
                            </div>
                            <p className="text-[8px] text-white/50 leading-relaxed uppercase tracking-widest">
                                Лучшее время для резонанса: <span className="text-white">22:00 — 02:00</span>. Когда внешний мир затихает, внутренний голос становится яснее.
                            </p>
                        </div>
                        <div className="flex items-center gap-4 text-white/60">
                            <Wind size={18} className="text-[#00ffcc] shrink-0" />
                            <span className="text-[9px] uppercase tracking-wider leading-relaxed">Сделайте 3 глубоких вдоха перед стартом.</span>
                        </div>
                    </div>
                    <button onClick={onCloseInstruction} className="w-full py-4 border border-[#00ffcc]/40 text-[#00ffcc] text-[10px] font-black uppercase tracking-[0.2em] active:bg-[#00ffcc]/10 transition-colors">
                        Я всё понял(а)
                    </button>
                </div>
            )}

            {/* ОКНО ВЫХОДА */}
            {showConfirmExit && (
                <div className="w-full max-w-xs border border-white/20 bg-black p-8 space-y-8 rounded-[1px]">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <LogOut className="text-white/40" size={32} />
                        <h3 className="text-white font-black uppercase tracking-[0.3em] text-[10px]">Прервать сеанс?</h3>
                        <p className="text-[9px] text-white/30 uppercase tracking-widest">Прогресс текущей сессии будет сброшен</p>
                    </div>
                    <div className="space-y-3">
                        <button onClick={onConfirmExit} className="w-full py-4 bg-white/5 border border-white/20 text-white/80 text-[10px] font-black uppercase tracking-[0.2em] active:scale-95 transition-all">
                            Завершить
                        </button>
                        <button onClick={onCancelExit} className="w-full py-2 text-zinc-600 text-[9px] font-bold uppercase tracking-[0.2em] active:text-zinc-400 transition-colors">
                            Вернуться
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DiveOverlays;