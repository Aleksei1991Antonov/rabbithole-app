import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronUp, ChevronDown, MoveHorizontal, LogOut, Play, RefreshCcw } from 'lucide-react';
import { DIVE_CONTENT } from '../pages/diveData.ts';
import DiveOverlays from '../components/DiveOverlays.tsx';
import PaymentButton from '../components/PaymentButton.tsx';
import { getMaxUserData, setMaxBrightness, triggerHaptic } from '../components/maxBridge.ts';

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
    // --- 1. ПРЕДВАРИТЕЛЬНАЯ ЗАГРУЗКА ДАННЫХ (БЕЗ HOOKS) ---
    const initialState = (() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);

        // Получаем данные из моста для первого сообщения инициации
        const userData = getMaxUserData();

        return {
            depth: 0.0,
            lastDirection: null,
            messages: [{
                role: 'system',
                content: `ИНИЦИАЦИЯ ПРОТОКОЛА...\n${userData.fullName}\nТЕРМИНАЛ: ${userData.platform}\nСТАТУС: СИНХРОНИЗАЦИЯ УСТАНОВЛЕНА.`,
                timestamp: new Date().toLocaleTimeString(),
            }],
            isActiveDive: false
        };
    })();

    // --- 2. СОСТОЯНИЯ ---
    const [depth, setDepth] = useState<number>(initialState.depth);
    const [lastDirection, setLastDirection] = useState<'ВГЛУБЬ' | 'ВШИРЬ' | 'ВВЕРХ' | null>(initialState.lastDirection);
    const [messages, setMessages] = useState<Message[]>(initialState.messages);
    const [isActiveDive, setIsActiveDive] = useState<boolean>(initialState.isActiveDive);

    const [isPremium, setIsPremium] = useState<boolean>(() => {
        return localStorage.getItem('is_premium_user') === 'true';
    });

    const [showPaywall, setShowPaywall] = useState(() => {
        return initialState.depth >= 30 && localStorage.getItem('is_premium_user') !== 'true';
    });

    const [isTyping, setIsTyping] = useState(false);
    const [showConfirmDive, setShowConfirmDive] = useState(false);
    const [showInstruction, setShowInstruction] = useState(false);
    const [showConfirmExit, setShowConfirmExit] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // --- 3. ЭФФЕКТЫ ---
    useEffect(() => {
        if (!isActiveDive && depth === 0) {
            localStorage.removeItem(STORAGE_KEY);
            return;
        }
        const stateToSave = { depth, lastDirection, messages, isActiveDive };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    }, [depth, lastDirection, messages, isActiveDive]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    // --- 4. ЛОГИКА ---
    const handleAction = (direction: 'ВГЛУБЬ' | 'ВШИРЬ' | 'ВВЕРХ') => {
        triggerHaptic('medium');
        if (depth === 30 && !isPremium) {
            setShowPaywall(true);
            return;
        }

        // Активируем максимальную яркость при первом реальном шаге (входе в нору)
        if (!isActiveDive) {
            setMaxBrightness();
        }

        setIsActiveDive(true);
        setShowConfirmDive(false);
        setIsTyping(true);

        let finalDirection = direction;
        if (direction !== 'ВГЛУБЬ' && direction === lastDirection) {
            finalDirection = direction === 'ВВЕРХ' ? 'ВШИРЬ' : 'ВВЕРХ';
        }

        let nextDepth = depth;
        if (finalDirection === 'ВГЛУБЬ') {
            nextDepth = depth === 0 ? 1.0 : Math.floor(depth + 1);
        } else {
            nextDepth = +(depth + 0.5).toFixed(1);
        }

        const limit = isPremium ? 60 : 30;
        if (nextDepth > limit) nextDepth = limit;

        const levelIndex = Math.floor(nextDepth);
        const levelData = DIVE_CONTENT[levelIndex] || DIVE_CONTENT[1];
        const vectorResponse = levelData.responses[finalDirection];

        setMessages(prev => [...prev, {
            role: 'user',
            content: `[ВЕКТОР: ${finalDirection}]`,
            timestamp: new Date().toLocaleTimeString(),
        }]);

        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `🔬 **${levelData.title}**\n\n${vectorResponse}`,
                timestamp: new Date().toLocaleTimeString(),
            }]);
            setDepth(nextDepth);
            setLastDirection(finalDirection);
            setIsTyping(false);

            if (nextDepth === 30) {
                setTimeout(() => {
                    const msg = isPremium
                        ? 'БАРЬЕР ВОСПРИЯТИЯ СНЯТ. ДОСТУП К УРОВНЯМ 31-60 ОТКРЫТ.'
                        : 'ВНИМАНИЕ: Обнаружен барьер восприятия. Для деконструкции реальности уровня 31+ требуется активация протокола "Изнанка".';

                    setMessages(prev => [...prev, {
                        role: 'system',
                        content: msg,
                        timestamp: new Date().toLocaleTimeString(),
                    }]);

                    if (!isPremium) setShowPaywall(true);
                }, 1200);
            }
        }, 1300);
    };

    const handlePaymentSuccess = () => {
        setIsPremium(true);
        localStorage.setItem('is_premium_user', 'true');
        setShowPaywall(false);
        setMessages(prev => [...prev, {
            role: 'system',
            content: 'ПРОТОКОЛ "ИЗНАНКА" АКТИВИРОВАН. ОГРАНИЧЕНИЯ СНЯТЫ. ПУТЬ СВОБОДЕН.',
            timestamp: new Date().toLocaleTimeString(),
        }]);
    };

    const handleReset = () => {
        localStorage.removeItem(STORAGE_KEY);
        setIsActiveDive(false);
        setShowConfirmExit(false);
        setShowPaywall(false);
        setDepth(0.0);
        setLastDirection(null);

        const userData = getMaxUserData();
        setMessages([{
            role: 'system',
            content: `СЕССИЯ ЗАВЕРШЕНА. ПАМЯТЬ ОЧИЩЕНА.\nПЕРЕЗАГРУЗКА ПРОТОКОЛА ДЛЯ: ${userData.fullName}...\nОЖИДАНИЕ СИГНАЛА.`,
            timestamp: new Date().toLocaleTimeString(),
        }]);
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
                    <button onClick={() => setShowConfirmDive(true)} className="w-full py-5 bg-[#00ffcc]/5 border border-[#00ffcc]/30 text-[#00ffcc] active:bg-[#00ffcc]/10 transition-all flex items-center justify-center gap-3 group">
                        <Play size={16} className="fill-[#00ffcc]/20" />
                        <span className="text-[11px] font-black uppercase tracking-[0.4em]">Инициировать погружение</span>
                    </button>
                ) : (depth === 30 && !isPremium) || showPaywall ? (
                    <div className="flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="text-center space-y-1 mb-2">
                            <div className="text-[10px] text-[#00ffcc] font-black uppercase tracking-[0.3em] animate-pulse">Протокол "Изнанка" доступен</div>
                            <div className="text-[8px] text-white/40 uppercase tracking-tighter">Разблокировать уровни 31-60 и вечный доступ</div>
                        </div>
                        <PaymentButton amount={0} onSuccess={handlePaymentSuccess} />
                        <button onClick={() => setShowConfirmExit(true)} className="w-full py-3 bg-white/5 border border-white/10 text-white/30 active:bg-white/10 transition-all flex items-center justify-center gap-2">
                            <RefreshCcw size={12} />
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Замкнуть цикл (Reset)</span>
                        </button>
                    </div>
                ) : depth === 30 && isPremium ? (
                    <div className="flex flex-col gap-3 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="text-center mb-2">
                            <div className="text-[10px] text-[#00ffcc]/60 font-black uppercase tracking-[0.3em]">Доступ к Изнанке подтвержден</div>
                        </div>
                        <button onClick={() => handleAction('ВГЛУБЬ')} className="w-full py-5 bg-[#00ffcc]/10 border border-[#00ffcc]/50 text-[#00ffcc] active:bg-[#00ffcc]/20 transition-all flex items-center justify-center gap-3 group">
                            <ChevronDown size={18} className="group-active:translate-y-1 transition-transform" />
                            <span className="text-[11px] font-black uppercase tracking-[0.4em]">Продолжить падение</span>
                        </button>
                        <button onClick={() => setShowConfirmExit(true)} className="w-full py-3 bg-white/5 border border-white/10 text-white/30 active:bg-white/10 transition-all flex items-center justify-center gap-2">
                            <RefreshCcw size={12} />
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Завершить на этом этапе</span>
                        </button>
                    </div>
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