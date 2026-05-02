import { useState, useEffect, useMemo } from 'react';
import { Home, Zap, Settings } from 'lucide-react';

// Компоненты
import VortexBackground from './components/VortexBackground';
import HypnoticVortex from './components/HypnoticVortex';
import DesktopBlocker from './pages/DesktopBlocker';

// Страницы
import WelcomePage from './pages/WelcomePage';
import MainScreen from './pages/MainScreen';
import DiveScreen from './pages/DiveScreen';
import SettingsScreen from './pages/SettingsScreen';
import AdminPanel from './components/AdminPanel';

// Сервис моста
import { getMaxUserData } from './components/maxBridge';

type View = 'main' | 'dive' | 'settings' | 'admin';

const POLICY_VERSION = 1;
const STORAGE_KEY = 'rabbit_hole_accepted_version';

function App() {
    const userData = useMemo(() => getMaxUserData(), []);
    const isMobile = userData.platform === 'ANDROID' || userData.platform === 'IOS';

    // СОСТОЯНИЕ ДЛЯ ЭФФЕКТА ПОЯВЛЕНИЯ
    const [showSplash, setShowSplash] = useState(true);
    const [isSplashMounted, setIsSplashMounted] = useState(true);

    // Лазейка для десктопа
    const [isDevBypass, setIsDevBypass] = useState(false);
    const [view, setView] = useState<View>('main');

    useEffect(() => {
        // 1. Установка системных цветов
        const head = document.getElementsByTagName('head')[0];
        const metaColor = document.createElement('meta');
        metaColor.name = "theme-color";
        metaColor.content = "#000000";
        head.appendChild(metaColor);

        document.documentElement.style.backgroundColor = "#000000";
        document.body.style.backgroundColor = "#000000";

        // 2. Логика исчезновения Splash Screen
        const timer = setTimeout(() => {
            setShowSplash(false); // Начинаем растворение (opacity 0)
            // Полностью удаляем из DOM после завершения анимации (1 секунда)
            setTimeout(() => setIsSplashMounted(false), 1000);
        }, 1200); // Держим черный экран 1.2 сек, пока грузятся тяжелые фоны

        return () => clearTimeout(timer);
    }, []);

    const [isAccepted, setIsAccepted] = useState(() => {
        const savedVersion = localStorage.getItem(STORAGE_KEY);
        return savedVersion === POLICY_VERSION.toString();
    });

    const handleAccept = () => {
        localStorage.setItem(STORAGE_KEY, POLICY_VERSION.toString());
        setIsAccepted(true);
    };

    // 1. Блокировка десктопа
    if (!isMobile && !isDevBypass) {
        return <DesktopBlocker onBypass={() => setIsDevBypass(true)} />;
    }

    // 2. Соглашение
    if (!isAccepted) {
        return <WelcomePage onAccept={handleAccept} />;
    }

    const currentView = view as string;
    const isDiveMode = currentView === 'dive';
    const isAdminMode = currentView === 'admin';

    return (
        <div className="relative h-screen w-full text-[#cccccc] overflow-hidden font-sans bg-black">

            {/* ФОН FIXED */}
            <div className="fixed inset-0 z-0 bg-[#020202] pointer-events-none">
                <VortexBackground />
                {currentView === 'main' && (
                    <div className="absolute inset-0 opacity-80 animate-in fade-in duration-1000">
                        <HypnoticVortex />
                    </div>
                )}
                <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,1)]" />
            </div>

            {/* КОНТЕНТ */}
            <main className="relative z-10 h-full w-full overflow-hidden bg-transparent transition-all duration-500">
                {currentView === 'main' && (
                    <MainScreen
                        onStart={() => setView('dive')}
                        onAdmin={() => setView('admin')}
                    />
                )}
                {currentView === 'dive' && <DiveScreen onBack={() => setView('main')} />}
                {currentView === 'settings' && <SettingsScreen onBack={() => setView('main')} />}
                {currentView === 'admin' && <AdminPanel onBack={() => setView('main')} />}
            </main>

            {/* НАВИГАЦИЯ */}
            {!isDiveMode && !isAdminMode && (
                <footer className="fixed bottom-0 left-0 w-full z-50 p-4 border-t border-white/10 bg-[#00ffcc]/5 backdrop-blur-[2px] flex justify-around items-center pb-8 animate-in slide-in-from-bottom duration-500">
                    <button
                        onClick={() => setView('main')}
                        className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${currentView === 'main' ? 'text-[#00ffcc]' : 'text-white/30 hover:text-white/50'}`}
                    >
                        <Home size={22} strokeWidth={currentView === 'main' ? 2.5 : 1.5} className={currentView === 'main' ? 'drop-shadow-[0_0_8px_rgba(0,255,204,0.4)]' : ''} />
                        <span className="text-[9px] uppercase font-black tracking-[0.2em] font-mono">Главная</span>
                    </button>

                    <button
                        onClick={() => setView('dive')}
                        className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${currentView === 'dive' ? 'text-[#00ffcc]' : 'text-white/30 hover:text-white/50'}`}
                    >
                        <Zap size={22} strokeWidth={currentView === 'dive' ? 2.5 : 1.5} className={currentView === 'dive' ? 'drop-shadow-[0_0_8px_rgba(0,255,204,0.4)]' : ''} />
                        <span className="text-[9px] uppercase font-black tracking-[0.2em] font-mono">Нора</span>
                    </button>

                    <button
                        onClick={() => setView('settings')}
                        className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${currentView === 'settings' ? 'text-[#00ffcc]' : 'text-white/30 hover:text-white/50'}`}
                    >
                        <Settings size={22} strokeWidth={currentView === 'settings' ? 2.5 : 1.5} className={currentView === 'settings' ? 'drop-shadow-[0_0_8px_rgba(0,255,204,0.4)]' : ''} />
                        <span className="text-[9px] uppercase font-black tracking-[0.2em] font-mono">Система</span>
                    </button>
                </footer>
            )}

            {/* ЧЕРНЫЙ ЭКРАН ЗАГРУЗКИ (SPLASH SCREEN) */}
            {isSplashMounted && (
                <div
                    className={`fixed inset-0 z-[100] bg-black transition-opacity duration-1000 ease-in-out ${showSplash ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                />
            )}
        </div>
    );
}

export default App;