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
    const { castled, setCastled } = useContext(CurrentGameContext)

    const [ hover, setHover ] = useState(false);
    const [ currentPosition, setCurrentPosition ] = useState(`${files[initFile]}${ranks[initRank]}`)
    const [ currentRank, setCurrentRank ] = useState(initRank)
    const [ currentFile, setCurrentFile ] = useState(initFile)
    const [ moved, setMoved ] = useState(false)
    let quickerMoved = moved
    const [ checked, setChecked ] = useState(false)
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
                attacks.push([fileAttacked, rankAttacked, pc[2], pc[1]])
            })
        })
        setUnderAttack([attacks])
    }

    const checkSafety = (file, rank, color = team) => {
        const status = []
        if(underAttack[0] !== undefined) {
            const filtered = underAttack[0].filter(atk => atk[0] === file && atk[1] === rank && atk[3] !== color )
            if(filtered[0] !== undefined) {
                filtered.forEach((atk) => {
                    status.push(file, rank, "unsafe", atk)
                })
            } else {
                status.push(file, rank, "safe", filtered)
            }
        } else {
            status.push(file, rank, "safe", [])
        }
        return(status)
    }

    const determineMoves = (type, currentFile, currentRank, pieceArray) => {
        updateAttacks();
        const usableMoves = []
        const attacking = []
        const pawnMoves = []
        const kingMoves = []
        const friendlyFire = []
        const checkDirection = (vert, horiz, dist = 7, pawn = false, castle = false, king = false) => {
            for(let i = 1; i < (dist + 1); i++) {
                let horizontal = currentFile;
                let vertical = currentRank;
                let ally = false
                let capture = false
                if(!castle) {
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
                    if(king) {
                        if(!ally) {
                            kingMoves.push([[horizontal], [vertical]])
                            if(capture && checkSafety(horizontal, vertical)[2] === "safe") {
                                usableMoves.push([[horizontal], [vertical], "capture"])
                                break
                            } else if(checkSafety(horizontal, vertical)[2] === 'safe') {
                                usableMoves.push([[horizontal], [vertical]])
                            }
                        } else if(ally) {
                            friendlyFire.push([[horizontal], [vertical]])
                            break
                        }
                    }
                    if(!ally && !king) {
                        if(capture && pawn && horizontal === currentFile) {
                            //pawn moving straight up
                            break
                        } else if(capture && !king) {
                            usableMoves.push([[horizontal], [vertical], "capture"])
                            pawnMoves.push([[horizontal], [vertical], "capture"])
                            break
                        } else if(pawn && horizontal !== currentFile) {
                            pawnMoves.push([[horizontal], [vertical]])
                            break
                        } else if (!king) {
                            usableMoves.push([[horizontal], [vertical]])
                        }
                    } else if(ally) {
                        friendlyFire.push([[horizontal], [vertical]])
                        break
                    }
                } else if(castle) {
                        vertical = (currentRank)
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
                    })
                    if(!ally) {
                        if(horizontal === currentFile + 1 || horizontal === currentFile - 1) {
                            null
                        } else if(horizontal === currentFile + 2 || horizontal == currentFile - 2) {
                            usableMoves.push([[horizontal], [vertical], "castle"])
                        }
                    } else if(ally) {
                        break
                    }
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
            checkDirection("up", "right", 1, false, false, true)
            checkDirection("up", "left", 1, false, false, true)
            checkDirection("up", null, 1, false, false, true)
            checkDirection("down", "right", 1, false, false, true)
            checkDirection("down", "left", 1, false, false, true)
            checkDirection("down", null, 1, false, false, true)
            checkDirection(null, "right", 1, false, false, true)
            checkDirection(null, "left", 1, false, false, true)
            if(!moved && !quickerMoved) {
                if(team === "white") {
                    const a1rook = pieceArray.filter(item => item[2] === "a1");
                    const h1rook = pieceArray.filter(item => item[2] === "h1");
                    if(a1rook[0] !== undefined) {
                        if(!a1rook[0][5]) {
                            const castleZone = [[0,0],[1,0],[2,0],[3,0],[4,0]]
                            const safeZone = []
                            const dangerZone = []
                            castleZone.forEach((loc) => {
                                const status = checkSafety(loc[0],loc[1]);
                                if(status[2] === "safe") {safeZone.push([status[0], status[1]])}
                                else if(status[2] === "unsafe") {dangerZone.push([status[0], status[1]])}
                            })
                            if(castleZone.length === safeZone.length && dangerZone[0] === undefined) {
                                checkDirection(null, "left", 2, false, true, false)
                            }
                        }
                    }
                    if(h1rook[0] !== undefined) {
                        if(!h1rook[0][5]) {
                            const castleZone = [[4,0],[5,0],[6,0],[7,0]]
                            const safeZone = []
                            const dangerZone = []
                            castleZone.forEach((loc) => {
                                const status = checkSafety(loc[0],loc[1]);
                                if(status[2] === "safe") {safeZone.push([status[0], status[1]])}
                                else if(status[2] === "unsafe") {dangerZone.push([status[0], status[1]])}
                            })
                            if(castleZone.length === safeZone.length && dangerZone[0] === undefined) {
                                checkDirection(null, "right", 2, false, true, false)
                            }
                        }
                    }
                } else if(team === "black") {
                    const a8rook = pieceArray.filter(item => item[2] === "a8");
                    const h8rook = pieceArray.filter(item => item[2] === "h8");
                    if(a8rook[0] !== undefined) {
                        if(!a8rook[0][5]) {
                            const castleZone = [[0,7],[1,7],[2,7],[3,7],[4,7]]
                            const safeZone = []
                            const dangerZone = []
                            castleZone.forEach((loc) => {
                                const status = checkSafety(loc[0],loc[1]);
                                if(status[2] === "safe") {safeZone.push([status[0], status[1]])}
                                else if(status[2] === "unsafe") {dangerZone.push([status[0], status[1]])}
                            })
                            if(castleZone.length === safeZone.length && dangerZone[0] === undefined) {
                                checkDirection(null, "left", 2, false, true, false)
                            }
                        }
                    }
                    if(h8rook[0] !== undefined) {
                        if(!h8rook[0][5]) {
                            const castleZone = [[4,7],[5,7],[6,7],[7,7]]
                            const safeZone = []
                            const dangerZone = []
                            castleZone.forEach((loc) => {
                                const status = checkSafety(loc[0],loc[1]);
                                if(status[2] === "safe") {safeZone.push([status[0], status[1]])}
                                else if(status[2] === "unsafe") {dangerZone.push([status[0], status[1]])}
                            })
                            if(castleZone.length === safeZone.length && dangerZone[0] === undefined) {
                                checkDirection(null, "right", 2, false, true, false)
                            }
                        }
                    }
                }
            }
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
                    if(ally) {friendlyFire.push([[currentFile + 2],[currentRank + 1]])}
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
                    if(ally) {friendlyFire.push([[currentFile + 2],[currentRank - 1]])}
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
                    if(ally) {friendlyFire.push([[currentFile - 2],[currentRank + 1]])}
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
                    if(ally) {friendlyFire.push([[currentFile - 2],[currentRank - 1]])}
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
                    if(ally) {friendlyFire.push([[currentFile + 1],[currentRank + 2]])}
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
                    if(ally) {friendlyFire.push([[currentFile + 1],[currentRank - 2]])}
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
                    if(ally) {friendlyFire.push([[currentFile - 1],[currentRank + 2]])}
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
                    if(ally) {friendlyFire.push([[currentFile - 1],[currentRank - 2]])}
                }
            }
        }
        if(type === faChessPawn) {
            pawnMoves.forEach((mv) => {
                attacking.push(mv)
            })
            friendlyFire.forEach((mv) => {
                attacking.push(mv)
            })
            record(type, team, `${files[initFile]}${ranks[initRank]}`, currentFile, currentRank, quickerMoved, attacking)
        }else if(type === faChessKing) {
            friendlyFire.forEach((mv) => {
                attacking.push(mv)
            })
            usableMoves.forEach((mv) => {
                attacking.push(mv)
            })
            record(type, team, `${files[initFile]}${ranks[initRank]}`, currentFile, currentRank, quickerMoved, attacking)
        } else {
            friendlyFire.forEach((mv) => {
                attacking.push(mv)
            })
            usableMoves.forEach((mv) => {
                attacking.push(mv)
            })
            record(type, team, `${files[initFile]}${ranks[initRank]}`, currentFile, currentRank, quickerMoved, attacking)
        }
        setAvailMoves(usableMoves);
        updateAttacks();
    }

    const makeGhosts = (availMoves = [], pieceType, initposition, team, locations) => {
        determineMoves(type, currentFile, currentRank, locations);
        const newGhosts = []
        availMoves.forEach((loc) => {
                let capture = false
                let castle = false
                if(loc[2] === "capture") {
                    capture = true
                }
                if(loc[2] === "castle") {
                    castle = true
                }
                const ghostPosition = `${files[loc[0][0]]}${ranks[loc[1][0]]}`
                newGhosts.push(<Ghost
                    capturing={capturing}
                    capture={capture}
                    castling={castling}
                    castle={castle}
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

    const castling = (newFile, newRank, newPosition) => {
        move(newFile, newRank, newPosition)
        if(newPosition === "g1") {
            castled.push("h1")
        } else if(newPosition === "c1") {
            castled.push("a1")
        } else if(newPosition === "g8") {
            castled.push("h8")
        } else if(newPosition === "c8") {
            castled.push("a8")
        }
        moveRook();
    }

    const moveRook = () => {
        if(type === faChessRook && !quickerMoved && !moved) {
            castled.forEach((instance) => {
                if(instance === `${files[initFile]}${ranks[initRank]}`) {
                    if(instance === "a1") {
                        setCurrentFile(3)
                        setCurrentPosition(`${files[3]}${ranks[0]}`)
                        setMoved(true)
                        quickerMoved = true;
                        determineMoves(type, 3, 0, locations)
                    }
                    if(instance === "h1") {
                        setCurrentFile(5)
                        setCurrentPosition(`${files[5]}${ranks[0]}`)
                        setMoved(true)
                        quickerMoved = true;
                        determineMoves(type, 5, 0, locations)
                    }
                    if(instance === "a8") {
                        setCurrentFile(3)
                        setCurrentPosition(`${files[3]}${ranks[7]}`)
                        setMoved(true)
                        quickerMoved = true;
                        determineMoves(type, 3, 7, locations)
                    }
                    if(instance === "h8") {
                        setCurrentFile(5)
                        setCurrentPosition(`${files[5]}${ranks[7]}`)
                        setMoved(true)
                        quickerMoved = true;
                        determineMoves(type, 5, 7, locations)
                    }
                }
            })
        }
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
        if(locations.length + taken.length > 31 && checked === false ) {
            moveRook()
            determineMoves(type, currentFile, currentRank, locations);
            updateAttacks();
            setChecked(true)
        }
    })

    useEffect(() => {
        determineMoves(type, currentFile, currentRank, locations);
        updateAttacks();
        setChecked(false)
    },[]);

    useEffect(() => {
        determineMoves(type, currentFile, currentRank, locations);
        setChecked(false)
    },[activePlayer])

    return (
        <div className={ activePlayer === "white" ? "normal-game-board game-board" : "reversed-game-board game-board"} style={{ gridColumn: "1 / span8", gridRow: "1 / span8"}}>
            {ghosts}
            <div
            onClick={ activePlayer === team ? () => toggleSelected() : null }
            onMouseOver={ activePlayer === team ? () => handleHover() : null }
            onMouseOut={ activePlayer === team ? () => handleUnhover() : null }
            className={ hover ? ( selected ? "hovered-piece selected-piece chess-piece" : "hovered-piece chess-piece" ) : selected ? "selected-piece chess-piece" : "chess-piece" }
            style={{
                gridArea: currentPosition,
                color: team,
                }}>
                <FontAwesomeIcon
                icon={ type }
                />
            </div>
        </div>
    )
}
