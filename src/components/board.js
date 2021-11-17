import React, { useEffect, useState, useContext } from 'react';
import Square from './Square';
import Piece from './pieces/piece';
import { faChessKing, faChessQueen, faChessRook, faChessBishop, faChessKnight, faChessPawn } from '@fortawesome/free-solid-svg-icons';
import CurrentGameContext from './currentGame';

export default function Board (props) {

    const ranks = ["1","2","3","4","5","6","7","8"]
    const files = ["a","b","c","d","e","f","g","h"]

    let setup = []
    let taken = []
    const boardRecords = []

    const [ pieces, setPieces ] = useState([]);
    const [ squares, setSquares ] = useState([])

    const { activePlayer, setActivePlayer } = useContext(CurrentGameContext)
    const { boardSet, setBoardSet } = useContext(CurrentGameContext)

    const makeSquares = () => {
        let squareSet = []
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
                squareSet.push(
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
        setSquares([squareSet])
    }

    const setBoard = () => {
        for(let i=0; i<8; i++) {
            setup.push(
                <Piece capturePiece={capturePiece} record={record} type={faChessPawn} recorded={boardRecords} key={`${files[i]}2`} team="white" initFile={i} initRank={1} />
            );
            setup.push(
                <Piece capturePiece={capturePiece} record={record} type={faChessPawn} recorded={boardRecords} key={`${files[i]}7`} team="black" initFile={i} initRank={6} />
            );
        };
        setup.push(
            <Piece capturePiece={capturePiece} record={record} type={faChessRook} recorded={boardRecords} key="a8" team="black" initFile={0} initRank={7} />,
            <Piece capturePiece={capturePiece} record={record} type={faChessRook} recorded={boardRecords} key="h8" team="black" initFile={7} initRank={7} />,
            <Piece capturePiece={capturePiece} record={record} type={faChessRook} recorded={boardRecords} key="a1" team="white" initFile={0} initRank={0} />,
            <Piece capturePiece={capturePiece} record={record} type={faChessRook} recorded={boardRecords} key="h1" team="white" initFile={7} initRank={0} />,
            <Piece capturePiece={capturePiece} record={record} type={faChessKnight} recorded={boardRecords} key="b8" team="black" initFile={1} initRank={7} />,
            <Piece capturePiece={capturePiece} record={record} type={faChessKnight} recorded={boardRecords} key="g8" team="black" initFile={6} initRank={7} />,
            <Piece capturePiece={capturePiece} record={record} type={faChessKnight} recorded={boardRecords} key="b1" team="white" initFile={1} initRank={0} />,
            <Piece capturePiece={capturePiece} record={record} type={faChessKnight} recorded={boardRecords} key="g1" team="white" initFile={6} initRank={0} />,
            <Piece capturePiece={capturePiece} record={record} type={faChessBishop} recorded={boardRecords} key="c8" team="black" initFile={2} initRank={7} />,
            <Piece capturePiece={capturePiece} record={record} type={faChessBishop} recorded={boardRecords} key="f8" team="black" initFile={5} initRank={7} />,
            <Piece capturePiece={capturePiece} record={record} type={faChessBishop} recorded={boardRecords} key="c1" team="white" initFile={2} initRank={0} />,
            <Piece capturePiece={capturePiece} record={record} type={faChessBishop} recorded={boardRecords} key="f1" team="white" initFile={5} initRank={0} />,
            <Piece capturePiece={capturePiece} record={record} type={faChessKing} recorded={boardRecords} key="e8" team="black" initFile={4} initRank={7} />,
            <Piece capturePiece={capturePiece} record={record} type={faChessQueen} recorded={boardRecords} key="d8" team="black" initFile={3} initRank={7} />,
            <Piece capturePiece={capturePiece} record={record} type={faChessKing} recorded={boardRecords} key="e1" team="white" initFile={4} initRank={0} />,
            <Piece capturePiece={capturePiece} record={record} type={faChessQueen} recorded={boardRecords} key="d1" team="white" initFile={3} initRank={0} />,
            )
            setPieces([setup])
    }

    const record = (type, team, initPosition, currentFile, currentRank) => {
        boardRecords.forEach((pc, idx) => {
            if(pc[2] === initPosition) {
                boardRecords.splice(idx, 1)
            }
        })
        boardRecords.push([type, team, initPosition, currentFile, currentRank])
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
        setup.forEach((pce, idxe) => {
            if(pce.key === attacked[2]) {
                setup = setup.filter(item => item.key !== attacked[2])
                taken.push(pce)
                setPieces([setup])
            }
        })
    }

    useEffect(() => {
        makeSquares();
        setBoard();
    }, [])

    useEffect(() => {
    }, [boardRecords])

    return (
        <div className="game-board-wrap">
            {/* { !pieces[0] ? <button onClick={() => setBoard()}>Set Board</button> : null } */}
            <div className={ activePlayer === "white" ? "normal-game-board game-board" : "reversed-game-board game-board"}>
                {pieces}
                {squares}
            </div>
        </div>
    )
}
