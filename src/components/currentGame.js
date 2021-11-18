import React, { createContext } from 'react';

const CurrentGameContext = createContext({
    activePlayer: "",
    setActivePlayer: () => {},
    selection: "",
    setSelection: () => {},
    pieces: [],
    setPieces: () => {},
    locations: [],
    setLocations: () => {},
    underAttack: [],
    setUnderAttack: () => {},
    taken: [],
    setTaken: () => {},
})

export default CurrentGameContext
