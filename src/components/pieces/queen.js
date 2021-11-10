import React from 'react';
import Piece from './piece';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessQueen } from '@fortawesome/free-solid-svg-icons';

export default class Queen extends Piece {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <Piece thisPiece={this.props}>
                <FontAwesomeIcon icon={ faChessQueen } />
            </Piece>
        )
    }
}
