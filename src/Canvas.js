import React from 'react';
import './Canvas.css';
import { setPixel } from './AppActions';
import { socketSend, sendTile } from './App';

class Canvas extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        x: 0.0,
        y: 0.0,
        lastX: 0.0,
        lastY: 0.0,
        mouseIsDown: false,
        dragging: false,
        canvasX: 0.0,
        canvasY: 0.0,
        scale: 1.0
    }

    this.onClick = this.onClick.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseWheel = this.onMouseWheel.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
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
    e.preventDefault();
    var mouseX = parseInt(e.clientX, 10) - this.state.canvasX;
    var mouseY = parseInt(e.clientY, 10) - this.state.canvasY;

    mouseX = Math.floor(mouseX/this.props.pixelSize) * this.props.pixelSize;
    mouseY = Math.floor(mouseY/this.props.pixelSize) * this.props.pixelSize;

    console.log("Clicked at " + mouseX + ", " + mouseY)

    sendTile( mouseX, mouseY)
  }

  componentDidUpdate() {
   if(this.props.updatePixel != null) {
     console.log("CANVAS DRAWING: ")
     console.log(JSON.stringify(this.props.updatePixel))
     const pixel = this.props.updatePixel;

     this.c.fillStyle= this.props.activeColor
     this.c.fillRect(pixel[0].X, pixel[0].Y, this.props.pixelSize, this.props.pixelSize);
     // Sets update pixel back to none
     setPixel(null)
    }
  }

  onMouseDown(e) {
    document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
    this.setState({
      lastX: e.screenX,
      lastY: e.screenY,
      mouseIsDown: true
    });
  }

  clearCanvas() {
    this.c.save();
    this.c.setTransform(1,0,0,1,0,0);
    this.c.clearRect(0,0,this.canvas.width, this.canvas.height);
    this.c.restore();
  }

  onMouseMove(e) {
    if (this.state.mouseIsDown) {
      var moveX = this.state.lastX - e.screenX;
      var moveY = this.state.lastY - e.screenY;
      if (moveX != 0 || moveY != 0) {
        this.clearCanvas();

        this.c.translate(-moveX, -moveY);
        this.c.fillRect(50,50,100,100);

        //TODO: redraw canvas

        this.setState({
          canvasX: this.state.canvasX - moveX,
          canvasY: this.state.canvasY - moveY,
          dragging: true,
          lastX: e.screenX,
          lastY: e.screenY
        });
      }
    }
  }

  onMouseUp(e) {
    if (!this.state.dragging) {
      this.onClick(e);
    }

    this.setState({
      mouseIsDown: false,
      dragging: false
    });
  }

  onMouseWheel(e) {
    var delta = -e.deltaY / 20;

    if ((delta > 0 && this.state.scale > 2.0) || (delta < 0 && this.state.scale < 0.5)) return;

    var factor = Math.pow(1.1, delta);

    var transX = (this.canvas.width / 2 - this.state.canvasX) * this.state.zoom;
    var transY = (this.canvas.height / 2 - this.state.canvasY) * this.state.zoom;
    this.c.translate(transX, transY);
    this.c.scale(factor,factor);
    this.c.translate(-transX, -transY);

    this.clearCanvas();
    this.c.fillRect(50,50,100,100); //DEBUG

    this.setState({
      scale: this.state.scale * factor
    })
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
                  this.c = c.getContext('2d');
                  this.canvas = c;
                }}
              }
              width={1000} height={1000}
              onMouseMove={this.onMouseMove} onMouseDown={this.onMouseDown}
              onMouseUp={this.onMouseUp} onWheel={this.onMouseWheel} />
    )
  }
}

export default Canvas;
