import React from 'react';
import './Canvas.js';

class Pixel extends React.Component {
  constructor() {
    super();
    this.state = {
      color: 0xff0000
    }
  }

  render() {
    return (
    <div style={{
        display: "inline-block",
        background: this.state.color,
        height: this.props.height,
        width: this.props.width,
    }} onClick={()=> this.setState({color: 0xffff00})} />
    )
  }
}

let Row = (props) => {
  return (
    <div style={{height: props.height, width: props.width}}>
      { Array(props.count).fill().map((_, i) => {
        return <Pixel height={props.height}
                    width={props.width / props.count}
                    key={i} />
      })}
    </div>
  )
}

class Grid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      x: 1,
      y: 1
    }
  }

  render() {
    return (
      <div>
        <div style={{position: "fixed", padding: "6px"}}>
          <input type="range" value={this.state.x} min={1} max={25} onChange={(e)=>this.setState({x: parseInt(e.target.value)})} />
          <input type="range" value={this.state.y} min={1} max={25} onChange={(e)=>this.setState({y: parseInt(e.target.value)})} />
        </div>

        <div style={{
            display: "inline-block",
            height: this.props.height,
            width: this.props.width
        }}> {
          Array(this.state.y).fill().map((_, i) => {
            return <Row height={this.props.height / this.state.y}
                        width={this.props.width}
                        count={this.state.x}
                        key={i} />
          })
        } </div>
      </div>
    )
  }
}

export default Grid;
