import React from 'react';
import { ChevronLeft, Shield, Mail } from 'lucide-react';

interface PrivacyPolicyProps {
    onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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
                    <h2 className="text-sm font-black uppercase tracking-tighter">Политика конфиденциальности</h2>
                    <p className="text-[9px] text-white/40 uppercase tracking-widest mt-0.5">Редакция: 16.04.2026</p>
                </div>
            </div>

            {/* Контентная часть */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-20 custom-scrollbar">

                {/* Вступление */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <Shield size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">1. Общие положения</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 space-y-2 uppercase">
                        <p>1.1. Настоящая Политика конфиденциальности (далее — Политика) определяет порядок обработки и защиты персональных данных Пользователей мини-приложения <span className="text-white font-bold">«Кроличья Нора»</span> в мессенджере MAX.</p>
                        <p>1.2. Продолжая использовать Приложение, вы подтверждаёте своё согласие с условиями настоящей Политики и принимаете её положения.</p>
                        <p className="p-3 border border-white/5 bg-white/5 text-[10px]">
                            <span className="text-[#00ffcc] block mb-1 font-bold italic">Оператор персональных данных:</span>
                            ИП АНТОНОВ АЛЕКСЕЙ ОЛЕГОВИЧ<br/>
                            ИНН: 760407796785<br/>
                            ОГРНИП: 326760000001804<br/>
                            ЛОКАЦИЯ: РОССИЯ, Г. ЯРОСЛАВЛЬ
                        </p>
                    </div>
                </section>

                {/* Состав данных */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <Shield size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">2. Состав обрабатываемых данных</span>
                    </div>
                    <ul className="text-[11px] leading-relaxed text-white/60 space-y-2 uppercase list-none">
                        <li className="flex gap-2"><span className="text-[#00ffcc]">•</span> Идентификатор пользователя (user_id) в системе MAX</li>
                        <li className="flex gap-2"><span className="text-[#00ffcc]">•</span> Имя и фамилия (при авторизации через MAX)</li>
                        <li className="flex gap-2"><span className="text-[#00ffcc]">•</span> Баланс игровой ценности «ЭН» (Энергия)</li>
                        <li className="flex gap-2"><span className="text-[#00ffcc]">•</span> История сессий погружения</li>
                        <li className="flex gap-2"><span className="text-[#00ffcc]">•</span> Технические данные устройства (IP-адрес, тип браузера, версия ОС)</li>
                    </ul>
                </section>

                {/* Цели обработки */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <Shield size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">3. Цели обработки персональных данных</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 space-y-2 uppercase">
                        <p>Обработка осуществляется для обеспечения функционирования сервиса, начисления и учёта ЭН, проведения платежей через ЮKassa, предоставления технической поддержки и улучшения качества Приложения.</p>
                    </div>
                </section>

                {/* Сроки хранения */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <Shield size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">4. Сроки хранения</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 space-y-2 uppercase">
                        <p>4.1. Персональные данные хранятся не более 6 (шести) месяцев с момента последнего использования Приложения.</p>
                        <p>4.2. История сессий погружения хранится до завершения текущей сессии.</p>
                    </div>
                </section>

                {/* Передача данных */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <Shield size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">5. Передача данных третьим лицам</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 space-y-2 uppercase">
                        <p>5.1. Передача осуществляется только:</p>
                        <ul className="list-disc list-inside ml-6">
                            <li>Платежной системе ЮKassa — для проведения платежей.</li>
                            <li>Госорганам РФ — в случаях, предусмотренных законодательством РФ.</li>
                            <li>GigaChat (Сбер) — только обезличенный текст запроса для обработки нейросетью.</li>
                        </ul>
                    </div>
                </section>

                {/* Права пользователя */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <Shield size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">6. Права Пользователя</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 space-y-2 uppercase">
                        <p>Вы имеете право:</p>
                        <ul className="list-disc list-inside ml-6 space-y-1">
                            <li>Получить информацию о составе ваших персональных данных.</li>
                            <li>Требовать уточнения, блокирования или уничтожения ваших персональных данных, если они являются неполными, устаревшими, неточными или незаконно полученными.</li>
                            <li>Отозвать согласие на обработку персональных данных (это приведёт к удалению аккаунта).</li>
                            <li>Использовать функцию «Удалить Аккаунт» в разделе «Система» для удаления данных.</li>
                        </ul>
                    </div>
                </section>

                {/* Изменение Политики */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <Shield size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">7. Изменение Политики</span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-white/60 space-y-2 uppercase">
                        <p>7.1. Оператор вправе вносить изменения в настоящую Политику. Новая редакция вступает в силу с момента её размещения в Приложении. В отдельных случаях оператор может потребовать отдельного подтверждения согласия Пользователя с изменениями.</p>
                        <p>7.2. Дальнейшее использование Приложения после опубликования изменений означает согласие Пользователя с новой редакцией Политики.</p>
                    </div>
                </section>

                {/* Футер документа */}
                <footer className="pt-10 border-t border-white/10 flex flex-col items-center gap-4">
                    <a
                        href="mailto:rabbithole.help@vk.com"
                        className="flex items-center gap-2 text-[#00ffcc]"
                    >
                        <Mail size={16} />
                        <span className="text-[10px] font-bold tracking-tighter">rabbithole.help@vk.com</span>
                    </a>
                    <a
                        href="/terms-of-service"
                        className="text-[8px] text-white/20 hover:underline"
                    >
                        Публичная оферта
                    </a>
                    <p className="text-[8px] text-white/20 text-center uppercase tracking-[0.3em] mt-auto">
                        Безопасность данных — приоритет системы
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default PrivacyPolicy;