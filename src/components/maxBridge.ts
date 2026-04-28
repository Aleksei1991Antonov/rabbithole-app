/**
 * MAX Bridge Service v1.5 (Updated)
 * Добавлена поддержка определения языка пользователя.
 */

interface MaxUser {
    id: number;
    first_name: string;
    last_name?: string;
    language_code?: string; // Добавляем поле языка из документации MAX
}

interface MaxWebApp {
    initDataUnsafe: {
        user?: MaxUser;
    };
    platform: string;
}

const getWebApp = (): MaxWebApp | undefined => {
    const globalContext = window as unknown as Record<string, unknown>;
    return globalContext['WebApp'] as MaxWebApp | undefined;
};

export const getMaxUserData = () => {
    const webApp = getWebApp();

    if (!webApp || !webApp.initDataUnsafe?.user) {
        return {
            fullName: 'СУБЪЕКТ: НЕИДЕНТИФИЦИРОВАН',
            platform: 'UNKNOWN',
            language: 'UNKNOWN' // Значение по умолчанию
        };
    }

    const { first_name, last_name, language_code } = webApp.initDataUnsafe.user;
    const fullName = `${first_name || ''} ${last_name || ''}`.trim().toUpperCase();

    return {
        fullName: fullName ? `СУБЪЕКТ: ${fullName}` : 'СУБЪЕКТ: ИМЯ СКРЫТО',
        platform: (webApp.platform || 'UNKNOWN').toUpperCase(),
        language: (language_code || 'RU').toUpperCase() // Возвращаем язык (например: RU, EN)
    };
};