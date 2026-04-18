import React, { useState } from 'react';
import { ArrowRight, ShieldAlert, FileText, ShieldCheck } from 'lucide-react';
import PrivacyPolicy from '../components/PrivacyPolicy';
import TermsOfService from '../components/TermsOfService';

interface WelcomePageProps {
    onAccept: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onAccept }) => {
    const [agreed, setAgreed] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);
    const [showTerms, setShowTerms] = useState(false);

    if (showPrivacy) return <PrivacyPolicy onBack={() => setShowPrivacy(false)} />;
    if (showTerms) return <TermsOfService onBack={() => setShowTerms(false)} />;

    return (
        <div className="min-h-screen bg-[#020202] text-[#cccccc] font-mono flex flex-col items-center justify-center p-6 selection:bg-[#00ffcc]/30 selection:text-white">

            {/* Декоративный фон */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00ffcc]/10 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 max-w-md w-full space-y-8 border border-[#00ffcc]/20 p-8 bg-[#00ffcc]/5 backdrop-blur-[4px] shadow-[0_0_50px_rgba(0,0,0,1)]">

                {/* Заголовок системы */}
                <div className="space-y-3 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 border border-[#00ffcc]/30 rounded-full mb-2 shadow-[0_0_15px_rgba(0,255,204,0.1)]">
                        <ShieldAlert size={24} className="text-[#00ffcc] animate-pulse" />
                    </div>
                    <h1 className="text-white text-2xl tracking-[0.3em] uppercase font-black drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">
                        Инициация
                    </h1>
                    <p className="text-[10px] text-[#00ffcc] uppercase tracking-[0.4em] font-bold opacity-80">
                        Система: Кроличья Нора // v1.0.0-beta
                    </p>
                </div>

                {/* Предупреждение */}
                <div className="space-y-4 text-[11px] leading-relaxed border-y border-white/10 py-6 text-justify uppercase tracking-tight">
                    <p className="text-white/90">
                        [ВНИМАНИЕ]: Данный интерфейс предназначен для глубокой психологической рефлексии и деконструкции привычного восприятия.
                    </p>
                    <p className="text-white/50 border-l-2 border-[#00ffcc]/40 pl-4 italic text-[10px]">
                        Контент может содержать сложные экзистенциальные концепции. Использование системы лицами моложе 18 лет строго запрещено.
                    </p>
                </div>

                {/* Интерактив */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        <label className="flex items-start space-x-4 cursor-pointer group">
                            <div className="relative flex items-center mt-1">
                                <input
                                    type="checkbox"
                                    className="peer appearance-none w-5 h-5 border border-[#00ffcc]/30 bg-black checked:bg-[#00ffcc]/20 checked:border-[#00ffcc] transition-all duration-300 cursor-pointer"
                                    checked={agreed}
                                    onChange={() => setAgreed(!agreed)}
                                />
                                <div className="absolute inset-0 pointer-events-none hidden peer-checked:flex items-center justify-center">
                                    <div className="w-2 h-2 bg-[#00ffcc] shadow-[0_0_8px_#00ffcc]" />
                                </div>
                            </div>
                            <span className="text-[9px] uppercase leading-[1.6] text-white/40 group-hover:text-white/70 transition-colors tracking-wider">
                Я подтверждаю, что мне исполнилось 18 лет. Я принимаю условия работы системы и ознакомлен с документами ниже.
              </span>
                        </label>

                        {/* Кнопки документов полными словами */}
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => setShowPrivacy(true)}
                                className="flex items-center justify-between px-4 py-3 border border-white/5 bg-white/5 hover:bg-[#00ffcc]/5 hover:border-[#00ffcc]/30 transition-all text-[9px] uppercase tracking-widest text-white/40 hover:text-[#00ffcc] group/btn"
                            >
                                <div className="flex items-center gap-3">
                                    <ShieldCheck size={14} className="opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                                    <span>Политика конфиденциальности</span>
                                </div>
                                <ArrowRight size={12} className="opacity-0 group-hover/btn:opacity-100 -translate-x-2 group-hover/btn:translate-x-0 transition-all" />
                            </button>

                            <button
                                onClick={() => setShowTerms(true)}
                                className="flex items-center justify-between px-4 py-3 border border-white/5 bg-white/5 hover:bg-[#00ffcc]/5 hover:border-[#00ffcc]/30 transition-all text-[9px] uppercase tracking-widest text-white/40 hover:text-[#00ffcc] group/btn"
                            >
                                <div className="flex items-center gap-3">
                                    <FileText size={14} className="opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                                    <span>Пользовательское соглашение</span>
                                </div>
                                <ArrowRight size={12} className="opacity-0 group-hover/btn:opacity-100 -translate-x-2 group-hover/btn:translate-x-0 transition-all" />
                            </button>
                        </div>
                    </div>

                    <button
                        disabled={!agreed}
                        onClick={onAccept}
                        className={`w-full group relative py-5 flex items-center justify-center space-x-3 border transition-all duration-700 overflow-hidden ${
                            agreed
                                ? 'border-[#00ffcc] text-white shadow-[0_0_20px_rgba(0,255,204,0.15)] hover:bg-[#00ffcc]/10'
                                : 'border-white/10 text-white/20 cursor-not-allowed'
                        }`}
                    >
                        {agreed && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        )}
                        <span className="uppercase tracking-[0.5em] text-xs font-black">Войти в систему</span>
                        <ArrowRight size={16} className={`${agreed ? 'text-[#00ffcc] animate-pulse' : ''}`} />
                    </button>
                </div>

                {/* Футер */}
                <div className="flex justify-between items-center text-[9px] text-white/20 uppercase tracking-[0.2em] pt-2 font-bold font-mono">
                    <span>ID: 0x21_BETA</span>
                    <span className="text-[#00ffcc]/40">RF-LAW-436 / 18+</span>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;