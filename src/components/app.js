import React, { useState } from 'react';
import Table from "./table";
import CurrentGameContext from './currentGame';

export default function App () {
  const [ activePlayer, setActivePlayer ] = useState("white")
  const [ selection, setSelection ] = useState(false)
  return (
    <div className='app'>
      <CurrentGameContext.Provider value={{ activePlayer, setActivePlayer, selection, setSelection }}>
        <h1 className="main-heading">Computery Chess</h1>
        <Table />
      </CurrentGameContext.Provider>
    </div>
  );
}
