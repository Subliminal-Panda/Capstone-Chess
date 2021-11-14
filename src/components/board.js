import React, { useEffect, useState } from 'react';
import Square from './Square';
import King from './pieces/king';
import Queen from './pieces/queen';
import Rook from './pieces/rook';
import Bishop from './pieces/bishop';
import Knight from './pieces/knight';
import Pawn from './pieces/pawn';
import Ghost from './ghost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessPawn } from '@fortawesome/free-solid-svg-icons';

export default function Board (props) {

    const ranks = ["1","2","3","4","5","6","7","8"]
    const files = ["a","b","c","d","e","f","g","h"]
    const inPlay = []
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



    const makeGhosts = (availMoves = []) => {
        const newGhosts = []
        console.log("moves for ghosts:", availMoves)
        availMoves.forEach((loc) => {
                console.log("move location:", loc)

                const ghostPosition = `${files[loc[0][0]]}${ranks[loc[1][0]]}`
                console.log("ghost position:", ghostPosition)
                newGhosts.push(<Ghost
                    file={files[loc[0][0]]}
                    rank={ranks[loc[1][0]]}
                    position={ghostPosition}
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
        const pieces = [];
        for(let i=0; i<8; i++) {
            pieces.push(
                <Pawn makeGhosts={makeGhosts} removeOld={removeOld} placeNew={placeNew} key={`${files[i]}2`} team="white" initFile={i} initRank={1} />
            );
            pieces.push(
                <Pawn makeGhosts={makeGhosts} removeOld={removeOld} placeNew={placeNew} key={`${files[i]}7`} team="black" initFile={i} initRank={6} />
            );
        };
        pieces.push(
            <Rook removeOld={removeOld} placeNew={placeNew} key="a8" team="black" initFile={0} initRank={7} />,
            <Rook removeOld={removeOld} placeNew={placeNew} key="h8" team="black" initFile={7} initRank={7} />,
            <Rook removeOld={removeOld} placeNew={placeNew} key="a1" team="white" initFile={0} initRank={0} />,
            <Rook removeOld={removeOld} placeNew={placeNew} key="h1" team="white" initFile={7} initRank={0} />,
            <Knight removeOld={removeOld} placeNew={placeNew} key="b8" team="black" initFile={1} initRank={7} />,
            <Knight removeOld={removeOld} placeNew={placeNew} key="g8" team="black" initFile={6} initRank={7} />,
            <Knight removeOld={removeOld} placeNew={placeNew} key="b1" team="white" initFile={1} initRank={0} />,
            <Knight removeOld={removeOld} placeNew={placeNew} key="g1" team="white" initFile={6} initRank={0} />,
            <Bishop removeOld={removeOld} placeNew={placeNew} key="c8" team="black" initFile={2} initRank={7} />,
            <Bishop removeOld={removeOld} placeNew={placeNew} key="f8" team="black" initFile={5} initRank={7} />,
            <Bishop removeOld={removeOld} placeNew={placeNew} key="c1" team="white" initFile={2} initRank={0} />,
            <Bishop removeOld={removeOld} placeNew={placeNew} key="f1" team="white" initFile={5} initRank={0} />,
            <King removeOld={removeOld} placeNew={placeNew} key="e8" team="black" initFile={4} initRank={7} />,
            <Queen removeOld={removeOld} placeNew={placeNew} key="d8" team="black" initFile={3} initRank={7} />,
            <King removeOld={removeOld} placeNew={placeNew} key="e1" team="white" initFile={4} initRank={0} />,
            <Queen removeOld={removeOld} placeNew={placeNew} key="d1" team="white" initFile={3} initRank={0} />,
        )
        console.log("Board has been set. Pieces:", pieces)
        return pieces;
    }

    return (
        <div onClick={() => console.log("pieces in play", inPlay)} className="game-board-wrap">
            <div className="game-board">
                {ghosts}
                {setBoard()}
                {makeSquares()}
            </div>
        </div>
    )
}
