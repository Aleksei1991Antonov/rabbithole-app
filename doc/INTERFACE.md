# 🐇 UI/UX SPECIFICATION: Rabbit Hole v1.0

## 1. Визуальный Код (Design System)
- **Стиль:** Cyber-Noir / Minimalist Terminal.
- **Цвета:**
    - `Background`: `#000000` (Void)
    - `Accent`: `#00ffcc` (Matrix Cyan)
    - `Secondary`: `rgba(255,255,255,0.1)` (Border/Glass)
- **Типографика:**
    - Заголовки: `text-6xl font-black tracking-tighter font-mono` (плотный, агрессивный).
    - Подписи: `text-[10px/11px] tracking-[0.3em/0.4em] uppercase font-mono`.

## 2. Ключевые Эффекты (Signature Effects)
- **Neon Glow:** Обязательное использование `drop-shadow-[0_0_30px_rgba(0,255,204,0.4)]` для заголовков и иконок.
- **Glassmorphism:** Сочетание `bg-white/5` (или `bg-[#00ffcc]/5`) и `backdrop-blur-[2px]`.
- **Interactive (Hover):**
    - Эффект «Бегущего блика» через градиент и `translate-x`.
    - Увеличение иконок `scale-110` и усиление их свечения.
- **Геометрия:** Строгие углы `rounded-[1px]`, границы `border-white/10` или `border-[#00ffcc]/30`.

## 3. Технический Стек UI
- **Framework:** React + TypeScript (Vite).
- **Styling:** Tailwind CSS (Utility-first).
- **Icons:** Lucide-react (размер 16-24px, тонкие линии).
- **Animations:** Базовые `animate-in fade-in` и кастомные CSS-keyframes для сложных эффектов (shimmer/vortex).

## 4. Правила генерации кода (для ИИ)
1. **Слои:** Контент всегда на `relative z-10`, фон на `z-0`.
2. **Интерактив:** Каждая кнопка должна иметь `transition-all duration-500` и визуальный отклик на `hover`.
3. **Минимализм:** Никаких скруглений больше `1px`. Никаких стандартных теней `shadow-lg`, только `drop-shadow` акцентного цвета.
4. **Контекст:** Текст должен появляться постепенно (эффект терминала), создавая ощущение работы системы в реальном времени.

---
*Этот документ — эталон. Любое отклонение от него разрушает атмосферу «Норы».*