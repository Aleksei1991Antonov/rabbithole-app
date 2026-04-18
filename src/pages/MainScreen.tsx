import React from 'react';
import { Zap, Eye } from 'lucide-react';

interface MainScreenProps {
    onStart: () => void;
}

const MainScreen: React.FC<MainScreenProps> = ({ onStart }) => {
    return (
        <div className="relative flex flex-col items-center justify-center h-full space-y-10 p-6 animate-in fade-in duration-700">

            {/* Контентная часть */}
            <div className="relative z-10 text-center space-y-4">
                <div className="relative inline-block">
                    <h1 className="text-6xl font-black tracking-tighter text-white drop-shadow-[0_0_30px_rgba(0,255,204,0.4)] leading-none">
                        КРОЛИЧЬЯ<br/>НОРА
                    </h1>
                </div>
                <p className="text-[#00ffcc] text-[11px] tracking-[0.4em] uppercase opacity-80 font-mono">
                    Интеллектуальное путешествие
                </p>
            </div>

            <div className="relative z-10 w-full max-w-xs space-y-4">
                {/* ГЛАВНАЯ КНОПКА */}
                <button
                    onClick={onStart}
                    className="w-full group relative p-8 border border-[#00ffcc]/30 bg-[#00ffcc]/5 backdrop-blur-[2px] rounded-[1px] hover:bg-[#00ffcc]/15 hover:border-[#00ffcc] transition-all duration-500 overflow-hidden"
                >
                    {/* Внутреннее свечение */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#00ffcc]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10 flex flex-col items-center gap-2">
                        <Zap className="text-[#00ffcc] group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(0,255,204,0.8)] transition-all duration-500" />
                        <span className="text-xl font-bold text-white tracking-[0.2em] uppercase font-mono">Вход в нору</span>
                    </div>

                    {/* Блик */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>

                {/* ТАИНСТВЕННАЯ ПЛАШКА */}
                <div className="flex items-center justify-center gap-3 p-4 border border-white/10 bg-white/5 backdrop-blur-[2px] rounded-[1px] opacity-60 shadow-[0_0_15px_rgba(255,255,255,0.02)] group hover:opacity-100 hover:border-[#00ffcc]/30 transition-all duration-700 cursor-default">
                    <Eye size={16} className="text-[#00ffcc]/60 group-hover:text-[#00ffcc] group-hover:drop-shadow-[0_0_8px_rgba(0,255,204,0.5)] transition-all duration-500" />
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/80 font-mono font-bold">
                        Истина где-то рядом
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MainScreen;