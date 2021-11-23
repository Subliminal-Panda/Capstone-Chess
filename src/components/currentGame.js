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
    castled: [],
    setCastled: () => {},
    inCheck: [],
    setInCheck: () => {},
    assassinAttempts: [],
    setAssassinAttempts: () => {},
    moving: "",
    setMoving: () => {},
    gameEnd: "",
    setGameEnd: () => {},
})

export default CurrentGameContext
