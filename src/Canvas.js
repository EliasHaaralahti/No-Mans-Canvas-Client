import React from 'react';
import './Canvas.css';
import { setPixel } from './AppActions';
import { sendTile, getColor } from './App';

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

  onClick(e) {
    e.preventDefault();
    var mouseX = parseInt(e.clientX, 10);
    var mouseY = parseInt(e.clientY, 10);

    mouseX = Math.floor(mouseX/this.props.pixelSize) * this.props.pixelSize;
    mouseY = Math.floor(mouseY/this.props.pixelSize) * this.props.pixelSize;

    console.log("mouse position X: " + mouseX + " Y: " + mouseY)

    sendTile( mouseX, mouseY, this.props.activeColor)
  }

  componentDidUpdate() {
    if(this.props.canvasDraw) {
      console.log(this.props.canvas[2].colorID)
      for (var i = 1; i < this.props.canvas.length - 1; i++) {
        this.c.fillStyle=getColor(this.props.canvas[i].colorID)
        this.c.fillRect(this.props.canvas[i].X, this.props.canvas[i].Y, 1, 1);
      }
    }


   if(this.props.updatePixel != null) {
     const pixel = this.props.updatePixel;

     console.log("Color ID: ")
     console.log(pixel[0].colorID)
     this.c.fillStyle=getColor(pixel[0].colorID)
     this.c.fillRect(pixel[0].X, pixel[0].Y, this.props.pixelSize, this.props.pixelSize);
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
    return (
      <canvas id="canvas" ref={(c) => {
                if(c != null) {
                  this.c = c.getContext('2d')}
                }
              }
              width={this.props.columns} height={this.props.rows}
              onClick={this.onClick} onMouseMove={this.onMove} />
    )
  }
}

export default Canvas;
