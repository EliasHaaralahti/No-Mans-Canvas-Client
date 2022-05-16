import './PixelInfo.css';
import {createCSSTransformBuilder } from "easy-css-transform-builder";

const builder = createCSSTransformBuilder();

const PixelInfo = ({ mouseX, mouseY, pixelX, pixelY, canvasScale }) => {
  const pixelInfoXOffset = 2;
  const pixelInfoYOffset = -2;

  return (
    <div 
      className={'pixelInfo'}
      style={{
		left: mouseX + pixelInfoXOffset,
        top: mouseY + pixelInfoYOffset,
	    transformOrigin: '0 0',
        transform: builder({
          scale: 1/canvasScale,
		})
	  }}>
      X: {pixelX}, Y: {pixelY}
    </div>
  )
}

export default PixelInfo;
