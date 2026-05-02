import React, { useState } from 'react';
import { ShieldAlert, Trash2, Unlock, X } from 'lucide-react';

interface ExtendedWebApp {
    DeviceStorage?: {
        setItem: (key: string, value: string) => Promise<{ status: string }>;
        removeItem: (key: string) => Promise<{ status: string }>;
    };
}

interface AdminPanelProps {
    onBack: () => void; // Изменили onClose на onBack
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [targetDepth, setTargetDepth] = useState('0');
    const [statusMsg, setStatusMsg] = useState('');

    const webApp = (window as unknown as { WebApp?: ExtendedWebApp }).WebApp;

    const handleAuth = () => {
        if (password === 'root8801') {
            setIsAuthenticated(true);
            setStatusMsg('ДОСТУП РАЗРЕШЕН');
        } else {
            setStatusMsg('ОШИБКА ДОСТУПА');
            setTimeout(() => setStatusMsg(''), 2000);
        }
    };

    const clearAllData = async () => {
        localStorage.clear();
        if (webApp?.DeviceStorage) {
            await webApp.DeviceStorage.removeItem('is_premium_user_v2');
        }
        setStatusMsg('ДАННЫЕ УДАЛЕНЫ. ПЕРЕЗАГРУЗИТЕ ПРИЛОЖЕНИЕ.');
    };

    const grantPremium = async () => {
        localStorage.setItem('is_premium_user_v2', 'true');
        if (webApp?.DeviceStorage) {
            await webApp.DeviceStorage.setItem('is_premium_user_v2', 'true');
        }
        setStatusMsg('ПРОТОКОЛ "ИЗНАНКА" АКТИВИРОВАН');
    };

    const setLevel = () => {
        const depth = parseFloat(targetDepth);
        const savedState = localStorage.getItem('rabbit_hole_dive_state');
        const state = savedState ? JSON.parse(savedState) : { messages: [], isActiveDive: true };

        state.depth = depth;
        state.isActiveDive = true;

        localStorage.setItem('rabbit_hole_dive_state', JSON.stringify(state));
        setStatusMsg(`УРОВЕНЬ ${depth} УСТАНОВЛЕН. ОБНОВИТЕ ЭКРАН.`);
    };

    return (
        <div className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 font-mono overflow-y-auto">
            <div className="w-full max-w-md border border-[#00ffcc]/30 bg-black p-6 space-y-6 relative rounded-[1px] shadow-[0_0_50px_rgba(0,255,204,0.2)]">
                {/* Кнопка закрытия теперь вызывает onBack */}
                <button onClick={onBack} className="absolute top-4 right-4 text-white/40 hover:text-white">
                    <X size={20} />
                </button>

                <div className="flex items-center gap-3 border-b border-[#00ffcc]/20 pb-4">
                    <ShieldAlert className="text-[#00ffcc]" />
                    <h2 className="text-[12px] font-black uppercase tracking-[0.3em] text-white">Админ-панель</h2>
                </div>

                {!isAuthenticated ? (
                    <div className="space-y-4">
                        <p className="text-[10px] text-white/40 uppercase tracking-widest text-center">Введите ключ доступа</p>
                        <input
                            type="password"
                            autoFocus
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                            className="w-full bg-white/5 border border-white/10 p-4 text-center text-white outline-none focus:border-[#00ffcc]/50"
                            placeholder="••••••••"
                        />
                        <button
                            onClick={handleAuth}
                            className="w-full py-4 bg-[#00ffcc]/10 border border-[#00ffcc]/40 text-[#00ffcc] text-[10px] font-black uppercase tracking-widest"
                        >
                            Авторизация
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <div className="space-y-3">
                            <label className="text-[9px] text-white/40 uppercase tracking-widest">Установка глубины (0-60)</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    value={targetDepth}
                                    onChange={(e) => setTargetDepth(e.target.value)}
                                    className="flex-1 bg-white/5 border border-white/10 p-3 text-white text-sm outline-none"
                                />
                                <button onClick={setLevel} className="px-4 bg-white/10 border border-white/20 text-white text-[10px] uppercase font-bold">
                                    Set
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <button
                                onClick={grantPremium}
                                className="w-full py-4 bg-[#00ffcc]/5 border border-[#00ffcc]/20 text-[#00ffcc] text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3"
                            >
                                <Unlock size={14} /> Выдать полный доступ
                            </button>

                            <button
                                onClick={clearAllData}
                                className="w-full py-4 bg-red-500/5 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3"
                            >
                                <Trash2 size={14} /> Очистить все хранилища
                            </button>
                        </div>
                    </div>
                )}

                {statusMsg && (
                    <div className="p-3 bg-[#00ffcc]/10 border border-[#00ffcc]/20 text-[#00ffcc] text-[9px] text-center uppercase tracking-widest animate-pulse">
                        {statusMsg}
                    </div>
                )}

                <div className="text-[8px] text-white/20 text-center uppercase tracking-[0.4em] pt-4">
                    System_Control_v1.0
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;