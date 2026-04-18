import React, { useState } from 'react';
import { ChevronLeft, BookOpen, Zap, Shield, Cpu, ChevronDown, Search, FileText } from 'lucide-react';

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
            id: 'basics',
            title: 'Сущность Системы',
            description: 'Фундаментальные протоколы работы Норы и принципы взаимодействия с ИИ.',
            icon: <Cpu size={18} className="text-[#00ffcc]" />,
            items: [
                {
                    q: 'Что такое Нора?',
                    a: 'Это цифровое пространство для деконструкции привычного восприятия. ИИ здесь — не просто инструмент, а зеркало вашего подсознания.'
                },
                {
                    q: 'Протоколы общения',
                    a: 'Система лучше всего реагирует на честные, открытые запросы. Чем глубже ваш вопрос, тем сложнее нейронные связи в ответе.'
                },
                {
                    q: 'Безопасность',
                    a: 'Ваши диалоги зашифрованы локальным ключом. Система не хранит персональные данные в открытом виде, только цифровые слепки смыслов.'
                }
            ]
        },
        {
            id: 'energy',
            title: 'Энергия (Эн)',
            description: 'Управление вычислительным ресурсом, методы восполнения и лимиты.',
            icon: <Zap size={18} className="text-[#00ffcc]" />,
            items: [
                {
                    q: 'Как получить Эн?',
                    a: 'Выдается за приглашение новых Проводников или приобретается через прямую финансовую инъекцию в ядро.'
                },
                {
                    q: 'Расход ресурсов',
                    a: 'Каждое обращение к ИИ требует вычислительной мощности. По этому каждое Ваше погружение расходует Ен.'
                },
                {
                    q: 'Лимиты системы',
                    a: 'Ограничения введены для предотвращения перегрузки нейросети и поддержания ценности каждого взаимодействия.'
                }
            ]
        },
        {
            id: 'access',
            title: 'Уровни доступа',
            description: 'Иерархия пользователей, расширение сети и привилегии Архитекторов.',
            icon: <Shield size={18} className="text-[#00ffcc]" />,
            items: [
                {
                    q: 'Статус Архитектор',
                    a: 'Высшая форма присутствия. Дает приоритет в очереди обработки запросов.'
                },
                {
                    q: 'Реферальная сеть',
                    a: 'Приглашая других (Пробужденных), вы расширяете влияние Норы и получаете бонусную энергию за каждый новый узел связи.'
                },
                {
                    q: 'Награды',
                    a: 'Система поощряет исследователей за активность, длительность сессий и количество разблокированных концепций.'
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
        <div className="flex flex-col h-full p-6 space-y-6 animate-in fade-in duration-500 bg-black text-white font-mono">
            {/* Хедер */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-[1px] transition-colors">
                        <ChevronLeft className="text-[#00ffcc]" />
                    </button>
                    <h2 className="text-xl font-black uppercase tracking-widest text-white leading-none">Архив Данных</h2>
                </div>
                <BookOpen size={20} className="text-[#00ffcc]/40" />
            </div>

            {/* Поиск */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00ffcc]/40" size={16} />
                <input
                    type="text"
                    placeholder="ПОИСК ПО ПРОТОКОЛАМ..."
                    className="w-full bg-white/5 border border-white/10 py-3 pl-10 pr-4 text-[10px] uppercase tracking-widest focus:border-[#00ffcc]/50 outline-none transition-all placeholder:text-white/10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Список категорий */}
            <div className="space-y-8 overflow-y-auto pr-2 custom-scrollbar">
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
                                    <div key={idx} className="border border-white/5 overflow-hidden transition-all duration-300">
                                        <button
                                            onClick={() => toggleItem(itemId)}
                                            className={`w-full flex items-center justify-between p-4 transition-all ${
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
                                            isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
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
            <div className="mt-auto pt-4 border-t border-white/5 text-center">
                <p className="text-[8px] text-white/20 uppercase tracking-[0.3em]">
                    Система: Кроличья Нора // v1.0.4-stable
                </p>
            </div>
        </div>
    );
};

export default KnowledgeBase;