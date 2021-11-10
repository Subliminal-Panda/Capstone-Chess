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
            preserve: []
        }
        this.setBoard = this.setBoard.bind(this);
        this.handleSelect=this.handleSelect.bind(this);
        this.handleDeselect=this.handleDeselect.bind(this);
        this.movePiece = this.movePiece.bind(this);
    }

    componentDidMount() {
        this.setBoard();
    }

    setBoard = () => {
        const rank = this.state.rank
        const file = this.state.file
        if(rank === "2") {
            this.setState({
                occupied: <Pawn rank={rank} file={file} team="white"/>
            })
        } else if(rank === "7") {
            this.setState({
                occupied: <Pawn rank={rank} file={file} team="black"/>
            })
        } else if(rank ==="1") {
            if(file === "a" || file === "h") {
                this.setState({
                    occupied: <Rook rank={rank} file={file} team="white"/>
                })
            } else if(file === "b" || file === "g") {
                this.setState({
                    occupied: <Knight rank={rank} file={file} team="white"/>
                })
            } else if(file === "c" || file === "f") {
                this.setState({
                    occupied: <Bishop rank={rank} file={file} team="white"/>
                })
            } else if(file === "d") {
                this.setState({
                    occupied: <Queen rank={rank} file={file} team="white"/>
                })
            } else if (file === "e") {
                this.setState({
                    occupied: <King rank={rank} file={file} team="white"/>
                })
            }
        } else if(rank === "8") {
            if(file === "a" || file === "h") {
                this.setState({
                    occupied: <Rook rank={rank} file={file} team="black"/>
                })
            } else if(file === "b" || file === "g") {
                this.setState({
                    occupied: <Knight rank={rank} file={file} team="black"/>
                })
            } else if(file === "c" || file === "f") {
                this.setState({
                    occupied: <Bishop rank={rank} file={file} team="black"/>
                })
            } else if(file === "d") {
                this.setState({
                    occupied: <Queen rank={rank} file={file} team="black"/>
                })
            } else if (file === "e") {
                this.setState({
                    occupied: <King rank={rank} file={file} team="black"/>
                })
            }
        }
    }

    movePiece(num) {
        const ranks = ["1","2","3","4","5","6","7","8"]
        const files = ["a","b","c","d","e","f","g","h"]
        for(let i=0; i<ranks.length; i++) {
            if(this.state.rank === ranks[i]) {
                this.setState({
                    occupied: "",
                })
                //pass rank & file state to parent, then to sibling!!
            }
        }
    }

    handleSelect() {
        if (this.state.occupied) {
            this.setState({
                selected: true,
            })
        }
    }

    handleDeselect() {
        if (this.state.occupied) {
            this.setState({
                selected: false,
            })
        }
    }


    render() {
        return (
            <div
            onMouseEnter={this.handleSelect}
            onMouseLeave={this.handleDeselect}
            onClick={() => this.movePiece(2)}
            key={`${this.state.file}-${this.state.rank}`}
            style={this.state.style}
            className={ this.state.selected ? "selected-piece square" : "square" } >
                {this.state.occupied}
            </div>
        )
    }
}
