import React, { useEffect, useState, useReducer } from 'react';
import Square from './Square';
import Piece from './pieces/piece';
import { faChessKing, faChessQueen, faChessRook, faChessBishop, faChessKnight, faChessPawn } from '@fortawesome/free-solid-svg-icons';
import useForceUpdate from 'use-force-update';

export default function Board (props) {

    const ranks = ["1","2","3","4","5","6","7","8"]
    const files = ["a","b","c","d","e","f","g","h"]
    const [pieces, setPieces] = useState([]);
    const boardRecords = []
    const [ onturn, setOnTurn ] = useState("white")
    let setup = []
    let taken = []
    const [selectedPiece, setSelectedPiece] = useState([]);

    const forceUpdate = useForceUpdate();

    const record = (type, team, initPosition, currentFile, currentRank) => {
        boardRecords.forEach((pc, idx) => {
            if(pc[2] === initPosition) {
                boardRecords.splice(idx, 1)
            }
        })
        boardRecords.push([type, team, initPosition, currentFile, currentRank])
        console.log("board records updated:", boardRecords)
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

    const takeTurn = () => {}

    const select = (initRank, initFile) => {
        setSelectedPiece(initRank, initFile)
    }

    const capturePiece =  (file, rank, position, attacker) => {
        console.clear()
        let attacked = []
        boardRecords.forEach((pc, idx) => {
            if(pc[3] === file && pc[4] === rank && pc[2] !== attacker) {
                attacked = pc
                boardRecords.splice(idx, 1)
            }
        })
        console.log("attacked:", attacked)
        setup.forEach((pce, idxe) => {
            if(pce.key === attacked[2]) {
                setup = setup.filter(item => item.key !== attacked[2])
                taken.push(pce)
                console.log("taken:", taken)
                setPieces([setup])
            }
        })
    }

    const setBoard = () => {
        for(let i=0; i<8; i++) {
            setup.push(
                <Piece takeTurn={takeTurn} capturePiece={capturePiece} record={record} select={select} type={faChessPawn} recorded={boardRecords} key={`${files[i]}2`} team="white" initFile={i} initRank={1} inPlay={true} />
            );
            setup.push(
                <Piece takeTurn={takeTurn} capturePiece={capturePiece} record={record} select={select} type={faChessPawn} recorded={boardRecords} key={`${files[i]}7`} team="black" initFile={i} initRank={6} inPlay={true} />
            );
        };
        setup.push(
            <Piece takeTurn={takeTurn} capturePiece={capturePiece} record={record} select={select} type={faChessRook} recorded={boardRecords} key="a8" team="black" initFile={0} initRank={7} inPlay={true} />,
            <Piece takeTurn={takeTurn} capturePiece={capturePiece} record={record} select={select} type={faChessRook} recorded={boardRecords} key="h8" team="black" initFile={7} initRank={7} inPlay={true} />,
            <Piece takeTurn={takeTurn} capturePiece={capturePiece} record={record} select={select} type={faChessRook} recorded={boardRecords} key="a1" team="white" initFile={0} initRank={0} inPlay={true} />,
            <Piece takeTurn={takeTurn} capturePiece={capturePiece} record={record} select={select} type={faChessRook} recorded={boardRecords} key="h1" team="white" initFile={7} initRank={0} inPlay={true} />,
            <Piece takeTurn={takeTurn} capturePiece={capturePiece} record={record} select={select} type={faChessKnight} recorded={boardRecords} key="b8" team="black" initFile={1} initRank={7} inPlay={true} />,
            <Piece takeTurn={takeTurn} capturePiece={capturePiece} record={record} select={select} type={faChessKnight} recorded={boardRecords} key="g8" team="black" initFile={6} initRank={7} inPlay={true} />,
            <Piece takeTurn={takeTurn} capturePiece={capturePiece} record={record} select={select} type={faChessKnight} recorded={boardRecords} key="b1" team="white" initFile={1} initRank={0} inPlay={true} />,
            <Piece takeTurn={takeTurn} capturePiece={capturePiece} record={record} select={select} type={faChessKnight} recorded={boardRecords} key="g1" team="white" initFile={6} initRank={0} inPlay={true} />,
            <Piece takeTurn={takeTurn} capturePiece={capturePiece} record={record} select={select} type={faChessBishop} recorded={boardRecords} key="c8" team="black" initFile={2} initRank={7} inPlay={true} />,
            <Piece takeTurn={takeTurn} capturePiece={capturePiece} record={record} select={select} type={faChessBishop} recorded={boardRecords} key="f8" team="black" initFile={5} initRank={7} inPlay={true} />,
            <Piece takeTurn={takeTurn} capturePiece={capturePiece} record={record} select={select} type={faChessBishop} recorded={boardRecords} key="c1" team="white" initFile={2} initRank={0} inPlay={true} />,
            <Piece takeTurn={takeTurn} capturePiece={capturePiece} record={record} select={select} type={faChessBishop} recorded={boardRecords} key="f1" team="white" initFile={5} initRank={0} inPlay={true} />,
            <Piece takeTurn={takeTurn} capturePiece={capturePiece} record={record} select={select} type={faChessKing} recorded={boardRecords} key="e8" team="black" initFile={4} initRank={7} inPlay={true} />,
            <Piece takeTurn={takeTurn} capturePiece={capturePiece} record={record} select={select} type={faChessQueen} recorded={boardRecords} key="d8" team="black" initFile={3} initRank={7} inPlay={true} />,
            <Piece takeTurn={takeTurn} capturePiece={capturePiece} record={record} select={select} type={faChessKing} recorded={boardRecords} key="e1" team="white" initFile={4} initRank={0} inPlay={true} />,
            <Piece takeTurn={takeTurn} capturePiece={capturePiece} record={record} select={select} type={faChessQueen} recorded={boardRecords} key="d1" team="white" initFile={3} initRank={0} inPlay={true} />,
            )
            setPieces([setup])
    }

    useEffect(() => {
    }, [boardRecords])

    return (
        <div onClick={() => console.log("On click pieces:", pieces)} className="game-board-wrap">
            { !pieces[0] ? <button onClick={() => setBoard()}>Set Board</button> : null }
            <div className="game-board">
                {pieces}
                {makeSquares()}
            </div>
        </div>
    )
}
