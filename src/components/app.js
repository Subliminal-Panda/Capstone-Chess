import React, { useEffect, useState } from 'react';
import Table from "./table";
import CurrentGameContext from './currentGame';

export default function App () {
  const [ activePlayer, setActivePlayer ] = useState("black")
  const [ selection, setSelection ] = useState(false)
  const [ pieces, setPieces ] = useState([])
  const [ locations, setLocations ] = useState([])
  const [ taken, setTaken ] = useState([])
  const [ underAttack, setUnderAttack ] = useState([])
  const [ castled, setCastled ] = useState([])
  const [ inCheck, setInCheck ] = useState([])
  const [ assassinAttempts, setAssassinAttempts ] = useState([])
  const [ moving, setMoving ] = useState(false)
  const [ pinned, setPinned ] = useState([])
  const [ gameEnd, setGameEnd ] = useState(false)

  return (
    <div className='app'>
      <CurrentGameContext.Provider value={{ activePlayer, setActivePlayer, selection, setSelection, pieces, setPieces, locations, setLocations, taken, setTaken, underAttack, setUnderAttack, castled, setCastled, inCheck, setInCheck, assassinAttempts, setAssassinAttempts, moving, setMoving, pinned, setPinned, gameEnd, setGameEnd }}>
        <h1 className={ activePlayer === "white" ? "player-one main-heading" : "player-two main-heading" }>{activePlayer === "white" ? "PLAYER ONE" : "PLAYER TWO"}'S TURN</h1>
        <Table />
      </CurrentGameContext.Provider>
    </div>
  );
}
