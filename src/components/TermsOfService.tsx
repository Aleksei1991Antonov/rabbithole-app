import React from 'react';
import { ChevronLeft, FileText, AlertTriangle, CreditCard } from 'lucide-react';

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
                    <p className="text-[9px] text-white/40 uppercase tracking-widest mt-0.5">Редакция: 16.04.2026</p>
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
                        <p>1.1. Настоящее Соглашение регулирует отношения между Владельцем Приложения и Пользователем при использовании Приложения <span className="text-white font-bold">«Кроличья Нора»</span>.</p>
                        <p>1.2. Принятие настоящего Соглашения осуществляется путём начала использования Приложения. Пользователь подтверждает, что ознакомился с условиями Соглашения и согласен с ними.</p>
                        <p className="p-3 border border-white/5 bg-white/5 text-[10px]">
                            <span className="text-[#00ffcc] block mb-1 font-bold italic">Владелец Приложения:</span><br/>
                            ИП АНТОНОВ АЛЕКСЕЙ ОЛЕГОВИЧ<br/>
                            ИНН: 760407796785<br/>
                            ОГРНИП: 326760000001804<br/>
                            АДРЕС: РОССИЯ, ГОРОД ЯРОСЛАВЛЬ
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
                        <p>Приложение представляет собой интерактивную платформу для интеллектуального и экзистенциального взаимодействия с искусственным интеллектом.</p>
                    </div>
                </section>

                {/* Раздел 3: Ресурс системы (ЭН) */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#04dabf]">
                        <CreditCard size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">03. Ресурс системы (эн)</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 space-y-3 uppercase">
                        <p>3.1. В Приложении используется виртуальное игровое средство <span className="text-[#00ffcc] font-bold">ЭН (Энергия)</span> — единица доступа к сессиям погружения.</p>
                        <div className="p-3 border border-yellow-500/20 bg-yellow-500/5 text-yellow-500/80 text-[10px]">
                            3.2. Средства ЭН приобретаются добровольно и имеют исключительно внутриигровое назначение. Средства ЭН не являются электронными деньгами, финансовыми активами или иным имуществом, возврату и обмену не подлежат.
                        </div>
                        <p>3.3. Оплата производится через платёжную систему ЮKassa.</p>
                    </div>
                </section>

                {/* Раздел 4: Ограничения 18+ */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#04dabf]">
                        <AlertTriangle size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">04. Ограничения 18+</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 uppercase">
                        <p>Приложение содержит сложный философский контент и предназначено преимущественно для совершеннолетних пользователей. Лицам моложе 18 лет разрешается использование Приложения только с согласия родителей или иных законных представителей.</p>
                    </div>
                </section>

                {/* Раздел 5: Обязанности Пользователя */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#04dabf]">
                        <FileText size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">05. Обязанности пользователя</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 space-y-2 uppercase">
                        <p>5.1. Пользователь обязуется соблюдать настоящее Соглашение, нормы действующего законодательства РФ и общепризнанные этические нормы.</p>
                        <p>5.2. Пользователь обязан бережно относиться к своему психоэмоциональному состоянию при взаимодействии с Приложением.</p>
                    </div>
                </section>

                {/* Раздел 6: Обязанности Владелца */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#04dabf]">
                        <FileText size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">06. Обязанности владельца</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 space-y-2 uppercase">
                        <p>6.1. Владелец обязуется обеспечивать работоспособность Приложения в разумные сроки.</p>
                        <p>6.2. Владелец обеспечивает соблюдение требований законодательства РФ при предоставлении услуг.</p>
                    </div>
                </section>

                {/* Раздел 7: Ответственность сторон */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#04dabf]">
                        <FileText size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">07. Ответственность сторон</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 space-y-2 uppercase">
                        <p>7.1. Приложение предоставляется «КАК ЕСТЬ», без гарантий работоспособности или отсутствия ошибок.</p>
                        <p>7.2. Владелец не несёт ответственности за возможные негативные последствия использования Приложения, включая эмоциональные реакции или психологические эффекты.</p>
                        <p>7.3. Стороны освобождаются от ответственности за неисполнение обязательств вследствие обстоятельств непреодолимой силы (форс-мажор).</p>
                    </div>
                </section>

                {/* Раздел 8: Порядок разрешения споров */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#04dabf]">
                        <FileText size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">08. Порядок разрешения споров</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 space-y-2 uppercase">
                        <p>8.1. Все споры решаются сторонами путем переговоров.</p>
                        <p>8.2. При невозможности урегулирования спора мирным путем, он передается на рассмотрение суда по месту нахождения Владельца.</p>
                    </div>
                </section>

                {/* Раздел 9: Заключительные положения */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#04dabf]">
                        <FileText size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">09. Заключительные положения</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 space-y-2 uppercase">
                        <p>9.1. Настоящее Соглашение составлено на русском языке и действует бессрочно.</p>
                        <p>9.2. Все уведомления отправляются Пользователю посредством Приложения или по электронной почте.</p>
                    </div>
                </section>

                {/* Футер документа */}
                <div className="pt-10 border-t border-white/10 flex flex-col items-center gap-4">
                    <p className="text-[9px] text-white/40 text-center uppercase tracking-widest leading-relaxed">
                        Используя Приложение, вы соглашаетесь с настоящим Пользовательским соглашением.<br/>
                        Ознакомьтесь внимательно с условиями перед началом использования.
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