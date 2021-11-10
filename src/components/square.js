import React, { Component } from 'react';
import Rook from './pieces/rook';
import King from './pieces/king';
import Queen from './pieces/queen';
import Bishop from './pieces/bishop';
import Knight from './pieces/knight';
import Pawn from './pieces/pawn';

export default class Square extends Component {

    constructor(props) {
        super(props);
        this.state = {
            details: this.props.data,
            occupied: false,
            underAttack: [],
        }
    }


    render() {
        return (
            <div onClick={() => this.props.addPiece(this.props.position, new Pawn)} key={`${this.state.details.file}-${this.state.details.rank}`} className="square" style={this.state.details.style} >
                {this.state.details.occupied}
            </div>
        )
    }
}
