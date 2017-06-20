import React from 'react';
import './Canvas.css';
import { setPixel } from './AppActions';

class Canvas extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        x: 0,
        y: 0
    }

    this.onClick = this.onClick.bind(this);
    this.onMove = this.onMove.bind(this);
  }
  // c usually refers to context when using canvas
  // NOTE: Will this also cause re-render? do this before mount?
  componentDidMount() {
    // Here draw the initial canvas
    // TODO: Use proper dimensions
    for (var y = 0; y < 5; y+=this.props.pixelSize) {
      for (var x = 0; x < 5; x+=this.props.pixelSize) {
        // this.c.fillRect(dataX, dataY, this.props.pixelSize, this.props.pixelSize);
      }
    }
  }

  onClick(e) {
    var mouseX = parseInt(e.clientX, 10);
    var mouseY = parseInt(e.clientY, 10);

    mouseX = Math.floor(mouseX/this.props.pixelSize) * this.props.pixelSize;
    mouseY = Math.floor(mouseY/this.props.pixelSize) * this.props.pixelSize;

    console.log("mouse position X: " + mouseX + " Y: " + mouseY)

    // TODO:
    // this.props.socket.send(JSON.stringify({"requestType": "postTile", "userID": "1",
    //                             "X": mouseX, "Y": mouseY, "colorID": "1"}))
  }

  componentDidUpdate() {
   if(this.props.updatePixel != null) {
     console.log("CANVAS DRAWING: ")
     console.log(JSON.stringify(this.props.updatePixel))
     const pixel = this.props.updatePixel;
     var x = pixel[0].X;
     var y = pixel[0].Y;
     console.log("X: " + x  +" Y: " + y)

     this.c.fillStyle= this.props.activeColor
     this.c.fillRect(x, y, this.props.pixelSize, this.props.pixelSize);
     // Sets update pixel back to none
     setPixel(null)
    }
  }

  onMove(e) {
    // var mouseX = parseInt(e.clientX, 10);
    // var mouseY = parseInt(e.clientY, 10);
    // console.log("Mouse X: " + mouseX + " Y: " + mouseY)
  }

  render() {
    /*// TODO: Pass socket as prop rather than import, might fix problem (?)
    // TODO: Might not work but the idea is here:
    // If new updatePixel received from websocket, draw it
    if(this.props.updatePixel.size !== 0) {
      if(this.c != null){
        // Draw updated pixel, for now 1, 1 coordinates
        this.c.fillRect(1, 1, this.props.pixelSize, this.props.pixelSize);
        // Reset the updatePixel state
        setPixel({})
      }
    }*/
    return (
      <canvas id="canvas" ref={(c) => {
                if(c != null) {
                  this.c = c.getContext('2d')}
                }
              }
              width={window.innerWidth} height={window.innerHeight}
              onClick={this.onClick} onMouseMove={this.onMove} />
    )
  }
}

export default Canvas;
