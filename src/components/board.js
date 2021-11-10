import React, { Component } from 'react';
import Bishop from './pieces/bishop';
import King from './pieces/king';
import Knight from './pieces/knight';
import Pawn from './pieces/pawn';
import Queen from './pieces/queen';
import Rook from './pieces/rook';
import Square from './square';

export default class Board extends Component {

    constructor(props) {
        super(props);
        let dark = "rgb(90, 90, 90)";
        let light = "rgb(175, 175, 175)";
        this.state = {
            a8: {style: {backgroundColor: light}, rank: "8", file: "a", },
            b8: {style: {backgroundColor: dark}, rank: "8", file: "b", },
            c8: {style: {backgroundColor: light}, rank: "8", file: "c", },
            d8: {style: {backgroundColor: dark}, rank: "8", file: "d", },
            e8: {style: {backgroundColor: light}, rank: "8", file: "e", },
            f8: {style: {backgroundColor: dark}, rank: "8", file: "f", },
            g8: {style: {backgroundColor: light}, rank: "8", file: "g", },
            h8: {style: {backgroundColor: dark}, rank: "8", file: "h", },
            a7: {style: {backgroundColor: dark}, rank: "7", file: "a", },
            b7: {style: {backgroundColor: light}, rank: "7", file: "b", },
            c7: {style: {backgroundColor: dark}, rank: "7", file: "c", },
            d7: {style: {backgroundColor: light}, rank: "7", file: "d", },
            e7: {style: {backgroundColor: dark}, rank: "7", file: "e", },
            f7: {style: {backgroundColor: light}, rank: "7", file: "f", },
            g7: {style: {backgroundColor: dark}, rank: "7", file: "g", },
            h7: {style: {backgroundColor: light}, rank: "7", file: "h", },
            a6: {style: {backgroundColor: light}, rank: "6", file: "a", },
            b6: {style: {backgroundColor: dark}, rank: "6", file: "b", },
            c6: {style: {backgroundColor: light}, rank: "6", file: "c", },
            d6: {style: {backgroundColor: dark}, rank: "6", file: "d", },
            e6: {style: {backgroundColor: light}, rank: "6", file: "e", },
            f6: {style: {backgroundColor: dark}, rank: "6", file: "f", },
            g6: {style: {backgroundColor: light}, rank: "6", file: "g", },
            h6: {style: {backgroundColor: dark}, rank: "6", file: "h", },
            a5: {style: {backgroundColor: dark}, rank: "5", file: "a", },
            b5: {style: {backgroundColor: light}, rank: "5", file: "b", },
            c5: {style: {backgroundColor: dark}, rank: "5", file: "c", },
            d5: {style: {backgroundColor: light}, rank: "5", file: "d", },
            e5: {style: {backgroundColor: dark}, rank: "5", file: "e", },
            f5: {style: {backgroundColor: light}, rank: "5", file: "f", },
            g5: {style: {backgroundColor: dark}, rank: "5", file: "g", },
            h5: {style: {backgroundColor: light}, rank: "5", file: "h", },
            a4: {style: {backgroundColor: light}, rank: "4", file: "a", },
            b4: {style: {backgroundColor: dark}, rank: "4", file: "b", },
            c4: {style: {backgroundColor: light}, rank: "4", file: "c", },
            d4: {style: {backgroundColor: dark}, rank: "4", file: "d", },
            e4: {style: {backgroundColor: light}, rank: "4", file: "e", },
            f4: {style: {backgroundColor: dark}, rank: "4", file: "f", },
            g4: {style: {backgroundColor: light}, rank: "4", file: "g", },
            h4: {style: {backgroundColor: dark}, rank: "4", file: "h", },
            a3: {style: {backgroundColor: dark}, rank: "3", file: "a", },
            b3: {style: {backgroundColor: light}, rank: "3", file: "b", },
            c3: {style: {backgroundColor: dark}, rank: "3", file: "c", },
            d3: {style: {backgroundColor: light}, rank: "3", file: "d", },
            e3: {style: {backgroundColor: dark}, rank: "3", file: "e", },
            f3: {style: {backgroundColor: light}, rank: "3", file: "f", },
            g3: {style: {backgroundColor: dark}, rank: "3", file: "g", },
            h3: {style: {backgroundColor: light}, rank: "3", file: "h", },
            a2: {style: {backgroundColor: light}, rank: "2", file: "a", },
            b2: {style: {backgroundColor: dark}, rank: "2", file: "b", },
            c2: {style: {backgroundColor: light}, rank: "2", file: "c", },
            d2: {style: {backgroundColor: dark}, rank: "2", file: "d", },
            e2: {style: {backgroundColor: light}, rank: "2", file: "e", },
            f2: {style: {backgroundColor: dark}, rank: "2", file: "f", },
            g2: {style: {backgroundColor: light}, rank: "2", file: "g", },
            h2: {style: {backgroundColor: dark}, rank: "2", file: "h", },
            a1: {style: {backgroundColor: dark}, rank: "1", file: "a", },
            b1: {style: {backgroundColor: light}, rank: "1", file: "b", },
            c1: {style: {backgroundColor: dark}, rank: "1", file: "c", },
            d1: {style: {backgroundColor: light}, rank: "1", file: "d", },
            e1: {style: {backgroundColor: dark}, rank: "1", file: "e", },
            f1: {style: {backgroundColor: light}, rank: "1", file: "f", },
            g1: {style: {backgroundColor: dark}, rank: "1", file: "g", },
            h1: {style: {backgroundColor: light}, rank: "1", file: "h", },
        }
    }


    render() {
        const squares = Object.entries(this.state).map(square => {
            const position = square[0];
            const values = square[1];
            return(
                <Square addPiece={this.addPiece} key={position} position={position} data={values}/>
            )
        })
        return (
            <div className="game-board">
                {squares}
            </div>
        )
    }
}
