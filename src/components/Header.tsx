import React, { useState } from 'react';
import { User, Zap } from 'lucide-react';
import ShopModal from './ShopModal';

interface HeaderProps {
    userName: string;
    balance: number;
}

const Header: React.FC<HeaderProps> = ({ userName, balance }) => {
    const [isShopOpen, setIsShopOpen] = useState(false);

    return (
        <>
            <header className="w-full p-4 border-b border-white/10 bg-[#00ffcc]/5 backdrop-blur-[2px] flex justify-between items-center transition-all duration-300 sticky top-0 z-50">

                {/* Левая часть: Профиль */}
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full border border-[#00ffcc]/30 flex items-center justify-center bg-[#00ffcc]/10 shadow-[0_0_15px_rgba(0,255,204,0.1)]">
                        <User size={18} className="text-[#00ffcc] opacity-80" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[9px] text-[#00ffcc]/50 uppercase tracking-[0.2em] font-mono leading-none mb-1">Исследователь</span>
                        <div className="flex items-center">
              <span className="text-sm font-bold text-white font-mono tracking-tight uppercase">
                {userName}
              </span>
                        </div>
                    </div>
                </div>

                {/* Правая часть: Баланс (Кнопка вызова магазина) */}
                <button
                    onClick={() => setIsShopOpen(true)}
                    className="flex items-center gap-2 bg-black/40 hover:bg-black/60 active:scale-95 transition-all backdrop-blur-[1px] px-3 py-1.5 border border-white/10 rounded-[1px] group"
                >
                    <Zap size={13} className="text-[#00ffcc] opacity-80" />
                    <div className="flex items-baseline gap-1">
            <span className="text-[#00ffcc] font-mono font-bold text-sm tracking-tight">
              {balance}
            </span>
                        <span className="text-[9px] text-white/40 font-mono font-bold uppercase tracking-tighter">
              Эн
            </span>
                    </div>
                </button>
            </header>

            {/* Модальное окно магазина */}
            <ShopModal
                isOpen={isShopOpen}
                onClose={() => setIsShopOpen(false)}
            />
        </>
    );
};

export default Header;