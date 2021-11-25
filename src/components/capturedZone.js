import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CurrentGameContext from './currentGame';

export default function CapturedZone(props) {

    const { taken, setTaken } = useContext(CurrentGameContext)
    const { locations, setLocations } = useContext(CurrentGameContext)
    const { activePlayer, setActivePlayer } = useContext(CurrentGameContext)
    const { inCheck, setInCheck } = useContext(CurrentGameContext)
    const { gameEnd, setGameEnd } = useContext(CurrentGameContext)

    const [ captures, setCaptures ] = useState([])
    const [ checks, setChecks ] = useState([])
    let rendering = []

    useEffect(() => {
        renderTaken();
        renderCheck();
    },[activePlayer, locations, inCheck])



    const renderTaken = () => {
        const rendered = []
        const playerTaken = taken.filter((pc, index, arr) =>
            index === arr.findIndex((oth) => (
            oth[2] === pc[2]
            )
        ))
        playerTaken.forEach((pc) => {
            if(props.player === "Player One") {
                if(pc[1] === "black") {
                    rendered.push(
                        <FontAwesomeIcon className="taken" style={{color: `${pc[1]}`}} icon={pc[0]}></FontAwesomeIcon>
                    )
                }
            } else if (props.player === "Player Two") {
                if(pc[1] === "white") {
                    rendered.push(
                        <FontAwesomeIcon className="taken" style={{color: `${pc[1]}`}} icon={pc[0]}></FontAwesomeIcon>
                    )
                }
            }
        })
        setCaptures(rendered)
    }

    const renderCheck = () => {
        inCheck.forEach((chk) => {
            if(props.player === "Player One" && chk === "white") {
                rendering = chk
            } else if(props.player === "Player Two" && chk === "black") {
                rendering = chk
            } else if(chk === "checkmate")
                rendering = chk
            })
        setChecks(rendering)
    }

    return (
        <div className={ props.player === "Player One" ? "player-one-captured captured-zone" : "player-two-captured captured-zone" }>
            <h1 className={ props.player === "Player One" ? "player-one" : "player-two" }>{props.player}</h1>
            { gameEnd ? <h1 className="in-check">{String(gameEnd).toUpperCase()}</h1> : inCheck[0] === "white" || inCheck[1] === "black" ? <h1 className="in-check"><div>{String(inCheck[0]).toUpperCase()}{String(inCheck[1]).toUpperCase()}</div><div>IS IN CHECK!</div></h1> : null }

            <h1 className={ props.player === "Player One" ? "player-one" : "player-two" }>Captured Pieces:</h1>
            <div className="captures">
            {captures}
            </div>
        </div>
    )
}
