import { useState } from "react"
import Boo from "./Boo"
import { BOO_CHAR } from "../App"
import Modal from "./Modal"


const ModalTestInner = ({ status }: { status: string }) => {
    return (
        <div>
            {status === 'won' && <p>you won</p>}

            {status === 'lost' && <p>you lost</p>}

            <button onClick={() => location.reload()}>play again</button>
        </div>
    )
};


export default function Board({ CELLS }: { CELLS: (string | number)[][] }) {
    //usetsattesnippet
    const [clicked, setClicked] = useState<string[]>([])
    const [status, setStatus] = useState<'started' | 'won' | 'lost'>('started')

    const [modalActive, setModalActive] = useState(false);
    const handleSetModalActive = () => {
        setModalActive(!modalActive);
    };



    const handleClick = (id: string) => {
        setClicked((prev) => [...prev, id])

        //indexes de celda convertidos a numeros 
        const row = Number(id.split('-')[0])
        const cell = Number(id.split('-')[1])
        if (CELLS[row][cell] == 'B') {
            setStatus('lost')

            handleSetModalActive()

        } else if (clicked.length + 1 == (CELLS.length ** 2 - CELLS.length)) {
            //+1 porque el nuevo item en clicked array aun no se ha setteado
            setStatus('won')

            handleSetModalActive()
        }


    }
    return (
        <>
            <div className={`grid board`}>




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
                                                {cell === BOO_CHAR ? <Boo /> : cell}
                                            </div>
                                            :
                                            <button onClick={() => status === 'started' && handleClick(cellKey)}></button>
                                        }
                                    </div>


                                )
                            })}
                        </div>
                    )
                })}
            </div>

            <Modal
                content={<ModalTestInner status={status} />}
                height={"60dvh"}
                onClose={() => setModalActive(false)}
                open={modalActive}
                padding={20}
                radii={10}
                theme={"light"}
                transitionSpeed={".25s"}
                width={"80dvw"}
            />
        </>

    )
}
