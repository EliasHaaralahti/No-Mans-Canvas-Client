import React from 'react';
import './ColorMakerMenu.css';

class ColorMakerMenu extends React.Component {
  constructor(props) {
    // Give available colors as props
    super(props);
    this.state = {
      // Example states
      color1: "#ff0000",
      color2: "#ffff00",
      color3: "#000000"
    }
  }

  render() {
    // Functional but currently doesn't re-render the component when state changes
    if(!this.props.visible) return null;

    return (
      <div className="colorMakerMenu">
        <div className="offset">
          Pick a color!<br/>
          <p>Your Colors</p>
          <div className="colorMakerSelect">
            <input type="radio" id="color1" name="color" value="color1" />
            <label htmlFor="color1" style={{backgroundColor:"pink"}}></label>
          </div>
          <div className="colorMakerSelect">
            <input type="radio" id="color2" name="color" value="color2" />
            <label htmlFor="color2" style={{backgroundColor:"teal"}}></label>
          </div>
          <div className="colorMakerSelect">
            <input type="radio" id="color3" name="color" value="color3" />
            <label htmlFor="color3" style={{backgroundColor:"brown"}}></label>
          </div>
          <br/>
          Or make your own one with RGB-values! <br/>
          <form>
          R:
          <input type="text" name="red"/>
          G:
          <input type="text" name="green"/>
          B:
          <input type="text" name="blue"/>
          <br/>
          <div className="colorMakerSelect">
            <input type="radio" id="colorX" name="color" value="colorX" />
            <label htmlFor="colorX" style={{backgroundColor:"lime"}}>Preview:</label>
          </div>
          </form>
          <div className="buttons">
            <button type="button">Cancel</button>
            <button type="button">Create</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ColorMakerMenu;
