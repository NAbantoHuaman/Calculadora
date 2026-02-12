export abstract class Operacion {
  abstract ejecutar(a: number, b: number): number;
  
  descripcion(): string {
    return "Soy una operación matemática";
  }
}
