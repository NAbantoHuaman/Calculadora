import React from 'react';

interface PropsBoton {
  children: React.ReactNode;
  onClick: () => void;
  color?: 'gris' | 'naranja' | 'rojo';
  span?: 1 | 2 | 3 | 4;
}

export const Boton: React.FC<PropsBoton> = ({ children, onClick, color = 'gris', span = 1 }) => {
  const estilosBase = "text-xl font-medium transition-all active:scale-95 flex items-center justify-center h-full w-full rounded-md"; 
  
  const colores = {
    gris: "bg-white text-slate-800 hover:bg-slate-50",
    naranja: "bg-orange-500 text-white hover:bg-orange-600",
    rojo: "bg-red-100 text-red-600 hover:bg-red-200"
  };

  const clasesSpan = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
  };

  return (
    <div className={clasesSpan[span]}>
      <button 
        onClick={onClick}
        className={`${estilosBase} ${colores[color]}`}
      >
        {children}
      </button>
    </div>
  );
};
