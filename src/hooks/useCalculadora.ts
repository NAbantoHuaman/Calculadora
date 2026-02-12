import { useState, useEffect, useRef } from 'react';
import { EstadoCalculadora, ESTADO_INICIAL, TipoOperacion, ItemHistorial } from '../types';
import { Calculadora } from '../clases/Calculadora';

export const useCalculadora = () => {
  const calculadoraRef = useRef<Calculadora>(new Calculadora());
  const calculadora = calculadoraRef.current;

  const [estado, setEstado] = useState<EstadoCalculadora>(ESTADO_INICIAL);
  const finalHistorialRef = useRef<HTMLDivElement>(null);

  const sincronizarReact = () => {
    setEstado(prev => ({
      ...prev,
      valorPantalla: calculadora.valorPantalla,
      valorAnterior: calculadora.valorAnterior,
      operacion: calculadora.operacionSimbolo,
      resultadoMostrado: calculadora.resultadoMostrado
    }));
  };

  useEffect(() => {
    if (estado.mostrandoHistorial) {
      finalHistorialRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [estado.historial, estado.mostrandoHistorial]);

  const ingresarDigito = (digito: string) => {
    calculadora.ingresarDigito(digito);
    sincronizarReact();
  };

  const borrarDigito = () => {
    calculadora.borrarDigito();
    sincronizarReact();
  };

  const seleccionarOperacion = (op: TipoOperacion) => {
    const resultadoIntermedio = calculadora.setOperacion(op);
    
    if (resultadoIntermedio !== null && estado.valorAnterior !== null && estado.operacion) {
        const nuevoHistorial = [
          ...estado.historial,
          {
            id: Date.now(),
            calculo: `${estado.valorAnterior} ${estado.operacion} ${estado.valorPantalla}`,
            resultado: String(resultadoIntermedio)
          }
        ];
        
        setEstado(prev => ({ ...prev, historial: nuevoHistorial }));
    }
    
    sincronizarReact();
  };

  const ejecutarCalculo = () => {
    const valAnterior = calculadora.valorAnterior;
    const op = calculadora.operacionSimbolo;
    const valActual = parseFloat(calculadora.valorPantalla);

    if (valAnterior === null || op === null) return;

    const resultado = calculadora.calcular();

    const item: ItemHistorial = {
      id: Date.now(),
      calculo: `${valAnterior} ${op} ${valActual}`,
      resultado: String(resultado)
    };

    setEstado(prev => ({
      ...prev,
      historial: [...prev.historial, item],
    }));

    sincronizarReact();
  };

  const limpiar = () => {
    calculadora.limpiar();
    sincronizarReact();
  };
  
  const borrarHistorial = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEstado(prev => ({ ...prev, historial: [] }));
  };

  const toggleHistorial = () => {
    setEstado(prev => ({ ...prev, mostrandoHistorial: !prev.mostrandoHistorial }));
  };

  return {
    estado,
    finalHistorialRef,
    ingresarDigito,
    borrarDigito,
    seleccionarOperacion,
    ejecutarCalculo,
    limpiar,
    borrarHistorial,
    toggleHistorial
  };
};
