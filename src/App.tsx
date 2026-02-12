import { useCalculadora } from './hooks/useCalculadora';
import { Boton } from './components/Boton';
import { Pantalla } from './components/Pantalla';
import { Historial } from './components/Historial';

export default function App() {
  const {
    estado,
    finalHistorialRef,
    ingresarDigito,
    borrarDigito,
    seleccionarOperacion,
    ejecutarCalculo,
    limpiar,
    borrarHistorial,
    toggleHistorial
  } = useCalculadora();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-4 font-sans">
      <div className="w-full max-w-xs bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 relative">
        
        <Pantalla 
          valorPantalla={estado.valorPantalla}
          valorAnterior={estado.valorAnterior}
          operacion={estado.operacion}
          mostrandoHistorial={estado.mostrandoHistorial}
          onToggleHistorial={toggleHistorial}
        />

        <div className="h-[320px] relative bg-slate-200">
          
          {estado.mostrandoHistorial ? (
            <Historial 
              historial={estado.historial}
              onBorrarHistorial={borrarHistorial}
              finalRef={finalHistorialRef}
            />
          ) : (
            <div className="grid grid-cols-4 gap-1 p-1 h-full">
              <Boton onClick={limpiar} color="rojo" span={2}>AC</Boton>
              <Boton onClick={borrarDigito}>DEL</Boton>
              <Boton onClick={() => seleccionarOperacion('/')} color="naranja">÷</Boton>

              <Boton onClick={() => ingresarDigito('7')}>7</Boton>
              <Boton onClick={() => ingresarDigito('8')}>8</Boton>
              <Boton onClick={() => ingresarDigito('9')}>9</Boton>
              <Boton onClick={() => seleccionarOperacion('*')} color="naranja">×</Boton>

              <Boton onClick={() => ingresarDigito('4')}>4</Boton>
              <Boton onClick={() => ingresarDigito('5')}>5</Boton>
              <Boton onClick={() => ingresarDigito('6')}>6</Boton>
              <Boton onClick={() => seleccionarOperacion('-')} color="naranja">−</Boton>

              <Boton onClick={() => ingresarDigito('1')}>1</Boton>
              <Boton onClick={() => ingresarDigito('2')}>2</Boton>
              <Boton onClick={() => ingresarDigito('3')}>3</Boton>
              <Boton onClick={() => seleccionarOperacion('+')} color="naranja">+</Boton>

              <Boton onClick={() => ingresarDigito('0')} span={2}>0</Boton>
              <Boton onClick={() => ingresarDigito('.')}>.</Boton>
              <Boton onClick={ejecutarCalculo} color="naranja">=</Boton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
