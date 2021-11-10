import React from 'react';
import Piece from './piece';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessRook } from '@fortawesome/free-solid-svg-icons';

export default class Rook extends Piece {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <Piece thisPiece={this.props}>
                <FontAwesomeIcon icon={ faChessRook } />
            </Piece>
        )
    }
}
