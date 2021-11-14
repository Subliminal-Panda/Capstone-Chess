import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessPawn } from '@fortawesome/free-solid-svg-icons';

export default function Pawn (props) {

    const ranks = ["1","2","3","4","5","6","7","8"]
    const files = ["a","b","c","d","e","f","g","h"]

    const { initRank, initFile, team, removeOld, placeNew, makeGhosts } = props;

    const [ hover, setHover ] = useState(false);
    const [ currentPosition, setCurrentPosition ] = useState(`${files[initFile]}${ranks[initRank]}`)
    const [ currentRank, setCurrentRank ] = useState(initRank)
    const [ currentFile, setCurrentFile ] = useState(initFile)
    const [ moved, setMoved ] = useState(false)
    const [availMoves, setAvailMoves] = useState([]);

    // const findAvailMoves = () => {
    //     if(team === "white" && currentRank < 7) {
    //         availMoves.push([[currentFile],[currentRank + 1]]);
    //         if(!moved) {
    //             availMoves.push([[currentFile],[currentRank + 2]])
    //         }
    //     } else if(team === "black" && currentRank > 0) {
    //         availMoves.push([[currentFile],[currentRank - 1]]);
    //         if(!moved) {
    //             availMoves.push([[currentFile],[currentRank - 2]])
    //         }
    //     }
    //     console.log("avail moves", availMoves)
    //     return availMoves
    // }

    const handleHover = () => {
        setHover(true)
        makeGhosts(availMoves)
    }

    const toggleEdit = () => {

    }

    const handleUnhover = () => {
        setHover(false)
    }

    const move = (startRank, startFile, increment) => {
        console.log(props);
        removeOld([props, currentPosition]);
        if(team === "white" && startRank < 7) {
            setCurrentPosition(`${files[startFile]}${ranks[startRank + increment]}`)
            setCurrentRank(startRank + increment);
            setMoved(true);
            placeNew([props, `${files[startFile]}${ranks[startRank + increment]}`]);
        } else if(team ==="black" && startRank > 0) {
            setCurrentPosition(`${files[startFile]}${ranks[startRank - increment]}`)
            setCurrentRank(startRank - increment);
            setMoved(true);
            placeNew([props, `${files[startFile]}${ranks[startRank - increment]}`]);
        }
    }

    const determineMoves = () => {
        const usableMoves = []
        if(team === "white" && currentRank === 1) {
            usableMoves.push([[currentFile],[currentRank + 1]],[[currentFile],[currentRank + 2]])
        } else if(team === "white" && currentRank < 7) {
            usableMoves.push([[currentFile],[currentRank + 1]])

        } else if(team === "black" && currentRank === 6) {
            usableMoves.push([[currentFile],[currentRank - 1]],[[currentFile],[currentRank - 2]])
        } else if(team === "black" && currentRank > 0) {
            usableMoves.push([[currentFile],[currentRank - 1]])

        }
        setAvailMoves(usableMoves)
    }

    useEffect(() => {
        placeNew([props, currentPosition]);
        determineMoves();
    },[]);

    return (
        <FontAwesomeIcon
        onClick={() => toggleEdit()}
        onMouseOver={() => handleHover()}
        onMouseOut={() => handleUnhover()}
        className={ hover ? "selected-piece chess-piece" : "chess-piece" }
        style={{
            gridArea: currentPosition,
            color: team,
        }}
        icon={ faChessPawn }
        />
    )
}
