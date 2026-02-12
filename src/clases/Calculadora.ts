import { Operacion } from './Operacion';
import { Suma, Resta, Multiplicacion, Division } from './OperacionesConcretas';
import { TipoOperacion } from '../types';

export class Calculadora {
  private _valorPantalla: string = '0';
  private _valorAnterior: number | null = null;
  private _operacionActual: Operacion | null = null;
  private _operacionSimbolo: TipoOperacion = null;
  private _resultadoMostrado: boolean = false;

  get valorPantalla(): string {
    return this._valorPantalla;
  }

  get valorAnterior(): number | null {
    return this._valorAnterior;
  }

  get operacionSimbolo(): TipoOperacion {
    return this._operacionSimbolo;
  }

  get resultadoMostrado(): boolean {
    return this._resultadoMostrado;
  }

  public ingresarDigito(digito: string): void {
    if (this._resultadoMostrado) {
      this._valorPantalla = digito;
      this._resultadoMostrado = false;
      return;
    }

    if (digito === '.' && this._valorPantalla.includes('.')) return;

    if (this._valorPantalla === '0' && digito !== '.') {
      this._valorPantalla = digito;
    } else {
      if (this._valorPantalla.length < 30) {
        this._valorPantalla += digito;
      }
    }
  }

  public borrarDigito(): void {
    if (this._resultadoMostrado) {
      this._valorPantalla = '0';
      this._resultadoMostrado = false;
      return;
    }

    if (this._valorPantalla.length === 1) {
      this._valorPantalla = '0';
    } else {
      this._valorPantalla = this._valorPantalla.slice(0, -1);
    }
  }

  public setOperacion(simbolo: TipoOperacion): number | null {
    const crearOperacion = (op: TipoOperacion): Operacion | null => {
      switch (op) {
        case '+': return new Suma();
        case '-': return new Resta();
        case '*': return new Multiplicacion();
        case '/': return new Division();
        default: return null;
      }
    };

    if (this._operacionActual && this._valorAnterior !== null && !this._resultadoMostrado) {
      const resultado = this.calcular();
      this._operacionSimbolo = simbolo;
      this._operacionActual = crearOperacion(simbolo);
      this._valorAnterior = resultado;
      this._valorPantalla = '0';
      this._resultadoMostrado = false;
      return resultado; 
    }

    this._operacionSimbolo = simbolo;
    this._operacionActual = crearOperacion(simbolo);
    this._valorAnterior = parseFloat(this._valorPantalla);
    this._valorPantalla = '0';
    this._resultadoMostrado = false;
    
    return null;
  }

  public calcular(): number {
    if (!this._operacionActual || this._valorAnterior === null) {
      return parseFloat(this._valorPantalla);
    }

    const valorActual = parseFloat(this._valorPantalla);
    
    try {
      const resultado = this._operacionActual.ejecutar(this._valorAnterior, valorActual);
      
      this._valorPantalla = String(resultado);
      this._valorAnterior = null;
      this._operacionActual = null;
      this._operacionSimbolo = null;
      this._resultadoMostrado = true;
      
      return resultado;
    } catch (error) {
      this._valorPantalla = "Error";
      this._resultadoMostrado = true;
      return 0;
    }
  }

  public limpiar(): void {
    this._valorPantalla = '0';
    this._valorAnterior = null;
    this._operacionActual = null;
    this._operacionSimbolo = null;
    this._resultadoMostrado = false;
  }
}
