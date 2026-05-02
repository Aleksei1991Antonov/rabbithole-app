import React, { useState, useEffect, useCallback } from 'react';
import { Loader2, CheckCircle2, CreditCard, ChevronLeft, ShieldCheck, ArrowRight, Mail } from 'lucide-react';

interface ExtendedWebApp {
    openLink?: (url: string) => void;
    DeviceStorage?: {
        setItem: (key: string, value: string) => Promise<{ status: string }>;
    };
    HapticFeedback?: {
        notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
    };
}

interface PaymentButtonProps {
    amount: number;
    onSuccess: () => void;
    variant: 'trigger' | 'overlay';
    show: boolean;
    onClose: () => void;
}

const API_GATEWAY_URL = 'https://d5dq806nm470o5qb5rrm.z2ka767n.apigw.yandexcloud.net/create-payment';
const SECURE_TOKEN = 'rh_secure_991_key';

const PaymentButton: React.FC<PaymentButtonProps> = ({ amount, onSuccess, variant, show, onClose }) => {
    // Инициализация стейта: если есть активный платеж — идем в processing, иначе в idle
    const [stage, setStage] = useState<'idle' | 'email' | 'processing'>(() => {
        const pendingId = localStorage.getItem('pending_payment_id');
        return pendingId ? 'processing' : 'idle';
    });

    const [isPaid, setIsPaid] = useState(false);
    const [email, setEmail] = useState('');

    const isValidEmail = (e: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return emailRegex.test(e.trim());
    };

    const handleCancelPayment = () => {
        localStorage.removeItem('pending_payment_id');
        setStage('idle');
        if (variant === 'overlay') {
            onClose();
        }
    };

    const activatePremium = useCallback(async () => {
        const webApp = (window as unknown as { WebApp?: ExtendedWebApp }).WebApp;

        if (webApp?.DeviceStorage) {
            await webApp.DeviceStorage.setItem('is_premium_user_v2', 'true').catch((e) => console.error(e));
        }
        if (webApp?.HapticFeedback) {
            webApp.HapticFeedback.notificationOccurred('success');
        }

        localStorage.setItem('is_premium_user_v2', 'true');
        localStorage.removeItem('pending_payment_id');
        setIsPaid(true);

        setTimeout(() => {
            onClose();
            onSuccess();
        }, 2000);
    }, [onClose, onSuccess]);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | undefined;

        const checkStatus = async () => {
            const pendingId = localStorage.getItem('pending_payment_id');
            if (!pendingId || isPaid) return;

            try {
                const res = await fetch(API_GATEWAY_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'X-Custom-Token': SECURE_TOKEN },
                    body: JSON.stringify({ paymentId: pendingId })
                });

                const data = await res.json();

                if (data.paid === true || data.status === 'succeeded') {
                    if (interval) clearInterval(interval);
                    await activatePremium();
                }
            } catch (e) {
                console.error("Ошибка проверки статуса:", e);
            }
        };

        const pendingId = localStorage.getItem('pending_payment_id');
        if (show || pendingId) {
            checkStatus();
            interval = setInterval(checkStatus, 3000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [show, isPaid, activatePremium]);

    const handleStartPayment = async () => {
        if (!isValidEmail(email)) return;

        setStage('processing');
        try {
            const response = await fetch(API_GATEWAY_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Custom-Token': SECURE_TOKEN
                },
                body: JSON.stringify({
                    amount: amount.toString(),
                    email: email.toLowerCase().trim(),
                    description: 'Доступ к цифровому контенту'
                })
            });

            const data = await response.json();

            if (data.confirmation_url && data.payment_id) {
                localStorage.setItem('pending_payment_id', data.payment_id);
                const webApp = (window as unknown as { WebApp?: ExtendedWebApp }).WebApp;
                if (webApp && typeof webApp.openLink === 'function') {
                    webApp.openLink(data.confirmation_url);
                } else {
                    window.location.href = data.confirmation_url;
                }
            } else {
                throw new Error('No confirmation URL');
            }
        } catch (err) {
            console.error("Payment initiation error:", err);
            alert('Ошибка связи со шлюзом');
            setStage('email');
        }
    };

    // Если компонент не должен отображаться
    if (!show && !localStorage.getItem('pending_payment_id')) return null;

    // Логика кнопки-триггера
    if (variant === 'trigger' && stage === 'idle') {
        return (
            <button
                onClick={() => setStage('email')}
                className="w-full py-5 bg-[#00ffcc]/10 border border-[#00ffcc]/40 text-[#00ffcc] active:bg-[#00ffcc]/20 flex items-center justify-center gap-3 transition-all rounded-[1px]"
            >
                <CreditCard size={18} />
                <span className="text-[11px] font-black uppercase tracking-[0.2em]">Активировать за {amount} ₽</span>
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 font-mono backdrop-blur-md bg-black/60 animate-in fade-in duration-300">
            <div className="w-full max-w-sm border border-[#00ffcc]/30 bg-black p-6 space-y-6 relative shadow-[0_0_50px_rgba(0,255,204,0.2)] rounded-[1px]">
                {stage === 'email' ? (
                    <>
                        <div className="flex items-center">
                            <button
                                onClick={() => { setStage('idle'); onClose(); }}
                                className="text-[#00ffcc]/40 hover:text-[#00ffcc] transition-colors"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <div className="flex-1 flex flex-col items-center pr-5">
                                <h2 className="text-[10px] font-black uppercase text-white tracking-[0.3em]">Регистрация чека</h2>
                                <span className="text-[7px] text-[#00ffcc]/40 uppercase tracking-widest mt-1 italic">согласно 54-ФЗ РФ</span>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="p-4 bg-[#00ffcc]/5 border border-[#00ffcc]/10 rounded-[1px]">
                                <p className="text-[9px] text-[#00ffcc]/80 uppercase leading-relaxed text-center tracking-tight">
                                    Укажите адрес электронной почты. На него будет отправлен Ваш чек после оплаты.
                                </p>
                            </div>

                            <div className="relative group">
                                <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00ffcc]/30 group-focus-within:text-[#00ffcc] transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="USER@EMAIL.RU"
                                    className="w-full bg-[#00ffcc]/5 border border-[#00ffcc]/20 text-white p-4 pl-12 text-[12px] outline-none focus:border-[#00ffcc]/60 transition-all uppercase rounded-[1px]"
                                />
                            </div>

                            <button
                                onClick={handleStartPayment}
                                disabled={!isValidEmail(email)}
                                className="w-full py-4 bg-[#00ffcc]/20 border border-[#00ffcc]/40 text-[#00ffcc] text-[10px] uppercase font-black flex items-center justify-center gap-3 disabled:opacity-10 disabled:grayscale transition-all hover:bg-[#00ffcc]/30 active:scale-[0.98] rounded-[1px]"
                            >
                                Перейти к оплате <ArrowRight size={14} />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="py-10 flex flex-col items-center justify-center space-y-8">
                        <div className="flex flex-col items-center gap-4">
                            <Loader2 size={32} className="text-[#00ffcc] animate-spin" />
                            <div className="text-[#00ffcc] text-[10px] font-black uppercase tracking-[0.3em] animate-pulse text-center">
                                Ожидание оплаты...
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-3 w-full">
                            <button
                                onClick={handleCancelPayment}
                                className="text-[9px] text-white/40 hover:text-[#00ffcc] transition-colors uppercase tracking-[0.2em] border-b border-white/10 pb-1"
                            >
                                Прервать ожидание
                            </button>
                            <p className="text-[7px] text-white/20 text-center max-w-[180px] leading-relaxed uppercase tracking-tighter">
                                Нажмите, если вы закрыли окно оплаты или хотите вернуться назад.
                            </p>
                        </div>
                    </div>
                )}

                {isPaid && (
                    <div className="absolute inset-0 bg-black z-[100] flex flex-col items-center justify-center animate-in zoom-in duration-300">
                        <CheckCircle2 size={48} className="text-[#00ffcc] mb-4" />
                        <div className="text-[#00ffcc] text-[12px] font-black uppercase tracking-[0.6em]">Доступ открыт</div>
                    </div>
                )}

                <div className="flex flex-col items-center gap-2 pt-2">
                    <div className="flex items-center gap-2 text-[#00ffcc]/20">
                        <ShieldCheck size={10} />
                        <span className="text-[7px] uppercase font-bold tracking-widest text-center">Защищенный протокол ЮKassa</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentButton;