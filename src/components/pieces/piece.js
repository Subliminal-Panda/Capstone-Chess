import React, { Component } from 'react';

export default class Piece extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    availableMoves() {
        const moveTo = this.props.thisPiece.rank + 1
        console.log(moveTo)
    }
    render() {
        return (
            <div className="chess-piece" style={{color: this.props.thisPiece.team}}>
                {console.log(this.props.thisPiece)}
                {this.props.children}
            </div>
        )
    }
}
