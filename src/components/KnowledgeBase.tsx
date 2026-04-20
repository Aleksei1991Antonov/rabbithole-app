import React, { useState } from 'react';
import { ChevronLeft, BookOpen, Moon, ChevronDown, Search, FileText, Shield, Cpu } from 'lucide-react';

interface KnowledgeBaseProps {
    onBack: () => void;
}

const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ onBack }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [openItem, setOpenItem] = useState<string | null>(null);

    const toggleItem = (id: string) => {
        setOpenItem(openItem === id ? null : id);
    };

    const categories = [
        {
            id: 'immersion',
            title: 'Протокол Тишины',
            description: 'Базовые требования для достижения глубокого резонанса с системой.',
            icon: <Moon size={18} className="text-[#00ffcc]" />,
            items: [
                {
                    q: 'Изоляция звука',
                    a: 'Для полной деконструкции внешнего шума обязательно использование наушников. Это позволяет аудио-визуальному ряду воздействовать напрямую на когнитивные центры.'
                },
                {
                    q: 'Режим «Не беспокоить»',
                    a: 'Входящие уведомления мессенджера MAX могут прервать поток погружения. Активируйте системный режим тишины перед началом сессии.'
                },
                {
                    q: 'Золотой час',
                    a: 'Наилучшее время для работы с Норой: 22:00 — 02:00. Когда внешний мир затихает, внутренний голос становится яснее и доступнее для анализа.'
                }
            ]
        },
        {
            id: 'navigation',
            title: 'Векторы Движения',
            description: 'Как управлять направлением диалога и глубиной исследования.',
            icon: <Cpu size={18} className="text-[#00ffcc]" />,
            items: [
                {
                    q: 'Вектор: ВГЛУБЬ',
                    a: 'Основной путь деконструкции. Увеличивает уровень (lvl) погружения, переходя к более сложным и абстрактным концепциям бытия.'
                },
                {
                    q: 'Вектор: ВШИРЬ',
                    a: 'Горизонтальное исследование текущего уровня. Позволяет рассмотреть ситуацию с разных сторон, не увеличивая когнитивную нагрузку.'
                },
                {
                    q: 'Вектор: ВВЕРХ',
                    a: 'Процесс постепенной декомпрессии. Используется для мягкого возвращения к реальности и интеграции полученного опыта.'
                }
            ]
        },
        {
            id: 'storage',
            title: 'Память и Данные',
            description: 'Технические аспекты хранения вашей истории в экосистеме MAX.',
            icon: <Shield size={18} className="text-[#00ffcc]" />,
            items: [
                {
                    q: 'Где хранятся мои данные?',
                    a: 'Ваши сессии сохраняются локально в DeviceStorage вашего мессенджера MAX. Мы не передаем тексты ваших размышлений на внешние сервера.'
                },
                {
                    q: 'Как стереть историю?',
                    a: 'Для полной очистки памяти используйте кнопку «Завершить и стереть» в меню выхода. Это безвозвратно удалит текущий слепок сессии с устройства.'
                },
                {
                    q: 'Синхронизация',
                    a: 'В текущей версии (v1.0.0-beta) данные привязаны к конкретному устройству. При удалении мессенджера MAX локальное хранилище будет очищено.'
                }
            ]
        }
    ];

    const filteredCategories = categories.map(cat => ({
        ...cat,
        items: cat.items.filter(item =>
            item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(cat => cat.items.length > 0);

    return (
        <div className="flex flex-col h-full p-6 space-y-6 animate-in fade-in duration-500 bg-black text-white font-mono overflow-hidden">
            {/* Хедер */}
            <div className="flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-[1px] transition-colors">
                        <ChevronLeft className="text-[#00ffcc]" />
                    </button>
                    <h2 className="text-xl font-black uppercase tracking-widest text-white leading-none">Архив Данных</h2>
                </div>
                <BookOpen size={20} className="text-[#00ffcc]/40" />
            </div>

            {/* Поиск */}
            <div className="relative shrink-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00ffcc]/40" size={16} />
                <input
                    type="text"
                    placeholder="ПОИСК ПО ПРОТОКОЛАМ..."
                    className="w-full bg-white/5 border border-white/10 py-3 pl-10 pr-4 text-[10px] uppercase tracking-widest focus:border-[#00ffcc]/50 outline-none transition-all placeholder:text-white/10 rounded-[1px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Список категорий */}
            <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide space-y-8">
                {filteredCategories.map((cat) => (
                    <div key={cat.id} className="space-y-3">
                        <div className="flex flex-col gap-1 px-1">
                            <div className="flex items-center gap-2">
                                {cat.icon}
                                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#00ffcc]">
                  {cat.title}
                </span>
                            </div>
                            <p className="text-[9px] text-white/30 uppercase leading-relaxed tracking-tight">
                                {cat.description}
                            </p>
                        </div>

                        <div className="grid gap-1">
                            {cat.items.map((item, idx) => {
                                const itemId = `${cat.id}-${idx}`;
                                const isOpen = openItem === itemId;

                                return (
                                    <div key={idx} className="border border-white/5 overflow-hidden transition-all duration-300 rounded-[1px]">
                                        <button
                                            onClick={() => toggleItem(itemId)}
                                            className={`w-full flex items-center justify-between p-4 transition-all text-left ${
                                                isOpen ? 'bg-[#00ffcc]/10 border-b border-[#00ffcc]/20' : 'bg-white/[0.02] hover:bg-[#00ffcc]/5'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <FileText size={14} className={`${isOpen ? 'text-[#00ffcc]' : 'text-white/20'}`} />
                                                <span className={`text-[10px] uppercase tracking-wider transition-colors ${isOpen ? 'text-white' : 'text-white/60'}`}>
                          {item.q}
                        </span>
                                            </div>
                                            <ChevronDown size={14} className={`text-[#00ffcc] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                            isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                                        }`}>
                                            <div className="p-4 text-[10px] leading-relaxed text-white/40 uppercase tracking-tight bg-black/40">
                                                {item.a}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Футер */}
            <div className="shrink-0 pt-4 border-t border-white/5 text-center">
                <p className="text-[8px] text-white/20 uppercase tracking-[0.3em]">
                    Система: Кроличья Нора // v1.1.0-max
                </p>
            </div>
        </div>
    );
};

export default KnowledgeBase;