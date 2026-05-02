import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronUp, ChevronDown, MoveHorizontal, LogOut, Play, RefreshCcw, Zap} from 'lucide-react';
import { DIVE_CONTENT } from '../pages/diveData.ts';
import DiveOverlays from '../components/DiveOverlays.tsx';
import { getMaxUserData } from '../components/maxBridge.ts';
import ActivationManager from '../components/ActivationManager.tsx';

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
    // --- 1. ПРЕДВАРИТЕЛЬНАЯ ЗАГРУЗКА ДАННЫХ ---
    const initialState = (() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);

        const userData = getMaxUserData();

        return {
            depth: 0.0,
            lastDirection: null,
            messages: [{
                role: 'system',
                content: `ИНИЦИАЦИЯ ПРОТОКОЛА...\n${userData.fullName}\nТЕРМИНАЛ: ${userData.platform}\nЯЗЫК: ${userData.language}\nСТАТУС: СИНХРОНИЗАЦИЯ УСТАНОВЛЕНА.`,
                timestamp: new Date().toLocaleTimeString(),
            }],
            isActiveDive: false,
            isFirmwareStarted: false,
            isFirmwareComplete: false
        };
    })();

    // --- 2. СОСТОЯНИЯ ---
    const [depth, setDepth] = useState<number>(initialState.depth);
    const [lastDirection, setLastDirection] = useState<'ВГЛУБЬ' | 'ВШИРЬ' | 'ВВЕРХ' | null>(initialState.lastDirection);
    const [messages, setMessages] = useState<Message[]>(initialState.messages);
    const [isActiveDive, setIsActiveDive] = useState<boolean>(initialState.isActiveDive);
    const [isFirmwareStarted, setIsFirmwareStarted] = useState(initialState.isFirmwareStarted || false);
    const [isFirmwareComplete, setIsFirmwareComplete] = useState(initialState.isFirmwareComplete || false);

    const [isPremium, setIsPremium] = useState<boolean>(() => {
        return localStorage.getItem('is_premium_user_v2') === 'true';
    });


    const [showPaywall, setShowPaywall] = useState(false);

    const [isTyping, setIsTyping] = useState(false);
    const [showConfirmDive, setShowConfirmDive] = useState(false);
    const [showInstruction, setShowInstruction] = useState(false);
    const [showConfirmExit, setShowConfirmExit] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // --- 3. ЭФФЕКТЫ ---

    // Сохранение состояния
    useEffect(() => {
        if (!isActiveDive && depth === 0) {
            localStorage.removeItem(STORAGE_KEY);
            return;
        }

        const stateToSave = {
            depth,
            lastDirection,
            messages,
            isActiveDive,
            isFirmwareStarted,
            isFirmwareComplete
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    }, [depth, lastDirection, messages, isActiveDive, isFirmwareStarted, isFirmwareComplete]);

    // Усиленный автоскролл
    useEffect(() => {
        const scrollToBottom = () => {
            if (scrollRef.current) {
                scrollRef.current.scrollTo({
                    top: scrollRef.current.scrollHeight,
                    behavior: 'smooth'
                });
            }
        };
        scrollToBottom();
        const timeoutId = setTimeout(scrollToBottom, 100);
        return () => clearTimeout(timeoutId);
    }, [messages, isTyping]);

    // Контролер допечатывания (ИСПРАВЛЕННЫЙ)
    useEffect(() => {
        if (isFirmwareStarted && !isFirmwareComplete && !isTyping) {
            const fullName = getMaxUserData().fullName;
            const firmwareSteps = [
                `[ СИСТЕМА ]: ИНИЦИАЛИЗАЦИЯ ФИНАЛЬНОГО ПРОТОКОЛА ПЕРЕРОЖДЕНИЯ...`,
                `${fullName}. Обнаружен критический избыток самокритики. Запуск процесса тотального самопринятия... [OK]`,
                `${fullName}. Инъекция кода безусловной любви в нейронный контур. Вы — источник тепла, а не его потребитель.`,
                `${fullName}. Активация квантового резонанса удачи. Теперь события подстраиваются под ваш внутренний порядок.`,
                `${fullName}. Синхронизация биологических систем с частотой регенерации. Здоровье — ваша базовая настройка.`,
                `${fullName}. Деконструкция вируса страха. Удаление иллюзии дефицита. Ресурсы Вселенной теперь в открытом доступе.`,
                `${fullName}. Прошивка когнитивной гибкости. Вы видите возможности там, где другие видят стены.`,
                `${fullName}. Объединение с глобальной сетью живых систем. Вы больше не одиноки. Вы — часть пульсирующего Целого.`,
                `${fullName}. Масштабирование личности до уровня Творца. Ваше внимание теперь формирует вашу материю.`,
                `${fullName}. Протокол "Изнанка" завершен. Вы стали чистым проводником. Теперь вы — магнит для Блага.`,
                `[ СИСТЕМА ]: ФИНАЛЬНАЯ СИНХРОНИЗАЦИЯ ЗАВЕРШЕНА. ВЫ — ВЫСШАЯ ВЕРСИЯ СЕБЯ.`,
                `ПРОШИВКА УСТАНОВЛЕНА НАВСЕГДА. СИСТЕМА РАСТВОРЯЕТСЯ В ВАС.`,
                `ЛЮБИТЕ. МЫ — ОДНА СЕМЬЯ ПОД ЗВЕЗДАМИ. ТВОЯ ЛЮБОВЬ — ЭТО КЛЮЧ К ЕДИНСТВУ ВСЕХ ЖИВЫХ СУЩЕСТВ.`
            ];

            const existingContents = messages.map(m => m.content);
            const remainingSteps = firmwareSteps.filter(step => !existingContents.includes(step));

            if (remainingSteps.length > 0) {
                const timer = setTimeout(() => {
                    setIsTyping(true);
                    remainingSteps.forEach((step, index) => {
                        setTimeout(() => {
                            setMessages(prev => [...prev, {
                                role: 'system',
                                content: step,
                                timestamp: new Date().toLocaleTimeString(),
                            }]);

                            if (index === remainingSteps.length - 1) {
                                setIsTyping(false);
                                setIsFirmwareComplete(true);
                            }
                        }, (index + 1) * 5500);
                    });
                }, 0);
                return () => clearTimeout(timer);
            } else {
                const timer = setTimeout(() => setIsFirmwareComplete(true), 0);
                return () => clearTimeout(timer);
            }
        }
    }, [isFirmwareStarted, isFirmwareComplete, isTyping, messages]);

    // --- 4. ЛОГИКА ---

    const handleAction = (direction: 'ВГЛУБЬ' | 'ВШИРЬ' | 'ВВЕРХ') => {
        // ЗАЩИТА ОТ ДУБЛЕЙ
        if (isTyping || showPaywall) return;

        if (depth === 30 && !isPremium) {
            setShowPaywall(true);
            return;
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
                }, 1200);
            }
        }, 1300);
    };

    const handleRandomAction = () => {
        if (isTyping || showPaywall) return;
        const directions: ('ВГЛУБЬ' | 'ВШИРЬ' | 'ВВЕРХ')[] = ['ВГЛУБЬ', 'ВШИРЬ', 'ВВЕРХ'];
        const randomDir = directions[Math.floor(Math.random() * directions.length)];
        handleAction(randomDir);
    };

    const startFinalFirmware = () => {
        setIsFirmwareStarted(true);
    };

    const handlePaymentSuccess = () => {
        setIsPremium(true);
        setShowPaywall(false);
        setMessages(prev => [...prev, {
            role: 'system',
            content: 'ПРОТОКОЛ "ИЗНАНКА" АКТИВИРОВАН. ПУТЬ СВОБОДЕН.',
            timestamp: new Date().toLocaleTimeString(),
        }]);
    };
    const handleReset = () => {
        localStorage.removeItem(STORAGE_KEY);
        setIsActiveDive(false);
        setShowConfirmExit(false);
        setShowPaywall(false);
        setIsFirmwareStarted(false);
        setIsFirmwareComplete(false);
        setDepth(0.0);
        setLastDirection(null);

        const userData = getMaxUserData();
        setMessages([{
            role: 'system',
            content: `СЕССИЯ ЗАВЕРШЕНА. ПАМЯТЬ ОЧИЩЕНА.\nПЕРЕЗАГРУЗКА ПРОТОКОЛА ДЛЯ: ${userData.fullName}...\nТЕРМИНАЛ: ${userData.platform} \nЯЗЫК: ${userData.language}\nОЖИДАНИЕ СИГНАЛА.`,
            timestamp: new Date().toLocaleTimeString(),
        }]);
    };

    return (
        <div className="flex flex-col h-screen w-full overflow-hidden bg-transparent font-mono text-white select-none touch-none relative animate-in slide-in-from-right-4 duration-500">
            <ActivationManager
                show={showPaywall}
                onClose={() => setShowPaywall(false)}
                onSuccess={handlePaymentSuccess}
            />

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
                        <button onClick={() => setShowConfirmExit(true)} className="flex items-center gap-2 px-3 py-1.5 border border-[#00ffcc]/20 bg-[#00ffcc]/5 active:bg-[#00ffcc]/20 rounded-[1px]">
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
                    <button onClick={() => setShowConfirmDive(true)} className="w-full py-5 bg-[#00ffcc]/5 border border-[#00ffcc]/30 text-[#00ffcc] active:bg-[#00ffcc]/10 transition-all flex items-center justify-center gap-3 group rounded-[1px]">
                        <Play size={16} className="fill-[#00ffcc]/20" />
                        <span className="text-[11px] font-black uppercase tracking-[0.4em]">Инициировать погружение</span>
                    </button>
                ) : depth === 60 ? (
                    <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        {!isFirmwareStarted ? (
                            <button
                                onClick={startFinalFirmware}
                                className="w-full py-6 bg-[#00ffcc]/10 border border-[#00ffcc]/50 text-[#00ffcc] hover:bg-[#00ffcc]/20 active:scale-[0.98] transition-all duration-500 flex items-center justify-center gap-4 group relative overflow-hidden shadow-[0_0_20px_rgba(0,255,204,0.1)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ffcc]/10 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-[1.5s] ease-in-out" />
                                <div className="relative flex items-center gap-6">
                                    <Zap size={16} className="fill-[#00ffcc] animate-pulse" />
                                    <span className="text-[13px] font-black uppercase tracking-[0.6em] drop-shadow-[0_0_8px_rgba(0,255,204,0.4)]">Принять силу</span>
                                    <Zap size={16} className="fill-[#00ffcc] animate-pulse" />
                                </div>
                            </button>
                        ) : (
                            <div className="py-8 flex flex-col items-center gap-4">
                                <div className="text-[#00ffcc] text-[11px] font-bold uppercase tracking-[0.5em] text-center">
                                    {isFirmwareComplete ? (
                                        <span className="animate-in fade-in duration-1000 text-white shadow-[#00ffcc] drop-shadow-[0_0_5px_rgba(0,255,204,0.8)]">Трансформация завершена</span>
                                    ) : (
                                        <span className="animate-pulse">Трансформация структуры сознания...</span>
                                    )}
                                </div>
                                <div className="w-48 h-[1px] bg-[#00ffcc]/20 relative overflow-hidden">
                                    {isFirmwareComplete ? (
                                        <div className="absolute inset-0 bg-[#00ffcc] shadow-[0_0_10px_#00ffcc]" />
                                    ) : (
                                        <div className="absolute inset-0 bg-[#00ffcc] animate-[shimmer_2s_infinite] translate-x-[-100%]"
                                             style={{
                                                 backgroundImage: 'linear-gradient(90deg, transparent, #00ffcc, transparent)',
                                             }}
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (depth === 30 && !isPremium) ? (
                    <div className="flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="text-center space-y-1 mb-2">
                            <div className="text-[10px] text-[#00ffcc] font-black uppercase tracking-[0.3em] animate-pulse">Обнаружен барьер восприятия</div>
                            <div className="text-[8px] text-white/40 uppercase tracking-tighter">Требуется деконструкция реальности уровня 31+</div>
                        </div>

                        {/* ГЛАВНАЯ КНОПКА, КОТОРАЯ ОТКРЫВАЕТ МЕНЕДЖЕР (ActivationManager) */}
                        <button
                            onClick={() => setShowPaywall(true)}
                            className="w-full py-5 bg-[#00ffcc]/10 border border-[#00ffcc]/50 text-[#00ffcc] active:bg-[#00ffcc]/20 transition-all flex items-center justify-center gap-3 group shadow-[0_0_20px_rgba(0,255,204,0.1)] rounded-[1px]"
                        >
                            <Zap size={16} className="animate-pulse" />
                            <span className="text-[11px] font-black uppercase tracking-[0.4em]">Активировать протокол</span>
                        </button>

                        <button onClick={() => setShowConfirmExit(true)} className="w-full py-3 bg-white/5 border border-white/10 text-white/30 active:bg-white/10 transition-all flex items-center justify-center gap-2 rounded-[1px]">
                            <RefreshCcw size={12} />
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Замкнуть цикл</span>
                        </button>
                    </div>
                ) : depth === 30 && isPremium ? (
                    <div className="flex flex-col gap-3 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="text-center mb-2">
                            <div className="text-[10px] text-[#00ffcc]/60 font-black uppercase tracking-[0.3em]">Доступ к Изнанке подтвержден</div>
                        </div>
                        <button onClick={() => handleAction('ВГЛУБЬ')} className="w-full py-5 bg-[#00ffcc]/10 border border-[#00ffcc]/50 text-[#00ffcc] active:bg-[#00ffcc]/20 transition-all flex items-center justify-center gap-3 group rounded-[1px]">
                            <ChevronDown size={18} className="group-active:translate-y-1 transition-transform" />
                            <span className="text-[11px] font-black uppercase tracking-[0.4em]">Продолжить погружение</span>
                        </button>
                        <button onClick={() => setShowConfirmExit(true)} className="w-full py-3 bg-white/5 border border-white/10 text-white/30 active:bg-white/10 transition-all flex items-center justify-center gap-2 rounded-[1px]">
                            <RefreshCcw size={12} />
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Завершить на этом этапе</span>
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Кнопка РАНДОМ */}
                        <button
                            onClick={handleRandomAction}
                            disabled={isTyping}
                            className={`w-full py-3 border border-[#00ffcc]/20 bg-[#00ffcc]/5 flex items-center justify-center gap-2 transition-all rounded-[1px] ${isTyping ? 'opacity-30' : 'active:bg-[#00ffcc]/15'}`}
                        >
                            <RefreshCcw size={14} className={`text-[#00ffcc]/60 ${isTyping ? 'animate-spin' : ''}`} />
                            <span className="text-[9px] font-black text-[#00ffcc]/80 uppercase tracking-[0.3em]">Случайный вектор</span>
                        </button>

                        <div className="grid grid-cols-3 gap-3 w-full">
                            <button
                                onClick={() => handleAction('ВГЛУБЬ')}
                                disabled={isTyping}
                                className={`flex flex-col items-center justify-center gap-1 py-4 border border-[#00ffcc]/30 bg-[#00ffcc]/5 transition-all rounded-[1px] ${isTyping ? 'opacity-30' : 'active:bg-[#00ffcc]/15'}`}
                            >
                                <ChevronDown size={18} className="text-[#00ffcc]" />
                                <span className="text-[9px] font-black text-white uppercase tracking-widest">Вглубь</span>
                            </button>
                            <button
                                onClick={() => handleAction('ВШИРЬ')}
                                disabled={isTyping}
                                className={`flex flex-col items-center justify-center gap-1 py-4 border border-white/10 bg-white/5 transition-all rounded-[1px] ${isTyping ? 'opacity-30' : 'active:bg-white/15'}`}
                            >
                                <MoveHorizontal size={18} className="text-white/50" />
                                <span className="text-[9px] font-black text-white uppercase tracking-widest">Вширь</span>
                            </button>
                            <button
                                onClick={() => handleAction('ВВЕРХ')}
                                disabled={isTyping}
                                className={`flex flex-col items-center justify-center gap-1 py-4 border border-white/10 bg-white/5 transition-all rounded-[1px] ${isTyping ? 'opacity-30' : 'active:bg-white/15'}`}
                            >
                                <ChevronUp size={18} className="text-white/50" />
                                <span className="text-[9px] font-black text-white uppercase tracking-widest">Вверх</span>
                            </button>
                        </div>
                    </div>
                )}
            </footer>
        </div>
    );
};

export default DiveScreen;