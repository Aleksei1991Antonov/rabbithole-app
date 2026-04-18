import React from 'react';

const VortexBackground: React.FC = () => {
    return (
        /* Убрали bg-[#050505] и fixed, чтобы компонент был прозрачным и встраиваемым */
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Основное центральное свечение */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] flex items-center justify-center">

                {/* Внешнее медленное кольцо */}
                <div className="absolute w-[600px] h-[600px] rounded-full bg-[#00ffcc]/5 blur-[120px] animate-pulse" />

                {/* Среднее кольцо */}
                <div className="absolute w-[400px] h-[400px] rounded-full border border-[#00ffcc]/10 blur-sm animate-[ping_5s_linear_infinite]" />

                {/* Ядро (самый яркий центр) */}
                <div className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-tr from-[#00ffcc]/20 to-transparent blur-[80px]" />

                {/* Лучи */}
                <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ffcc]/10 to-transparent rotate-45" />
                <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ffcc]/10 to-transparent -rotate-45" />
            </div>

            {/* Сетка для глубины */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#00ffcc 1px, transparent 1px), linear-gradient(90deg, #00ffcc 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />
        </div>
    );
};

export default VortexBackground;