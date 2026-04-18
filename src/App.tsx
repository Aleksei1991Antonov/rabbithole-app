import React, { useState } from 'react';
import { Home, Zap, Award, Settings } from 'lucide-react';

// Компоненты
import Header from './components/Header';
import VortexBackground from './components/VortexBackground';
import HypnoticVortex from './components/HypnoticVortex';

// Страницы
import WelcomePage from './pages/WelcomePage'; // Добавили импорт
import MainScreen from './pages/MainScreen';
import DiveScreen from './pages/DiveScreen';
import RewardsScreen from './pages/RewardsScreen';
import SettingsScreen from './pages/SettingsScreen';

type View = 'main' | 'dive' | 'rewards' | 'settings';

const App: React.FC = () => {
    const [view, setView] = useState<View>('main');
    const [tokens] = useState(9999);

    // Состояние проверки возраста и согласия
    const [isAccepted, setIsAccepted] = useState(false);

    // Если согласие не получено, показываем ТОЛЬКО WelcomePage
    if (!isAccepted) {
        return <WelcomePage onAccept={() => setIsAccepted(true)} />;
    }

    // Если согласие получено, рендерим основное приложение
    return (
        <div className="relative h-screen w-full text-[#cccccc] overflow-hidden font-sans bg-transparent">

            {/* ФОН FIXED */}
            <div className="fixed inset-0 z-[-1] bg-[#020202] pointer-events-none">
                <VortexBackground />

                {view === 'main' && (
                    <div className="absolute inset-0 opacity-80 animate-in fade-in duration-1000">
                        <HypnoticVortex />
                    </div>
                )}

                <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,1)]" />
            </div>

            {/* ШАПКА */}
            <div className="fixed top-0 left-0 w-full z-50">
                <Header userName="Демо Профиль" balance={tokens} />
            </div>

            {/* КОНТЕНТ */}
            <main className="relative z-10 h-full w-full pt-[72px] pb-[90px] overflow-hidden bg-transparent">
                {view === 'main' && <MainScreen onStart={() => setView('dive')} />}
                {view === 'dive' && <DiveScreen onBack={() => setView('main')} />}
                {view === 'rewards' && <RewardsScreen onBack={() => setView('main')} />}
                {view === 'settings' && <SettingsScreen onBack={() => setView('main')} />}
            </main>

            {/* НАВИГАЦИЯ */}
            <footer className="fixed bottom-0 left-0 w-full z-50 p-4 border-t border-white/10 bg-[#00ffcc]/5 backdrop-blur-[2px] flex justify-around items-center pb-8 transition-all duration-500">
                <button
                    onClick={() => setView('main')}
                    className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${view === 'main' ? 'text-[#00ffcc]' : 'text-white/30 hover:text-white/50'}`}
                >
                    <Home size={22} strokeWidth={view === 'main' ? 2.5 : 1.5} className={view === 'main' ? 'drop-shadow-[0_0_8px_rgba(0,255,204,0.4)]' : ''} />
                    <span className="text-[9px] uppercase font-black tracking-[0.2em] font-mono">Главная</span>
                </button>

                <button
                    onClick={() => setView('dive')}
                    className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${view === 'dive' ? 'text-[#00ffcc]' : 'text-white/30 hover:text-white/50'}`}
                >
                    <Zap size={22} strokeWidth={view === 'dive' ? 2.5 : 1.5} className={view === 'dive' ? 'drop-shadow-[0_0_8px_rgba(0,255,204,0.4)]' : ''} />
                    <span className="text-[9px] uppercase font-black tracking-[0.2em] font-mono">Нора</span>
                </button>

                <button
                    onClick={() => setView('rewards')}
                    className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${view === 'rewards' ? 'text-[#00ffcc]' : 'text-white/30 hover:text-white/50'}`}
                >
                    <Award size={22} strokeWidth={view === 'rewards' ? 2.5 : 1.5} className={view === 'rewards' ? 'drop-shadow-[0_0_8px_rgba(0,255,204,0.4)]' : ''} />
                    <span className="text-[9px] uppercase font-black tracking-[0.2em] font-mono">Награды</span>
                </button>

                <button
                    onClick={() => setView('settings')}
                    className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${view === 'settings' ? 'text-[#00ffcc]' : 'text-white/30 hover:text-white/50'}`}
                >
                    <Settings size={22} strokeWidth={view === 'settings' ? 2.5 : 1.5} className={view === 'settings' ? 'drop-shadow-[0_0_8px_rgba(0,255,204,0.4)]' : ''} />
                    <span className="text-[9px] uppercase font-black tracking-[0.2em] font-mono">Система</span>
                </button>
            </footer>
        </div>
    );
};

export default App;