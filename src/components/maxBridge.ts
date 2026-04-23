/**
 * MAX Bridge Service v1.2
 * Полностью очищен от 'any' и неиспользуемых переменных для строгих правил ESLint.
 */

interface MaxUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
}

interface MaxWebApp {
    initDataUnsafe: {
        user?: MaxUser;
    };
    platform: 'ios' | 'android' | 'desktop' | 'web';
    requestScreenMaxBrightness: () => Promise<{ maxBrightness: boolean }>;
    restoreScreenBrightness: () => Promise<{ maxBrightness: boolean }>;
    HapticFeedback: {
        impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => Promise<{ status: string }>;
    };
}

// Используем Record<string, unknown> вместо any для соответствия правилам ESLint
const getWebApp = (): MaxWebApp | undefined => {
    const globalContext = window as unknown as Record<string, unknown>;
    return globalContext['WebApp'] as MaxWebApp | undefined;
};

export const getMaxUserData = () => {
    const webApp = getWebApp();

    if (!webApp || !webApp.initDataUnsafe?.user) {
        return {
            fullName: 'СУБЪЕКТ: НЕИДЕНТИФИЦИРОВАН',
            platform: 'UNKNOWN'
        };
    }

    const { first_name, last_name } = webApp.initDataUnsafe.user;
    const fullName = `${first_name || ''} ${last_name || ''}`.trim().toUpperCase();

    return {
        fullName: fullName ? `СУБЪЕКТ: ${fullName}` : 'СУБЪЕКТ: ИМЯ СКРЫТО',
        platform: (webApp.platform || 'UNKNOWN').toUpperCase()
    };
};

export const setMaxBrightness = async (): Promise<void> => {
    const webApp = getWebApp();
    if (webApp && typeof webApp.requestScreenMaxBrightness === 'function') {
        try {
            await webApp.requestScreenMaxBrightness();
        } catch {
            // Ошибка игнорируется
        }
    }
};

/**
 * Вызывает тактильный отклик устройства.
 * Обязательно импортируйте и используйте в DiveScreen.tsx, чтобы убрать Warning.
 */
export const triggerHaptic = (style: 'light' | 'medium' | 'heavy' = 'medium'): void => {
    const webApp = getWebApp();
    if (webApp && webApp.HapticFeedback) {
        webApp.HapticFeedback.impactOccurred(style).catch(() => {});
    }
};