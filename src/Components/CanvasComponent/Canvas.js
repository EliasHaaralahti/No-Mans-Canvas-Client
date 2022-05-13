import React from 'react';
import './Canvas.css';
import { setPixel, setDrawCanvas, addUserExp, substractUserTiles } from '../../AppActions';
import { sendTile, getColor, sendBan, sendBrushClick } from '../../App';
import { createCSSTransformBuilder } from "easy-css-transform-builder";
import PixelInfo from './Components/PixelInfoComponent/PixelInfo';
import { isMouseInsideCanvas } from './canvasUtils'

const builder = createCSSTransformBuilder();

const dragThreshold = 15;
const pixelInfoTresholdInMs = 2000;

class Canvas extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        lastMouseX: 0.0,
        lastMouseY: 0.0,
        // This is only updated for pixelInfo
        lastCalculatedMousePosX: 0.0,
        lastCalculatedMousePosY: 0.0,
        draggedX: 0.0,
        draggedY: 0.0,
        dragOriginX: 0.0,
        dragOriginY: 0.0,
        mouseIsDown: false,
        mouseWasDown: false,
        dragging: false,
        canvasX: 0.0,
        canvasY: 0.0,
        scale: 1.0,
        dimX: -1, // X coordinate of pixel hovering. Dim for Dimmed.
        dimY: -1, // Y coordinate of pixel hovered. Dim for dimmed.
        dimmedColor: 0,
        timer: null,
        pixelInfoVisible: false
    }

    this.drawPixel = this.drawPixel.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseWheel = this.onMouseWheel.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.translate = this.translate.bind(this);
    this.scale = this.scale.bind(this);
    this.showPixelInfo = this.showPixelInfo.bind(this);
    this.getCanvasSize = this.getCanvasSize.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    var mouseX = (e.pageX - this.canvas.offsetLeft - this.state.canvasX) / this.state.scale;
    var mouseY = (e.pageY - this.canvas.offsetTop - this.state.canvasY) / this.state.scale;

    var pixelX = Math.floor(mouseX/this.props.pixelSize);
    var pixelY = Math.floor(mouseY/this.props.pixelSize);

    //don't do anything if clicked outside of canvas
    if (pixelX < 0 || pixelY < 0 || pixelX > this.props.columns || pixelY > this.props.rows) return;

    if (this.props.banModeEnabled) {
      console.log('Banning at ' + pixelX + ', ' + pixelY)
      sendBan(pixelX, pixelY)
    } else if (this.props.adminBrushEnabled) {
      console.log('Cleaning up at ' + pixelX + ', ' + pixelY)
      sendBrushClick(pixelX, pixelY, this.props.activeColor)
      this.setState({
        dimX: -1,
        dimY: -1,
        dimmedColor: 0
      });
    } else {
      if (this.props.remainingTiles > 0){
        sendTile(pixelX, pixelY, this.props.activeColor);
        // Don't undim this tile, wait for server to give new color
        this.setState({
          dimmedColor: -1
        });

        if (this.props.userExp < this.props.userExpLimit){
          addUserExp(1);
        }
        substractUserTiles(1);
      }
	}

  }

  componentDidUpdate() {
    if(this.props.canvasDraw) {
      console.log("Drawing " + this.props.rows + "x" + this.props.columns + " canvas");

      // TODO: NOT OPTIMAL! RUSHED SOLUTION
      // CAN I DO CONDITION: ROWS * COLUMNS IN ONE LOOP ??
      var counter = 0;
      for (var y = 0; y < this.props.rows; y++) {
        for(var x = 0; x < this.props.columns; x++) {
		  //Note: We no longer use colorID since the API now returns just an array with the responseType
		  //as the first element, and an array of colorIDs for the rest without any labels. Saves space.
          this.drawPixel(x, y, getColor(this.props.canvas[counter++]));
        }
      }
      setDrawCanvas(false);
    }

   if(this.props.updatePixel != null) {
     const pixel = this.props.updatePixel;
     this.c.fillStyle = getColor(pixel.c)
     let x = Math.round(pixel.i % this.props.columns);
     let y = Math.floor(pixel.i / this.props.columns);
     this.c.fillRect(x * this.props.pixelSize, y * this.props.pixelSize,
     this.props.pixelSize, this.props.pixelSize);
     // Sets update pixel back to none
     setPixel(null)
    }
  }

  drawPixel(x, y, color) {
    this.c.fillStyle = color;
    var pixelX = x * this.props.pixelSize;
    var pixelY = y * this.props.pixelSize;
    this.c.fillRect(pixelX, pixelY, this.props.pixelSize, this.props.pixelSize);
  }

  onMouseDown(e) {
    document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
    this.setState({
      lastMouseX: e.screenX,
      lastMouseY: e.screenY,
      mouseIsDown: true,
      dragOriginX: this.state.canvasX,
      dragOriginY: this.state.canvasY,
      draggedX: 0.0,
      draggedY: 0.0
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
      var moveX = e.screenX - this.state.lastMouseX;
      var moveY = e.screenY - this.state.lastMouseY;
      this.setState({
        lastMouseX: e.screenX,
        lastMouseY: e.screenY,
        draggedX: this.state.draggedX + moveX,
        draggedY: this.state.draggedY + moveY
      });

      // Only drag if the mouse has moved enough
      if (this.state.draggedX * this.state.draggedX + this.state.draggedY * this.state.draggedY > dragThreshold * dragThreshold)
      {
        this.setState({
          canvasX: this.state.dragOriginX + this.state.draggedX,
          canvasY: this.state.dragOriginY + this.state.draggedY,
          dragging: true
        });
      }
      else
      {
        this.setState({
          canvasX: this.state.dragOriginX,
          canvasY: this.state.dragOriginY,
          dragging: false
        });
      }
    }
    else { //dim pixel under cursor
      var mouseX = (e.pageX - this.canvas.offsetLeft - this.state.canvasX) / this.state.scale;
      var mouseY = (e.pageY - this.canvas.offsetTop - this.state.canvasY) / this.state.scale;
      var pixelX = Math.floor(mouseX/this.props.pixelSize);
      var pixelY = Math.floor(mouseY/this.props.pixelSize);

      if (pixelX !== this.state.dimX || pixelY !== this.state.dimY) {
        var pixelIndex = pixelY * this.props.columns + pixelX;
        var color = this.props.canvas[pixelIndex];

        this.c.fillStyle = getColor(this.props.activeColor);
        this.c.globalAlpha = 0.4;
        this.c.fillRect(pixelX * this.props.pixelSize, pixelY * this.props.pixelSize,
        this.props.pixelSize, this.props.pixelSize);
        this.c.globalAlpha = 1.0;

        //redraw the pixel that was previusly dimmed
        if (this.state.dimmedColor >= 0)
        {
          var dimmed = getColor(this.state.dimmedColor);
          this.drawPixel(this.state.dimX, this.state.dimY, dimmed);
        }

        this.setState({
          dimX: pixelX,
          dimY: pixelY,
          dimmedColor: color
        });
      }
      // Start timer to check if mouse has not moved 
      // for long enough to display info about pixel.
      clearInterval(this.state.timer) // TODO: This may not be needed since we overrite the variable?
      if (this.state.pixelInfoVisible) { this.setState({ pixelInfoVisible: false }); }
      this.state.timer = setTimeout(() => this.showPixelInfo(e), pixelInfoTresholdInMs);
    }

    this.setState({
      mouseWasDown: this.state.mouseIsDown
    });
  }

  showPixelInfo(e) {
    var mouseX = (e.pageX - this.canvas.offsetLeft - this.state.canvasX) / this.state.scale;
    var mouseY = (e.pageY - this.canvas.offsetTop - this.state.canvasY) / this.state.scale;
    this.setState({
      pixelInfoVisible: true,
      lastCalculatedMousePosX: mouseX,
      lastCalculatedMousePosY: mouseY
    });
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

    if ((delta > 0 && this.state.scale > 3.0) || (delta < 0 && this.state.scale < 0.25)) return;

    var factor = Math.pow(1.1, delta);

    var mouseX = (e.pageX - this.canvas.offsetLeft - this.state.canvasX) / this.state.scale;
    var mouseY = (e.pageY - this.canvas.offsetTop - this.state.canvasY) / this.state.scale;
    this.scale(factor, mouseX, mouseY);
  }

  translate(x, y) {
    var newX = this.state.canvasX + x;
    var newY = this.state.canvasY + y;
    this.setState({
      canvasX: newX,
      canvasY: newY
    });
  }

  getCanvasSize() {
    var width = this.props.columns * this.props.pixelSize
    var height = this.props.rows * this.props.pixelSize
    return [width, height]
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
    const [canvasWidth, canvasHeight] = this.getCanvasSize()

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
          { // Show pixel info box if pixelInfoVisible set to true and
            // mouse is inside the canvas.
            this.state.pixelInfoVisible && 
            isMouseInsideCanvas(this.state.lastCalculatedMousePosX, 
              this.state.lastCalculatedMousePosY, canvasWidth, canvasHeight) &&
            
            // Show pixel info at mouse coords.
            <PixelInfo 
              mouseX={this.state.lastCalculatedMousePosX}
              mouseY={this.state.lastCalculatedMousePosY}
              pixelX={this.state.dimX}
              pixelY={this.state.dimY}
             />
          }

          <canvas id="canvas" ref={(c) => {
                    if(c != null) {
                      this.c = c.getContext('2d', { alpha: false });
                      this.canvas = c;
                    }}
                  }
                  width={canvasWidth}
                  height={canvasHeight}/>
        </div>
      </div>
    )
  }
}

export default Canvas;
