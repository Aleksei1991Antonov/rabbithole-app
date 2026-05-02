import React from 'react';
import { ChevronLeft, FileText, AlertTriangle, Key, ShieldCheck, Scale, Mail } from 'lucide-react';

interface TermsOfServiceProps {
    onBack: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
    return (
        <div className="fixed inset-0 z-[9999] bg-black text-white font-mono flex flex-col animate-in slide-in-from-right duration-300 overflow-hidden">

            {/* Шапка */}
            <div className="p-6 border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-10 flex items-center gap-4">
                <button
                    onClick={onBack}
                    className="p-2 hover:bg-[#00ffcc]/10 border border-transparent hover:border-[#00ffcc]/30 transition-all rounded-[1px]"
                >
                    <ChevronLeft size={20} className="text-[#00ffcc]" />
                </button>
                <div>
                    <h2 className="text-sm font-black uppercase tracking-tighter text-[#00ffcc]">Пользовательское соглашение</h2>
                    <p className="text-[9px] text-white/40 uppercase tracking-widest mt-0.5">Редакция от 02.05.2026</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-40 custom-scrollbar text-[11px] leading-relaxed text-white/70">

                {/* 1. Общие положения */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <FileText size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">01. Общие положения</span>
                    </div>
                    <div className="space-y-3 uppercase">
                        <p>1.1. Настоящее Пользовательское соглашение (далее — Соглашение) является публичной офертой ИП Антонова Алексея Олеговича (далее — Владелец) в соответствии со ст. 437 Гражданского кодекса Российской Федерации.</p>

                        <p>1.2. Использование мини-приложения <span className="text-white font-bold">«Кроличья Нора»</span> (далее — Приложение), нажатие кнопок «Продолжить», «Оплатить», «Поддержать», «Получить доступ» или совершение иных действий по использованию Приложения означает полное и безоговорочное принятие (акцепт) Пользователем условий настоящего Соглашения, а также Политики конфиденциальности.</p>

                        <div className="p-4 border border-white/10 bg-white/5 text-[10px] leading-relaxed rounded-[1px]">
                            <span className="text-[#00ffcc] font-bold">Владелец Приложения:</span><br/>
                            ИП Антонов Алексей Олегович<br/>
                            ИНН: 760407796785<br/>
                            ОГРНИП: 326760000001804<br/>
                            Адрес: Россия, г. Ярославль
                        </div>
                    </div>
                </section>

                {/* 2. Предмет соглашения */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <ShieldCheck size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">02. Предмет Соглашения</span>
                    </div>
                    <div className="space-y-2 uppercase">
                        <p>2.1. Приложение представляет собой интерактивное художественное произведение, содержащее контент для лиц старше 18 лет.</p>
                        <p>2.2. Владелец предоставляет Пользователю право на использование Приложения на условиях простой (неисключительной) лицензии.</p>
                        <p>2.3. Доступ к начальным этапам Приложения (до 30 уровня включительно) предоставляется бесплатно для ознакомления.</p>
                        <p>2.4. Полный доступ ко всему контенту предоставляется на платной основе. Также Пользователь вправе совершить добровольное пожертвование (донат) для поддержки проекта.</p>
                    </div>
                </section>

                {/* 3. Порядок оплаты и доступ */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <Key size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">03. Порядок оплаты и предоставления доступа</span>
                    </div>
                    <div className="space-y-3 uppercase">
                        <p>3.1. Оплата и донаты производятся через платёжные сервисы <span className="text-white font-bold">ЮKassa</span> или <span className="text-white font-bold">ЮMoney</span>.</p>
                        <p>3.2. После успешного подтверждения платежа доступ предоставляется на основании уникального идентификатора пользователя в мессенджере <span className="text-white font-bold">MAX</span> и сохраняется в локальное хранилище устройства.</p>
                        <p>3.3. Владелец не несет ответственности за утрату доступа в случае удаления данных приложения, очистки кэша или смены аккаунта в мессенджере пользователем.</p>

                        <div className="p-3 border border-[#00ffcc]/20 bg-[#00ffcc]/5 text-[10px] rounded-[1px]">
                            3.4. В соответствии со ст. 26.1 Закона РФ «О защите прав потребителей», возврат денежных средств за предоставленный цифровой контент (лицензию) после начала его использования не осуществляется. Добвольные пожертвования (донаты) возврату не подлежат.
                        </div>
                    </div>
                </section>

                {/* 4. Возрастные ограничения */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <AlertTriangle size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">04. Возрастные ограничения</span>
                    </div>
                    <div className="space-y-2 uppercase">
                        <p>4.1. Приложение предназначено исключительно для лиц, достигших 18-летнего возраста.</p>
                        <p>4.2. Используя Приложение, Пользователь подтверждает, что ему исполнилось 18 лет и он ознакомлен с тем, что Приложение содержит материалы взрослого характера.</p>
                    </div>
                </section>

                {/* 5. Лицензия и интеллектуальная собственность */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <Scale size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">05. Интеллектуальная собственность</span>
                    </div>
                    <div className="space-y-2 uppercase">
                        <p>5.1. Владелец предоставляет Пользователю простую (неисключительную) лицензию на использование Приложения исключительно в личных некоммерческих целях.</p>
                        <p>5.2. Любое копирование, декомпиляция, распространение или коммерческое использование контента Приложения строго запрещено и преследуется по закону РФ.</p>
                    </div>
                </section>

                {/* 6. Ответственность */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <AlertTriangle size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">06. Ответственность сторон</span>
                    </div>
                    <div className="space-y-2 uppercase">
                        <p>6.1. Приложение предоставляется «как есть» (as is). Владелец не гарантирует бесперебойную работу Приложения и не отвечает за сбои на стороне мессенджера MAX.</p>
                        <p>6.2. Владелец не несёт ответственности за любые убытки, возникшие в результате использования Приложения.</p>
                    </div>
                </section>

                {/* 7. Изменение Соглашения */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <FileText size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">07. Изменение Соглашения</span>
                    </div>
                    <div className="space-y-2 uppercase">
                        <p>7.1. Владелец имеет право изменять условия настоящего Соглашения в одностороннем порядке.</p>
                        <p>7.2. Новая редакция вступает в силу с момента публикации в интерфейсе Приложения.</p>
                    </div>
                </section>

                {/* 8. Контакты */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <Mail size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">08. Контакты</span>
                    </div>
                    <p>По вопросам технической поддержки и обращений:</p>
                    <a href="mailto:rabbithole.help@vk.com" className="text-white font-bold border-b border-white/20 inline-block">rabbithole.help@vk.com</a>
                </section>

                {/* Футер */}
                <div className="pt-20 pb-10 border-t border-white/10 flex flex-col items-center justify-center w-full gap-4 text-center">
                    <p className="text-[9px] text-white/40 uppercase tracking-widest leading-relaxed max-w-[280px] mx-auto">
                        Использование Приложения означает полное согласие<br/>
                        с условиями настоящего Соглашения.
                    </p>
                    <div className="w-12 h-[1px] bg-[#00ffcc]/30"></div>
                    <p className="text-[8px] text-white/20 uppercase tracking-[0.3em] leading-loose">
                        © 2026 ИП Антонов А.О.<br/>
                        ИНН 760407796785 • ОГРНИП 326760000001804
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;