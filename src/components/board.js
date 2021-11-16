import React, { useEffect, useState } from 'react';
import Square from './Square';
import Piece from './pieces/piece';
import { faChessKing, faChessQueen, faChessRook, faChessBishop, faChessKnight, faChessPawn } from '@fortawesome/free-solid-svg-icons';

export default function Board (props) {

    const ranks = ["1","2","3","4","5","6","7","8"]
    const files = ["a","b","c","d","e","f","g","h"]
    let [pieces, setPieces] = useState([]);
    const recorded = []
    const setup = []
    const [selectedPiece, setSelectedPiece] = useState([]);

    const record = (type, team, initPosition, currentFile, currentRank) => {
        recorded.forEach((pc, idx) => {
            if(pc[2] === initPosition) {
                recorded.splice(idx, 1)
            }
        })
        recorded.push([type, team, initPosition, currentFile, currentRank])
        console.log(recorded)
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

    const select = (initRank, initFile) => {
        setSelectedPiece(initRank, initFile)
    }

    const setBoard = () => {
        for(let i=0; i<8; i++) {
            setup.push(
                <Piece record={record} select={select} type={faChessPawn} recorded={recorded} key={`${files[i]}2`} team="white" initFile={i} initRank={1} />
            );
            setup.push(
                <Piece record={record} select={select} type={faChessPawn} recorded={recorded} key={`${files[i]}7`} team="black" initFile={i} initRank={6} />
            );
        };
        setup.push(
            <Piece record={record} select={select} type={faChessRook} recorded={recorded} key="a8" team="black" initFile={0} initRank={7} />,
            <Piece record={record} select={select} type={faChessRook} recorded={recorded} key="h8" team="black" initFile={7} initRank={7} />,
            <Piece record={record} select={select} type={faChessRook} recorded={recorded} key="a1" team="white" initFile={0} initRank={0} />,
            <Piece record={record} select={select} type={faChessRook} recorded={recorded} key="h1" team="white" initFile={7} initRank={0} />,
            <Piece record={record} select={select} type={faChessKnight} recorded={recorded} key="b8" team="black" initFile={1} initRank={7} />,
            <Piece record={record} select={select} type={faChessKnight} recorded={recorded} key="g8" team="black" initFile={6} initRank={7} />,
            <Piece record={record} select={select} type={faChessKnight} recorded={recorded} key="b1" team="white" initFile={1} initRank={0} />,
            <Piece record={record} select={select} type={faChessKnight} recorded={recorded} key="g1" team="white" initFile={6} initRank={0} />,
            <Piece record={record} select={select} type={faChessBishop} recorded={recorded} key="c8" team="black" initFile={2} initRank={7} />,
            <Piece record={record} select={select} type={faChessBishop} recorded={recorded} key="f8" team="black" initFile={5} initRank={7} />,
            <Piece record={record} select={select} type={faChessBishop} recorded={recorded} key="c1" team="white" initFile={2} initRank={0} />,
            <Piece record={record} select={select} type={faChessBishop} recorded={recorded} key="f1" team="white" initFile={5} initRank={0} />,
            <Piece record={record} select={select} type={faChessKing} recorded={recorded} key="e8" team="black" initFile={4} initRank={7} />,
            <Piece record={record} select={select} type={faChessQueen} recorded={recorded} key="d8" team="black" initFile={3} initRank={7} />,
            <Piece record={record} select={select} type={faChessKing} recorded={recorded} key="e1" team="white" initFile={4} initRank={0} />,
            <Piece record={record} select={select} type={faChessQueen} recorded={recorded} key="d1" team="white" initFile={3} initRank={0} />,
            )
            setPieces(setup)
    }

    useEffect(() => {

    }, [recorded])

    return (
        <div className="game-board-wrap">
            { !pieces[0] ? <button onClick={() => setBoard()}>Set Board</button> : null }
            <div className="game-board">
                {pieces}
                {makeSquares()}
            </div>
        </div>
    )
}
