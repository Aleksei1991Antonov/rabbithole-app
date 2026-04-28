import React from 'react';
import { ChevronLeft, ShieldCheck, Eye, Lock, BarChart3, Database, Mail } from 'lucide-react';

interface PrivacyPolicyProps {
    onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
    return (
        <div className="fixed inset-0 z-[9999] bg-black text-white font-mono flex flex-col animate-in slide-in-from-right duration-300 overflow-hidden">

            {/* Шапка документа */}
            <div className="p-6 border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-10 flex items-center gap-4">
                <button
                    onClick={onBack}
                    className="p-2 hover:bg-[#00ffcc]/10 border border-transparent hover:border-[#00ffcc]/30 transition-all rounded-[1px]"
                >
                    <ChevronLeft size={20} className="text-[#00ffcc]" />
                </button>
                <div>
                    <h2 className="text-sm font-black uppercase tracking-tighter text-[#00ffcc]">Политика конфиденциальности</h2>
                    <p className="text-[9px] text-white/40 uppercase tracking-widest mt-0.5">Редакция: 28.04.2026</p>
                </div>
            </div>

            {/* Основная часть документа */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-40 custom-scrollbar">

                {/* Раздел 1: Общие положения */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <ShieldCheck size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">01. Общие положения</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 space-y-2 uppercase">
                        <p>1.1. Настоящая Политика определяет порядок обработки и защиты информации о физических лицах (Пользователях), пользующихся Приложением <span className="text-white font-bold">«Кроличья Нора»</span>.</p>
                        <p>1.2. Целью настоящей Политики является обеспечение надлежащей защиты информации о Пользователе, в т.ч. его персональных данных, от несанкционированного доступа и разглашения.</p>
                    </div>
                </section>

                {/* Раздел 2: Сбор данных через API */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <Database size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">02. Сбор данных через API</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 space-y-2 uppercase">
                        <p>2.1. Приложение использует программные интерфейсы для обеспечения корректной работы игровых механик и системы доступа.</p>
                        <p>2.2. Приложение получает доступ к следующим данным Пользователя:</p>
                        <ul className="list-disc list-inside pl-2 space-y-1 text-white/80">
                            <li>Адрес электронной почты (для идентификации оплаты);</li>
                            <li>Уникальный идентификатор транзакции;</li>
                            <li>Техническая информация об устройстве.</li>
                        </ul>
                        <p className="p-3 border border-white/10 bg-white/5 text-[10px] italic">
                            Владелец не сохраняет персональные данные на собственных серверах в открытом виде. Обработка происходит локально и через защищенные облачные функции.
                        </p>
                    </div>
                </section>

                {/* Раздел 3: Аналитика и Яндекс Метрика */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <BarChart3 size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">03. Аналитические инструменты</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 space-y-3 uppercase">
                        <p>3.1. В Приложении используется сервис анонимной статистики <span className="text-white font-bold">ЯНДЕКС МЕТРИКА</span>.</p>
                        <p>3.2. Сервис собирает обезличенную информацию о взаимодействии Пользователя с интерфейсом: время сессии, технические ошибки, конверсии.</p>
                        <div className="p-3 border border-[#00ffcc]/20 bg-[#00ffcc]/5 text-[10px]">
                            3.3. Данные собираются в обобщенном виде и не позволяют идентифицировать конкретного Пользователя. Цель сбора — техническая оптимизация Приложения.
                        </div>
                    </div>
                </section>

                {/* Раздел 4: Хранение игрового прогресса */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <Lock size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">04. Локальное хранение</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 uppercase space-y-2">
                        <p>4.1. Весь игровой прогресс и статус доступа хранятся исключительно в защищенном локальном хранилище (<span className="text-white font-bold">DeviceStorage / LocalStorage</span>) устройства Пользователя.</p>
                        <p>4.2. Владелец не имеет технического доступа к локальным данным Пользователя и не может восстановить их в случае удаления данных приложения или очистки кэша устройства.</p>
                    </div>
                </section>

                {/* Раздел 5: Платежная информация */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <Eye size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">05. Платежная информация</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 space-y-2 uppercase">
                        <p>5.1. При совершении платежей через сервис <span className="text-white font-bold">ЮKASSA</span>, Владелец не получает доступа к данным банковских карт Пользователей.</p>
                        <p>5.2. Все транзакции проходят на стороне защищенного шлюза платежной системы в соответствии со стандартами PCI DSS.</p>
                    </div>
                </section>

                {/* Раздел 6: Обратная связь */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <Mail size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">06. Контакты</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 space-y-2 uppercase">
                        <p>6.1. По вопросам, связанным с обработкой данных или технической поддержкой, Пользователь может обратиться по адресу:</p>
                        <p className="text-white font-bold border-b border-white/20 inline-block">rabbithole.help@vk.com</p>
                    </div>
                </section>

                {/* Футер документа */}
                <div className="pt-20 border-t border-white/10 flex flex-col items-center gap-4">
                    <p className="text-[9px] text-white/40 text-center uppercase tracking-widest leading-relaxed">
                        Использование Приложения «Кроличья Нора» означает ваше согласие<br/>
                        с условиями настоящей Политики конфиденциальности.
                    </p>
                    <div className="w-12 h-[1px] bg-[#00ffcc]/30"></div>
                    <p className="text-[8px] text-white/20 uppercase tracking-[0.3em]">
                        © 2026 ИП АНТОНОВ А.О.
                    </p>
                </div>
            </div>

        </div>
    );
};

export default PrivacyPolicy;