import React, { createContext } from 'react';

const CurrentGameContext = createContext({
    activePlayer: "",
    setActivePlayer: () => {},
    selection: "",
    setSelection: () => {},
    boardSet: [],
    setBoardSet: () => {},
})

export default CurrentGameContext
