export default function esIsograma(palabra: string): boolean {

  let res: boolean = true;
  for (let i = 0; i < palabra.length; i++) {
    const letra = palabra[i].toLowerCase();
    //si letra es igual a letra sgte = no es isograma
    // compara cada letra con el resto de las otras
    for (let z = 0; z < palabra.length; z++) {
      // console.log(i, ' y ', z)
      if (z > i && letra === palabra[z].toLowerCase()) {
        // console.log('hay repetida')
        res = false;
        break;
      }
    }

  }
  return res;

}
