import React from 'react';

let randColor = function() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}

class Box extends React.Component {
    constructor() {
        super();
        this.state = {
            color: randColor(),
            size: 12
        }
    }

    render() {
        return <div style={{
            display: "inline-block",
            background: this.state.color,
            height: this.state.size,
            width: this.state.size,
        }} onClick={()=> this.setState({color: randColor()})}/>;
    }
}

let Row = (props) => {
    return <div style={{
        height: props.height,
        width: props.width
    }}>{
        Array(props.count).fill().map((_, i) => {
            return <Box height={props.height}
                        width={props.width / props.count}
                        key={i} />;
        })
    }</div>
}

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 150,
            y: 100
        }
    }

    render() {
        return (
        <div style={{
            display: "inline-block",
            height: this.props.height,
            width: this.props.width
        }}>{
            Array(this.state.y).fill().map((_, i) => {
                return <Row height={this.props.height / this.state.y}
                            width={this.props.width}
                            count={this.state.x}
                            key={i} />;
            })
        }</div>
      )
    }
}

export default Grid;
