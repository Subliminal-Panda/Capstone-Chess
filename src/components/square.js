import React, { Component } from 'react';

export default class Square extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const details = this.props.data[0];
        return (
            <div className="square" style={details.style} >
                {console.log(details)}
                {details.occupied}
            </div>
        )
    }
}
