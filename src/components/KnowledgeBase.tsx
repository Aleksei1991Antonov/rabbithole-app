import React, { useState } from 'react';
import { ChevronLeft, Moon, ChevronDown, Search, FileText, Shield, Cpu, Database } from 'lucide-react';

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
            title: 'Протокол Погружения',
            description: 'Создание условий для максимального когнитивного резонанса.',
            icon: <Moon size={18} className="text-[#00ffcc]" />,
            items: [
                {
                    q: 'Отсутствие звукового ряда',
                    a: 'В текущей версии протокола аудио-визуальный шум минимизирован. Это осознанное решение: тишина заставляет ваш мозг самостоятельно генерировать частоты, необходимые для глубокого трипа.'
                },
                {
                    q: 'Режим «Не беспокоить»',
                    a: 'Внешние уведомления — это якоря реальности. Чтобы «Кроличья Нора» не схлопнулась, активируйте режим тишины. Любое прерывание сбивает калибровку системы.'
                },
                {
                    q: 'Золотой час',
                    a: 'Наилучшее время для синхронизации: 22:00 — 02:00. В этот период коллективное бессознательное затихает, упрощая доступ к вашему личному ROOT-сектору.'
                }
            ]
        },
        {
            id: 'navigation',
            title: 'Векторы Движения',
            description: 'Механика управления вашим падением.',
            icon: <Cpu size={18} className="text-[#00ffcc]" />,
            items: [
                {
                    q: 'Вектор: ВГЛУБЬ',
                    a: 'Прямая деконструкция. Каждый шаг увеличивает уровень на 1.0. Это самый быстрый путь к ядру системы, но и самый энергозатратный для психики.'
                },
                {
                    q: 'Вектор: ВШИРЬ / ВВЕРХ',
                    a: 'Дробное исследование. Увеличивает глубину на 0.5. Позволяет собрать больше данных на текущем горизонте событий, не проваливаясь слишком быстро.'
                },
                {
                    q: 'Ограничение вектора',
                    a: 'Система блокирует повторение одного и того же дробного вектора дважды подряд. Это предотвращает зацикливание вашего сознания в одной плоскости.'
                }
            ]
        },
        {
            id: 'storage',
            title: 'Хранение и Память',
            description: 'Как система оперирует вашими данными и следами.',
            icon: <Database size={18} className="text-[#00ffcc]" />,
            items: [
                {
                    q: 'Где живет моя история?',
                    a: 'Данные записываются: LocalStorage (быстрый доступ на устройстве) и DeviceStorage (привязка к вашему ID в мессенджере). Это гарантирует, что Нора «узнает» вас при следующем визите.'
                },
                {
                    q: 'Как удалить аккаунт?',
                    a: 'Просто удалите бота из вашего списка контактов.'
                },
                {
                    q: 'Конфиденциальность',
                    a: 'Ваши ответы не анализируются людьми. Они существуют только в виде временных векторов для генерации следующего шага. После закрытия цикла сессия архивируется в пустоту.'
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
                <Shield size={20} className="text-[#00ffcc]/40" />
            </div>

            {/* Поиск */}
            <div className="relative shrink-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00ffcc]/40" size={16} />
                <input
                    type="text"
                    placeholder="ДОСТУП К ПРОТОКОЛАМ..."
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
                                            <div className="p-4 text-[10px] leading-relaxed text-white/40 uppercase tracking-tight bg-black/40 border-t border-white/5">
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
                    Система: Кроличья Нора // v1.1.0-MAX
                </p>
            </div>
        </div>
    );
};

export default KnowledgeBase;