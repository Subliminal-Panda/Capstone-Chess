import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessKing, faChessQueen, faChessRook, faChessBishop, faChessKnight, faChessPawn } from '@fortawesome/free-solid-svg-icons';

export default function Piece (props) {

    const ranks = ["1","2","3","4","5","6","7","8"]
    const files = ["a","b","c","d","e","f","g","h"]

    const { initRank, initFile, team, removeOld, placeNew, makeGhosts, type, pieces } = props;

    const [ hover, setHover ] = useState(false);
    const [ currentPosition, setCurrentPosition ] = useState(`${files[initFile]}${ranks[initRank]}`)
    const [ currentRank, setCurrentRank ] = useState(initRank)
    const [ currentFile, setCurrentFile ] = useState(initFile)
    const [ moved, setMoved ] = useState(false)
    const [availMoves, setAvailMoves] = useState([]);
    const [selected, setSelected] = useState(false);

    const handleHover = () => {
        setHover(true)
        makeGhosts(availMoves, type, [initFile, initRank], team)
    }

    const handleUnhover = () => {
        setHover(false)
    }

    const toggleSelected = () => {
        if(!selected) {
            setSelected(true)
        } else if(selected) {
            setSelected(false)
        }
        console.log(props, "selected?", selected)
    }


    const determineMoves = (type) => {
        const usableMoves = []
        const distances = [1,2,3,4,5,6,7]
        if(type === faChessPawn) {
            if(team === "white" && currentRank < 7) {
                usableMoves.push([[currentFile],[currentRank + 1]]);
                { !moved ? usableMoves.push([[currentFile],[currentRank + 2]]) : null }
            } else if(team === "black" && currentRank > 0) {
                usableMoves.push([[currentFile],[currentRank - 1]])
                { !moved ? usableMoves.push([[currentFile],[currentRank - 2]]) : null }
            }
        } else if(type === faChessKing) {
                const up = currentRank + 1;
                const down = currentRank - 1;
                const right = currentFile + 1;
                const left = currentFile - 1;
                if(up < 8) {
                    usableMoves.push([[currentFile],[up]])
                    if(right < 8) {
                        usableMoves.push([[right],[up]])
                    }
                    if(left >= 0) {
                        usableMoves.push([[left],[up]])
                    }
                }
                if(down >= 0) {
                    if(right < 8) {
                        usableMoves.push([[right],[down]])
                    }
                    if(left >= 0) {
                        usableMoves.push([[left],[down]])
                    }
                    usableMoves.push([[currentFile],[down]])
                }
                if(right < 8) {
                    usableMoves.push([[right],[currentRank]])
                }
                if(left >= 0) {
                    usableMoves.push([[left],[currentRank]])
                }
        } else if(type === faChessQueen) {
            distances.forEach((dist) => {
                const up = currentRank + dist;
                const down = currentRank - dist;
                const right = currentFile + dist;
                const left = currentFile - dist;
                if(up < 8) {
                    usableMoves.push([[currentFile],[up]])
                    if(right < 8) {
                        usableMoves.push([[right],[up]])
                    }
                    if(left >= 0) {
                        usableMoves.push([[left],[up]])
                    }
                }
                if(down >= 0) {
                    if(right < 8) {
                        usableMoves.push([[right],[down]])
                    }
                    if(left >= 0) {
                        usableMoves.push([[left],[down]])
                    }
                    usableMoves.push([[currentFile],[down]])
                }
                if(right < 8) {
                    usableMoves.push([[right],[currentRank]])
                }
                if(left >= 0) {
                    usableMoves.push([[left],[currentRank]])
                }
            })
        } else if(type === faChessRook) {
            distances.forEach((dist) => {
                const up = currentRank + dist;
                const down = currentRank - dist;
                const right = currentFile + dist;
                const left = currentFile - dist;
                if(up < 8) {
                    usableMoves.push([[currentFile],[up]])
                }
                if(down >= 0) {
                    usableMoves.push([[currentFile],[down]])
                }
                if(right < 8) {
                    usableMoves.push([[right],[currentRank]])
                }
                if(left >= 0) {
                    usableMoves.push([[left],[currentRank]])
                }
            })
        } else if(type === faChessBishop) {
            distances.forEach((dist) => {
                const up = currentRank + dist;
                const down = currentRank - dist;
                const right = currentFile + dist;
                const left = currentFile - dist;
                if(up < 8) {
                    if(right < 8) {
                        usableMoves.push([[right],[up]])
                    }
                    if(left >= 0) {
                        usableMoves.push([[left],[up]])
                    }
                }
                if(down >= 0) {
                    if(right < 8) {
                        usableMoves.push([[right],[down]])
                    }
                    if(left >= 0) {
                        usableMoves.push([[left],[down]])
                    }
                }
            })
        } else if(type === faChessKnight) {
            if(currentFile + 2 < 8){
                if(currentRank + 1 < 8) {
                    usableMoves.push([[currentFile + 2],[currentRank + 1]])
                }
                if(currentRank - 1 >= 0) {
                    usableMoves.push([[currentFile + 2],[currentRank - 1]])
                }
            }
            if(currentFile - 2 >= 0){
                if(currentRank + 1 < 8) {
                    usableMoves.push([[currentFile - 2],[currentRank + 1]])
                }
                if(currentRank - 1 >= 0) {
                    usableMoves.push([[currentFile - 2],[currentRank - 1]])
                }
            }
            if(currentFile + 1 < 8){
                if(currentRank + 2 < 8) {
                    usableMoves.push([[currentFile + 1],[currentRank + 2]])
                }
                if(currentRank - 2 >= 0) {
                    usableMoves.push([[currentFile + 1],[currentRank - 2]])
                }
            }
            if(currentFile -1 >= 0){
                if(currentRank + 2 < 8) {
                    usableMoves.push([[currentFile - 1],[currentRank + 2]])
                }
                if(currentRank - 2 >= 0) {
                    usableMoves.push([[currentFile - 1],[currentRank - 2]])
                }
            }
        }
        setAvailMoves(usableMoves)
    }

    useEffect(() => {
        determineMoves(type);
    },[]);

    // const move = (startRank, startFile, increment) => {
    //     console.log(props);
    //     removeOld([props, currentPosition]);
    //     if(team === "white" && startRank < 7) {
    //         setCurrentPosition(`${files[startFile]}${ranks[startRank + increment]}`)
    //         setCurrentRank(startRank + increment);
    //         setMoved(true);
    //         placeNew([props, `${files[startFile]}${ranks[startRank + increment]}`]);
    //     } else if(team ==="black" && startRank > 0) {
    //         setCurrentPosition(`${files[startFile]}${ranks[startRank - increment]}`)
    //         setCurrentRank(startRank - increment);
    //         setMoved(true);
    //         placeNew([props, `${files[startFile]}${ranks[startRank - increment]}`]);
    //     }
    // }

    return (
        <FontAwesomeIcon
        onClick={() => toggleSelected()}
        onMouseOver={() => handleHover()}
        onMouseOut={() => handleUnhover()}
        className={ hover ? ( selected ? "hovered-piece selected-piece chess-piece" : "hovered-piece chess-piece" ) : selected ? "selected-piece chess-piece" : "chess-piece" }
        style={{
            gridArea: currentPosition,
            color: team,
        }}
        icon={ type }
        />
    )
}
