import React from 'react';

import './ColorMenu.css';
import { colorPickerVisible } from './AppActions';
import { setActiveColor } from './AppActions';
import SelectableColor from './SelectableColor';
import { getColor } from './App';
import BanButton from './BanButton';

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

  onBanClicked(e) {
	console.log(e);
  }

  render() {
    var colors = [];
    for (var i = 1; i < this.props.colors.length; ++i) {
      colors.push(<SelectableColor colorID={this.props.colors[i].ID} rgb={getColor(this.props.colors[i].ID)} key={i}
        group="colorSelect" onSelectionChanged={this.onColorSelected}
        checked={parseInt(this.props.activeColor, 10) === parseInt(this.props.colors[i].ID, 10)} />)
    }

    var progressBarLength = (this.props.expCollected / this.props.expToNext) * 100 + "%";
    var tilesLeftBarLength = (this.props.remainingTiles / this.props.userTiles) * 100 + "%";
    return (
      <div className="colorMenu">
        <style>
          @import url('https://fonts.googleapis.com/css?family=Open+Sans');
        </style>
		<BanButton visible={this.props.isAdmin} modeEnabled={this.props.banModeEnabled}/>
        <button type="button" onClick={this.onOpenPicker} className="setNickButton">
          Set Nickname
        </button>
        <div className="colorArea">
          {colors}
        </div>
        <div className="progressContainer">
          <span className="progressInfo">
            To next level: {this.props.expCollected}/{this.props.expToNext}
          </span>
          <div className="progressBar" style={{ width: progressBarLength }} />
        </div>
        <div className="progressContainer">
          <span className="progressInfo">
            Tiles remaining: {this.props.remainingTiles}/{this.props.userTiles}
          </span>
          <div className="progressBar" style={{ width: tilesLeftBarLength }} />
        </div>
        <div className="statsArea">
          <span>Level: {this.props.userLevel}</span>
          <span>Connected users: {this.props.connectedUsers}</span>
        </div>
        <div className="creatorArea">
          <span>By NAND-Gurut:</span>
          <ul className="creatorList">
            <li><a href="https://twitter.com/vkoskiv">vkoskiv</a></li>
            <li><a href="https://twitter.com/moletrooper">moletrooper</a></li>
            <li><a href="https://github.com/EliasHaaralahti">Elias</a></li>
            <li><a href="https://github.com/JonniP">Jonni</a></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default ColorMenu;
