import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessKnight } from '@fortawesome/free-solid-svg-icons';

export default function Knight (props) {

    const ranks = ["1","2","3","4","5","6","7","8"]
    const files = ["a","b","c","d","e","f","g","h"]
    const availMoves = [];

    const { initRank, initFile, team, removeOld, placeNew } = props;

    const [ hover, setHover ] = useState(false);
    const [ currentPosition, setCurrentPosition ] = useState(`${files[initFile]}${ranks[initRank]}`)
    const [ currentRank, setCurrentRank ] = useState(initRank)
    const [ currentFile, setCurrentFile ] = useState(initFile)
    const [ moved, setMoved ] = useState(false)

    const handleHover = () => {
        setHover(true)
    }

    const handleUnhover = () => {
        setHover(false)
    }

    useEffect(() => {
        placeNew([props, currentPosition]);
    },[]);

    return (
        <FontAwesomeIcon
        onClick={() => findAvailMoves()}
        onMouseOver={() => handleHover()}
        onMouseOut={() => handleUnhover()}
        className={ hover ? "selected-piece chess-piece" : "chess-piece" }
        style={{
            gridArea: currentPosition,
            color: team,
        }}
        icon={ faChessKnight }
        />
    )
}
