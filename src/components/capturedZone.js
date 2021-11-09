import React, { Component } from 'react';

export default class CapturedZone extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="captured-zone">
                <h1>{this.props.player}'s Captured Pieces:</h1>
            </div>
        )
    }
}
