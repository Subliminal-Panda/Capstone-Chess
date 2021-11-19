import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CurrentGameContext from './currentGame';

export default function CapturedZone(props) {

    const { taken, setTaken } = useContext(CurrentGameContext)
    const { locations, setLocations } = useContext(CurrentGameContext)
    const { activePlayer, setActivePlayer } = useContext(CurrentGameContext)
    const { inCheck, setInCheck } = useContext(CurrentGameContext)

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
            }
            })
        setChecks(rendering)
    }

    return (
        <div className="captured-zone">
            <h1>{props.player}'s Captured Pieces:</h1>
            { checks[0] !== undefined ? <h1 className="in-check">IN CHECK!</h1> : null }
            <div>
            {captures}
            </div>
        </div>
    )
}
