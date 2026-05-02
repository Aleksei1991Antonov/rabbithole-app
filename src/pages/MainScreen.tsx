import React, { useState, useMemo } from 'react';
import { Zap, Eye } from 'lucide-react';
import UserMatrixBackground from '../components/UserMatrixBackground';
import { getMaxUserData } from '../components/maxBridge';

interface MainScreenProps {
    onStart: () => void;
    onAdmin?: () => void; // Пропс для перехода в админку
}

const MainScreen: React.FC<MainScreenProps> = ({ onStart, onAdmin }) => {
    const [isMatrixActive, setIsMatrixActive] = useState(false);
    const [adminClicks, setAdminClicks] = useState(0);

    // Получаем данные о платформе через твой сервис
    const userData = useMemo(() => getMaxUserData(), []);

    // Проверка десктопа
    const isDesktop = userData.platform !== 'ANDROID' && userData.platform !== 'IOS';

    // Логика секретного входа в админку
    const handleSecretAdminClick = () => {
        const newCount = adminClicks + 1;
        if (newCount >= 5) {
            setAdminClicks(0);
            if (onAdmin) onAdmin(); // Переход в настройки
        } else {
            setAdminClicks(newCount);
            // Сброс счетчика, если пауза между кликами больше 2 сек
            const timer = setTimeout(() => setAdminClicks(0), 2000);
            return () => clearTimeout(timer);
        }
    };

    // Динамический стиль: отключаем блюр на десктопе для устранения мерцания
    const backdropStyle = isDesktop
        ? {
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none',
            backgroundColor: 'rgba(0, 255, 204, 0.12)'
        }
        : {
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)'
        };

    return (
        <div className="relative flex flex-col items-center justify-center h-full space-y-10 p-6 animate-in fade-in duration-700 transform-gpu">

            {/* НЕВИДИМАЯ КНОПКА АДМИНКИ (Справа вверху) */}
            <div
                onClick={handleSecretAdminClick}
                className="absolute top-0 right-0 w-20 h-20 z-50 cursor-default opacity-0"
            />

            {/* 1. МАТРИЦА */}
            {isMatrixActive && (
                <div className="fixed inset-0 z-0 animate-in fade-in duration-1000 pointer-events-none">
                    <UserMatrixBackground />
                </div>
            )}

            {/* 2. КОНТЕНТНАЯ ЧАСТЬ */}
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

            {/* 3. БЛОК КНОПОК */}
            <div className="relative z-10 w-full max-w-xs space-y-4">
                <button
                    onClick={onStart}
                    className="w-full group relative p-8 border border-[#00ffcc]/30 bg-[#00ffcc]/5 rounded-[1px] hover:bg-[#00ffcc]/15 hover:border-[#00ffcc] transition-all duration-500 overflow-hidden"
                    style={{
                        ...backdropStyle,
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)'
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-[#00ffcc]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 flex flex-col items-center gap-2">
                        <Zap className="text-[#00ffcc] group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(0,255,204,0.8)] transition-all duration-500" />
                        <span className="text-xl font-bold text-white tracking-[0.2em] uppercase font-mono">Вход в нору</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>

                <button
                    onClick={() => setIsMatrixActive(!isMatrixActive)}
                    className={`w-full flex items-center justify-center gap-3 p-4 border rounded-[1px] transition-all duration-700 
                        ${isMatrixActive
                        ? 'border-[#00ffcc] bg-[#00ffcc]/10 opacity-100 shadow-[0_0_20px_rgba(0,255,204,0.2)]'
                        : 'border-white/10 bg-white/5 opacity-60 hover:opacity-100 hover:border-[#00ffcc]/30'
                    }`}
                    style={{
                        ...backdropStyle,
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)'
                    }}
                >
                    <Eye
                        size={16}
                        className={`transition-all duration-500 ${isMatrixActive ? 'text-[#00ffcc] drop-shadow-[0_0_8px_rgba(0,255,204,0.8)]' : 'text-[#00ffcc]/60'}`}
                    />
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/80 font-mono font-bold">
                        {isMatrixActive ? 'КОД ЛИЧНОСТИ: АКТИВЕН' : 'Истина где-то рядом'}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default MainScreen;