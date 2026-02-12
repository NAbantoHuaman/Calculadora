export type TipoOperacion = '+' | '-' | '*' | '/' | null;

export interface ItemHistorial {
  id: number;
  calculo: string;
  resultado: string;
}

export interface EstadoCalculadora {
  valorPantalla: string;
  valorAnterior: number | null;
  operacion: TipoOperacion;
  resultadoMostrado: boolean;
  historial: ItemHistorial[];
  mostrandoHistorial: boolean;
}

export const ESTADO_INICIAL: EstadoCalculadora = {
  valorPantalla: '0',
  valorAnterior: null,
  operacion: null,
  resultadoMostrado: false,
  historial: [],
  mostrandoHistorial: false,
};
