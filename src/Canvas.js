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
    this.c.fillRect(0, 0, this.props.pixelSize, this.props.pixelSize);
    this.c.fillRect(20, 20, this.props.pixelSize, this.props.pixelSize);
    this.c.fillRect(20, 40, this.props.pixelSize, this.props.pixelSize);
    this.c.fillRect(40, 60, this.props.pixelSize, this.props.pixelSize);
  }

  onClick(e) {
    // TODO: 'Snap' coordinates to grid according to pixelSize
    var mouseX = parseInt(e.clientX, 10);
    var mouseY = parseInt(e.clientY, 10);
    this.c.fillRect(mouseX, mouseY, this.props.pixelSize, this.props.pixelSize);

    console.log("sending message!")
    socket.send(JSON.stringify({"requestType": "postTile",
                                "userID": 1,
                                "X": mouseX,
                                "Y": mouseY,
                                "colorID": 1}))
  }

  onMove(e) {
    var mouseX = parseInt(e.clientX, 10);
    var mouseY = parseInt(e.clientY, 10);
    console.log("Mouse X: " + mouseX + " Y: " + mouseY)
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
