import { useState } from "react"

export default function Board({ CELLS }: { CELLS: (string | number)[][] }) {
    //usetsattesnippet
    const [clicked, setClicked] = useState<string[]>([])
    const [status, setStatus] = useState<'started' | 'won' | 'lost'>('started')

    const handleClick = (id: string) => {
        setClicked((prev) => [...prev, id])

        //indexes de celda convertidos a numeros 
        const row = Number(id.split('-')[0])
        const cell = Number(id.split('-')[1])
        if (CELLS[row][cell] == 'B') {
            setStatus('lost')
            //todo: stop being able to play if lost (not only css or html attr)
        } else if (clicked.length + 1 == (CELLS.length ** 2 - CELLS.length)) {
            //+1 porque el nuevo item en clicked array aun no se ha setteado
            setStatus('won')
        }
    }
    return (
        <div className={`grid board`}>
            {status === 'won' && <p>you won</p>}

            {status === 'lost' && <p>you lost</p>}

            {CELLS.map((row, rowIndex) => {
                return (
                    <div
                        key={rowIndex}
                        className={`row grid grid-cols-6  *:size-[3rem] *:grid *:align-items-stretch`}>
                        {row.map((cell, cellIndex) => {

                            const cellKey = `${rowIndex}-${cellIndex}`
                            return (

                                <div
                                    key={cellKey}
                                    className="cell">
                                    {clicked.includes(cellKey) ?
                                        <div className="grid place-items-center" style={{ background: 'gray' }}>
                                            {cell}
                                        </div>
                                        :
                                        <button onClick={() => status === 'started' && handleClick(cellKey)}>
                                            {/* {cell} */}
                                        </button>
                                    }
                                </div>


                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}
