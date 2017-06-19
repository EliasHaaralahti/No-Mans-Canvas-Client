import React from 'react';
import './ColorMenu.css';
import { colorPickerVisible } from './AppActions';
import SelectableColor from './SelectableColor';

class ColorMenu extends React.Component {
  constructor(props) {
    // Give available colors as props
    super(props);
    this.state = {
      selectedColor: "#000000",
      colors: ["#000000", "#FFFFFF", "#ff0000", "#0000FF", "#ffff00"]
    };
    this.onColorSelected = this.onColorSelected.bind(this);
    this.onOpenPicker = this.onOpenPicker.bind(this);
  }

  onColorSelected(color) {
    console.log("color selected: " + color);
    this.setState({
      selectedColor: color
    })
  }

  onOpenPicker(e) {
    console.log("click");
    colorPickerVisible(true);
  }

  //TODO: Dynamic progress bar
  render() {
    var colors = [];
    for (var i = 0; i < this.state.colors.length; ++i) {
      colors.push(<SelectableColor rgb={this.state.colors[i]} onSelectionChanged={this.onColorSelected}/>)
    }

    return (
      <div className="colorMenu">
        <div className="offset">

          <p>Your Colors</p>
          {colors}

          <div className="progressContainer">
            <p className="progressInfo">To next level: 15/50</p>
            <div className="progressBar" style={{width:"30%"}} />
          </div>

          <button type="button" onClick={this.onOpenPicker}
            className="getColorsBtn">Get more!</button> <br/>

        </div>
      </div>
    )
  }
}

export default ColorMenu;
