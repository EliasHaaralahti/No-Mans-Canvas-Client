import React from 'react';
import './Canvas.css';

class Pixel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorID: "#ffffff",
      x: this.props.x,
      y: this.props.y
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    console.log("click!")
    console.log("pixel x: " + this.state.x + " y: " + this.state.y)
    this.setState({colorID: "#ff0000"})
  }

  render() {
    return (
      <div style={{
        display: "inline-block",
        "border-size": "0px",
        background: this.state.colorID,
        height: this.props.height,
        width: this.props.width
      }} onClick={() => this.onClick()}/>
    )
  }
}

let Row = (props) => {
    return (
      <div style={{height: props.height, width: props.width * props.count}}>{
          Array(props.count).fill().map((_, i) => {
              return <Pixel height={props.height}
                            width={props.width}
                            y={props.ycoord}
                            x={i}
                            key={i} />;
          })
        }
      </div>
  )
}

class Grid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: 100,
      rows: 100,
    }
  }

  render() {
    const pixelHeight = Math.floor(window.innerHeight / this.state.rows);
    const pixelWidth = Math.floor(window.innerWidth / this.state.columns);
    console.log("pixelHeight: " + pixelHeight)
    return (
      <div style={{height: window.innerHeight, width: window.innerWidth}}>
      {
        Array(this.state.rows).fill().map((_, y) => {
          return <Row height={pixelHeight}
                      width={pixelWidth}
                      count={this.state.columns}
                      ycoord={y}
                      key={y}/>
          })
        }
      </div>
    )
  }
}

export default Grid
