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
        Color menu!
        <input type="radio" name="color1" value="color1" /> Color1
        <input type="radio" name="color1" value="color1" /> Color2
        <input type="radio" name="color1" value="color1" /> Color3
      </div>
    )
  }
}

export default ColorMenu;
