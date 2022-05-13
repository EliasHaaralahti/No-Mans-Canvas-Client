import React from 'react';
import './BottomBar.css';
import { colorPickerVisible, setCreditsMenuVisibility, 
  setActiveColor, setAdminmenuVisible } from '../../AppActions';
import ColorSelector from './Components/ColorSelectorComponent/ColorSelector';
import { getColor } from '../../App';
import BrushButton from '../AdminMenuComponent/Components/BrushButtonComponent/BrushButton';


class BottomBar extends React.Component {
  constructor(props) {
    super(props);
    this.onColorSelected = this.onColorSelected.bind(this);
    this.onOpenPicker = this.onOpenPicker.bind(this);
  }

  onColorSelected(color) {
    console.log("color selected: " + color);
    //FIXME: Wonder why color comes in as a string here?
    setActiveColor(parseInt(color, 10));
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
      colors.push(<ColorSelector colorID={this.props.colors[i].ID} rgb={getColor(this.props.colors[i].ID)} key={i}
        group="colorSelect" onSelectionChanged={this.onColorSelected}
        checked={checked} />)
        //checked={this.props.activeColor === this.props.colors[i].ID} />)
    }

    var progressBarLength = (this.props.expCollected / this.props.expToNext) * 100 + "%";
    var tilesLeftBarLength = (this.props.remainingTiles / this.props.userTiles) * 100 + "%";
    return (
      <div className="bottomBar">
        <style>
          @import url('https://fonts.googleapis.com/css?family=Open+Sans');
        </style>
        <BrushButton visible={this.props.showCleanupBtn} modeEnabled={this.props.adminBrushEnabled}/>
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

          { this.props.showBanBtn && // Conditionally render only if admin.
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
