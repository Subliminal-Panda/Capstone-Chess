import React, { Component } from 'react';
import CapturedZone from './capturedZone';
import Board from './board';

export default class Table extends Component {

    constructor(props) {
        super(props);
        this.state = {

            players: {
                white: "Player One",
                black: "Player Two"
            }
        }
    }
    render() {
        return (
            <div className="table-wrap">
                <CapturedZone player={this.state.players.white} />
                <Board />
                <CapturedZone player={this.state.players.black}/>
            </div>
        )
    }
}
