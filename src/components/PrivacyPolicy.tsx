import React from 'react';
import { ChevronLeft, ShieldCheck, Database, BarChart3, Lock, Eye, Mail, UserCheck } from 'lucide-react';

interface PrivacyPolicyProps {
    onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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
                    <h2 className="text-sm font-black uppercase tracking-tighter text-[#00ffcc]">Политика конфиденциальности</h2>
                    <p className="text-[9px] text-white/40 uppercase tracking-widest mt-0.5">Редакция от 29.04.2026</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-40 custom-scrollbar text-[11px] leading-relaxed text-white/70">

                {/* 1. Общие положения */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <ShieldCheck size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">01. Общие положения</span>
                    </div>
                    <div className="space-y-2 uppercase">
                        <p>1.1. Настоящая Политика конфиденциальности (далее — Политика) определяет порядок обработки и защиты персональных данных Пользователей мини-приложения <span className="text-white font-bold">«Кроличья Нора»</span> (далее — Приложение), работающего в мессенджере <span className="text-white font-bold">MAX</span>.</p>
                        <p>1.2. Оператор персональных данных: <span className="text-white">ИП Антонов Алексей Олегович</span> (ИНН 760407796785, ОГРНИП 326760000001804).</p>
                        <p>1.3. Использование Приложения означает согласие Пользователя с условиями настоящей Политики. Продолжая использовать Приложение, вы подтверждаете своё согласие на обработку данных.</p>
                        <p>1.4. Оператор не собирает и не хранит персональные данные Пользователей на своих серверах, за исключением случаев, прямо указанных в настоящей Политике.</p>
                        <p>1.5. Приложение предназначено исключительно для лиц, достигших 18-летнего возраста. Используя Приложение, вы подтверждаете, что достигли совершеннолетия.</p>
                    </div>
                </section>

                {/* 2. Какие данные собираются */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <Database size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">02. Персональные данные, которые мы обрабатываем</span>
                    </div>
                    <div className="space-y-3 uppercase">
                        <p><span className="text-white">2.1. Данные, предоставляемые Пользователем при оплате:</span></p>
                        <ul className="list-disc list-inside pl-4 space-y-1 text-white/80">
                            <li>Адрес электронной почты (вводится Пользователем для формирования и отправки электронного чека)</li>
                        </ul>

                        <p className="p-3 border border-[#00ffcc]/20 bg-[#00ffcc]/5 text-[10px] rounded-[1px]">
                            Важно: Оператор не хранит адрес электронной почты на своих серверах. Email используется исключительно для передачи в платёжный сервис <span className="text-white font-bold">ЮKassa</span> с целью формирования и отправки чека в соответствии с требованиями 54-ФЗ. После завершения платежа email не сохраняется Оператором.
                        </p>

                        <p><span className="text-white">2.2. Данные, получаемые автоматически (через MAX Bridge SDK):</span></p>
                        <ul className="list-disc list-inside pl-4 space-y-1 text-white/80">
                            <li>Имя пользователя в MAX (для персонализации игрового процесса);</li>
                            <li>Язык интерфейса устройства (для выбора локализации);</li>
                            <li>Техническая информация об устройстве (модель, ОС, версия, разрешение экрана, язык интерфейса);</li>
                            <li>Данные о взаимодействии с Приложением (время сессии, действия в интерфейсе).</li>
                        </ul>

                        <p className="p-3 border border-[#00ffcc]/10 bg-white/5 text-[9px] rounded-[1px]">
                            Примечание: Данные профиля MAX обрабатываются локально на устройстве Пользователя для работы игровых механик и не передаются на внешние серверы Оператора.
                        </p>

                        <p>2.3. Оператор не собирает и не обрабатывает паспортные данные, номер телефона, геолокацию, а также иные специальные категории персональных данных.</p>

                        <p>2.4. При использовании Приложения могут применяться cookie-файлы и аналогичные технологии для обеспечения технической работы и аналитики.</p>
                    </div>
                </section>

                {/* 3. Цели обработки */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <UserCheck size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">03. Цели обработки персональных данных</span>
                    </div>
                    <div className="space-y-2 uppercase">
                        <p>• Предоставление доступа к платному контенту Приложения;</p>
                        <p>• Персонализация игрового процесса на основе данных профиля MAX;</p>
                        <p>• Формирование и отправка электронного чека через ЮKassa;</p>
                        <p>• Техническая поддержка и ответы на обращения Пользователей;</p>
                        <p>• Улучшение качества работы Приложения и аналитика использования;</p>
                        <p>• Исполнение требований законодательства Российской Федерации.</p>
                    </div>
                </section>

                {/* 4. Аналитика */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <BarChart3 size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">04. Аналитические сервисы</span>
                    </div>
                    <div className="space-y-2 uppercase">
                        <p>4.1. В Приложении используется сервис <span className="text-white font-bold">Яндекс Метрика</span>.</p>
                        <p>4.2. Сервис собирает исключительно обезличенную статистическую информацию. Передача идентифицирующих данных в Яндекс Метрику запрещена и не осуществляется.</p>
                        <p>4.3. Цель — анализ поведения пользователей в обезличенном виде для улучшения Приложения.</p>
                    </div>
                </section>

                {/* 5. Хранение и защита */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <Lock size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">05. Хранение и защита данных</span>
                    </div>
                    <div className="space-y-2 uppercase">
                        <p>5.1. Персональные данные (email) не хранятся Оператором после завершения платежа.</p>
                        <p>5.2. Игровой прогресс, имя пользователя (локально) и ключ доступа хранятся исключительно в локальном хранилище устройства Пользователя (LocalStorage / DeviceStorage). Оператор не имеет к ним удаленного доступа.</p>
                        <p>5.3. Оператор принимает необходимые технические и организационные меры для защиты данных в соответствии с требованиями законодательства РФ.</p>
                    </div>
                </section>

                {/* 6. Права пользователя */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <Eye size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">06. Права Пользователя</span>
                    </div>
                    <div className="space-y-2 uppercase">
                        <p>Пользователь имеет право:</p>
                        <ul className="list-disc list-inside pl-4 space-y-1">
                            <li>Получить информацию об обрабатываемых его персональных данных;</li>
                            <li>Требовать уточнения, блокирования или уничтожения своих персональных данных;</li>
                            <li>Отозвать согласие на обработку персональных данных;</li>
                            <li>Осуществить иные права, предусмотренные Федеральным законом № 152-ФЗ.</li>
                        </ul>
                        <p className="pt-2">Запросы направляются по адресу: <span className="text-white font-bold">rabbithole.help@vk.com</span>. Оператор обязуется рассмотреть обращение в сроки, установленные действующим законодательством РФ (не более 10 рабочих дней).</p>
                    </div>
                </section>

                {/* 7. Передача третьим лицам */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <Database size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">07. Передача данных третьим лицам</span>
                    </div>
                    <div className="space-y-2 uppercase">
                        <p>7.1. Email передаётся платёжному сервису <span className="text-white">ЮKassa</span> исключительно для формирования чека.</p>
                        <p>7.2. Обезличенные технические данные могут передаваться в Яндекс Метрику.</p>
                        <p>7.3. В иных случаях Оператор не передаёт персональные данные третьим лицам без согласия Пользователя, за исключением случаев, предусмотренных законодательством РФ.</p>
                    </div>
                </section>

                {/* 8. Изменение Политики */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <Lock size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">08. Изменение Политики</span>
                    </div>
                    <div className="space-y-2 uppercase">
                        <p>8.1. Оператор оставляет за собой право вносить изменения в настоящую Политику. Новая редакция вступает в силу с момента её публикации в Приложении.</p>
                        <p>8.2. Продолжение использования Приложения после внесения изменений означает согласие Пользователя с новой редакцией Политики.</p>
                    </div>
                </section>

                {/* 9. Контакты */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-[#00ffcc]">
                        <Mail size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">09. Контактная информация</span>
                    </div>
                    <div className="space-y-2 uppercase">
                        <p>По всем вопросам, связанным с обработкой персональных данных, обращайтесь по электронной почте:</p>
                        <a href="mailto:rabbithole.help@vk.com" className="text-white font-bold border-b border-white/20 inline-block">rabbithole.help@vk.com</a>
                    </div>
                </section>

                {/* Футер */}
                <div className="pt-20 pb-10 border-t border-white/10 flex flex-col items-center justify-center w-full gap-4">
                    <p className="text-[9px] text-white/40 text-center uppercase tracking-widest leading-relaxed max-w-[280px] mx-auto">
                        Использование Приложения означает ваше согласие с условиями настоящей Политики конфиденциальности.
                    </p>
                    <div className="w-12 h-[1px] bg-[#00ffcc]/30"></div>
                    <p className="text-[8px] text-white/20 text-center uppercase tracking-[0.3em] leading-loose">
                        © 2026 ИП Антонов А.О.<br/>
                        ИНН 760407796785 • ОГРНИП 326760000001804
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;