import React from 'react';
import { TipoOperacion } from '../types';

interface PropsPantalla {
  valorPantalla: string;
  valorAnterior: number | null;
  operacion: TipoOperacion;
  mostrandoHistorial: boolean;
  onToggleHistorial: () => void;
}

export const Pantalla: React.FC<PropsPantalla> = ({ 
  valorPantalla, 
  valorAnterior, 
  operacion, 
  mostrandoHistorial,
  onToggleHistorial 
}) => {
  return (
    <div className="bg-slate-900 p-6 text-right relative z-10 transition-all duration-300">
      
      <button 
        onClick={onToggleHistorial}
        className={`absolute top-4 left-4 p-2 rounded-full transition-colors ${mostrandoHistorial ? 'bg-orange-500 text-white' : 'text-slate-500 hover:text-white hover:bg-slate-800'}`}
        title="Ver Historial"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      </button>

      <div className="text-slate-400 text-sm h-4 mt-2">
        {valorAnterior} {operacion}
      </div>
      <div className={`text-white font-light tracking-wider overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden transition-all duration-200 ${
        valorPantalla.length < 12 ? 'text-4xl' :
        valorPantalla.length < 16 ? 'text-3xl' :
        valorPantalla.length < 20 ? 'text-2xl' :
        valorPantalla.length < 25 ? 'text-xl' : 'text-lg'
      }`} style={{ scrollbarWidth: 'none' }}>
        {valorPantalla}
      </div>
    </div>
  );
};
