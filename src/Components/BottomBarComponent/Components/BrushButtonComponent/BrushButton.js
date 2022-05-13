import React from 'react';
import './BrushButton.css';
import { toggleAdminBrushMode } from '../../../../AppActions';

const BrushButton = ({ visible, modeEnabled }) => {
  let buttonStyle = {
    backgroundColor: 'green',
  };
  let buttonText = 'Cleanup';
  if (modeEnabled) {
    buttonStyle = {
        backgroundColor: 'red',
    };
    buttonText = 'Enabled';
  }
  
  if (!visible) return null;
  return (
    <button onClick={toggleAdminBrushMode} style={buttonStyle}>{buttonText}</button>
  )
}

export default BrushButton;
