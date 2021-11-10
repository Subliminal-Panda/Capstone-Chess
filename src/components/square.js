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
            rank: this.props.values.rank,
            file: this.props.values.file,
            style: this.props.values.style,
            occupied: '',
            selected: '',
            underAttack: [],
        }
        this.setBoard = this.setBoard.bind(this);
        this.handleClick=this.handleClick.bind(this);
    }

    componentDidMount() {
        this.setBoard();
    }

    setBoard = () => {
        const rank = this.state.rank
        const file = this.state.file
        if(rank === "2") {
            this.setState({
                occupied: <Pawn team="white"/>
            })
        } else if(rank === "7") {
            this.setState({
                occupied: <Pawn team="black"/>
            })
        } else if(rank ==="1") {
            if(file === "a" || file === "h") {
                this.setState({
                    occupied: <Rook team="white"/>
                })
            } else if(file === "b" || file === "g") {
                this.setState({
                    occupied: <Knight team="white"/>
                })
            } else if(file === "c" || file === "f") {
                this.setState({
                    occupied: <Bishop team="white"/>
                })
            } else if(file === "d") {
                this.setState({
                    occupied: <Queen team="white"/>
                })
            } else if (file === "e") {
                this.setState({
                    occupied: <King team="white"/>
                })
            }
        } else if(rank === "8") {
            if(file === "a" || file === "h") {
                this.setState({
                    occupied: <Rook team="black"/>
                })
            } else if(file === "b" || file === "g") {
                this.setState({
                    occupied: <Knight team="black"/>
                })
            } else if(file === "c" || file === "f") {
                this.setState({
                    occupied: <Bishop team="black"/>
                })
            } else if(file === "d") {
                this.setState({
                    occupied: <Queen team="black"/>
                })
            } else if (file === "e") {
                this.setState({
                    occupied: <King team="black"/>
                })
            }
        }
    }

    handleClick() {
        const files = ["a","b","c","d","e","f","g","h"]
        const ranks = ["1","2","3","4","5","6","7","8"]
        if (this.state.occupied) {
            this.setState({
                selected: true,
            })
        }
    }


    render() {
        return (
            <div
            onClick={this.handleClick}
            key={`${this.state.file}-${this.state.rank}`}
            style={this.state.style}
            className={ this.state.selected ? "red-piece square" : "square" } >
                {this.state.occupied}
            </div>
        )
    }
}
