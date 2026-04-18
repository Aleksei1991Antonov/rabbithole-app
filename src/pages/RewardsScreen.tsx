import React from 'react';
import { ChevronLeft, Share2, CheckCircle2, Crown, Sparkles, Lock, Users } from 'lucide-react';

interface RewardsScreenProps {
    onBack: () => void;
}

const RewardsScreen: React.FC<RewardsScreenProps> = ({ onBack }) => {
    // Пример текущего прогресса купленных токенов
    const currentPurchased = 0;
    const targetToVip = 10000;
    const percentage = Math.min((currentPurchased / targetToVip) * 100, 100);

    return (
        <div className="flex flex-col h-full p-6 space-y-8 animate-in slide-in-from-left-4 duration-500 overflow-y-auto bg-black text-white font-mono">
            {/* Хедер */}
            <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-[1px] transition-colors">
                    <ChevronLeft className="text-[#00ffcc]" />
                </button>
                <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Награды</h2>
            </div>

            <div className="grid gap-4">

                {/* Блок: Проводники (Рефералы) - ТЕПЕРЬ СВЕРХУ */}
                <div className="p-5 border border-[#00ffcc]/20 bg-[#00ffcc]/5 rounded-[1px] flex justify-between items-center relative overflow-hidden group">
                    <div className="relative z-10 space-y-1">
                        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-tight text-white">
                            Проводники <Users size={14} className="text-[#00ffcc]" />
                        </div>
                        <div className="text-[10px] text-[#00ffcc]/60 uppercase tracking-widest">
                            Награда: +50 Эн каждому
                        </div>
                    </div>

                    <button className="relative z-10 px-5 py-2 bg-[#00ffcc] text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform rounded-[1px] flex items-center gap-2">
                        Пригласить <Share2 size={12} />
                    </button>

                    {/* Фоновая иконка для стиля */}
                    <Users size={64} className="absolute -right-4 -bottom-4 text-[#00ffcc]/5 -rotate-12 pointer-events-none" />
                </div>

                {/* Статистика рефералов (маленькая плашка под кнопкой) */}
                <div className="px-5 py-2 border border-white/5 bg-white/5 flex justify-between items-center">
                    <span className="text-[9px] text-white/40 uppercase tracking-[0.2em]">Последователи:</span>
                    <span className="text-[10px] text-[#00ffcc] font-bold">0 / ∞</span>
                </div>

                {/* ДОСТИЖЕНИЕ: VIP СТАТУС */}
                <div className="mt-4 p-6 border border-white/10 bg-white/5 rounded-[1px] space-y-6 relative overflow-hidden">
                    {/* Иконка статуса */}
                    <div className="absolute top-4 right-4 text-white/10">
                        {percentage >= 100 ? <Crown size={40} className="text-[#00ffcc]" /> : <Lock size={40} />}
                    </div>

                    <div className="relative z-10 space-y-2">
                        <div className="flex items-center gap-2 text-[#00ffcc]">
                            <Sparkles size={14} />
                            <span className="text-[10px] uppercase tracking-[0.3em]">Привилегия системы</span>
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-widest text-white leading-none">
                            Статус "Архитектор"
                        </h3>
                        <p className="text-[10px] text-white/40 uppercase tracking-tighter leading-relaxed">
                            Купите 10,000 Эн суммарно для активации профиля "Архитектор"
                        </p>
                    </div>

                    {/* Шкала прогресса покупки */}
                    <div className="relative z-10 space-y-2">
                        <div className="flex justify-between items-end mb-1">
                            <span className="text-[10px] text-[#00ffcc] font-bold uppercase tracking-widest">Прогресс покупки</span>
                            <span className="text-[10px] text-white/60 uppercase tracking-widest">
                {currentPurchased.toLocaleString()} / {targetToVip.toLocaleString()} Эн
              </span>
                        </div>
                        <div className="h-2 w-full bg-white/5 border border-white/10 rounded-[1px] overflow-hidden p-[1px]">
                            <div
                                className="h-full bg-[#00ffcc] shadow-[0_0_15px_rgba(0,255,204,0.4)] transition-all duration-1000 ease-out"
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                    </div>

                    {/* Награды за достижение цели */}
                    <div className="relative z-10 grid grid-cols-1 gap-3 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 size={14} className={percentage >= 100 ? "text-[#00ffcc]" : "text-white/20"} />
                            <span className="text-[10px] text-white/80 uppercase tracking-tight text-justify">Статус пользователя "Архитектор"</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle2 size={14} className={percentage >= 100 ? "text-[#00ffcc]" : "text-white/20"} />
                            <span className="text-[10px] text-white/80 uppercase tracking-tight text-justify">Приоритетная тех. поддержка</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle2 size={14} className={percentage >= 100 ? "text-[#00ffcc]" : "text-white/20"} />
                            <span className="text-[10px] text-white/80 uppercase tracking-tight text-justify">Награда: Бейдж "Архитектор" в профиле</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RewardsScreen;