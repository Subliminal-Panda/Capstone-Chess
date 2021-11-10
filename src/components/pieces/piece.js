import React, { Component } from 'react';

export default class Piece extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="chess-piece" style={{color: this.props.thisPiece.team}}>
                {this.props.children}
            </div>
        )
    }
}
