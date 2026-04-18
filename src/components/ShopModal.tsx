import React from 'react';
import { Zap, ShieldCheck, Lock } from 'lucide-react';
import HypnoticVortex from './HypnoticVortex';

interface ShopModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ShopModal: React.FC<ShopModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const packages = [
        { id: 'min', name: 'Исследователь', amount: 500, price: '500 ₽' },
        { id: 'max', name: 'Архитектор', amount: 10000, price: '7 500 ₽', badge: 'Выгодно' }
    ];

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-300 overflow-hidden cursor-pointer"
        >
            <div className="absolute inset-0 opacity-40 pointer-events-none">
                <HypnoticVortex />
            </div>

            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm border border-white/20 bg-[#0a0a0a] p-6 rounded-[1px] relative shadow-[0_0_100px_rgba(0,0,0,1)] z-10 cursor-default"
            >
                {/* Заголовок */}
                <div className="text-center mb-10 space-y-2">
                    <h2 className="text-[10px] uppercase tracking-[0.5em] font-black text-[#00ffcc]/80 font-mono">Ресурс системы</h2>
                    <p className="text-white font-mono text-[11px] uppercase tracking-widest">Выберите пакет ресурса</p>
                </div>

                {/* Пакеты */}
                <div className="space-y-4">
                    {packages.map((pkg) => (
                        <button
                            key={pkg.id}
                            className="w-full p-5 border border-white/10 bg-black/60 flex items-center justify-between group hover:border-[#00ffcc] hover:bg-[#00ffcc]/5 transition-all rounded-[1px] relative overflow-hidden"
                        >
                            {pkg.badge && (
                                <div className="absolute top-0 right-0 bg-[#00ffcc] text-black text-[8px] font-black uppercase px-2 py-0.5 tracking-tighter">
                                    {pkg.badge}
                                </div>
                            )}
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-black border border-white/10 group-hover:border-[#00ffcc]/50 transition-colors">
                                    <Zap size={18} className="text-[#00ffcc]" />
                                </div>
                                <div className="text-left font-mono">
                                    <div className="text-[9px] font-black uppercase tracking-widest text-white/40">{pkg.name}</div>
                                    <div className="text-white font-bold text-xl leading-none mt-1 tracking-tighter">
                                        {pkg.amount} <span className="text-[10px] text-[#00ffcc] uppercase ml-1 font-black">Эн</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right font-mono">
                                <div className="text-white font-black text-sm tracking-tighter">{pkg.price}</div>
                                <div className="text-[8px] text-[#00ffcc] uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity font-bold">Выбрать</div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Компактный футер (Строгий стиль) */}
                <div className="mt-10 space-y-5 border-t border-white/10 pt-6">
                    <div className="flex flex-col items-center gap-3 text-center">
                        <div className="flex items-center gap-2 text-[#00ffcc] border border-[#00ffcc]/20 px-3 py-1 rounded-[1px]">
                            <Lock size={10} />
                            <span className="text-[9px] uppercase tracking-[0.2em] font-mono font-bold">Платеж защищен</span>
                        </div>

                        <div className="space-y-2 px-2">
                            <p className="text-[9px] text-white/60 uppercase font-mono tracking-[0.12em] leading-relaxed">
                                Разработано российским инженером <br/>
                                <span className="text-white font-bold">ИП Антонов А. О.</span>
                            </p>
                            <p className="text-[8px] text-white/30 uppercase font-mono tracking-widest leading-normal">
                                Нажимая «Выбрать», вы подтверждаете согласие <br/> с условиями использования сервиса
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <ShieldCheck size={18} className="text-white/20" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopModal;