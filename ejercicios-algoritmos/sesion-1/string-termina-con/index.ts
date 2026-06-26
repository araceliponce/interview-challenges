/**
 * el 2do string tiene una longitud (ej. 2)
entonces la primera letra del 2do string debe estar en la posicion lenght-1 del 1er string
si es asi, entonces sigue comprobando

o

usar .slice entonces y comprobar trozo final de 1er string con 2do string

o regexp

 */

export default function stringTerminaCon(
  first: string,
  second: string
): boolean {

  // return first.endsWith(second);

  const final = first.slice(-second.length)
  return final == second;
}
