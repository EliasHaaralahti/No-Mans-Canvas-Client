import React from 'react';
import './ColorMenu.css';

class ColorMenu extends React.Component {
  constructor(props) {
    // Give available colors as props
    super(props);
    this.state = {
      color1: "#ff0000",
      color2: "#ffff00",
      color3: "#000000"
    }
  }

  // TODO: Properly set text in css
  // TODO: Create a separate color select component (?)
  render() {
    return (
      <div className="menu">
        <p>Color menu!</p>
        <div className="colorSelect">
        <input type="radio" id="color1" name="color" value="color1" />
        <label htmlFor="color1"></label>
        </div>
        <div className="colorSelect">
        <input type="radio" id="color2" name="color" value="color2" />
        <label htmlFor="color2"></label>
        </div>
        <div className="colorSelect">
        <input type="radio" id="color3" name="color" value="color3" />
        <label htmlFor="color3"></label>
        </div>
      </div>
    )
  }
}

export default ColorMenu;
