import React, { useState, useContext } from 'react';

import CapturedZone from './capturedZone';
import Board from './board';
import CurrentGameContext from './currentGame';

export default function Table (props) {

    const [ white, setWhite ] = useState("Player One")
    const [ black, setBlack ] = useState("Player Two")

    const { gameEnd, setGameEnd } = useContext(CurrentGameContext)
    const { activePlayer, setActivePlayer } = useContext(CurrentGameContext)
    const { selection, setSelection } = useContext(CurrentGameContext)
    const { pieces, setPieces } = useContext(CurrentGameContext)
    const { locations, setLocations } = useContext(CurrentGameContext)
    const { taken, setTaken } = useContext(CurrentGameContext)
    const { underAttack, setUnderAttack } = useContext(CurrentGameContext)
    const { castled, setCastled } = useContext(CurrentGameContext)
    const { inCheck, setInCheck } = useContext(CurrentGameContext)
    const { assassinAttempts, setAssassinAttempts } = useContext(CurrentGameContext)
    const { moving, setMoving } = useContext(CurrentGameContext)
    const { pinned, setPinned } = useContext(CurrentGameContext)
    const { newGame, setNewGame } = useContext(CurrentGameContext)

    const resetGame = () => {
        setGameEnd(false)
        setPieces([])
        setActivePlayer("white")
        setSelection(false)
        setLocations([])
        setTaken([])
        setUnderAttack([])
        setCastled([])
        setAssassinAttempts([])
        setMoving(false)
        setPinned([])
        setNewGame(true)
        setInCheck([])
    }

    return (
        <div className="table-wrap">
            <CapturedZone player={white} />
            <Board />
            { gameEnd ? <div onClick={() => resetGame()} className="new-game">new game?</div> : null }
            <CapturedZone player={black}/>
        </div>
    )
}
