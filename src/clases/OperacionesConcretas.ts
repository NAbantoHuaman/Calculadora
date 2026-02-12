import { Operacion } from './Operacion';

export class Suma extends Operacion {
  ejecutar(a: number, b: number): number {
    return a + b;
  }
}

export class Resta extends Operacion {
  ejecutar(a: number, b: number): number {
    return a - b;
  }
}

export class Multiplicacion extends Operacion {
  ejecutar(a: number, b: number): number {
    return a * b;
  }
}

export class Division extends Operacion {
  ejecutar(a: number, b: number): number {
    if (b === 0) throw new Error("No se puede dividir por cero");
    return a / b;
  }
}
