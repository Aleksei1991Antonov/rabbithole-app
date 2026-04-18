export type DiveStrategy = 'DEEP' | 'WIDE' | 'UP' | 'NONE';

/**
 * Заглушка для демо-версии.
 */
export const sendToGigaChat = async (
    message: string,
    currentDepth: number
) => {
    // Имитируем задержку ответа
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newDepth = Math.min(currentDepth + 1, 21);

    return `[DEMO_MODE] // УРОВЕНЬ: ${newDepth}.0\n\nСистема зафиксировала сигнал: "${message.toUpperCase()}". Интеграция с ядром ИИ будет доступна в полной версии.`;
};