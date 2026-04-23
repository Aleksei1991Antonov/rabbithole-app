import React, { useState } from 'react';
import { Lock, Loader2, CheckCircle2, ShieldAlert } from 'lucide-react';

interface PaymentButtonProps {
    amount: number;
    onSuccess: () => void;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ amount, onSuccess }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [error, setError] = useState(false);

    // СЕКРЕТНЫЙ КОД ДЛЯ ТЕСТОВ (потом поменяешь на API ЮKassa)
    const SECRET_PASS = "VOID777";

    const handlePayment = () => {
        setError(false);

        // Вызываем системное окно ввода
        const userInput = prompt("ВВЕДИТЕ КЛЮЧ АКТИВАЦИИ ПРОТОКОЛА:");

        if (userInput === null) return; // Пользователь нажал "Отмена"

        setIsProcessing(true);

        // Имитируем проверку ключа
        setTimeout(() => {
            if (userInput.toUpperCase() === SECRET_PASS) {
                setIsProcessing(false);
                setIsPaid(true);

                setTimeout(() => {
                    onSuccess();
                }, 1000);
            } else {
                setIsProcessing(false);
                setError(true);
                alert("ОШИБКА: КЛЮЧ НЕ ДЕЙСТВИТЕЛЕН");

                // Сбрасываем ошибку через 2 секунды
                setTimeout(() => setError(false), 2000);
            }
        }, 1500);
    };

    return (
        <button
            onClick={handlePayment}
            disabled={isProcessing || isPaid}
            className={`w-full py-5 flex items-center justify-center gap-3 transition-all duration-500 relative overflow-hidden
                ${isPaid
                ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                : error
                    ? 'bg-red-500/20 border border-red-500/50 text-red-400'
                    : 'bg-[#00ffcc] border border-[#00ffcc] text-black active:scale-[0.98] hover:shadow-[0_0_20px_rgba(0,255,204,0.4)]'
            }
                ${isProcessing ? 'opacity-90 cursor-wait' : ''}
            `}
        >
            {isProcessing ? (
                <>
                    <Loader2 size={18} className="animate-spin" />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">Проверка ключа...</span>
                </>
            ) : isPaid ? (
                <>
                    <CheckCircle2 size={18} className="animate-bounce" />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">Доступ разрешен</span>
                </>
            ) : error ? (
                <>
                    <ShieldAlert size={18} />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">Отказ в доступе</span>
                </>
            ) : (
                <>
                    <Lock size={18} />
                    <span className="text-[11px] font-black uppercase tracking-[0.4em]">Ввести код доступа ({amount}₽)</span>
                </>
            )}

            {/* Эффект сканирования */}
            {!isProcessing && !isPaid && !error && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            )}
        </button>
    );
};

export default PaymentButton;