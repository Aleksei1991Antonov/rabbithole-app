import React from 'react';
import { ShieldCheck, Zap, CreditCard, ChevronLeft } from 'lucide-react';
import PaymentButton from './PaymentButton';
import UserMatrixBackground from './UserMatrixBackground';

interface ActivationManagerProps {
    show: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const ActivationManager: React.FC<ActivationManagerProps> = ({ show, onClose, onSuccess }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 font-mono overflow-hidden">

            {/* 1. ФОНОВАЯ МАТРИЦА */}
            <div className="fixed inset-0 z-0 bg-black animate-in fade-in duration-700">
                <UserMatrixBackground />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* 2. ИНТЕРФЕЙС (СКРУГЛЕНИЕ 1px) */}
            <div
                className="relative z-10 w-full max-w-sm border border-[#00ffcc]/30 bg-[#00ffcc]/5 backdrop-blur-[2px] p-6 space-y-6 shadow-[0_0_40px_rgba(0,255,204,0.1)] animate-in zoom-in-95 duration-500 rounded-[1px]"
                style={{
                    WebkitBackdropFilter: 'blur(2px)',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)'
                }}
            >
                {/* Внутренний градиент */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#00ffcc]/10 to-transparent pointer-events-none" />

                {/* ШАПКА */}
                <div className="relative z-10 flex justify-between items-center border-b border-[#00ffcc]/20 pb-4">
                    <div className="flex items-center gap-3">
                        <Zap size={16} className="text-[#00ffcc] animate-pulse" />
                        <div>
                            <h2 className="text-[12px] font-bold uppercase text-white tracking-[0.3em]">Активация</h2>
                            <div className="text-[7px] text-[#00ffcc]/60 uppercase tracking-widest">Протокол "Изнанка"</div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-white/40 hover:text-[#00ffcc] transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>
                </div>

                {/* ЧТО ВКЛЮЧЕНО */}
                <div className="relative z-10 space-y-2">
                    <div className="flex items-start gap-3 text-[10px] text-white uppercase tracking-tighter bg-[#00ffcc]/10 border border-[#00ffcc]/20 p-3 shadow-[0_0_15px_rgba(0,255,204,0.05)] rounded-[1px]">
                        <div className="w-1.5 h-1.5 bg-[#00ffcc] shadow-[0_0_8px_#00ffcc] mt-0.5 flex-shrink-0" />
                        <div className="flex flex-col gap-1">
                            <span className="font-bold tracking-[0.1em]">Полный доступ: Уровни 31–60</span>
                            <span className="text-[7px] text-[#00ffcc]/60 tracking-widest uppercase">Разблокировка всех протоколов системы</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 text-[10px] text-white uppercase tracking-tighter bg-[#00ffcc]/10 border border-[#00ffcc]/20 p-3 shadow-[0_0_15px_rgba(0,255,204,0.05)] rounded-[1px]">
                        <div className="w-1.5 h-1.5 bg-[#00ffcc] shadow-[0_0_8px_#00ffcc] mt-0.5 flex-shrink-0" />
                        <div className="flex flex-col gap-1">
                            <span className="font-bold tracking-[0.1em]">Бессрочный доступ</span>
                            <span className="text-[7px] text-[#00ffcc]/60 tracking-widest uppercase">Статус зашифрован в памяти вашего устройства</span>
                        </div>
                    </div>
                </div>

                {/* ОПЛАТА (БЕЗ ВВОДА КОДА) */}
                <div className="space-y-2 pt-2">
                    <div className="text-[8px] text-white/40 uppercase font-bold tracking-[0.2em] flex items-center gap-2">
                        <CreditCard size={10} /> Прямой платеж
                    </div>
                    <div className="relative group overflow-hidden border border-[#00ffcc]/30 bg-[#00ffcc]/5 hover:bg-[#00ffcc]/10 transition-all rounded-[1px]">
                        <PaymentButton
                            amount={512}
                            onSuccess={onSuccess}
                            variant="trigger"
                            show={true}
                            onClose={onClose}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                    </div>
                </div>

                {/* ПОДВАЛ */}
                <div className="relative z-10 flex items-center justify-center gap-2 text-white/10 pt-4 border-t border-white/5">
                    <ShieldCheck size={10} />
                    <span className="text-[7px] uppercase font-bold tracking-[0.4em]">Безопасная оплата ЮKASSA</span>
                </div>
            </div>
        </div>
    );
};

export default ActivationManager;