import React from 'react';
import './ColorMakerMenu.css';
import SelectableColor from './SelectableColor';
import { colorPickerVisible } from './AppActions';

class ColorMakerMenu extends React.Component {
  constructor(props) {
    // Give available colors as props
    super(props);
    this.state = {
      customRed: 255,
      customGreen: 255,
      customBlue: 255,
      selectedColor: 0
    }
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
    var color = '#'+red+green+blue;
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

  onRedChanged(e) {
    var value = this.parseColor(e.target.value);
    this.setState({
      customRed: value
    });
    console.log("Setting red to "+value);
  }

  onGreenChanged(e) {
    var value = this.parseColor(e.target.value);
    this.setState({
      customGreen: value
    });
    console.log("Setting green to "+value);
  }

  onBlueChanged(e) {
    var value = this.parseColor(e.target.value);
    this.setState({
      customBlue: value
    });
    console.log("Setting blue to "+value);
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

  onCreate(){
    console.log("creating color " + this.state.selectedColor);
    colorPickerVisible(false)
  }


  render() {
    if(!this.props.visible) return null;

    //TODO dynamic colors
    //TODO color saving

    return (
      <div className="colorMakerMenu">
        <style>
          @import url('https://fonts.googleapis.com/css?family=Open+Sans');
        </style>
        <div className="offset">
<<<<<<< HEAD
          <p>Pick a color!</p>
          <SelectableColor rgb="#FF0000" group="colorMaker" onSelectionChanged={this.onSelectionChanged}/>
          <SelectableColor rgb="#00FF00" group="colorMaker" onSelectionChanged={this.onSelectionChanged}/>
          <SelectableColor rgb="#0000FF" group="colorMaker" onSelectionChanged={this.onSelectionChanged}/>
          <br/>
=======
          <p>Pick a color!</p><br/>
          <SelectableColor rgb={0} group="colorMaker" onSelectionChanged={this.onSelectionChanged}/>
          <SelectableColor rgb={1} group="colorMaker" onSelectionChanged={this.onSelectionChanged}/>
          <SelectableColor rgb={2} group="colorMaker" onSelectionChanged={this.onSelectionChanged}/>
          <br/><br/>
>>>>>>> bffde8f79ed3fe7e23a81df909e92d2c92dc6e87
          Or make your own one with RGB-values! <br/>
          <form>
          R:
          <input type="text" name="red" defaultValue={255} onChange={this.onRedChanged}/>
          G:
          <input type="text" name="green" defaultValue={255} onChange={this.onGreenChanged}/>
          B:
          <input type="text" name="blue" defaultValue={255} onChange={this.onBlueChanged}/>
          <br/>
          </form>
          <SelectableColor rgb={this.getCustomRGB()} group="colorMaker" onSelectionChanged={this.onSelectionChanged}/>
          <div className="buttons">
            <button type="button" onClick={this.onCancel}>Cancel</button>
            <button type="button" onClick={this.onCreate}>Create</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ColorMakerMenu
