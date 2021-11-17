import React, { createContext } from 'react';

const CurrentGameContext = createContext({
    activePlayer: "",
    setActivePlayer: () => {},
    selection: "",
    setSelection: () => {},
})

export default CurrentGameContext
