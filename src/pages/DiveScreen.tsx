import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronUp, ChevronDown, MoveHorizontal, LogOut, Play } from 'lucide-react';
import { DIVE_CONTENT } from '../pages/diveData.ts';
import DiveOverlays from '../components/DiveOverlays.tsx';

interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: string;
}

interface DiveScreenProps {
    onBack: () => void;
}

const STORAGE_KEY = 'rabbit_hole_dive_state';

const DiveScreen: React.FC<DiveScreenProps> = ({ onBack }) => {
    // Инициализация
    const [depth, setDepth] = useState<number>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved).depth : 0.0;
    });

    const [lastDirection, setLastDirection] = useState<'ВГЛУБЬ' | 'ВШИРЬ' | 'ВВЕРХ' | null>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved).lastDirection : null;
    });

    const [messages, setMessages] = useState<Message[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved).messages : [
            {
                role: 'system',
                content: 'Инициация протокола "Экзистенциальный Проводник"... Ожидание входящего сигнала...',
                timestamp: new Date().toLocaleTimeString(),
            }
        ];
    });

    const [isActiveDive, setIsActiveDive] = useState<boolean>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved).isActiveDive : false;
    });

    const [isTyping, setIsTyping] = useState(false);
    const [showConfirmDive, setShowConfirmDive] = useState(false);
    const [showInstruction, setShowInstruction] = useState(false);
    const [showConfirmExit, setShowConfirmExit] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Сохранение в localStorage
    useEffect(() => {
        // Если погружение не активно и сообщений нет (или только системное об очистке),
        // мы НЕ сохраняем состояние, чтобы при перезагрузке всё было чисто.
        if (!isActiveDive && depth === 0) {
            localStorage.removeItem(STORAGE_KEY);
            return;
        }

        const stateToSave = {
            depth,
            lastDirection,
            messages,
            isActiveDive
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    }, [depth, lastDirection, messages, isActiveDive]);

    // Автопрокрутка
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, isTyping]);

    const handleAction = (direction: 'ВГЛУБЬ' | 'ВШИРЬ' | 'ВВЕРХ') => {
        setIsActiveDive(true);
        setShowConfirmDive(false);
        setIsTyping(true);

        let finalDirection = direction;
        if (direction !== 'ВГЛУБЬ' && direction === lastDirection) {
            if (direction === 'ВВЕРХ') finalDirection = 'ВШИРЬ';
            else if (direction === 'ВШИРЬ') finalDirection = 'ВВЕРХ';
        }

        let nextDepth = depth;
        if (finalDirection === 'ВГЛУБЬ') {
            nextDepth = depth === 0 ? 1.0 : Math.floor(depth + 1);
        } else if (finalDirection === 'ВШИРЬ') {
            nextDepth = +(depth + 0.5).toFixed(1);
        } else if (finalDirection === 'ВВЕРХ') {
            nextDepth = +(depth + 0.3).toFixed(1);
        }

        if (nextDepth > 30) nextDepth = 30;

        const levelIndex = Math.floor(nextDepth);
        const levelData = DIVE_CONTENT[levelIndex] || DIVE_CONTENT[1];
        const vectorResponse = levelData.responses[finalDirection];

        const userMsg: Message = {
            role: 'user',
            content: `[ВЕКТОР: ${finalDirection}]${(finalDirection !== direction) ? ' (АДАПТАЦИЯ)' : ''}`,
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
            setLastDirection(finalDirection);
            setIsTyping(false);
        }, 1300);
    };

    const handleReset = () => {
        // 1. Сначала очищаем хранилище полностью
        localStorage.removeItem(STORAGE_KEY);

        // 2. Сбрасываем состояния
        setIsActiveDive(false);
        setShowConfirmExit(false);
        setDepth(0.0);
        setLastDirection(null);

        // 3. Устанавливаем сообщение об очистке
        const initialMsg: Message = {
            role: 'system',
            content: 'Сессия завершена. Память очищена. Ожидание новой инициации...',
            timestamp: new Date().toLocaleTimeString(),
        };
        setMessages([initialMsg]);
    };

    return (
        <div className="flex flex-col h-screen w-full overflow-hidden bg-transparent font-mono text-white select-none touch-none relative animate-in slide-in-from-right-4 duration-500">
            <DiveOverlays
                showConfirmDive={showConfirmDive}
                showInstruction={showInstruction}
                showConfirmExit={showConfirmExit}
                onStartDive={handleAction}
                onOpenInstruction={() => setShowInstruction(true)}
                onCloseInstruction={() => setShowInstruction(false)}
                onCancelDive={() => setShowConfirmDive(false)}
                onConfirmExit={handleReset}
                onCancelExit={() => setShowConfirmExit(false)}
            />

            <header className="shrink-0 p-4 border-b border-[#00ffcc]/10 flex justify-between items-center bg-black/60 backdrop-blur-xl z-20">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="p-2 -ml-2 text-[#00ffcc]/50 active:text-[#00ffcc]"><ChevronLeft size={24} /></button>
                    {isActiveDive && (
                        <button onClick={() => setShowConfirmExit(true)} className="flex items-center gap-2 px-3 py-1.5 border border-[#00ffcc]/20 bg-[#00ffcc]/5 active:bg-[#00ffcc]/20">
                            <LogOut size={12} className="text-[#00ffcc]/80" />
                            <span className="text-[8px] text-[#00ffcc]/80 font-black uppercase tracking-tighter">Завершить</span>
                        </button>
                    )}
                </div>
                <div className="text-right">
                    <div className="text-[8px] text-[#00ffcc]/40 uppercase tracking-[0.3em]">Глубина</div>
                    <div className="text-lg font-black text-white leading-none">
                        <span className="text-[10px] text-[#00ffcc]/60 uppercase font-normal text-[8px]">Уровень</span> {depth.toFixed(1)}
                    </div>
                </div>
            </header>

            <main ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide touch-pan-y">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                        <div className="flex items-center gap-2 mb-2 px-1">
                            <span className={`text-[8px] uppercase tracking-[0.2em] ${msg.role === 'user' ? 'text-white/20' : 'text-[#00ffcc]/40'}`}>
                                {msg.role === 'user' ? 'Субъект' : 'Проводник'}
                            </span>
                        </div>
                        <div className={`max-w-[90%] p-4 rounded-[1px] leading-relaxed border whitespace-pre-wrap text-sm ${
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
                <div className="h-10" />
            </main>

            <footer className="shrink-0 p-6 pb-10 bg-black/90 border-t border-white/5 backdrop-blur-md z-20">
                {!isActiveDive ? (
                    <button
                        onClick={() => setShowConfirmDive(true)}
                        className="w-full py-5 bg-[#00ffcc]/5 border border-[#00ffcc]/30 text-[#00ffcc] active:bg-[#00ffcc]/10 transition-all flex items-center justify-center gap-3 group"
                    >
                        <Play size={16} className="fill-[#00ffcc]/20" />
                        <span className="text-[11px] font-black uppercase tracking-[0.4em]">Инициировать погружение</span>
                    </button>
                ) : (
                    <div className="grid grid-cols-3 gap-3 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <button onClick={() => handleAction('ВГЛУБЬ')} className="flex flex-col items-center justify-center gap-1 py-4 border border-[#00ffcc]/30 bg-[#00ffcc]/5 active:bg-[#00ffcc]/15 transition-all">
                            <ChevronDown size={18} className="text-[#00ffcc]" />
                            <span className="text-[9px] font-black text-white uppercase tracking-widest">Вглубь</span>
                        </button>
                        <button onClick={() => handleAction('ВШИРЬ')} className="flex flex-col items-center justify-center gap-1 py-4 border border-white/10 bg-white/5 active:bg-white/15 transition-all">
                            <MoveHorizontal size={18} className="text-white/50" />
                            <span className="text-[9px] font-black text-white uppercase tracking-widest">Вширь</span>
                        </button>
                        <button onClick={() => handleAction('ВВЕРХ')} className="flex flex-col items-center justify-center gap-1 py-4 border border-white/10 bg-white/5 active:bg-white/15 transition-all">
                            <ChevronUp size={18} className="text-white/50" />
                            <span className="text-[9px] font-black text-white uppercase tracking-widest">Вверх</span>
                        </button>
                    </div>
                )}
            </footer>
        </div>
    );
};

export default DiveScreen;