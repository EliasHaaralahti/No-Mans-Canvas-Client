import React from 'react';
import './BanButton.css';
import { toggleBanMode } from '../../../../AppActions';

const BanButton = ({ visible, modeEnabled }) => {
  if (!visible) return null;
  return (
    <button 
        onClick={toggleBanMode}
        className={modeEnabled 
          ? 'banButton-enabled' : 'banButton-disabled'}
    >
      {modeEnabled ? 'Armed' : 'Ban'}
    </button>
  )
}

export default BanButton;
