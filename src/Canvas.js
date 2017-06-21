import React from 'react';
import './Canvas.css';
import { setPixel, setDrawCanvas, setPixelInCanvas, addUserExp, substractUserTiles } from './AppActions';
import { sendTile, getColor } from './App';
import { createCSSTransformBuilder } from "easy-css-transform-builder";

const builder = createCSSTransformBuilder();

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
    this.translate = this.translate.bind(this);
    this.scale = this.scale.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    var mouseX = (e.pageX - this.canvas.offsetLeft - this.state.canvasX) / this.state.scale;
    var mouseY = (e.pageY - this.canvas.offsetTop - this.state.canvasY) / this.state.scale;

    console.log("mouse: "+(e.pageX - this.canvas.offsetLeft)+", "+(e.pageY - this.canvas.offsetTop));
    console.log("canvas: "+this.state.canvasX+", "+this.state.canvasY);
    console.log("scale: "+this.state.scale);

    if (mouseX < 0 || mouseY < 0) return;

    var pixelX = Math.floor(mouseX/this.props.pixelSize);
    var pixelY = Math.floor(mouseY/this.props.pixelSize);

    if (this.props.remainingTiles > 0){
      sendTile(pixelX, pixelY, this.props.activeColor);
      setPixelInCanvas(pixelX, pixelY, this.props.activeColor);
      if (this.props.userExp < this.props.userExpLimit){
        addUserExp(1);
      }
      substractUserTiles(1);
    }
  }

  componentDidUpdate() {
    if(this.props.canvasDraw) {
      console.log("Drawing canvas!");

      console.log(this.props.canvas.length)

      // TODO: NOT OPTIMAL! RUSHED SOLUTION
      // CAN I DO CONDITION: ROWS * COLUMNS IN ONE LOOP ??
      var counter = 1;
      for (var y = 0; y < this.props.rows; y++) {
        for(var x = 0; x < this.props.columns; x++) {
          this.c.fillStyle=getColor(this.props.canvas[counter].colorID);
          var pixelX = x * this.props.pixelSize;
          var pixelY = y * this.props.pixelSize;
          this.c.fillRect(pixelX, pixelY, this.props.pixelSize, this.props.pixelSize);
          counter++;
        }
      }
      setDrawCanvas(false);
    }

   if(this.props.updatePixel != null) {
     const pixel = this.props.updatePixel;
     console.log("Canvas received pixel color: " + pixel[0].colorID)
     this.c.fillStyle=getColor(pixel[0].colorID)
     this.c.fillRect(pixel[0].X * this.props.pixelSize, pixel[0].Y * this.props.pixelSize,
       this.props.pixelSize, this.props.pixelSize);
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
      if (moveX !== 0 || moveY !== 0) {
        this.clearCanvas();

        this.translate(-moveX, -moveY);

        setDrawCanvas(true);

        this.setState({
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
    var delta = -e.deltaY / 40;

    if ((delta > 0 && this.state.scale > 3.0) || (delta < 0 && this.state.scale < 1.0)) return;

    var factor = Math.pow(1.1, delta);

    var mouseX = (e.pageX - this.canvas.offsetLeft - this.state.canvasX) / this.state.scale;
    var mouseY = (e.pageY - this.canvas.offsetTop - this.state.canvasY) / this.state.scale;
    this.scale(factor, mouseX, mouseY);

    this.clearCanvas();

    setDrawCanvas(true);
  }

  translate(x, y) {
    var newX = this.state.canvasX + x;
    var newY = this.state.canvasY + y;
    this.setState({
      canvasX: newX,
      canvasY: newY
    });
  }

  scale(factor, originX = this.canvas.width / 2, originY = this.canvas.height / 2) {
    var moveX = (1.0-factor)*originX * this.state.scale;
    var moveY = (1.0-factor)*originY * this.state.scale;
    this.translate(moveX, moveY);

    var newScale = this.state.scale * factor;
    this.setState({
      scale: newScale
    });
  }

  render() {
    return (
      <div width={window.innerWidth} height={window.innerHeight}
        onMouseMove={this.onMouseMove} onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp} onWheel={this.onMouseWheel}>
        <div style={{
          imageRendering: 'pixelated',
          transformOrigin: '0 0',
          transform: builder({
            scale: this.state.scale,
            translateX: this.state.canvasX,
            translateY: this.state.canvasY
          })
        }}>
          <canvas id="canvas" ref={(c) => {
                    if(c != null) {
                      this.c = c.getContext('2d');
                      this.canvas = c;
                    }}
                  }
                  width={this.props.columns * this.props.pixelSize}
                  height={this.props.rows * this.props.pixelSize}/>
        </div>
      </div>
    )
  }
}

export default Canvas;
