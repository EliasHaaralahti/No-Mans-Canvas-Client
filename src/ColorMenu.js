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
      <div className="colorMenu">
        <div className="offset">
          <p>Your Colors</p>
          <div className="colorSelect">
            <input type="radio" id="color1" name="color" value="color1" />
            <label htmlFor="color1" style={{backgroundColor:"red"}}></label>
          </div>
          <div className="colorSelect">
            <input type="radio" id="color2" name="color" value="color2" />
            <label htmlFor="color2" style={{backgroundColor:"green"}}></label>
          </div>
          <div className="colorSelect">
            <input type="radio" id="color3" name="color" value="color3" />
            <label htmlFor="color3" style={{backgroundColor:"blue"}}></label>
          </div> <br/>

          <progress value="14" max="100">Ladadii</progress>

          <button type="button" className="getColorsBtn">Get more!</button> <br/>
        </div>
      </div>
    )
  }
}

export default ColorMenu;
