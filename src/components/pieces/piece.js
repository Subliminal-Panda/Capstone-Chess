import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessKing, faChessQueen, faChessRook, faChessBishop, faChessKnight, faChessPawn } from '@fortawesome/free-solid-svg-icons';
import Ghost from '../ghost';
import useForceUpdate from 'use-force-update';
import CurrentGameContext from '../currentGame';

export default function Piece (props) {

    const forceUpdate = useForceUpdate();

    const ranks = ["1","2","3","4","5","6","7","8"]
    const files = ["a","b","c","d","e","f","g","h"]

    const { initRank, initFile, team, type, recorded, record, capturePiece, takeTurn } = props;

    const { activePlayer, setActivePlayer } = useContext(CurrentGameContext)
    const { selection, setSelection } = useContext(CurrentGameContext)

    const [ hover, setHover ] = useState(false);
    const [ currentPosition, setCurrentPosition ] = useState(`${files[initFile]}${ranks[initRank]}`)
    const [ currentRank, setCurrentRank ] = useState(initRank)
    const [ currentFile, setCurrentFile ] = useState(initFile)
    const [ moved, setMoved ] = useState(false)
    let quickerMoved = moved
    const [ availMoves, setAvailMoves ] = useState([]);
    const [ selected, setSelected ] = useState(false);
    const [ ghosts, setGhosts ] = useState([])
    const [ pieceRecords, setPieceRecords ] = useState(recorded)

    const handleHover = () => {
        if(!selection) {

            determineMoves(type, currentFile, currentRank, recorded);
            if(availMoves[0] !== undefined) {
                setHover(true)
                makeGhosts(availMoves, type, [initFile, initRank], team, recorded)
            }
        }
    }

    const handleUnhover = () => {
        setHover(false)
        { !selected ? setGhosts([]) : null };
    }

    const toggleSelected = () => {
        setPieceRecords(recorded)
        determineMoves(type, currentFile, currentRank, recorded);
        if(!selected) {
            setSelected(true)
            setSelection(true)
        } else if(selected) {
            setSelected(false)
            setSelection(false)
        }
    }

    const determineMoves = (type, currentFile, currentRank, pieceArray) => {
        const usableMoves = []
        const checkDirection = (vert, horiz, dist = 7, pawn = false) => {
            for(let i = 1; i < (dist + 1); i++) {
                let horizontal = currentFile;
                let vertical = currentRank;
                let ally = false
                let capture = false
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
                if(horizontal > 7 || vertical > 7 || horizontal < 0 || vertical < 0) {break};
                pieceArray.forEach((rec) => {
                    let otherPieceFile = rec[3]
                    let otherPieceRank = rec[4]
                    let otherPieceColor = rec[1]
                    if(team === otherPieceColor) {
                        if(horizontal == otherPieceFile && vertical == otherPieceRank) {
                            ally = true;
                        };
                    }
                    if(horizontal == otherPieceFile && vertical == otherPieceRank) {
                            capture = true;
                    };
                })
                if(!ally) {
                    if(capture && pawn && horizontal === currentFile) {
                        break
                    } else if(capture) {
                        usableMoves.push([[horizontal], [vertical], "capture"])
                        break
                    } else if(pawn && horizontal !== currentFile) {
                        break
                    } else {
                        usableMoves.push([[horizontal], [vertical]])
                    }
                } else if(ally) {
                    break
                }
            }
        }
        if(type === faChessPawn) {
            if(team === "white" && currentRank < 7) {
                checkDirection("up", "right", 1, true)
                checkDirection("up", "left", 1, true)
                { !quickerMoved ? checkDirection("up", null, 2, true) : checkDirection("up", null, 1, true) }
            } else if(team === "black" && currentRank > 0) {
                checkDirection("down", "right", 1, true)
                checkDirection("down", "left", 1, true)
                { !quickerMoved ? checkDirection("down", null, 2, true) : checkDirection("down", null, 1, true) }
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
                    let ally = false;
                    let capture = false;
                    pieceArray.forEach((rec) => {
                        let otherPieceFile = rec[3]
                        let otherPieceRank = rec[4]
                        let otherPieceColor = rec[1]
                        if(team !== otherPieceColor) {
                            if(currentFile + 2 == otherPieceFile && currentRank + 1 == otherPieceRank) {
                                capture = true;
                            };
                        }
                        if(team === otherPieceColor) {
                            if(currentFile + 2 == otherPieceFile && currentRank + 1 == otherPieceRank) {
                                ally = true;
                            };
                        }
                    })
                    if(!ally && !capture) {usableMoves.push([[currentFile + 2],[currentRank + 1]])}
                    if(capture) {usableMoves.push([[currentFile + 2],[currentRank + 1], "capture"])}
                }
                if(currentRank - 1 >= 0) {
                    let ally = false;
                    let capture = false;
                    pieceArray.forEach((rec) => {
                        let otherPieceFile = rec[3]
                        let otherPieceRank = rec[4]
                        let otherPieceColor = rec[1]
                        if(team !== otherPieceColor) {
                            if(currentFile + 2 == otherPieceFile && currentRank - 1 == otherPieceRank) {
                                capture = true;
                            };
                        }
                        if(team === otherPieceColor) {

                            if(currentFile + 2 == otherPieceFile && currentRank - 1 == otherPieceRank) {
                                ally = true;
                            };
                        }
                    })
                    if(!ally && !capture) {usableMoves.push([[currentFile + 2],[currentRank - 1]])}
                    if(capture) {usableMoves.push([[currentFile + 2],[currentRank - 1], "capture"])}
                }
            }
            if(currentFile - 2 >= 0){
                if(currentRank + 1 < 8) {
                    let ally = false;
                    let capture = false;
                    pieceArray.forEach((rec) => {
                        let otherPieceFile = rec[3]
                        let otherPieceRank = rec[4]
                        let otherPieceColor = rec[1]
                        if(team !== otherPieceColor) {
                            if(currentFile - 2 == otherPieceFile && currentRank + 1 == otherPieceRank) {
                                capture = true;
                            };
                        }
                        if(team === otherPieceColor) {
                            if(currentFile - 2 == otherPieceFile && currentRank + 1 == otherPieceRank) {
                                ally = true;
                            };
                        }
                    })
                    if(!ally && !capture) {usableMoves.push([[currentFile - 2],[currentRank + 1]])}
                    if(capture) {usableMoves.push([[currentFile - 2],[currentRank + 1], "capture"])}
                }
                if(currentRank - 1 >= 0) {
                    let ally = false;
                    let capture = false;
                    pieceArray.forEach((rec) => {
                        let otherPieceFile = rec[3]
                        let otherPieceRank = rec[4]
                        let otherPieceColor = rec[1]
                        if(team !== otherPieceColor) {
                            if(currentFile - 2 == otherPieceFile && currentRank - 1 == otherPieceRank) {
                                capture = true;
                            };
                        }
                        if(team === otherPieceColor) {
                            if(currentFile - 2 == otherPieceFile && currentRank - 1 == otherPieceRank) {
                                ally = true;
                            };
                        }
                    })
                    if(!ally && !capture) {usableMoves.push([[currentFile - 2],[currentRank - 1]])}
                    if(capture) {usableMoves.push([[currentFile - 2],[currentRank - 1], "capture"])}
                }
            }
            if(currentFile + 1 < 8){
                if(currentRank + 2 < 8) {
                    let ally = false;
                    let capture = false;
                    pieceArray.forEach((rec) => {
                        let otherPieceFile = rec[3]
                        let otherPieceRank = rec[4]
                        let otherPieceColor = rec[1]
                        if(team !== otherPieceColor) {
                            if(currentFile + 1 == otherPieceFile && currentRank + 2 == otherPieceRank) {
                                capture = true;
                            };
                        }
                        if(team === otherPieceColor) {
                            if(currentFile + 1 == otherPieceFile && currentRank + 2 == otherPieceRank) {
                                ally = true;
                            };
                        }
                    })
                    if(!ally && !capture) {usableMoves.push([[currentFile + 1],[currentRank + 2]])}
                    if(capture) {usableMoves.push([[currentFile + 1],[currentRank + 2], "capture"])}
                }
                if(currentRank - 2 >= 0) {
                    let ally = false;
                    let capture = false;
                    pieceArray.forEach((rec) => {
                        let otherPieceFile = rec[3]
                        let otherPieceRank = rec[4]
                        let otherPieceColor = rec[1]
                        if(team !== otherPieceColor) {
                            if(currentFile + 1 == otherPieceFile && currentRank -2 == otherPieceRank) {
                                capture = true;
                            };
                        }
                        if(team === otherPieceColor) {
                            if(currentFile + 1 == otherPieceFile && currentRank - 2 == otherPieceRank) {
                                ally = true;
                            };
                        }
                    })
                    if(!ally && !capture) {usableMoves.push([[currentFile + 1],[currentRank - 2]])}
                    if(capture) {usableMoves.push([[currentFile + 1],[currentRank - 2], "capture"])}
                }
            }
            if(currentFile - 1 >= 0){
                if(currentRank + 2 < 8) {
                    let ally = false;
                    let capture = false;
                    pieceArray.forEach((rec) => {
                        let otherPieceFile = rec[3]
                        let otherPieceRank = rec[4]
                        let otherPieceColor = rec[1]
                        if(team !== otherPieceColor) {
                            if(currentFile - 1 == otherPieceFile && currentRank + 2 == otherPieceRank) {
                                capture = true;
                            };
                        }
                        if(team === otherPieceColor) {
                            if(currentFile - 1 == otherPieceFile && currentRank + 2 == otherPieceRank) {
                                ally = true;
                            };
                        }
                    })
                    if(!ally && !capture) {usableMoves.push([[currentFile - 1],[currentRank + 2]])}
                    if(capture) {usableMoves.push([[currentFile - 1],[currentRank + 2], "capture"])}
                }
                if(currentRank - 2 >= 0) {
                    let ally = false;
                    let capture = false;
                    pieceArray.forEach((rec) => {
                        let otherPieceFile = rec[3]
                        let otherPieceRank = rec[4]
                        let otherPieceColor = rec[1]
                        if(team !== otherPieceColor) {
                            if(currentFile - 1 == otherPieceFile && currentRank - 2 == otherPieceRank) {
                                capture = true;
                            };
                        }
                        if(team === otherPieceColor) {
                            if(currentFile - 1 == otherPieceFile && currentRank - 2 == otherPieceRank) {
                                ally = true;
                            };
                        }
                    })
                    if(!ally && !capture) {usableMoves.push([[currentFile - 1],[currentRank - 2]])}
                    if(capture) {usableMoves.push([[currentFile - 1],[currentRank - 2], "capture"])}
                }
            }
        }
        setAvailMoves(usableMoves);
        forceUpdate();
    }

    const makeGhosts = (availMoves = [], pieceType, initposition, team, recorded) => {
        determineMoves(type, currentFile, currentRank, recorded);
        const newGhosts = []
        availMoves.forEach((loc) => {
                let capture = false
                if(loc[2] === "capture") {
                    capture = true
                }
                const ghostPosition = `${files[loc[0][0]]}${ranks[loc[1][0]]}`
                newGhosts.push(<Ghost
                    recorded={pieceRecords}
                    capturing={capturing}
                    capture={capture}
                    team={team}
                    initposition={initposition}
                    move={move}
                    file={loc[0][0]}
                    rank={loc[1][0]}
                    position={ghostPosition}
                    type={pieceType}
                />)
        })
        setGhosts([newGhosts])
        return(ghosts);
    }

    const toggleActivePlayer = () => {
        if(activePlayer === "white") {
            setActivePlayer("black")
        } else if(activePlayer === "black") {
            setActivePlayer("white")
        }
    }


    const move = (newFile, newRank, newPosition) => {
        toggleActivePlayer()
        record(type, team, `${files[initFile]}${ranks[initRank]}`, newFile, newRank)
        setCurrentFile(newFile)
        setCurrentRank(newRank)
        setCurrentPosition(newPosition)
        setMoved(true)
        quickerMoved = true;
        setSelected(false)
        setSelection(false)
        determineMoves(type, newFile, newRank, recorded)
        setGhosts([])
    }

    const capturing = (newFile, newRank, newPosition) => {
        move(newFile, newRank, newPosition)
        capturePiece(newFile, newRank, newPosition, `${files[initFile]}${ranks[initRank]}`)
    }

    useEffect(() => {
        record(type, team, `${files[initFile]}${ranks[initRank]}`, currentFile, currentRank)
        setPieceRecords(recorded)
    },[]);

    useEffect(() => {
        if(pieceRecords !== recorded) {
            determineMoves(type, currentFile, currentRank, recorded);
        }
    })

    useEffect(() => {
        forceUpdate();
    },[recorded])

    return (
        <div className="game-board" style={{ gridColumn: "1 / span8", gridRow: "1 / span8"}}>
            {ghosts}
            <FontAwesomeIcon
            onClick={ activePlayer === team ? () => toggleSelected() : null }
            onMouseOver={ activePlayer === team ? () => handleHover() : null }
            onMouseOut={ activePlayer === team ? () => handleUnhover() : null }
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
