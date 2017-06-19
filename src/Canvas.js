import React from 'react';
import './Canvas.css';
import { socket } from './App';

// Uses HTML5 canvas, this will be the final implementation of the Grid
// Project currently uses Grid.js, which does not suit our needs.

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
  componentDidMount() {
    // Here draw the initial canvas
    for (var y = 0; y < 5; y++) {
      for (var x = 0; x < 5; x++) {
        // this.c.fillRect(dataX, dataY, this.props.pixelSize, this.props.pixelSize);
      }
    }
  }

  componentDidUpdate() {
    // This will be called when store state changes (?)
    // TODO: Get reducer update pixel data
    // this.c.fillRect(dataX, dataY, this.props.pixelSize, this.props.pixelSize);
    // Set reducer updatePixel to default value!
  }

  onClick(e) {
    // TODO: 'Snap' coordinates to grid according to pixelSize
    var mouseX = parseInt(e.clientX, 10);
    var mouseY = parseInt(e.clientY, 10);

    mouseX = Math.floor(mouseX/this.props.pixelSize) * this.props.pixelSize;
    mouseY = Math.floor(mouseY/this.props.pixelSize) * this.props.pixelSize;

    socket.send(JSON.stringify({"requestType": "postTile", "userID": "1",
                                "X": "50", "Y": "50", "colorID": "1"}))
  }

  onMove(e) {
    // var mouseX = parseInt(e.clientX, 10);
    // var mouseY = parseInt(e.clientY, 10);
    // console.log("Mouse X: " + mouseX + " Y: " + mouseY)
  }

  render() {
    return (
      <canvas id="canvas" ref={(c) => this.c = c.getContext('2d')}
              width={window.innerWidth} height={window.innerHeight}
              onClick={this.onClick} onMouseMove={this.onMove} />
    )
  }
}

export default Canvas;
