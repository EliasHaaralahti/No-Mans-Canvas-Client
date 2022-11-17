import React from 'react';
import './Canvas.css';
import { setPixel, setDrawCanvas, addUserExp, substractUserTiles } from '../../AppActions';
import { sendTile, sendBan, sendBrushClick, getColor, getTileInfo } from '../../App';
import { createCSSTransformBuilder } from "easy-css-transform-builder";
import PixelInfo from './Components/PixelInfoComponent/PixelInfo';
import { isMouseInsideCanvas } from './canvasUtils'

const builder = createCSSTransformBuilder();

const dragThreshold = 15;
const zoomMass = 40; // Larger = slower
const zoomFactor = 1.1;
const minZoom = 20.0;
const maxZoom = 0.5;
const pixelInfoTresholdInMs = 2000;

class Canvas extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        // This is only updated when showing pixel info.
        lastCalculatedMousePosX: 0.0,
        lastCalculatedMousePosY: 0.0,
        // This is used for dragging.
        lastMouseX: 0.0,
        lastMouseY: 0.0,
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
  }

  onClick(e) {
    e.preventDefault();
    var mouseX = (e.pageX - this.canvas.offsetLeft - this.state.canvasX) / this.state.scale;
    var mouseY = (e.pageY - this.canvas.offsetTop - this.state.canvasY) / this.state.scale;

    var pixelX = Math.floor(mouseX);
    var pixelY = Math.floor(mouseY);

    if ( !isMouseInsideCanvas(pixelX, pixelY, this.props.columns-1, this.props.rows-1) ) return;
    
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

      var counter = 0;
      for (var y = 0; y < this.props.rows; y++) {
        for(var x = 0; x < this.props.columns; x++) {
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
     this.c.fillRect(x, y, 1, 1);
     // Sets update pixel back to none
     setPixel(null)
    }
  }

  drawPixel(x, y, color) {
    this.c.fillStyle = color;
    this.c.fillRect(x, y, 1, 1);
  }

  onMouseDown(e) {
    document.body.style.mozUserSelect = document.body.style.webkitUserSelect 
      = document.body.style.userSelect = 'none';
    
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
    else { // mouse is not down, dim pixel under cursor
      var mouseX = (e.pageX - this.canvas.offsetLeft - this.state.canvasX) / this.state.scale;
      var mouseY = (e.pageY - this.canvas.offsetTop - this.state.canvasY) / this.state.scale;
      var pixelX = Math.floor(mouseX);
      var pixelY = Math.floor(mouseY);

      if (pixelX !== this.state.dimX || pixelY !== this.state.dimY) {
        var pixelIndex = pixelY * this.props.columns + pixelX;
        var color = this.props.canvas[pixelIndex];

        this.c.fillStyle = getColor(this.props.activeColor);
        this.c.globalAlpha = 0.4;
        this.c.fillRect(pixelX, pixelY, 1, 1);
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
      clearInterval(this.state.timer);
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
    var pixelX = Math.floor(mouseX);
    var pixelY = Math.floor(mouseY);
    if ( !isMouseInsideCanvas(pixelX, pixelY, this.props.columns-1, this.props.rows-1) ) return;
	getTileInfo(pixelX, pixelY);
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
    const delta = -e.deltaY / zoomMass;
    if ((delta > 0 && this.state.scale > minZoom) || (delta < 0 && this.state.scale < maxZoom)) return;
    var factor = Math.pow(zoomFactor, delta);

    var mouseX = (e.pageX - this.canvas.offsetLeft - this.state.canvasX) / this.state.scale;
    var mouseY = (e.pageY - this.canvas.offsetTop - this.state.canvasY) / this.state.scale;
    this.scale(factor, mouseX, mouseY);
  }

  translate(x, y) {
    this.setState({
      canvasX: this.state.canvasX + x,
      canvasY: this.state.canvasY + y
    });
  }

  scale(factor, originX = this.canvas.width / 2, originY = this.canvas.height / 2) {
    var moveX = (1.0 - factor) * originX * this.state.scale;
    var moveY = (1.0 - factor) * originY * this.state.scale;
    this.translate(moveX, moveY);

    this.setState({
      scale: this.state.scale * factor
    });
  }

  render() {
    const [canvasWidth, canvasHeight] = [ this.props.columns, this.props.rows ]

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
              canvasScale={this.state.scale}
              placerInfo={this.props.placerInfo}
             />
          }

          <canvas style={{imageRendering: 'pixelated'}} id="canvas" ref={(c) => {
              if(c != null) {
                this.c = c.getContext('2d', { alpha: false });
                this.canvas = c;
              }}
            }
            width={canvasWidth}
            height={canvasHeight}
          />
        </div>
      </div>
    )
  }
}

export default Canvas;
