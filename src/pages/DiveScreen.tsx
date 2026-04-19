import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, AlertTriangle, ChevronUp, ChevronDown, MoveHorizontal, LogOut, Zap, Play } from 'lucide-react';
// Путь к твоей базе данных на 25 уровней
import { DIVE_CONTENT } from '../pages/diveData.ts';
// TEST COMMENT 12345
interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: string;
}

interface DiveScreenProps {
    onBack: () => void;
}

const DiveScreen: React.FC<DiveScreenProps> = ({ onBack }) => {
    const [depth, setDepth] = useState(1.0);
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
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleAction = (direction: 'ВГЛУБЬ' | 'ВШИРЬ' | 'ВВЕРХ') => {
        // Теперь лимит 25 уровней
        if (depth >= 25) {
            setShowConfirmExit(true);
            return;
        }

        setIsActiveDive(true);
        setShowConfirmDive(false);
        setIsTyping(true);

        let nextDepth = depth;
        if (direction === 'ВГЛУБЬ') {
            nextDepth = Math.floor(depth + 1);
        } else if (direction === 'ВШИРЬ') {
            nextDepth = +(depth + 0.5).toFixed(1);
        } else if (direction === 'ВВЕРХ') {
            // Твой алгоритм: ВВЕРХ тоже тянет вниз (+0.3)
            nextDepth = +(depth + 0.3).toFixed(1);
        }

        if (nextDepth > 25) nextDepth = 25;

        const levelIndex = Math.floor(nextDepth);
        const levelData = DIVE_CONTENT[levelIndex] || DIVE_CONTENT[25];
        const vectorResponse = levelData.responses[direction];

        const userMsg: Message = {
            role: 'user',
            content: `[ВЕКТОР: ${direction}]`,
            timestamp: new Date().toLocaleTimeString(),
        };

        setMessages(prev => [...prev, userMsg]);

        setTimeout(() => {
            const aiMsg: Message = {
                role: 'assistant',
                content: `🔬 **${levelData.title}**\n\n${vectorResponse}`,
                timestamp: new Date().toLocaleTimeString(),
            };
            setMessages(prev => [...prev, aiMsg]);
            setDepth(nextDepth);
            setIsTyping(false);
        }, 1300);
    };

    const handleReset = () => {
        setIsActiveDive(false);
        setShowConfirmExit(false);
        setDepth(1.0);
        setMessages([{
            role: 'system',
            content: 'Сессия завершена. Память очищена. Ожидание новой инициации...',
            timestamp: new Date().toLocaleTimeString(),
        }]);
    };

    return (
        <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-500 bg-transparent relative font-mono">

            {/* MODAL: Подтверждение */}
            {showConfirmDive && (
                <div className="absolute inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
                    <div className="w-full max-w-xs border border-[#00ffcc]/30 bg-[#00ffcc]/5 p-8 space-y-8 rounded-[1px]">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <AlertTriangle className="text-[#00ffcc]" size={32} />
                            <h3 className="text-white font-black uppercase tracking-[0.3em] text-[10px]">Инициация погружения</h3>
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-[8px] text-white/30 uppercase tracking-[0.4em]">Расход ресурса</span>
                                <div className="flex items-center gap-2 bg-black/60 px-4 py-2 border border-white/10">
                                    <Zap size={13} className="text-[#00ffcc]" />
                                    <span className="text-[#00ffcc] font-bold text-lg">50</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <button onClick={() => handleAction('ВГЛУБЬ')} className="w-full py-4 bg-[#00ffcc]/10 border border-[#00ffcc]/40 text-[#00ffcc] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#00ffcc]/20 transition-all">
                                Подтвердить
                            </button>
                            <button onClick={() => setShowConfirmDive(false)} className="w-full py-2 text-zinc-600 text-[9px] font-bold uppercase tracking-[0.2em]">
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL: Выход / Финал */}
            {showConfirmExit && (
                <div className="absolute inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
                    <div className="w-full max-w-xs border border-white/10 bg-white/5 p-8 space-y-8 rounded-[1px]">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <LogOut className="text-white/40" size={32} />
                            <h3 className="text-white font-black uppercase tracking-[0.3em] text-[10px]">
                                {depth >= 25 ? "ЦИКЛ ЗАВЕРШЕН" : "Прервать сеанс?"}
                            </h3>
                        </div>
                        <div className="space-y-3">
                            <button onClick={handleReset} className="w-full py-4 bg-white/5 border border-white/20 text-white/80 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10">
                                {depth >= 25 ? "ВЕРНУТЬСЯ В НАЧАЛО" : "Завершить"}
                            </button>
                            {depth < 25 && (
                                <button onClick={() => setShowConfirmExit(false)} className="w-full py-2 text-zinc-600 text-[9px] font-bold uppercase tracking-[0.2em]">
                                    Вернуться
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="shrink-0 p-4 border-b border-[#00ffcc]/10 flex justify-between items-center bg-black/60 backdrop-blur-xl z-20">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="text-[#00ffcc]/50 hover:text-[#00ffcc]"><ChevronLeft size={20} /></button>
                    {isActiveDive && (
                        <button onClick={() => setShowConfirmExit(true)} className="flex items-center gap-2 px-3 py-1.5 border border-[#00ffcc]/20 bg-[#00ffcc]/5">
                            <LogOut size={12} className="text-[#00ffcc]/80" />
                            <span className="text-[8px] text-[#00ffcc]/80 font-black uppercase tracking-tighter">Завершить</span>
                        </button>
                    )}
                </div>
                <div className="text-right">
                    <div className="text-[8px] text-[#00ffcc]/40 uppercase tracking-[0.3em]">Глубина</div>
                    <div className="text-lg font-black text-white leading-none">
                        {depth.toFixed(1)} <span className="text-[10px] text-[#00ffcc]/60 uppercase font-normal">lvl</span>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 text-sm scrollbar-hide">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2`}>
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`text-[8px] uppercase tracking-[0.2em] ${msg.role === 'user' ? 'text-white/20' : 'text-[#00ffcc]/40'}`}>
                                {msg.role === 'user' ? 'Субъект' : 'Проводник'}
                            </span>
                        </div>
                        <div className={`max-w-[90%] p-4 rounded-[1px] leading-relaxed border whitespace-pre-wrap ${
                            msg.role === 'user'
                                ? 'bg-white/5 border-white/10 text-white/70'
                                : 'bg-[#00ffcc]/5 border-[#00ffcc]/20 text-[#00ffcc]'
                        }`}>
                            {msg.role === 'system' ? `> ${msg.content}` : msg.content}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex items-center gap-3 text-[#00ffcc] text-[9px] font-bold uppercase tracking-[0.3em] pl-2">
                        <span className="animate-pulse">_Деконструкция...</span>
                    </div>
                )}
            </div>

            {/* Bottom Panel */}
            <div className="shrink-0 p-6 bg-black/90 border-t border-white/5 backdrop-blur-md min-h-[120px] flex items-center justify-center">
                {!isActiveDive ? (
                    <button
                        onClick={() => setShowConfirmDive(true)}
                        className="w-full py-5 bg-[#00ffcc]/5 border border-[#00ffcc]/30 text-[#00ffcc] hover:bg-[#00ffcc]/10 transition-all flex items-center justify-center gap-3 group"
                    >
                        <Play size={16} className="fill-[#00ffcc]/20 group-hover:scale-110 transition-transform" />
                        <span className="text-[11px] font-black uppercase tracking-[0.4em]">Инициировать погружение</span>
                    </button>
                ) : (
                    <div className="grid grid-cols-3 gap-3 w-full animate-in fade-in slide-in-from-bottom-4">
                        <button onClick={() => handleAction('ВГЛУБЬ')} className="flex flex-col items-center gap-1 py-4 border border-[#00ffcc]/30 bg-[#00ffcc]/5 hover:bg-[#00ffcc]/15 transition-all">
                            <ChevronDown size={16} className="text-[#00ffcc]" />
                            <span className="text-[9px] font-black text-white uppercase tracking-widest">Вглубь</span>
                        </button>
                        <button onClick={() => handleAction('ВШИРЬ')} className="flex flex-col items-center gap-1 py-4 border border-white/10 bg-white/5 hover:bg-white/15 transition-all">
                            <MoveHorizontal size={16} className="text-white/50" />
                            <span className="text-[9px] font-black text-white uppercase tracking-widest">Вширь</span>
                        </button>
                        <button onClick={() => handleAction('ВВЕРХ')} className="flex flex-col items-center gap-1 py-4 border border-white/10 bg-white/5 hover:bg-white/15 transition-all">
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
