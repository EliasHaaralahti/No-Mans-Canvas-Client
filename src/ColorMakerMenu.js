import React from 'react';
import './ColorMakerMenu.css';
import { sendNick } from './App';
//import { setNickName } from './AppActions';
import SelectableColor from './SelectableColor';
import { colorPickerVisible } from './AppActions';

class ColorMakerMenu extends React.Component {
  constructor(props) {
    // Give available colors as props
    super(props);
    this.state = {
      nickname: "",
      customRed: 255,
      customGreen: 255,
      customBlue: 255,
      selectedColor: 0
    }
    this.onNickChanged = this.onNickChanged.bind(this);
    this.getCustomRGB = this.getCustomRGB.bind(this);
    this.onRedChanged = this.onRedChanged.bind(this);
    this.onGreenChanged = this.onGreenChanged.bind(this);
    this.onBlueChanged = this.onBlueChanged.bind(this);
    this.parseColor = this.parseColor.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }

  getCustomRGB() {
    var red = this.state.customRed.toString(16);
    if (red.length < 2) red = '0' + red;
    var green = this.state.customGreen.toString(16);
    if (green.length < 2) green = '0' + green;
    var blue = this.state.customBlue.toString(16);
    if (blue.length < 2) blue = '0' + blue;
    var color = '#' + red + green + blue;
    return color;
  }

  parseColor(color) {
    var value;
    if (color === "") value = 0;
    else value = parseInt(color, 10);
    if (value < 0 || isNaN(value)) value = 0;
    else if (value > 255) value = 255;

    return value;
  }

  onNickChanged(e) {
    var value = e.target.value;
    this.setState({
      nickname: value
    });
    console.log("Setting nick to" + value);
  }

  onRedChanged(e) {
    var value = this.parseColor(e.target.value);
    this.setState({
      customRed: value
    });
    console.log("Setting red to " + value);
  }

  onGreenChanged(e) {
    var value = this.parseColor(e.target.value);
    this.setState({
      customGreen: value
    });
    console.log("Setting green to " + value);
  }

  onBlueChanged(e) {
    var value = this.parseColor(e.target.value);
    this.setState({
      customBlue: value
    });
    console.log("Setting blue to " + value);
  }


  onSelectionChanged(color) {
    this.setState({
      selectedColor: color
    });
    console.log("selected color " + color);
  }

  onCancel() {
    colorPickerVisible(false)
  }

  onCreate() {
    //console.log("creating color " + this.state.selectedColor);
    console.log("Setting nickname");
    sendNick(this.state.nickname);
    colorPickerVisible(false)
  }


  render() {
    if (!this.props.visible) return null;

    //TODO dynamic colors
    //TODO color saving
    // TODO: Not implemented = Create

    return (
      <div className="overlay">
        <div className="colorMakerMenu">
          <style>
            @import url('https://fonts.googleapis.com/css?family=Open+Sans');
        </style>
          <label for="nick">Set your nickname to appear in the highscores!</label>
          <form>
            <input type="text" name="nick" defaultValue="" onChange={this.onNickChanged} />
            <br />
          </form>
          <div className="buttons">
            <button type="button" onClick={this.onCancel}>Cancel</button>
            <button type="button" onClick={this.onCreate}>Set nickname</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ColorMakerMenu
