import React, { Component } from 'react';
import Square from './square';

export default class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            board: [
                {a8: {style: {backgroundColor: "white"}, rank: "8", file: "a", occupied: false, underAttack: []}},
                {b8: {style: {backgroundColor: "black"}, rank: "8", file: "b", occupied: false, underAttack: []}},
                {c8: {style: {backgroundColor: "white"}, rank: "8", file: "c", occupied: false, underAttack: []}},
                {d8: {style: {backgroundColor: "black"}, rank: "8", file: "d", occupied: false, underAttack: []}},
                {e8: {style: {backgroundColor: "white"}, rank: "8", file: "e", occupied: false, underAttack: []}},
                {f8: {style: {backgroundColor: "black"}, rank: "8", file: "f", occupied: false, underAttack: []}},
                {g8: {style: {backgroundColor: "white"}, rank: "8", file: "g", occupied: false, underAttack: []}},
                {h8: {style: {backgroundColor: "black"}, rank: "8", file: "h", occupied: false, underAttack: []}},
                {a7: {style: {backgroundColor: "black"}, rank: "7", file: "a", occupied: false, underAttack: []}},
                {b7: {style: {backgroundColor: "white"}, rank: "7", file: "b", occupied: false, underAttack: []}},
                {c7: {style: {backgroundColor: "black"}, rank: "7", file: "c", occupied: false, underAttack: []}},
                {d7: {style: {backgroundColor: "white"}, rank: "7", file: "d", occupied: false, underAttack: []}},
                {e7: {style: {backgroundColor: "black"}, rank: "7", file: "e", occupied: false, underAttack: []}},
                {f7: {style: {backgroundColor: "white"}, rank: "7", file: "f", occupied: false, underAttack: []}},
                {g7: {style: {backgroundColor: "black"}, rank: "7", file: "g", occupied: false, underAttack: []}},
                {h7: {style: {backgroundColor: "white"}, rank: "7", file: "h", occupied: false, underAttack: []}},
                {a6: {style: {backgroundColor: "white"}, rank: "6", file: "a", occupied: false, underAttack: []}},
                {b6: {style: {backgroundColor: "black"}, rank: "6", file: "b", occupied: false, underAttack: []}},
                {c6: {style: {backgroundColor: "white"}, rank: "6", file: "c", occupied: false, underAttack: []}},
                {d6: {style: {backgroundColor: "black"}, rank: "6", file: "d", occupied: false, underAttack: []}},
                {e6: {style: {backgroundColor: "white"}, rank: "6", file: "e", occupied: false, underAttack: []}},
                {f6: {style: {backgroundColor: "black"}, rank: "6", file: "f", occupied: false, underAttack: []}},
                {g6: {style: {backgroundColor: "white"}, rank: "6", file: "g", occupied: false, underAttack: []}},
                {h6: {style: {backgroundColor: "black"}, rank: "6", file: "h", occupied: false, underAttack: []}},
                {a5: {style: {backgroundColor: "black"}, rank: "5", file: "a", occupied: false, underAttack: []}},
                {b5: {style: {backgroundColor: "white"}, rank: "5", file: "b", occupied: false, underAttack: []}},
                {c5: {style: {backgroundColor: "black"}, rank: "5", file: "c", occupied: false, underAttack: []}},
                {d5: {style: {backgroundColor: "white"}, rank: "5", file: "d", occupied: false, underAttack: []}},
                {e5: {style: {backgroundColor: "black"}, rank: "5", file: "e", occupied: false, underAttack: []}},
                {f5: {style: {backgroundColor: "white"}, rank: "5", file: "f", occupied: false, underAttack: []}},
                {g5: {style: {backgroundColor: "black"}, rank: "5", file: "g", occupied: false, underAttack: []}},
                {h5: {style: {backgroundColor: "white"}, rank: "5", file: "h", occupied: false, underAttack: []}},
                {a4: {style: {backgroundColor: "white"}, rank: "4", file: "a", occupied: false, underAttack: []}},
                {b4: {style: {backgroundColor: "black"}, rank: "4", file: "b", occupied: false, underAttack: []}},
                {c4: {style: {backgroundColor: "white"}, rank: "4", file: "c", occupied: false, underAttack: []}},
                {d4: {style: {backgroundColor: "black"}, rank: "4", file: "d", occupied: false, underAttack: []}},
                {e4: {style: {backgroundColor: "white"}, rank: "4", file: "e", occupied: false, underAttack: []}},
                {f4: {style: {backgroundColor: "black"}, rank: "4", file: "f", occupied: false, underAttack: []}},
                {g4: {style: {backgroundColor: "white"}, rank: "4", file: "g", occupied: false, underAttack: []}},
                {h4: {style: {backgroundColor: "black"}, rank: "4", file: "h", occupied: false, underAttack: []}},
                {a3: {style: {backgroundColor: "black"}, rank: "3", file: "a", occupied: false, underAttack: []}},
                {b3: {style: {backgroundColor: "white"}, rank: "3", file: "b", occupied: false, underAttack: []}},
                {c3: {style: {backgroundColor: "black"}, rank: "3", file: "c", occupied: false, underAttack: []}},
                {d3: {style: {backgroundColor: "white"}, rank: "3", file: "d", occupied: false, underAttack: []}},
                {e3: {style: {backgroundColor: "black"}, rank: "3", file: "e", occupied: false, underAttack: []}},
                {f3: {style: {backgroundColor: "white"}, rank: "3", file: "f", occupied: false, underAttack: []}},
                {g3: {style: {backgroundColor: "black"}, rank: "3", file: "g", occupied: false, underAttack: []}},
                {h3: {style: {backgroundColor: "white"}, rank: "3", file: "h", occupied: false, underAttack: []}},
                {a2: {style: {backgroundColor: "white"}, rank: "2", file: "a", occupied: false, underAttack: []}},
                {b2: {style: {backgroundColor: "black"}, rank: "2", file: "b", occupied: false, underAttack: []}},
                {c2: {style: {backgroundColor: "white"}, rank: "2", file: "c", occupied: false, underAttack: []}},
                {d2: {style: {backgroundColor: "black"}, rank: "2", file: "d", occupied: false, underAttack: []}},
                {e2: {style: {backgroundColor: "white"}, rank: "2", file: "e", occupied: false, underAttack: []}},
                {f2: {style: {backgroundColor: "black"}, rank: "2", file: "f", occupied: false, underAttack: []}},
                {g2: {style: {backgroundColor: "white"}, rank: "2", file: "g", occupied: false, underAttack: []}},
                {h2: {style: {backgroundColor: "black"}, rank: "2", file: "h", occupied: false, underAttack: []}},
                {a1: {style: {backgroundColor: "black"}, rank: "1", file: "a", occupied: false, underAttack: []}},
                {b1: {style: {backgroundColor: "white"}, rank: "1", file: "b", occupied: false, underAttack: []}},
                {c1: {style: {backgroundColor: "black"}, rank: "1", file: "c", occupied: false, underAttack: []}},
                {d1: {style: {backgroundColor: "white"}, rank: "1", file: "d", occupied: false, underAttack: []}},
                {e1: {style: {backgroundColor: "black"}, rank: "1", file: "e", occupied: false, underAttack: []}},
                {f1: {style: {backgroundColor: "white"}, rank: "1", file: "f", occupied: false, underAttack: []}},
                {g1: {style: {backgroundColor: "black"}, rank: "1", file: "g", occupied: false, underAttack: []}},
                {h1: {style: {backgroundColor: "white"}, rank: "1", file: "h", occupied: false, underAttack: []}},
            ]
        }
    }

    render() {
        const squares = this.state.board.map(square => {
            let keys = Object.keys(square);
            let values = Object.values(square);
            return(
                <Square key={keys} data={values}/>
            )
        })
        return (
            <div className="game-board">
                {squares}
            </div>
        )
    }
}
