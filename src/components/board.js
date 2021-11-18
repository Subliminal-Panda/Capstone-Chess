import React, { useEffect, useState, useContext } from 'react';
import Square from './Square';
import Piece from './pieces/piece';
import { faChessKing, faChessQueen, faChessRook, faChessBishop, faChessKnight, faChessPawn } from '@fortawesome/free-solid-svg-icons';
import CurrentGameContext from './currentGame';

export default function Board (props) {

    const ranks = ["1","2","3","4","5","6","7","8"]
    const files = ["a","b","c","d","e","f","g","h"]

    let setup = []

    const [ squares, setSquares ] = useState([])

    const { activePlayer, setActivePlayer } = useContext(CurrentGameContext)
    const { pieces, setPieces } = useContext(CurrentGameContext)
    const { locations, setLocations } = useContext(CurrentGameContext)
    const { taken, setTaken } = useContext(CurrentGameContext)

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
                <Piece type={faChessPawn} key={`${files[i]}2`} team="white" initFile={i} initRank={1} />
            );
            setup.push(
                <Piece type={faChessPawn} key={`${files[i]}7`} team="black" initFile={i} initRank={6} />
            );
        };
        setup.push(
            <Piece type={faChessKnight} key="b8" team="black" initFile={1} initRank={7} />,
            <Piece type={faChessKnight} key="g8" team="black" initFile={6} initRank={7} />,
            <Piece type={faChessKnight} key="b1" team="white" initFile={1} initRank={0} />,
            <Piece type={faChessKnight} key="g1" team="white" initFile={6} initRank={0} />,
            <Piece type={faChessRook} key="a8" team="black" initFile={0} initRank={7} />,
            <Piece type={faChessRook} key="h8" team="black" initFile={7} initRank={7} />,
            <Piece type={faChessRook} key="a1" team="white" initFile={0} initRank={0} />,
            <Piece type={faChessRook} key="h1" team="white" initFile={7} initRank={0} />,
            <Piece type={faChessBishop} key="c8" team="black" initFile={2} initRank={7} />,
            <Piece type={faChessBishop} key="f8" team="black" initFile={5} initRank={7} />,
            <Piece type={faChessBishop} key="c1" team="white" initFile={2} initRank={0} />,
            <Piece type={faChessBishop} key="f1" team="white" initFile={5} initRank={0} />,
            <Piece type={faChessKing} key="e8" team="black" initFile={4} initRank={7} />,
            <Piece type={faChessQueen} key="d8" team="black" initFile={3} initRank={7} />,
            <Piece type={faChessKing} key="e1" team="white" initFile={4} initRank={0} />,
            <Piece type={faChessQueen} key="d1" team="white" initFile={3} initRank={0} />,
            )
            setPieces([setup])
    }



    useEffect(() => {
        setActivePlayer("white")
        makeSquares();
        setBoard();
    }, [])

    return (
        <div className="game-board-wrap">
            <div className={ activePlayer === "white" ? "normal-game-board game-board" : "reversed-game-board game-board"}>
                {pieces}
                {squares}
            </div>
        </div>
    )
}
