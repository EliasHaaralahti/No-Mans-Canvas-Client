import React from 'react';
import './BanButton.css';
import { toggleBanMode } from './AppActions';

class BanButton extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick(e) {
	toggleBanMode()
  }

  render() {
	let buttonStyle = {
	  backgroundColor: 'green',
	};
	let buttonText = 'Ban';
	if (this.props.modeEnabled) {
	  buttonStyle = {
        backgroundColor: 'red',
	  };
	  buttonText = 'Armed';
	}
    if (!this.props.visible) return null;

    return (
	    <button onClick={this.onClick} style={buttonStyle}>{buttonText}</button>
    )
  }
}

export default BanButton;
