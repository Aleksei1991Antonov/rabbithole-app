import { useState, useEffect } from 'react';
import { Home, Zap, Settings } from 'lucide-react';

// Компоненты
import VortexBackground from './components/VortexBackground';
import HypnoticVortex from './components/HypnoticVortex';

// Страницы
import WelcomePage from './pages/WelcomePage';
import MainScreen from './pages/MainScreen';
import DiveScreen from './pages/DiveScreen';
import SettingsScreen from './pages/SettingsScreen';

type View = 'main' | 'dive' | 'settings';

const POLICY_VERSION = 1;
const STORAGE_KEY = 'rabbit_hole_accepted_version';

function App() {
    const [view, setView] = useState<View>('main');

    useEffect(() => {
        const head = document.getElementsByTagName('head')[0];
        const metaColor = document.createElement('meta');
        metaColor.name = "theme-color";
        metaColor.content = "#000000";
        head.appendChild(metaColor);

        document.documentElement.style.backgroundColor = "#000000";
        document.body.style.backgroundColor = "#000000";
    }, []);

    const [isAccepted, setIsAccepted] = useState(() => {
        const savedVersion = localStorage.getItem(STORAGE_KEY);
        return savedVersion === POLICY_VERSION.toString();
    });

    const handleAccept = () => {
        localStorage.setItem(STORAGE_KEY, POLICY_VERSION.toString());
        setIsAccepted(true);
    };

    if (!isAccepted) {
        return <WelcomePage onAccept={handleAccept} />;
    }

    const isDiveMode = (view as string) === 'dive';

    return (
        <div className="relative h-screen w-full text-[#cccccc] overflow-hidden font-sans bg-transparent">

            {/* ФОН FIXED */}
            <div className="fixed inset-0 z-0 bg-[#020202] pointer-events-none">
                <VortexBackground />
                {view === 'main' && (
                    <div className="absolute inset-0 opacity-80 animate-in fade-in duration-1000">
                        <HypnoticVortex />
                    </div>
                )}
                <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,1)]" />
            </div>

            {/* КОНТЕНТ - УБРАЛИ pb-[90px], чтобы контент заходил ПОД навигацию */}
            <main className="relative z-10 h-full w-full overflow-hidden bg-transparent transition-all duration-500">
                {view === 'main' && <MainScreen onStart={() => setView('dive')} />}
                {view === 'dive' && <DiveScreen onBack={() => setView('main')} />}
                {view === 'settings' && <SettingsScreen onBack={() => setView('main')} />}
            </main>

            {/* НАВИГАЦИЯ */}
            {!isDiveMode && (
                <footer className="fixed bottom-0 left-0 w-full z-50 p-4 border-t border-white/10 bg-[#00ffcc]/5 backdrop-blur-[2px] flex justify-around items-center pb-8 animate-in slide-in-from-bottom duration-500">
                    <button
                        onClick={() => setView('main')}
                        className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${(view as string) === 'main' ? 'text-[#00ffcc]' : 'text-white/30 hover:text-white/50'}`}
                    >
                        <Home size={22} strokeWidth={(view as string) === 'main' ? 2.5 : 1.5} className={(view as string) === 'main' ? 'drop-shadow-[0_0_8px_rgba(0,255,204,0.4)]' : ''} />
                        <span className="text-[9px] uppercase font-black tracking-[0.2em] font-mono">Главная</span>
                    </button>

                    <button
                        onClick={() => setView('dive')}
                        className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${(view as string) === 'dive' ? 'text-[#00ffcc]' : 'text-white/30 hover:text-white/50'}`}
                    >
                        <Zap size={22} strokeWidth={(view as string) === 'dive' ? 2.5 : 1.5} className={(view as string) === 'dive' ? 'drop-shadow-[0_0_8px_rgba(0,255,204,0.4)]' : ''} />
                        <span className="text-[9px] uppercase font-black tracking-[0.2em] font-mono">Нора</span>
                    </button>

                    <button
                        onClick={() => setView('settings')}
                        className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${(view as string) === 'settings' ? 'text-[#00ffcc]' : 'text-white/30 hover:text-white/50'}`}
                    >
                        <Settings size={22} strokeWidth={(view as string) === 'settings' ? 2.5 : 1.5} className={(view as string) === 'settings' ? 'drop-shadow-[0_0_8px_rgba(0,255,204,0.4)]' : ''} />
                        <span className="text-[9px] uppercase font-black tracking-[0.2em] font-mono">Система</span>
                    </button>
                </footer>
            )}
        </div>
    );
}

export default App;