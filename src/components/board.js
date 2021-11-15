import React, { useEffect, useState } from 'react';
import Square from './Square';
import Piece from './pieces/piece';
import Ghost from './ghost';
import { faChessKing, faChessQueen, faChessRook, faChessBishop, faChessKnight, faChessPawn } from '@fortawesome/free-solid-svg-icons';

export default function Board (props) {

    const ranks = ["1","2","3","4","5","6","7","8"]
    const files = ["a","b","c","d","e","f","g","h"]
    const inPlay = []
    const [pieces, setPieces] = useState([]);
    const [ghosts, setGhosts] = useState([])


    const removeOld = (remove) => {
        inPlay.forEach((element, index, array) => {
            if(element[0].initFile === remove[0].initFile && element[0].initRank === remove[0].initRank) {
                array.splice(index, 1)
            }
        } )
    }

    const placeNew = (placed) => {
        inPlay.push(placed)
    }

    const move = (file, rank, position, initPosition, type, team) => {
        console.log("moved piece:", initPosition)
        console.log("moved to:", [file, rank])
        const newPieces = pieces
        console.log("new pieces:", inPlay)
        // newPieces.forEach((pc, idx, arr) => {
        //     if(pc.props.initFile === initPosition[0] && pc.props.initRank === initPosition[1]) {
        //         newPieces.splice(idx, 1);
        //         newPieces.push(<Piece type={type} pieces={pieces} makeGhosts={makeGhosts} removeOld={removeOld} placeNew={placeNew} key={`${files[initPosition[0]]}${ranks[initPosition[1]]}`} team={team} initFile={initPosition[0]} initRank={initPosition[1]} />)
        //     }
        // })
    }


    const makeGhosts = (availMoves = [], pieceType, initposition, team) => {
        const newGhosts = []
        console.log("moves for ghosts:", availMoves)
        availMoves.forEach((loc) => {
                console.log("move location:", loc)

                const ghostPosition = `${files[loc[0][0]]}${ranks[loc[1][0]]}`
                console.log("ghost position:", ghostPosition)
                newGhosts.push(<Ghost
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

    const makeSquares = () => {
        const squares = []
        for(let i=0; i<8; i++) {
            for(let j=0; j<8; j++) {
                let dark = "rgb(90, 90, 90)";
                let light = "rgb(175, 175, 175)";
                let rank = ranks[i];
                let file = files[j];
                let position = `${file}${rank}`;
                let squareColor;
                if((i + j + 2)%2 === 0) {
                    squareColor = dark;
                } else {
                    squareColor = light;
                }
                squares.push(
                    <Square
                    key={position}
                    squareColor={squareColor}
                    rank={rank}
                    file={file}
                    position={position}
                    />
                )
            }
        }
        return(squares);
    }

    const setBoard = () => {
        const setup = []
        for(let i=0; i<8; i++) {
            setup.push(
                <Piece type={faChessPawn} pieces={pieces} makeGhosts={makeGhosts} removeOld={removeOld} placeNew={placeNew} key={`${files[i]}2`} team="white" initFile={i} initRank={1} />
            );
            setup.push(
                <Piece type={faChessPawn} pieces={pieces} makeGhosts={makeGhosts} removeOld={removeOld} placeNew={placeNew} key={`${files[i]}7`} team="black" initFile={i} initRank={6} />
            );
        };
        setup.push(
            <Piece type={faChessRook} pieces={pieces} makeGhosts={makeGhosts} removeOld={removeOld} placeNew={placeNew} key="a8" team="black" initFile={0} initRank={7} />,
            <Piece type={faChessRook} pieces={pieces} makeGhosts={makeGhosts} removeOld={removeOld} placeNew={placeNew} key="h8" team="black" initFile={7} initRank={7} />,
            <Piece type={faChessRook} pieces={pieces} makeGhosts={makeGhosts} removeOld={removeOld} placeNew={placeNew} key="a1" team="white" initFile={0} initRank={0} />,
            <Piece type={faChessRook} pieces={pieces} makeGhosts={makeGhosts} removeOld={removeOld} placeNew={placeNew} key="h1" team="white" initFile={7} initRank={0} />,
            <Piece type={faChessKnight} pieces={pieces} makeGhosts={makeGhosts} removeOld={removeOld} placeNew={placeNew} key="b8" team="black" initFile={1} initRank={7} />,
            <Piece type={faChessKnight} pieces={pieces} makeGhosts={makeGhosts} removeOld={removeOld} placeNew={placeNew} key="g8" team="black" initFile={6} initRank={7} />,
            <Piece type={faChessKnight} pieces={pieces} makeGhosts={makeGhosts} removeOld={removeOld} placeNew={placeNew} key="b1" team="white" initFile={1} initRank={0} />,
            <Piece type={faChessKnight} pieces={pieces} makeGhosts={makeGhosts} removeOld={removeOld} placeNew={placeNew} key="g1" team="white" initFile={6} initRank={0} />,
            <Piece type={faChessBishop} pieces={pieces} makeGhosts={makeGhosts} removeOld={removeOld} placeNew={placeNew} key="c8" team="black" initFile={2} initRank={7} />,
            <Piece type={faChessBishop} pieces={pieces} makeGhosts={makeGhosts} removeOld={removeOld} placeNew={placeNew} key="f8" team="black" initFile={5} initRank={7} />,
            <Piece type={faChessBishop} pieces={pieces} makeGhosts={makeGhosts} removeOld={removeOld} placeNew={placeNew} key="c1" team="white" initFile={2} initRank={0} />,
            <Piece type={faChessBishop} pieces={pieces} makeGhosts={makeGhosts} removeOld={removeOld} placeNew={placeNew} key="f1" team="white" initFile={5} initRank={0} />,
            <Piece type={faChessKing} pieces={pieces} makeGhosts={makeGhosts} removeOld={removeOld} placeNew={placeNew} key="e8" team="black" initFile={4} initRank={7} />,
            <Piece type={faChessQueen} pieces={pieces} makeGhosts={makeGhosts} removeOld={removeOld} placeNew={placeNew} key="d8" team="black" initFile={3} initRank={7} />,
            <Piece type={faChessKing} pieces={pieces} makeGhosts={makeGhosts} removeOld={removeOld} placeNew={placeNew} key="e1" team="white" initFile={4} initRank={0} />,
            <Piece type={faChessQueen} pieces={pieces} makeGhosts={makeGhosts} removeOld={removeOld} placeNew={placeNew} key="d1" team="white" initFile={3} initRank={0} />,
        )
        setPieces([setup])
        console.log("Board has been set. Pieces:", setup)
    }

    useEffect(() => {

        setBoard();

    },[])

    return (
        <div onClick={() => console.log("pieces in play", pieces)} className="game-board-wrap">
            <div className="game-board">
                {ghosts}
                {pieces}
                {makeSquares()}
            </div>
        </div>
    )
}
