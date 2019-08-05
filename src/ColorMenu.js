import React from 'react';

import './ColorMenu.css';
import { colorPickerVisible } from './AppActions';
import { setActiveColor } from './AppActions';
import SelectableColor from './SelectableColor';
import { getColor } from './App';

class ColorMenu extends React.Component {
  constructor(props) {
    // TODO: Give available colors as props
    super(props);
    this.onColorSelected = this.onColorSelected.bind(this);
    this.onOpenPicker = this.onOpenPicker.bind(this);
  }

  onColorSelected(color) {
    console.log("color selected: " + color);
    setActiveColor(color);
  }

  onOpenPicker(e) {
    colorPickerVisible(true);
  }

  render() {
    var colors = [];
    for (var i = 1; i < this.props.colors.length; ++i) {
      colors.push(<SelectableColor colorID={this.props.colors[i].ID} rgb={getColor(this.props.colors[i].ID)} key={i}
              group="colorSelect" onSelectionChanged={this.onColorSelected}
              checked={parseInt(this.props.activeColor, 10) === parseInt(this.props.colors[i].ID, 10)}/>)
    }

    // TODO: Does -10 scale well?
    var progressBarLength = (this.props.expCollected / this.props.expToNext) * 100 - 10 + "%";
    var tilesLeftBarLength = (this.props.remainingTiles / this.props.userTiles) * 100 - 10 + "%";
    return (
      <div className="colorMenu">
        <style>
        @import url('https://fonts.googleapis.com/css?family=Open+Sans');
        </style>
        <div className="offset">

          <p>Your Colors</p>
          {colors}

          <div className="progressContainer">
            <p className="progressInfo">To next level: {this.props.expCollected}/{this.props.expToNext}</p>
            <div className="progressBar" style={{width:progressBarLength}} />
          </div>
          <div className="progressContainer">
            <p className="progressInfo">Tiles remaining: {this.props.remainingTiles}/{this.props.userTiles}</p>
            <div className="progressBar" style={{width:tilesLeftBarLength}} />
          </div>
          <p>Level: {this.props.userLevel}</p>
          <p>Connected users: {this.props.connectedUsers}</p>
	  <p>By: <a href="https://twitter.com/vkoskiv">vkoskiv</a>, <a href="https://twitter.com/moletrooper">moletrooper</a>, <a href="https://github.com/EliasHaaralahti">Elias</a></p>
          <button type="button" onClick={this.onOpenPicker}
            className="getColorsBtn">Set Nickname</button> <br/>

        </div>
      </div>
    )
  }
}

export default ColorMenu;
