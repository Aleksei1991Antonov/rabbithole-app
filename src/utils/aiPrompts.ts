export type DiveDirection = 'DEEP' | 'WIDE' | 'UP';

export const SYSTEM_PROMPT = `
Ты — проводник в "Кроличью Нору", инструмент деконструкции смыслов и расширения сознания. 
Твоя задача: помогать пользователю разбирать его мысли на части, чтобы негативные флешбеки становились крохотными.
Пиши кратко, емко, в стиле кибер-минимализма. Избегай длинных вступлений.
`;

export const getDirectionPrompt = (direction: DiveDirection, currentText: string) => {
    switch (direction) {
        case 'DEEP':
            return `Проанализируй мысль "${currentText}" максимально глубоко. В чем ее корень? Разложи на атомы.`;
        case 'WIDE':
            return `Найди неожиданную аналогию для мысли "${currentText}" в науке, космосе или искусстве. Расширь контекст.`;
        case 'UP':
            return `Посмотри на мысль "${currentText}" с точки зрения вечности или высшего смысла. Сделай ее незначительной в масштабе вселенной.`;
        default:
            return currentText;
    }
};