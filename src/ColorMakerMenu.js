import React from 'react';
import './ColorMakerMenu.css';
import SelectableColor from './SelectableColor';

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
    //if(!this.props.visible) return null;

    return (
      <div className="colorMakerMenu">
        <div className="offset">
          Pick a color!<br/>
          <p>Your Colors</p>
          <SelectableColor rgb="#FF0000" group="colorMaker"/>
          <SelectableColor rgb="#00FF00" group="colorMaker"/>
          <SelectableColor rgb="#0000FF" group="colorMaker"/>
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
          </form>
          <SelectableColor rgb="#FF00FF" group="colorMaker"/>
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
