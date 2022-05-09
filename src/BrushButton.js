import React from 'react';
import './BrushButton.css';
import { toggleAdminBrushMode } from './AppActions';

class BrushButton extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick(e) {
	toggleAdminBrushMode()
  }

  render() {
	let buttonStyle = {
	  backgroundColor: 'green',
	};
	let buttonText = 'Cleanup';
	if (this.props.modeEnabled) {
	  buttonStyle = {
        backgroundColor: 'red',
	  };
	  buttonText = 'Enabled';
	}
    if (!this.props.visible) return null;

    return (
	  <button onClick={this.onClick} style={buttonStyle}>{buttonText}</button>
    )
  }
}

export default BrushButton;
