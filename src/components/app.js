import React, { useState } from 'react';
import Table from "./table";
import CurrentGameContext from './currentGame';

export default function App () {
  const [ activePlayer, setActivePlayer ] = useState("black")
  const [ selection, setSelection ] = useState(false)
  const [ pieces, setPieces ] = useState([])
  const [ locations, setLocations ] = useState([])
  const [ taken, setTaken ] = useState([])
  const [ underAttack, setUnderAttack ] = useState([])
  return (
    <div className='app'>
      <CurrentGameContext.Provider value={{ activePlayer, setActivePlayer, selection, setSelection, pieces, setPieces, locations, setLocations, taken, setTaken, underAttack, setUnderAttack }}>
        <h1 className="main-heading">Computery Chess</h1>
        <Table />
      </CurrentGameContext.Provider>
    </div>
  );
}
