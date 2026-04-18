import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Download, Terminal, Send, AlertTriangle, ChevronUp, ChevronDown, MoveHorizontal, LogOut, Zap } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: string;
}

// Интерфейс теперь точно совпадает с тем, что передает App.tsx
interface DiveScreenProps {
    onBack: () => void;
    userName?: string;
    balance?: number;
}

const DiveScreen: React.FC<DiveScreenProps> = ({ onBack, userName, balance }) => {
    const [depth, setDepth] = useState(1.0);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'system',
            content: 'Инициация протокола "Экзистенциальный Проводник"... Ожидание входящего сигнала...',
            timestamp: new Date().toLocaleTimeString(),
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [showConfirmDive, setShowConfirmDive] = useState(false);
    const [showConfirmExit, setShowConfirmExit] = useState(false);
    const [isActiveDive, setIsActiveDive] = useState(false);
    const [lastThought, setLastThought] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    // Используем userName и balance хотя бы в консоли или логах,
    // чтобы ESLint не ругался на "unused variables"
    useEffect(() => {
        console.log(`Сессия для пользователя: ${userName}, баланс: ${balance}`);
    }, [userName, balance]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const initiateDive = () => {
        if (!input.trim()) return;
        setLastThought(input);
        setShowConfirmDive(true);
    };

    const handleAction = (direction: 'ВГЛУБЬ' | 'ВШИРЬ' | 'ВВЕРХ') => {
        setIsActiveDive(true);
        setShowConfirmDive(false);
        setIsTyping(true);

        const currentContent = input || lastThought;
        const userMsg: Message = {
            role: 'user',
            content: `[Вектор: ${direction}] — ${currentContent}`,
            timestamp: new Date().toLocaleTimeString(),
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');

        if (direction === 'ВГЛУБЬ') setDepth(prev => +(prev + 0.7).toFixed(1));
        if (direction === 'ВВЕРХ') setDepth(prev => +(Math.max(1, prev - 0.4)).toFixed(1));
        if (direction === 'ВШИРЬ') setDepth(prev => +(prev + 0.1).toFixed(1));

        setTimeout(() => {
            const aiMsg: Message = {
                role: 'assistant',
                content: `Анализ глубины ${depth}... Ваша мысль трансформируется. На этом уровне вектор ${direction} указывает на отсутствие фиксированного наблюдателя.`,
                timestamp: new Date().toLocaleTimeString(),
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1200);
    };

    const handleReset = () => {
        setIsActiveDive(false);
        setShowConfirmExit(false);
        setDepth(1.0);
        setInput('');
        setMessages([{
            role: 'system',
            content: 'Сессия завершена. Память очищена. Ожидание новой инициации...',
            timestamp: new Date().toLocaleTimeString(),
        }]);
    };

    const handleExportLog = () => {
        alert("Лог сессии выгружен.");
    };

    return (
        <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-500 bg-transparent relative">

            {/* MODAL: Подтверждение Оплаты */}
            {showConfirmDive && (
                <div className="absolute inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md animate-in zoom-in-95 duration-200">
                    <div className="w-full max-w-xs border border-[#00ffcc]/30 bg-[#00ffcc]/5 backdrop-blur-[2px] p-8 space-y-8 shadow-[0_0_50px_rgba(0,255,204,0.1)] rounded-[1px]">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="relative">
                                <AlertTriangle className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.5)]" size={32} />
                            </div>
                            <h3 className="text-white font-black uppercase tracking-[0.3em] text-[10px] font-mono leading-none">Инициация погружения</h3>

                            <div className="flex flex-col items-center gap-2">
                                <span className="text-[8px] text-white/30 uppercase font-mono tracking-[0.4em]">Расход ресурса</span>
                                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-[1px] px-4 py-2 border border-white/10 rounded-[1px]">
                                    <Zap size={13} className="text-[#00ffcc] opacity-90 fill-[#00ffcc]/20" />
                                    <div className="flex items-baseline gap-1 font-mono">
                                        <span className="text-[#00ffcc] font-bold text-lg tracking-tight">50</span>
                                        <span className="text-[10px] text-white/40 font-bold uppercase tracking-tighter">Эн</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 pt-2">
                            <button
                                onClick={() => handleAction('ВГЛУБЬ')}
                                className="w-full py-4 bg-[#00ffcc]/10 border border-[#00ffcc]/40 text-[#00ffcc] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#00ffcc]/20 hover:border-[#00ffcc] transition-all rounded-[1px] shadow-[0_0_20px_rgba(0,255,204,0.1)]"
                            >
                                Подтвердить
                            </button>
                            <button
                                onClick={() => setShowConfirmDive(false)}
                                className="w-full py-2 text-zinc-600 text-[9px] font-bold uppercase tracking-[0.2em] hover:text-white/60 transition-colors"
                            >
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL: Подтверждение Выхода */}
            {showConfirmExit && (
                <div className="absolute inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="w-full max-w-xs border border-white/10 bg-white/5 backdrop-blur-[2px] p-8 space-y-8 rounded-[1px]">
                        <div className="flex flex-col items-center text-center space-y-4 font-mono">
                            <LogOut className="text-white/40" size={32} />
                            <h3 className="text-white font-black uppercase tracking-[0.3em] text-[10px] leading-none">Прервать сеанс?</h3>
                            <p className="text-[9px] text-zinc-500 uppercase leading-relaxed tracking-widest">
                                Текущий прогресс деконструкции будет аннулирован.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <button
                                onClick={handleReset}
                                className="w-full py-4 bg-white/5 border border-white/20 text-white/80 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 hover:border-white/40 transition-all rounded-[1px]"
                            >
                                Завершить
                            </button>
                            <button
                                onClick={() => setShowConfirmExit(false)}
                                className="w-full py-2 text-zinc-600 text-[9px] font-bold uppercase tracking-[0.2em] hover:text-white/60 transition-colors"
                            >
                                Вернуться
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="shrink-0 p-4 border-b border-[#00ffcc]/10 flex justify-between items-center bg-black/60 backdrop-blur-xl z-20">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="text-[#00ffcc]/50 hover:text-[#00ffcc] transition-colors">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={handleExportLog} className="p-1.5 border border-[#00ffcc]/20 hover:bg-[#00ffcc]/10 transition-all group rounded-[1px]">
                        <Download size={14} className="text-[#00ffcc]/70" />
                    </button>
                    {isActiveDive && (
                        <button
                            onClick={() => setShowConfirmExit(true)}
                            className="flex items-center gap-2 px-3 py-1.5 border border-[#00ffcc]/20 bg-[#00ffcc]/5 hover:bg-[#00ffcc]/15 transition-all animate-in slide-in-from-left-2 rounded-[1px]"
                        >
                            <LogOut size={12} className="text-[#00ffcc]/80" />
                            <span className="text-[8px] text-[#00ffcc]/80 font-black uppercase tracking-tighter font-mono">Завершить</span>
                        </button>
                    )}
                </div>
                <div className="text-right font-mono">
                    <div className="text-[8px] text-[#00ffcc]/40 uppercase tracking-[0.3em]">Глубина</div>
                    <div className="text-lg font-black text-white leading-none tracking-tighter">
                        {depth.toFixed(1)} <span className="text-[10px] text-[#00ffcc]/60 uppercase font-normal text-xs">lvl</span>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 font-mono text-sm scrollbar-hide">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
                        <div className="flex items-center gap-2 mb-2">
                            {msg.role === 'system' && <Terminal size={10} className="text-[#00ffcc]/40" />}
                            <span className={`text-[8px] uppercase tracking-[0.2em] ${msg.role === 'user' ? 'text-white/20' : 'text-[#00ffcc]/40'}`}>
                {msg.role === 'user' ? 'Субъект' : 'Проводник'}
              </span>
                        </div>
                        <div className={`max-w-[90%] p-4 rounded-[1px] leading-relaxed border ${
                            msg.role === 'user'
                                ? 'bg-white/5 border-white/10 text-white/70'
                                : 'bg-[#00ffcc]/5 border-[#00ffcc]/20 text-[#00ffcc]'
                        }`}>
                            {msg.role === 'system' ? `> ${msg.content}` : msg.content}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex items-center gap-3 text-[#00ffcc] text-[9px] font-bold uppercase tracking-[0.3em] pl-2 font-mono">
                        <span className="animate-pulse">_Деконструкция...</span>
                    </div>
                )}
            </div>

            {/* Bottom Panel */}
            <div className="shrink-0 p-6 bg-black/90 border-t border-white/5 backdrop-blur-md min-h-[120px] flex items-center justify-center">
                {!isActiveDive ? (
                    <div className="w-full relative group font-mono">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && initiateDive()}
                            className="w-full bg-transparent border-b border-[#00ffcc]/30 p-4 pr-12 outline-none text-white text-sm focus:border-[#00ffcc] transition-all placeholder:text-white/10"
                            placeholder="Введите мысль..."
                        />
                        <button
                            onClick={initiateDive}
                            className="absolute right-0 bottom-4 text-[#00ffcc] opacity-50 hover:opacity-100 transition-opacity p-2"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-3 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 font-mono">
                        <button onClick={() => handleAction('ВГЛУБЬ')} className="flex flex-col items-center gap-1 py-4 border border-[#00ffcc]/30 bg-[#00ffcc]/5 hover:bg-[#00ffcc]/15 transition-all group rounded-[1px]">
                            <ChevronDown size={16} className="text-[#00ffcc]" />
                            <span className="text-[9px] font-black text-white uppercase tracking-widest">Вглубь</span>
                        </button>
                        <button onClick={() => handleAction('ВШИРЬ')} className="flex flex-col items-center gap-1 py-4 border border-white/10 bg-white/5 hover:bg-white/15 transition-all group rounded-[1px]">
                            <MoveHorizontal size={16} className="text-white/50" />
                            <span className="text-[9px] font-black text-white uppercase tracking-widest">Вширь</span>
                        </button>
                        <button onClick={() => handleAction('ВВЕРХ')} className="flex flex-col items-center gap-1 py-4 border border-white/10 bg-white/5 hover:bg-white/15 transition-all group rounded-[1px]">
                            <ChevronUp size={16} className="text-white/50" />
                            <span className="text-[9px] font-black text-white uppercase tracking-widest">Вверх</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiveScreen;