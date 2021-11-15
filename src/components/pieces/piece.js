import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessKing, faChessQueen, faChessRook, faChessBishop, faChessKnight, faChessPawn } from '@fortawesome/free-solid-svg-icons';
import Ghost from '../ghost';

export default function Piece (props) {

    const ranks = ["1","2","3","4","5","6","7","8"]
    const files = ["a","b","c","d","e","f","g","h"]

    const { initRank, initFile, team, type, pieces, select } = props;

    const [ hover, setHover ] = useState(false);
    const [ currentPosition, setCurrentPosition ] = useState(`${files[initFile]}${ranks[initRank]}`)
    const [ currentRank, setCurrentRank ] = useState(initRank)
    const [ currentFile, setCurrentFile ] = useState(initFile)
    let [ moved, setMoved ] = useState(false)
    const [availMoves, setAvailMoves] = useState([]);
    const [selected, setSelected] = useState(false);
    const [ghosts, setGhosts] = useState([])

    const handleHover = () => {
        setHover(true)
        console.log("Pieces stored in piece:", pieces)
        makeGhosts(availMoves, type, [initFile, initRank], team, pieces)
    }

    const handleUnhover = () => {
        setHover(false)
        { !selected ? setGhosts([]) : null };
    }

    const toggleSelected = () => {
        if(!selected) {
            setSelected(true)
            select(initRank, initFile)
        } else if(selected) {
            setSelected(false)
        }
    }


    const determineMoves = (type, currentFile, currentRank) => {
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

    const makeGhosts = (availMoves = [], pieceType, initposition, team, pieces) => {
        const newGhosts = []
        console.log("moves for ghosts:", availMoves)
        availMoves.forEach((loc) => {

                const ghostPosition = `${files[loc[0][0]]}${ranks[loc[1][0]]}`
                console.log("ghost position:", ghostPosition)
                newGhosts.push(<Ghost
                    pieces={pieces}
                    team={team}
                    initposition={initposition}
                    move={move}
                    file={loc[0][0]}
                    rank={loc[1][0]}
                    position={ghostPosition}
                    type={pieceType}
                />)
        })
        console.log("ghosts", newGhosts)
        setGhosts([newGhosts])
        return(ghosts);
    }

    useEffect(() => {
        determineMoves(type, currentFile, currentRank);
        setMoved(true);
    },[pieces]);

    const move = (newFile, newRank, newPosition) => {
        setMoved(true)
        setCurrentFile(newFile)
        setCurrentRank(newRank)
        setCurrentPosition(newPosition)
        setSelected(false)
        determineMoves(type, newFile, newRank)
        setGhosts([])
    }

    return (
        <div className="game-board" style={{ gridColumn: "1 / span8", gridRow: "1 / span8"}}>
            {ghosts}
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
        </div>
    )
}
