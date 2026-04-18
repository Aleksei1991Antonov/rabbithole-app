import React, { useState } from 'react';
import { ChevronLeft, Shield, FileText, Mail, Trash2, ExternalLink, Building2, ChevronDown, User, Maximize2, Database, Copy, Check } from 'lucide-react';
import PrivacyPolicy from '../components/PrivacyPolicy';
import TermsOfService from '../components/TermsOfService';
import KnowledgeBase from '../components/KnowledgeBase';

interface SettingsScreenProps {
    onBack: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
    const [isLegalOpen, setIsLegalOpen] = useState(false);
    const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
    const [activeDoc, setActiveDoc] = useState<'privacy' | 'terms' | null>(null);
    const [showKnowledgeBase, setShowKnowledgeBase] = useState(false);
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const photoPath = "my_photo.png";
    const supportEmail = "rabbithole.help@vk.com";
    const inn = "760407796785";
    const ogrnip = "326760000001804";
    const address = "Россия г. Ярославль";

    const handleCopy = (text: string, fieldId: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(fieldId);
        setTimeout(() => setCopiedField(null), 1500);
    };

    if (showKnowledgeBase) {
        return <KnowledgeBase onBack={() => setShowKnowledgeBase(false)} />;
    }

    return (
        <div className="flex flex-col h-full p-6 space-y-6 animate-in slide-in-from-right-4 duration-500 overflow-y-auto bg-black text-white font-mono relative">

            {activeDoc === 'privacy' && <PrivacyPolicy onBack={() => setActiveDoc(null)} />}
            {activeDoc === 'terms' && <TermsOfService onBack={() => setActiveDoc(null)} />}

            {isPhotoModalOpen && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 animate-in fade-in duration-300 cursor-pointer"
                    onClick={() => setIsPhotoModalOpen(false)}
                >
                    <div className="relative w-full max-w-sm aspect-square border border-[#00ffcc]/30 p-1 bg-black shadow-[0_0_60px_rgba(0,255,204,0.2)] animate-in zoom-in-95 duration-300">
                        <img src={photoPath} alt="Алексей Антонов" className="w-full h-full object-cover" />
                        <div className="absolute -bottom-14 left-0 w-full text-center">
                            <div className="text-sm font-black uppercase tracking-[0.4em] text-[#00ffcc]">Алексей Антонов</div>
                            <div className="text-[10px] text-white/40 uppercase mt-2 tracking-widest">Архитектор Системы</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Хедер */}
            <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-[1px] transition-colors">
                    <ChevronLeft className="text-[#00ffcc]" />
                </button>
                <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Система</h2>
            </div>

            {/* Профиль / ID */}
            <div className="p-4 border border-white/10 bg-white/5 rounded-[1px] flex justify-between items-center">
                <div className="space-y-1">
                    <div className="text-[10px] text-white/40 uppercase tracking-widest">Ваш ID в системе</div>
                    <div className="text-sm font-bold text-[#00ffcc]">id_demo_user</div>
                </div>
                <div className="px-2 py-1 border border-[#00ffcc]/20 text-[8px] text-[#00ffcc] uppercase">Исследователь</div>
            </div>

            {/* Раздел: Помощь */}
            <div className="space-y-2">
                <h3 className="text-[10px] text-white/40 uppercase tracking-[0.2em] ml-1">Поддержка</h3>
                <div className="grid gap-1">
                    <button
                        onClick={() => setShowKnowledgeBase(true)}
                        className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between transition-colors rounded-[1px]"
                    >
                        <div className="flex items-center gap-3">
                            <Database size={18} className="text-[#00ffcc]" />
                            <span className="text-xs uppercase tracking-tight text-white/90 font-bold">База знаний</span>
                        </div>
                        <ChevronLeft size={14} className="text-white/20 rotate-180" />
                    </button>

                    <div className="flex gap-1">
                        <a
                            href={`mailto:${supportEmail}`}
                            className="flex-1 p-4 bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between transition-colors rounded-[1px] group"
                        >
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-[#00ffcc]" />
                                <div className="flex flex-col items-start text-left">
                                    <span className="text-xs uppercase tracking-tight text-white/90 font-bold">Техническая поддержка</span>
                                    <span className="text-[9px] text-[#00ffcc]/60 lowercase tracking-wider">{supportEmail}</span>
                                </div>
                            </div>
                            <ExternalLink size={14} className="text-white/20 group-hover:text-[#00ffcc] transition-colors" />
                        </a>
                        <button
                            onClick={() => handleCopy(supportEmail, 'support_mail')}
                            className="px-4 bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition-colors rounded-[1px]"
                        >
                            {copiedField === 'support_mail' ? <Check size={16} className="text-[#00ffcc]" /> : <Copy size={16} className="text-white/20" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Раздел: Юридическая информация */}
            <div className="space-y-2">
                <h3 className="text-[10px] text-white/40 uppercase tracking-[0.2em] ml-1">Правовые документы</h3>
                <div className="grid gap-1">
                    <button
                        onClick={() => setActiveDoc('privacy')}
                        className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between transition-colors rounded-[1px]"
                    >
                        <div className="flex items-center gap-3">
                            <Shield size={18} className="text-white/40" />
                            <span className="text-xs uppercase tracking-tight text-white/70">Политика конфиденциальности</span>
                        </div>
                        <ChevronLeft size={14} className="text-white/20 rotate-180" />
                    </button>
                    <button
                        onClick={() => setActiveDoc('terms')}
                        className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between transition-colors rounded-[1px]"
                    >
                        <div className="flex items-center gap-3">
                            <FileText size={18} className="text-white/40" />
                            <span className="text-xs uppercase tracking-tight text-white/70">Пользовательское соглашение</span>
                        </div>
                        <ChevronLeft size={14} className="text-white/20 rotate-180" />
                    </button>
                </div>
            </div>

            {/* АККОРДЕОН: Информация о Разработчике */}
            <div className="space-y-2">
                <h3 className="text-[10px] text-white/40 uppercase tracking-[0.2em] ml-1">О создателе</h3>
                <div className={`border border-white/10 rounded-[1px] transition-all duration-300 overflow-hidden ${isLegalOpen ? 'bg-white/5 shadow-[0_0_20px_rgba(0,255,204,0.05)]' : 'bg-transparent'}`}>
                    <button onClick={() => setIsLegalOpen(!isLegalOpen)} className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-3 text-[#00ffcc]">
                            <Building2 size={18} />
                            <span className="text-xs font-bold uppercase tracking-widest">ИП АНТОНОВ А.О.</span>
                        </div>
                        <ChevronDown size={18} className={`text-white/20 transition-transform duration-300 ${isLegalOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <div className={`transition-all duration-500 ease-in-out ${isLegalOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-5 pt-0 space-y-5">
                            <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                                <button onClick={() => setIsPhotoModalOpen(true)} className="w-16 h-16 border border-[#00ffcc]/30 p-1 rounded-[1px] bg-black relative flex-shrink-0 group active:scale-95 transition-transform">
                                    <div className="w-full h-full bg-white/5 flex items-center justify-center overflow-hidden relative">
                                        <User size={32} className="text-white/10 absolute" />
                                        <img src={photoPath} alt="" className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-[#00ffcc]">
                                            <Maximize2 size={14} />
                                        </div>
                                    </div>
                                </button>
                                <div className="space-y-1">
                                    <div className="text-[11px] font-black uppercase text-white tracking-widest leading-tight">Антонов Алексей Олегович</div>
                                    <div className="text-[9px] text-[#00ffcc]/60 uppercase tracking-tighter leading-none">Основатель | Ведущий Инженер</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-3 bg-black/40 p-3 border border-white/5">
                                <div className="flex justify-between items-center text-[10px] text-white/70 font-mono group">
                                    <span className="text-[8px] text-white/30 uppercase font-bold">ИНН</span>
                                    <div className="flex items-center gap-2">
                                        <span>{inn}</span>
                                        <button onClick={() => handleCopy(inn, 'inn')} className="hover:text-[#00ffcc] transition-colors">
                                            {copiedField === 'inn' ? <Check size={12} /> : <Copy size={12} className="opacity-30" />}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-[10px] text-white/70 font-mono group">
                                    <span className="text-[8px] text-white/30 uppercase font-bold">ОГРНИП</span>
                                    <div className="flex items-center gap-2">
                                        <span>{ogrnip}</span>
                                        <button onClick={() => handleCopy(ogrnip, 'ogrnip')} className="hover:text-[#00ffcc] transition-colors">
                                            {copiedField === 'ogrnip' ? <Check size={12} /> : <Copy size={12} className="opacity-30" />}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-[10px] text-white/70 font-mono group">
                                    <span className="text-[8px] text-white/30 uppercase font-bold">АДРЕС</span>
                                    <div className="flex items-center gap-2">
                                        <span>{address}</span>
                                        <button onClick={() => handleCopy(address, 'address')} className="hover:text-[#00ffcc] transition-colors">
                                            {copiedField === 'address' ? <Check size={12} /> : <Copy size={12} className="opacity-30" />}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                                    <span className="text-[8px] text-white/30 uppercase font-bold">E-mail</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-[#00ffcc] font-bold tracking-tighter">{supportEmail}</span>
                                        <button onClick={() => handleCopy(supportEmail, 'legal_mail')} className="text-[#00ffcc] hover:text-white transition-colors">
                                            {copiedField === 'legal_mail' ? <Check size={12} /> : <Copy size={12} className="opacity-50" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Удаление аккаунта */}
            <button className="w-full p-4 border border-red-500/10 hover:bg-red-500/5 flex items-center gap-3 transition-colors rounded-[1px] group">
                <Trash2 size={18} className="text-red-500/40 group-hover:text-red-500" />
                <span className="text-xs uppercase tracking-tight text-red-500/40 group-hover:text-red-500">Удалить аккаунт</span>
            </button>

            {/* Футер */}
            <div className="mt-auto pt-10 pb-6 flex flex-col items-center gap-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-white/60 text-[11px] uppercase tracking-[0.2em] font-bold">
                    <span className="w-1 h-1 bg-[#00ffcc] animate-pulse"></span>
                    <span>Версия 1.0.0-beta</span>
                </div>
                <div className="flex flex-col items-center text-center px-4">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-white/80 font-black leading-relaxed">Система искусственного интеллекта<br />«Кроличья Нора»</span>
                    <span className="text-[8px] uppercase tracking-[0.4em] text-[#00ffcc]/40 mt-1">на базе ГигаЧат</span>
                    <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 mt-2">© 2026 Все права защищены</span>
                </div>
            </div>
        </div>
    );
};

export default SettingsScreen;