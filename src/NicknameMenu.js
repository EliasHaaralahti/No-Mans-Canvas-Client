import React from 'react';
import './NicknameMenu.css';
import { sendNick } from './App';
import { colorPickerVisible } from './AppActions';

class NicknameMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: ""
    }
    this.onNickChanged = this.onNickChanged.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.OnYes = this.OnYes.bind(this);
  }

  onNickChanged(e) {
    var value = e.target.value;
    this.setState({
      nickname: value
    });
  }

  onCancel() {
    colorPickerVisible(false)
  }

  OnYes() {
    sendNick(this.state.nickname);
    colorPickerVisible(false)
  }


  render() {
    if (!this.props.visible) return null;
    
    return (
      <div className="overlay">
        <div className="menu">
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
            <button type="button" onClick={this.OnYes}>Set nickname</button>
          </div>
        </div>
      </div>
    )
  }
}

export default NicknameMenu
