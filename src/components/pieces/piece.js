import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessKing, faChessQueen, faChessRook, faChessBishop, faChessKnight, faChessPawn } from '@fortawesome/free-solid-svg-icons';
import Ghost from '../ghost';

export default function Piece (props) {

    const ranks = ["1","2","3","4","5","6","7","8"]
    const files = ["a","b","c","d","e","f","g","h"]

    const { initRank, initFile, team, type, recorded, select, record } = props;

    const [ hover, setHover ] = useState(false);
    const [ currentPosition, setCurrentPosition ] = useState(`${files[initFile]}${ranks[initRank]}`)
    const [ currentRank, setCurrentRank ] = useState(initRank)
    const [ currentFile, setCurrentFile ] = useState(initFile)
    const [ moved, setMoved ] = useState(false)
    let quickerMoved = moved
    const [ availMoves, setAvailMoves ] = useState([]);
    const [ selected, setSelected ] = useState(false);
    const [ ghosts, setGhosts ] = useState([])
    const [ records, setRecords ] = useState(recorded)

    const handleHover = () => {
        determineMoves(type, currentFile, currentRank, records);
        setHover(true)
        console.log("piece's records:", records)
        makeGhosts(availMoves, type, [initFile, initRank], team, records)
    }

    const handleUnhover = () => {
        setHover(false)
        { !selected ? setGhosts([]) : null };
    }

    const toggleSelected = () => {
        console.log("piece's records:", records)
        if(!selected) {
            setSelected(true)
            select(initRank, initFile)
        } else if(selected) {
            setSelected(false)
        }
    }


    const determineMoves = (type, currentFile, currentRank, records) => {
        const usableMoves = []
        const checkDirection = (vert, horiz, dist = 7) => {
            for(let i = 1; i < (dist + 1); i++) {
                let horizontal = currentFile;
                let vertical = currentRank;
                let teammate = false
                let takeable = false
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
                records.forEach((rec) => {
                    let otherPieceFile = rec[3]
                    let otherPieceRank = rec[4]
                    let otherPieceColor = rec[1]
                    if(team === otherPieceColor) {
                        if(horizontal == otherPieceFile && vertical == otherPieceRank) {
                            teammate = true;
                        };
                    }
                    if(horizontal == otherPieceFile && vertical == otherPieceRank) {
                        takeable = true;
                    };
                })
                if(!teammate) {
                    usableMoves.push([[horizontal], [vertical]])
                    if(takeable) {
                        break
                    }
                } else {
                    break
                }
            }
        }
        if(type === faChessPawn) {
            if(team === "white" && currentRank < 7) {
                { !quickerMoved ? checkDirection("up", null, 2) : checkDirection("up", null, 1) }
            } else if(team === "black" && currentRank > 0) {
                { !quickerMoved ? checkDirection("down", null, 2) : checkDirection("down", null, 1) }
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
                    let teammate = false;
                    let takeable = false;
                    records.forEach((rec) => {
                        let otherPieceFile = rec[3]
                        let otherPieceRank = rec[4]
                        let otherPieceColor = rec[1]
                        if(team !== otherPieceColor) {
                            if(currentFile + 2 == otherPieceFile && currentRank + 1 == otherPieceRank) {
                                takeable = true;
                            };
                        }
                        if(team === otherPieceColor) {
                            if(currentFile + 2 == otherPieceFile && currentRank + 1 == otherPieceRank) {
                                teammate = true;
                            };
                        }
                    })
                    if(!teammate || takeable) {usableMoves.push([[currentFile + 2],[currentRank + 1]])}
                }
                if(currentRank - 1 >= 0) {
                    let teammate = false;
                    let takeable = false;
                    records.forEach((rec) => {
                        let otherPieceFile = rec[3]
                        let otherPieceRank = rec[4]
                        let otherPieceColor = rec[1]
                        if(team !== otherPieceColor) {
                            if(currentFile + 2 == otherPieceFile && currentRank - 1 == otherPieceRank) {
                                takeable = true;
                            };
                        }
                        if(team === otherPieceColor) {

                            if(currentFile + 2 == otherPieceFile && currentRank - 1 == otherPieceRank) {
                                teammate = true;
                            };
                        }
                    })
                    if(!teammate || takeable) {usableMoves.push([[currentFile + 2],[currentRank - 1]])}
                }
            }
            if(currentFile - 2 >= 0){
                if(currentRank + 1 < 8) {
                    let teammate = false;
                    let takeable = false;
                    records.forEach((rec) => {
                        let otherPieceFile = rec[3]
                        let otherPieceRank = rec[4]
                        let otherPieceColor = rec[1]
                        if(team !== otherPieceColor) {
                            if(currentFile - 2 == otherPieceFile && currentRank + 1 == otherPieceRank) {
                                takeable = true;
                            };
                        }
                        if(team === otherPieceColor) {
                            if(currentFile - 2 == otherPieceFile && currentRank + 1 == otherPieceRank) {
                                teammate = true;
                            };
                        }
                    })
                    if(!teammate || takeable) {usableMoves.push([[currentFile - 2],[currentRank + 1]])}
                }
                if(currentRank - 1 >= 0) {
                    let teammate = false;
                    let takeable = false;
                    records.forEach((rec) => {
                        let otherPieceFile = rec[3]
                        let otherPieceRank = rec[4]
                        let otherPieceColor = rec[1]
                        if(team !== otherPieceColor) {
                            if(currentFile - 2 == otherPieceFile && currentRank - 1 == otherPieceRank) {
                                takeable = true;
                            };
                        }
                        if(team === otherPieceColor) {
                            if(currentFile - 2 == otherPieceFile && currentRank - 1 == otherPieceRank) {
                                teammate = true;
                            };
                        }
                    })
                    if(!teammate || takeable) {usableMoves.push([[currentFile - 2],[currentRank - 1]])}
                }
            }
            if(currentFile + 1 < 8){
                if(currentRank + 2 < 8) {
                    let teammate = false;
                    let takeable = false;
                    records.forEach((rec) => {
                        let otherPieceFile = rec[3]
                        let otherPieceRank = rec[4]
                        let otherPieceColor = rec[1]
                        if(team !== otherPieceColor) {
                            if(currentFile + 1 == otherPieceFile && currentRank + 2 == otherPieceRank) {
                                takeable = true;
                            };
                        }
                        if(team === otherPieceColor) {
                            if(currentFile + 1 == otherPieceFile && currentRank + 2 == otherPieceRank) {
                                teammate = true;
                            };
                        }
                    })
                    if(!teammate || takeable) {usableMoves.push([[currentFile + 1],[currentRank + 2]])}
                }
                if(currentRank - 2 >= 0) {
                    let teammate = false;
                    let takeable = false;
                    records.forEach((rec) => {
                        let otherPieceFile = rec[3]
                        let otherPieceRank = rec[4]
                        let otherPieceColor = rec[1]
                        if(team !== otherPieceColor) {
                            if(currentFile + 1 == otherPieceFile && currentRank -2 == otherPieceRank) {
                                takeable = true;
                            };
                        }
                        if(team === otherPieceColor) {
                            if(currentFile + 1 == otherPieceFile && currentRank - 2 == otherPieceRank) {
                                teammate = true;
                            };
                        }
                    })
                    if(!teammate || takeable) {usableMoves.push([[currentFile + 1],[currentRank - 2]])}
                }
            }
            if(currentFile - 1 >= 0){
                if(currentRank + 2 < 8) {
                    let teammate = false;
                    let takeable = false;
                    records.forEach((rec) => {
                        let otherPieceFile = rec[3]
                        let otherPieceRank = rec[4]
                        let otherPieceColor = rec[1]
                        if(team !== otherPieceColor) {
                            if(currentFile - 1 == otherPieceFile && currentRank + 2 == otherPieceRank) {
                                takeable = true;
                            };
                        }
                        if(team === otherPieceColor) {
                            if(currentFile - 1 == otherPieceFile && currentRank + 2 == otherPieceRank) {
                                teammate = true;
                            };
                        }
                    })
                    if(!teammate || takeable) {usableMoves.push([[currentFile - 1],[currentRank + 2]])}
                }
                if(currentRank - 2 >= 0) {
                    let teammate = false;
                    let takeable = false;
                    records.forEach((rec) => {
                        let otherPieceFile = rec[3]
                        let otherPieceRank = rec[4]
                        let otherPieceColor = rec[1]
                        if(team !== otherPieceColor) {
                            if(currentFile - 1 == otherPieceFile && currentRank - 2 == otherPieceRank) {
                                takeable = true;
                            };
                        }
                        if(team === otherPieceColor) {
                            if(currentFile - 1 == otherPieceFile && currentRank - 2 == otherPieceRank) {
                                teammate = true;
                            };
                        }
                    })
                    if(!teammate || takeable) {usableMoves.push([[currentFile - 1],[currentRank - 2]])}
                }
            }
        }
        setAvailMoves(usableMoves)
    }

    const makeGhosts = (availMoves = [], pieceType, initposition, team, records) => {
        determineMoves(type, currentFile, currentRank, records);
        const newGhosts = []
        availMoves.forEach((loc) => {

                const ghostPosition = `${files[loc[0][0]]}${ranks[loc[1][0]]}`
                newGhosts.push(<Ghost
                    recorded={records}
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

    useEffect(() => {
        record(type, team, `${files[initFile]}${ranks[initRank]}`, currentFile, currentRank)
    },[]);

    const move = (newFile, newRank, newPosition) => {
        setMoved(true)
        quickerMoved = true;
        setCurrentFile(newFile)
        setCurrentRank(newRank)
        setCurrentPosition(newPosition)
        setSelected(false)
        determineMoves(type, newFile, newRank, records)
        setGhosts([])
        record(type, team, `${files[initFile]}${ranks[initRank]}`, newFile, newRank)
    }

    useEffect(() => {
        setRecords(recorded)
      }, [recorded])


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
