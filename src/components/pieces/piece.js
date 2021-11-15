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
        const checkDirection = (vert, horiz, dist = 7, otherPieceFile, otherPieceRank) => {
            for(let i = 1; i < (dist + 1); i++) {
                let horizontal = currentFile;
                let vertical = currentRank;
                if(vert === "up") {
                    vertical = (currentRank + i)
                } else if(vert === "down") {
                    vertical = (currentRank - i)
                };
                if(horiz === "right") {
                    horizontal = (currentFile + i)
                } else if(horiz === "left") {
                    horizontal = (currentFile - i)
                };
                if(horizontal === otherPieceFile && vertical === otherPieceRank) {break};
                if(horizontal > 7 || vertical > 7 || horizontal < 0 || vertical < 0) {break};
                usableMoves.push([[horizontal], [vertical]])
            }
        }
        if(type === faChessPawn) {
            if(team === "white" && currentRank < 7) {
                { !moved ? checkDirection("up", null, 2) : checkDirection("up", null, 1) }
            } else if(team === "black" && currentRank > 0) {
                { !moved ? checkDirection("down", null, 2) : checkDirection("down", null, 1) }
            }
        } else if(type === faChessKing) {
            checkDirection("up", "right", 1)
            checkDirection("up", "left", 1)
            checkDirection("up", null, 1)
            checkDirection("down", "right", 1)
            checkDirection("down", "left", 1)
            checkDirection("down", null, 1)
            checkDirection(null, "right", 1)
            checkDirection(null, "left", 1)
        } else if(type === faChessQueen) {
            checkDirection("up", "right")
            checkDirection("up", "left")
            checkDirection("up")
            checkDirection("down", "right")
            checkDirection("down", "left")
            checkDirection("down")
            checkDirection(null, "right")
            checkDirection(null, "left")
        } else if(type === faChessRook) {
            checkDirection("up")
            checkDirection("down")
            checkDirection(null, "right")
            checkDirection(null, "left")
        } else if(type === faChessBishop) {
            checkDirection("up", "right")
            checkDirection("up", "left")
            checkDirection("down", "right")
            checkDirection("down", "left")
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
