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
      Pick a color!<br/>
      <input type="radio" value="color1" name="color1" />
      <input type="radio" name="color1" value="color1" />
      <input type="radio" name="color1" value="color1" />
      <input type="radio" value="color1" name="color1" />
      <input type="radio" name="color1" value="color1" />
      <input type="radio" name="color1" value="color1" /> <br/>
      Or make your own one! <br/>
      <form>
      'R:'
      <input type="text" name="red"/>
      'G:'
      <input type="text" name="green"/>
      'B:'
      <input type="text" name="blue"/>
      </form>
      <div className="sample"></div>
      <button type="button">Create</button> <br/>
      <button type="button">Cancel</button>
      </div>
    )
  }
}

export default ColorMakerMenu;
