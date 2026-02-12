import React from 'react';
import { ItemHistorial } from '../types';

interface PropsHistorial {
  historial: ItemHistorial[];
  onBorrarHistorial: (e: React.MouseEvent) => void;
  finalRef: React.RefObject<HTMLDivElement>;
}

export const Historial: React.FC<PropsHistorial> = ({ historial, onBorrarHistorial, finalRef }) => {
  return (
    <div className="absolute inset-0 bg-slate-100 p-4 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex justify-between items-center mb-4 border-b border-slate-300 pb-2">
        <h3 className="font-medium text-slate-700">Historial</h3>
        {historial.length > 0 && (
          <button onClick={onBorrarHistorial} className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50">
            Borrar Todo
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300">
        {historial.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm">
            <p>No hay historial reciente</p>
          </div>
        ) : (
          historial.map((item) => (
            <div key={item.id} className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 text-right">
              <div className="text-xs text-slate-500 mb-1">{item.calculo} =</div>
              <div className="text-lg font-medium text-slate-800">{item.resultado}</div>
            </div>
          ))
        )}
        <div ref={finalRef} />
      </div>
    </div>
  );
};
