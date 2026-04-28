import React, { useState } from 'react';
import { Zap, Eye } from 'lucide-react';
import UserMatrixBackground from '../components/UserMatrixBackground';

// 1. Описываем интерфейс для тех методов, которые нам нужны
interface AdminWebApp {
    DeviceStorage?: {
        clear: () => Promise<void>;
    };
}

interface MainScreenProps {
    onStart: () => void;
}

const MainScreen: React.FC<MainScreenProps> = ({ onStart }) => {
    const [isMatrixActive, setIsMatrixActive] = useState(false);

    // Скрытый скрипт сброса (Админ-доступ)
    const handleAdminReset = async () => {
        const confirmed = window.confirm(
            "АДМИН-ДОСТУП:\n\nВы хотите удалить данные платежей и все сохранения?"
        );

        if (confirmed) {
            try {
                // Очистка локального хранилища браузера
                localStorage.clear();

                // Безопасное приведение типа через unknown, чтобы ESLint не ругался на any
                const webApp = (window as unknown as { WebApp?: AdminWebApp }).WebApp;

                if (webApp?.DeviceStorage) {
                    await webApp.DeviceStorage.clear();
                }

                alert("СИСТЕМА: Все данные успешно удалены.");
                window.location.reload();
            } catch (error) {
                alert("Ошибка при очистке: " + error);
            }
        }
    };

    return (
        /* transform-gpu предотвращает мерцание при анимациях в WebView */
        <div className="relative flex flex-col items-center justify-center h-full space-y-10 p-6 animate-in fade-in duration-700 transform-gpu">

            {/* СКРЫТАЯ КНОПКА АДМИНА (НЕВИДИМАЯ)
                Находится в правом верхнем углу, размер 64x64 пикселя */}
            <button
                onClick={handleAdminReset}
                className="fixed top-0 right-0 w-16 h-16 z-[99999] bg-transparent border-none outline-none cursor-default"
                aria-label="Admin Access"
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
                    className="w-full group relative p-8 border border-[#00ffcc]/30 bg-[#00ffcc]/5 backdrop-blur-[2px] rounded-[1px] hover:bg-[#00ffcc]/15 hover:border-[#00ffcc] transition-all duration-500 overflow-hidden"
                    style={{
                        WebkitBackdropFilter: 'blur(2px)',
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
                    className={`w-full flex items-center justify-center gap-3 p-4 border backdrop-blur-[2px] rounded-[1px] transition-all duration-700 
                        ${isMatrixActive
                        ? 'border-[#00ffcc] bg-[#00ffcc]/10 opacity-100 shadow-[0_0_20px_rgba(0,255,204,0.2)]'
                        : 'border-white/10 bg-white/5 opacity-60 hover:opacity-100 hover:border-[#00ffcc]/30'
                    }`}
                    style={{
                        WebkitBackdropFilter: 'blur(2px)',
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