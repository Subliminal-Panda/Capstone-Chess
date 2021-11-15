import React, { useEffect, useState } from 'react';
import Square from './Square';
import Piece from './pieces/piece';
import { faChessKing, faChessQueen, faChessRook, faChessBishop, faChessKnight, faChessPawn } from '@fortawesome/free-solid-svg-icons';

export default function Board (props) {

    const ranks = ["1","2","3","4","5","6","7","8"]
    const files = ["a","b","c","d","e","f","g","h"]
    const [pieces, setPieces] = useState([]);
    const setup = []
    const [selectedPiece, setSelectedPiece] = useState([]);

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

    const select = (initRank, initFile) => {
        setSelectedPiece(initRank, initFile)
    }

    const setBoard = () => {
        for(let i=0; i<8; i++) {
            setup.push(
                <Piece select={select} type={faChessPawn} pieces={pieces} key={`${files[i]}2`} team="white" initFile={i} initRank={1} />
            );
            setup.push(
                <Piece select={select} type={faChessPawn} pieces={pieces} key={`${files[i]}7`} team="black" initFile={i} initRank={6} />
            );
        };
        setup.push(
            <Piece select={select} type={faChessRook} pieces={pieces} key="a8" team="black" initFile={0} initRank={7} />,
            <Piece select={select} type={faChessRook} pieces={pieces} key="h8" team="black" initFile={7} initRank={7} />,
            <Piece select={select} type={faChessRook} pieces={pieces} key="a1" team="white" initFile={0} initRank={0} />,
            <Piece select={select} type={faChessRook} pieces={pieces} key="h1" team="white" initFile={7} initRank={0} />,
            <Piece select={select} type={faChessKnight} pieces={pieces} key="b8" team="black" initFile={1} initRank={7} />,
            <Piece select={select} type={faChessKnight} pieces={pieces} key="g8" team="black" initFile={6} initRank={7} />,
            <Piece select={select} type={faChessKnight} pieces={pieces} key="b1" team="white" initFile={1} initRank={0} />,
            <Piece select={select} type={faChessKnight} pieces={pieces} key="g1" team="white" initFile={6} initRank={0} />,
            <Piece select={select} type={faChessBishop} pieces={pieces} key="c8" team="black" initFile={2} initRank={7} />,
            <Piece select={select} type={faChessBishop} pieces={pieces} key="f8" team="black" initFile={5} initRank={7} />,
            <Piece select={select} type={faChessBishop} pieces={pieces} key="c1" team="white" initFile={2} initRank={0} />,
            <Piece select={select} type={faChessBishop} pieces={pieces} key="f1" team="white" initFile={5} initRank={0} />,
            <Piece select={select} type={faChessKing} pieces={pieces} key="e8" team="black" initFile={4} initRank={7} />,
            <Piece select={select} type={faChessQueen} pieces={pieces} key="d8" team="black" initFile={3} initRank={7} />,
            <Piece select={select} type={faChessKing} pieces={pieces} key="e1" team="white" initFile={4} initRank={0} />,
            <Piece select={select} type={faChessQueen} pieces={pieces} key="d1" team="white" initFile={3} initRank={0} />,
        )
        setPieces(setup)
    }

    useEffect(() => {
    }, [pieces])

    return (
        <div onClick={() => console.log("pieces in play", pieces)} className="game-board-wrap">
            { !pieces[0] ? <button onClick={() => setBoard()}>Set Board</button> : null }
            <div className="game-board">
                {pieces}
                {makeSquares()}
            </div>
        </div>
    )
}
