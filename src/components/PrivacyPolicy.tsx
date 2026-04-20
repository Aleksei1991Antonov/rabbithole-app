import React from 'react';
import { ChevronLeft, FileText, AlertTriangle, Heart } from 'lucide-react';

interface TermsOfServiceProps {
    onBack: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
    return (
        <div className="fixed inset-0 z-[250] bg-black text-white font-mono flex flex-col animate-in slide-in-from-right duration-300 pt-16">

            {/* Шапка документа */}
            <div className="p-6 border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-10 flex items-center gap-4">
                <button
                    onClick={onBack}
                    className="p-2 hover:bg-[#00ffcc]/10 border border-transparent hover:border-[#00ffcc]/30 transition-all rounded-[1px]"
                >
                    <ChevronLeft size={20} className="text-[#00ffcc]" />
                </button>
                <div>
                    <h2 className="text-sm font-black uppercase tracking-tighter">Пользовательское соглашение</h2>
                    <p className="text-[9px] text-white/40 uppercase tracking-widest mt-0.5">Редакция: 20.04.2026</p>
                </div>
            </div>

            {/* Основная часть документа */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-20 custom-scrollbar">

                {/* Раздел 1: Общие положения */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <FileText size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">01. Общие положения</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 space-y-2 uppercase">
                        <p>1.1. Настоящее Пользовательское соглашение регулирует отношения между Владельцем Приложения и Пользователем при использовании Приложения <span className="text-white font-bold">«Кроличья Нора»</span> в мессенджере MAX.</p>
                        <p>1.2. Использование Приложения означает полное и безоговорочное принятие условий настоящего Соглашения.</p>
                        <p>1.3. Настоящее Соглашение действует совместно с <span className="text-[#00ffcc]">Политикой конфиденциальности</span>, размещённой в Приложении (или по ссылке в настройках). Использование Приложения означает согласие с обоими документами.</p>
                        <p className="p-3 border border-white/5 bg-white/5 text-[10px]">
                            <span className="text-[#00ffcc] block mb-1 font-bold italic">Владелец Приложения:</span><br/>
                            ИП АНТОНОВ АЛЕКСЕЙ ОЛЕГОВИЧ<br/>
                            ИНН: 760407796785<br/>
                            ОГРНИП: 326760000001804<br/>
                            Адрес: Россия, город Ярославль
                        </p>
                    </div>
                </section>

                {/* Раздел 2: Предмет соглашения */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <FileText size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">02. Предмет соглашения</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 uppercase">
                        <p>Приложение является интерактивным художественным произведением, предоставляющим Пользователю доступ к текстовому и визуальному контенту в формате нелинейного повествования.</p>
                    </div>
                </section>

                {/* Раздел 3: Поддержка проекта (Донаты) */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <Heart size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">03. Поддержка проекта</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 space-y-3 uppercase">
                        <p>3.1. Пользователь имеет возможность совершить добровольное пожертвование (донат) в пользу Владельца для поддержки развития проекта.</p>
                        <div className="p-3 border border-[#00ffcc]/20 bg-[#00ffcc]/5 text-[10px]">
                            3.2. Пожертвование является безвозмездным и добровольным действием Пользователя. Совершение пожертвования не является покупкой товара или услуги и не подлежит возврату.
                        </div>
                        <p>3.3. Перевод средств осуществляется через внешние платежные сервисы (ЮMoney). Владелец Приложения не собирает и не хранит данные банковских карт Пользователей.</p>
                    </div>
                </section>

                {/* Раздел 4: Возрастные ограничения и контент */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <AlertTriangle size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">04. Возрастные ограничения и контент</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 uppercase space-y-2">
                        <p>4.1. Приложение содержит контент, предназначенный исключительно для лиц старше 18 лет, включая философские размышления, абстрактные образы и элементы, которые могут носить провокационный или психологически интенсивный характер.</p>
                        <p>4.2. Используя Приложение, Пользователь подтверждает, что ему исполнилось 18 лет и он добровольно ознакомился с контентом. Владелец не несёт ответственности за субъективное эмоциональное или психологическое восприятие контента.</p>
                        <p>4.3. Использование Приложения лицами младше 18 лет запрещено.</p>
                    </div>
                </section>

                {/* Раздел 5: Персональные данные */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <AlertTriangle size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">05. Персональные данные</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 space-y-2 uppercase">
                        <p>5.1. Приложение не собирает и не хранит персональные данные Пользователя на серверах Владельца. Все данные (прогресс, выборы) хранятся исключительно локально на устройстве Пользователя.</p>
                        <p>5.2. При совершении доната обработка платежных данных осуществляется исключительно внешним сервисом (ЮMoney). Владелец Приложения не получает доступ к данным банковских карт и иной платежной информации.</p>
                        <p>5.3. Пользователь может в любой момент прекратить использование Приложения и очистить локальные данные через настройки мессенджера MAX.</p>
                    </div>
                </section>

                {/* Раздел 6: Интеллектуальная собственность */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <FileText size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">06. Интеллектуальная собственность</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 space-y-2 uppercase">
                        <p>6.1. Все тексты, изображения, визуальные элементы и иные материалы Приложения являются объектами интеллектуальной собственности Владельца или третьих лиц и охраняются законодательством Российской Федерации.</p>
                        <p>6.2. Пользователю предоставляется неисключительное, непередаваемое право использования Приложения исключительно в личных некоммерческих целях. Любое копирование, распространение или модификация контента без письменного разрешения запрещено.</p>
                    </div>
                </section>

                {/* Раздел 7: Ответственность сторон */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <FileText size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">07. Ответственность сторон</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 space-y-2 uppercase">
                        <p>7.1. Приложение предоставляется по принципу «КАК ЕСТЬ». Владелец не гарантирует бесперебойную работу и отсутствие технических сбоев.</p>
                        <p>7.2. Владелец не несёт ответственности за любые последствия использования Приложения, включая эмоциональные реакции Пользователя.</p>
                        <p>7.3. Данные о прогрессе хранятся локально. Владелец не несёт ответственности за их потерю при очистке данных мессенджера MAX или удалении Приложения.</p>
                        <p>7.4. Пользователь обязуется не использовать Приложение для действий, противоречащих законодательству РФ.</p>
                    </div>
                </section>

                {/* Раздел 8: Заключительные положения */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <FileText size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">08. Заключительные положения</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 space-y-2 uppercase">
                        <p>8.1. Владелец вправе в любое время изменять условия настоящего Соглашения в одностороннем порядке. Продолжение использования Приложения после изменений означает принятие новой редакции.</p>
                        <p>8.2. Настоящее Соглашение регулируется законодательством Российской Федерации.</p>
                        <p>8.3. По всем вопросам Пользователь может обращаться по адресу: <span className="text-white">rabbithole.help@vk.com</span></p>
                    </div>
                </section>

                {/* Футер */}
                <div className="pt-10 border-t border-white/10 flex flex-col items-center gap-4">
                    <p className="text-[9px] text-white/40 text-center uppercase tracking-widest leading-relaxed">
                        Используя Приложение «Кроличья Нора» в мессенджере MAX, вы подтверждаете, что вам исполнилось 18 лет,<br/>
                        вы ознакомились и полностью согласны с настоящим Пользовательским соглашением и Политикой конфиденциальности.
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