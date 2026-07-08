import Board from "./components/Board"
const ROW_SIZE = 5

const TO_CHECK = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
]

// const ROW_OF_ZEROS = Array.from({ length: ROW_SIZE }, () => 0)
// const CELLS = Array.from({ length: ROW_SIZE }, () => ROW_OF_ZEROS)

// no puedes usar un mismo rowofzeros, todos los valores se repetiran (misma referencia)
const CELLS = Array.from({ length: ROW_SIZE }, () => Array.from({ length: ROW_SIZE }, () => 0 as number | string))  // 0 == no bomba, B == bomba, otros numeros == cantidad de bombas alrededor

// crea n bombas
for (let index = 0; index < ROW_SIZE; index++) {

  let randRow = Math.floor(Math.random() * ROW_SIZE);
  let randCell = Math.floor(Math.random() * ROW_SIZE);

  // si la celda no es nula (o si su valor es cero, lo cambia a 1)
  if (CELLS[randRow][randCell] == 0) {
    console.log('existe')
    CELLS[randRow][randCell] = 'B'
  }

}


//verifica en los bloques circundantes
//por cada fila
for (let i = 0; i < ROW_SIZE; i++) {
  //por cada celda
  for (let j = 0; j < ROW_SIZE; j++) {

    let bombsCounter = 0

    if (CELLS[i][j] !== 'B') {

      for (const item of TO_CHECK) {

        let cellToCheck = CELLS[i + item[0]]?.[j + item[1]]

        // console.log(i, j, ' encontro:.............')
        if (cellToCheck !== null && cellToCheck == 'B') {

          bombsCounter++;
        }

      }

      CELLS[i][j] = bombsCounter;
    }


  }

}




function App() {
  return (
    <main className="container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] px-4">
      <header className="text-xl font-bold leading-[3rem]">booscaminas</header>
      <div className="grid place-content-center">
        <Board CELLS={CELLS} />
      </div>
      <footer className="text-center leading-[3rem] opacity-70">
        © {new Date().getFullYear()} booscaminas
      </footer>
    </main>
  )
}

export default App
