import React from 'react';
import { ChevronLeft, FileText, AlertTriangle, Key, ShieldCheck } from 'lucide-react';

interface TermsOfServiceProps {
    onBack: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
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
                    <h2 className="text-sm font-black uppercase tracking-tighter text-[#00ffcc]">Пользовательское соглашение</h2>
                    <p className="text-[9px] text-white/40 uppercase tracking-widest mt-0.5">Редакция: 28.04.2026</p>
                </div>
            </div>

            {/* Основная часть документа */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-40 custom-scrollbar">

                {/* Раздел 1: Реквизиты */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <FileText size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">01. Общие положения</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 space-y-2 uppercase">
                        <p>1.1. Настоящее Соглашение регулирует отношения между Владельцем и Пользователем Приложения <span className="text-white font-bold">«Кроличья Нора»</span>.</p>
                        <p>1.2. Использование Приложения означает полное принятие условий настоящего Соглашения и Политики конфиденциальности.</p>
                        <div className="p-3 border border-white/5 bg-white/5 text-[10px] mt-2">
                            <span className="text-[#00ffcc] block mb-1 font-bold italic">Владелец Приложения:</span>
                            ИП АНТОНОВ АЛЕКСЕЙ ОЛЕГОВИЧ<br/>
                            ИНН: 760407796785<br/>
                            ОГРНИП: 326760000001804<br/>
                            Адрес: Россия, город Ярославль
                        </div>
                    </div>
                </section>

                {/* Раздел 2: Предмет */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <ShieldCheck size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">02. Предмет соглашения</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 space-y-2 uppercase">
                        <p>2.1. Приложение является интерактивным художественным произведением.</p>
                        <p>2.2. Владелец предоставляет Пользователю свободный (бесплатный) доступ к начальным этапам произведения (до 30 уровня включительно) для ознакомления с качеством и форматом контента.</p>
                        <p>2.3. Доступ к последующим этапам и полному функционалу произведения предоставляется на условиях платной неисключительной лицензии.</p>
                    </div>
                </section>


                {/* Раздел 3: Техническая реализация доступа */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <Key size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">03. Порядок доступа и оплата</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 space-y-3 uppercase">
                        <p>3.1. Полный доступ к контенту предоставляется после совершения единоразового платежа через защищенный шлюз <span className="text-white font-bold">ЮKASSA</span>.</p>

                        <div className="p-3 border border-[#00ffcc]/20 bg-[#00ffcc]/5 text-[10px]">
                            3.2. <span className="text-[#00ffcc]">ТЕХНИЧЕСКАЯ ОСОБЕННОСТЬ:</span> После подтверждения оплаты цифровой ключ доступа записывается ПРЯМО в защищенное локальное хранилище устройства (<span className="text-white font-bold">DeviceStorage / LocalStorage</span>).
                        </div>

                        <p>3.3. Владелец не хранит ключи доступа на внешних серверах. Доступ является бессрочным и привязан к локальным данным приложения на устройстве Пользователя.</p>

                        <p>3.4. В соответствии с законодательством РФ (ст. 26.1 Закона о защите прав потребителей), возврат денежных средств за цифровой контент после предоставления доступа не производится.</p>
                    </div>
                </section>

                {/* Раздел 4: 18+ */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <AlertTriangle size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">04. Возрастные ограничения</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 uppercase space-y-2">
                        <p>4.1. Приложение содержит контент, предназначенный для лиц старше 18 лет. Используя Приложение, Пользователь подтверждает свой возраст.</p>
                        <p>4.2. Владелец не несёт ответственности за субъективное психологическое восприятие художественных образов и текстов Приложения.</p>
                    </div>
                </section>

                {/* Раздел 5: Ответственность */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <AlertTriangle size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">05. Ответственность и данные</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 space-y-2 uppercase">
                        <p>5.1. Приложение предоставляется по принципу «КАК ЕСТЬ» (as is).</p>
                        <p>5.2. Весь игровой прогресс и статус доступа хранятся локально. Владелец не несет ответственности за потерю доступа в случае очистки кэша, удаления данных приложения или смены устройства Пользователем.</p>
                        <p>5.3. По вопросам технической поддержки: <span className="text-white">rabbithole.help@vk.com</span></p>
                    </div>
                </section>

                {/* Раздел 6: Интеллектуальная собственность */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <FileText size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">06. Интеллектуальная собственность</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 space-y-2 uppercase">
                        <p>6.1. Все материалы Приложения являются объектами интеллектуальной собственности Владельца.</p>
                        <p>6.2. Копирование, тиражирование или коммерческое использование контента без разрешения Владельца запрещено.</p>
                    </div>
                </section>

                {/* Футер документа */}
                <div className="pt-20 border-t border-white/10 flex flex-col items-center gap-4 text-center">
                    <p className="text-[9px] text-white/40 uppercase tracking-widest leading-relaxed">
                        Оплата лицензии означает полное согласие с условиями Соглашения,<br/>
                        Политикой конфиденциальности и техническим способом хранения данных.
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

export default TermsOfService;