import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CurrentGameContext from './currentGame';
import { faTruckMoving } from '@fortawesome/free-solid-svg-icons';

export default function CapturedZone(props) {

    const { taken, setTaken } = useContext(CurrentGameContext)
    const { locations, setLocations } = useContext(CurrentGameContext)
    const { activePlayer, setActivePlayer } = useContext(CurrentGameContext)
    const { inCheck, setInCheck } = useContext(CurrentGameContext)
    const { gameEnd, setGameEnd } = useContext(CurrentGameContext)
    const { playerOne, setPlayerOne } = useContext(CurrentGameContext)
    const { playerTwo, setPlayerTwo } = useContext(CurrentGameContext)
    const { moving, setMoving } = useContext(CurrentGameContext)

    const [ capturesOne, setCapturesOne ] = useState([])
    const [ capturesTwo, setCapturesTwo ] = useState([])

    const [ active, setActive ] = useState(playerOne)
    const [ inactive, setInactive ] = useState(playerTwo)

    useEffect(() => {
        renderTaken();
        findInactive();
    },[activePlayer, moving])



    const findInactive = () => {
        if(activePlayer === "white") {
            setActive(playerOne)
            setInactive(playerTwo)
        } else if(activePlayer === "black") {
            setActive(playerTwo)
            setInactive(playerOne)
        }
    }



    const renderTaken = () => {
        const renderedOne = []
        const renderedTwo = []
        const playerTaken = taken.filter((pc, index, arr) =>
            index === arr.findIndex((oth) => (
            oth[2] === pc[2]
            )
        ))
        playerTaken.forEach((pc) => {
            if(pc[1] === "black") {
                renderedOne.push(
                    <FontAwesomeIcon className="taken" style={{color: `${pc[1]}`}} icon={pc[0]}></FontAwesomeIcon>
                )
            } else if(pc[1] === "white") {
                renderedTwo.push(
                    <FontAwesomeIcon className="taken" style={{color: `${pc[1]}`}} icon={pc[0]}></FontAwesomeIcon>
                )
            }
        })
        setCapturesOne(renderedOne)
        setCapturesTwo(renderedTwo)
    }

    return (
        <div className={ active === playerTwo ? "player-two-captured captured-zone" : "player-one-captured captured-zone" }>

            <div className={ active === playerOne ? "player-one one-active active-details details" : active === playerTwo ? "player-two two-active active-details details" : null }>

                <div className="on-turn" >On turn:</div>

                <div className="nameplate">{active}</div>

                { gameEnd ? <div className="game-end">{`${gameEnd}`.toUpperCase()}</div> : inCheck[0] === "white" || inCheck[1] === "black" ? <div className="in-check">CHECK!</div> : <div className="in-check"></div> }

                <div className="captures">

                    <h1 className={ active === playerOne ? "player-one captured" : active === playerTwo ? "player-two captured" : null }>Captured:</h1>

                    {capturesOne}

                </div>
            </div>

            <div className={ inactive === playerOne ? "player-one inactive-details details" : inactive === playerTwo ? "player-two inactive-details details" : null }>

                <div className="nameplate">{inactive}</div>

                <div className="captures">

                    <h1 className={ inactive === playerOne ? "player-one captured" : inactive === playerTwo ? "player-two captured" : null }>Captured:</h1>

                    {capturesTwo}

                </div>
            </div>
        </div>
    )
}
