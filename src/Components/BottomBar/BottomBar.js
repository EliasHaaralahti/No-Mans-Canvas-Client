import React from 'react';
import './BottomBar.css';
import { colorPickerVisible, setCreditsMenuVisibility, 
  setActiveColor, setAdminmenuVisible } from '../../AppActions';
import SelectableColor from './Components/SelectableColor/SelectableColor';
import { getColor } from '../../App';

class BottomBar extends React.Component {
  constructor(props) {
    super(props);
    this.onColorSelected = this.onColorSelected.bind(this);
    this.onOpenPicker = this.onOpenPicker.bind(this);
  }

  onColorSelected(color) {
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
    for (var i = 0; i < this.props.colors.length; ++i) {
      var checked = parseInt(this.props.activeColor, 10) === parseInt(this.props.colors[i].ID, 10)
      colors.push(<SelectableColor colorID={this.props.colors[i].ID} rgb={getColor(this.props.colors[i].ID)} key={i}
        group="colorSelect" onSelectionChanged={this.onColorSelected}
        checked={checked} />)
    }

    var progressBarLength = (this.props.expCollected / this.props.expToNext) * 100 + "%";
    var tilesLeftBarLength = (this.props.remainingTiles / this.props.userTiles) * 100 + "%";
    return (
      <div className="bottomBar">
        <style>
          @import url('https://fonts.googleapis.com/css?family=Open+Sans');
        </style>
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
		  
          <button 
            onClick={() => setCreditsMenuVisibility(!this.props.creditsVisible)} 
            className={'creditsButton'}>
              About
          </button>

          { this.props.isAdmin && // Conditionally render only if admin.
            <button
              onClick={() => setAdminmenuVisible(!this.props.adminMenuVisible)} 
              className={'adminButton'}>
                Admin
            </button> 
          }
          
        </div>
      </div>
    )
  }
}

export default BottomBar;
