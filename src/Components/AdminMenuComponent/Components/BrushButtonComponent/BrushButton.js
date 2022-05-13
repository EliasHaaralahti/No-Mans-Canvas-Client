import React from 'react';
import './BrushButton.css';
import { toggleAdminBrushMode } from '../../../../AppActions';

const BrushButton = ({ visible, modeEnabled }) => {
  if (!visible) return null;
  return (
    <button 
        onClick={toggleAdminBrushMode}
        className={modeEnabled 
          ? 'banButton-enabled' : 'banButton-disabled'}
    >
      {modeEnabled ? 'Enabled' : 'Cleanup'}
    </button>
  )
}

export default BrushButton;
