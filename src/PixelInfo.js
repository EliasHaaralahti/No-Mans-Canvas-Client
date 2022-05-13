import './PixelInfo.css';

const PixelInfo = ({ mouseX, mouseY, pixelX, pixelY }) => {
  const pixelInfoXOffset = 8;
  const pixelInfoYOffset = -24;

  return (
    <div 
      className={'pixelInfo'}
      style={{left: mouseX + pixelInfoXOffset, 
              top: mouseY + pixelInfoYOffset}}
    >
      Pixel X: {pixelX}, Y: {pixelY}
    </div>
  )
}

export default PixelInfo;
