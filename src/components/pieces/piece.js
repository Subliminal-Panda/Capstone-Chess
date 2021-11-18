import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessKing, faChessQueen, faChessRook, faChessBishop, faChessKnight, faChessPawn } from '@fortawesome/free-solid-svg-icons';
import Ghost from '../ghost';
import CurrentGameContext from '../currentGame';

export default function Piece (props) {

    const ranks = ["1","2","3","4","5","6","7","8"]
    const files = ["a","b","c","d","e","f","g","h"]

    const { initRank, initFile, team, type } = props;

    const { activePlayer, setActivePlayer } = useContext(CurrentGameContext)
    const { selection, setSelection } = useContext(CurrentGameContext)
    const { pieces, setPieces } = useContext(CurrentGameContext)
    const { locations, setLocations } = useContext(CurrentGameContext)
    const { taken, setTaken } = useContext(CurrentGameContext)
    const { underAttack, setUnderAttack } = useContext(CurrentGameContext)

    const [ hover, setHover ] = useState(false);
    const [ currentPosition, setCurrentPosition ] = useState(`${files[initFile]}${ranks[initRank]}`)
    const [ currentRank, setCurrentRank ] = useState(initRank)
    const [ currentFile, setCurrentFile ] = useState(initFile)
    const [ moved, setMoved ] = useState(false)
    let quickerMoved = moved
    const [ availMoves, setAvailMoves ] = useState([]);
    const [ selected, setSelected ] = useState(false);
    const [ ghosts, setGhosts ] = useState([])

    const record = (type, team, initPosition, currentFile, currentRank, moved, attacking) => {
        locations.forEach((pc, idx) => {
            if(pc[2] === initPosition) {
                locations.splice(idx, 1)
            }
        })
        locations.push([type, team, initPosition, currentFile, currentRank, moved, attacking])
        updateAttacks();
    }

    const handleHover = () => {
        if(!selection) {
            determineMoves(type, currentFile, currentRank, locations);
            if(availMoves[0] !== undefined) {
                setHover(true)
                makeGhosts(availMoves, type, [initFile, initRank], team, locations)
            }
        }
    }

    const handleUnhover = () => {
        setHover(false)
        { !selected ? setGhosts([]) : null };
    }

    const toggleSelected = () => {
        if(!selection) {

            determineMoves(type, currentFile, currentRank, locations);
            if(!selected) {
                setSelected(true)
                setSelection(true)
            }
        }
            if(selected) {
                setSelected(false)
                setSelection(false)
            }
    }

    const updateAttacks = () => {
        let attackingAny = locations.filter(item => item[6][0])
        let attacks = []
        attackingAny.forEach((pc) => {
            pc[6].forEach((atk) => {
                let fileAttacked = atk[0][0]
                let rankAttacked = atk[1][0]
                attacks.push([fileAttacked, rankAttacked, pc[2]])
            })
        })
        setUnderAttack([attacks])
    }



    const determineMoves = (type, currentFile, currentRank, pieceArray) => {
        updateAttacks();
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
            // if(!moved && !quickerMoved) {
            //     if(team === "white") {
            //         const a1rook = pieceArray.filter(item => item[2] === "a1");
            //         const h1rook = pieceArray.filter(item => item[2] === "h1");
            //         const surroundings = [[0,0],[1,0],[2,0],[3,0],[4,0]]
            //         const filterAtk = (file, rank) => {
            //             const filtered = underAttack.filter(atk => atk[0] === file && atk[1] === rank)
            //             return filtered
            //         }
            //         surroundings.forEach((sq, idx, arr) => {
            //             if(filterAtk(sq[0], sq[1], team)[0] != undefined) {
            //                 console.log("under attack:", filterAtk(sq[0], sq[1], team))
            //             }
            //         })
            //         if(!a1rook[0][5]) {
            //         }
            //         if(!h1rook[0][5]) {
            //         }
            //     } else if(team === "black") {
            //         const a8rook = pieceArray.filter(item => item[2] === "a8");
            //         const h8rook = pieceArray.filter(item => item[2] === "h8");
            //         if(!a8rook[0][5]) {
            //         }
            //         if(!h8rook[0][5]) {
            //         }
            //     }
            // }
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
        record(type, team, `${files[initFile]}${ranks[initRank]}`, currentFile, currentRank, quickerMoved, usableMoves)
        setAvailMoves(usableMoves);
        updateAttacks();
    }

    const makeGhosts = (availMoves = [], pieceType, initposition, team, locations) => {
        determineMoves(type, currentFile, currentRank, locations);
        const newGhosts = []
        availMoves.forEach((loc) => {
                let capture = false
                if(loc[2] === "capture") {
                    capture = true
                }
                const ghostPosition = `${files[loc[0][0]]}${ranks[loc[1][0]]}`
                newGhosts.push(<Ghost
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
        setCurrentFile(newFile)
        setCurrentRank(newRank)
        setCurrentPosition(newPosition)
        setMoved(true)
        quickerMoved = true;
        setSelected(false)
        setSelection(false)
        determineMoves(type, newFile, newRank, locations)
        setGhosts([])
    }

    const capturing = (newFile, newRank, newPosition) => {
        move(newFile, newRank, newPosition)
        capturePiece(newFile, newRank, `${files[initFile]}${ranks[initRank]}`)
    }

    const capturePiece =  (file, rank, attacker) => {
        let attacked = []
        locations.forEach((pc, idx) => {
            if(pc[3] === file && pc[4] === rank && pc[2] !== attacker) {
                attacked = pc
                locations.splice(idx, 1)
                taken.push(attacked)
                setPieces([pieces[0].filter(item => item.key !== attacked[2])])
            }
        })
    }


    useEffect(() => {
        determineMoves(type, currentFile, currentRank, locations);
        updateAttacks();
    },[]);

    useEffect(() => {
        determineMoves(type, currentFile, currentRank, locations);
    },[locations])

    return (
        <div className={ activePlayer === "white" ? "normal-game-board game-board" : "reversed-game-board game-board"} style={{ gridColumn: "1 / span8", gridRow: "1 / span8"}}>
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
