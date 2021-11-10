import React from 'react';
import Piece from './piece';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessPawn } from '@fortawesome/free-solid-svg-icons';

export default class Pawn extends Piece {

    constructor(props) {
        super(props);
        this.state = {
            whiteLocations: [],
            blackLocations: [],
        }
    }

    render() {
        return (
            <Piece thisPiece={this.props}>
                <FontAwesomeIcon icon={ faChessPawn } />
            </Piece>
        )
    }
}
