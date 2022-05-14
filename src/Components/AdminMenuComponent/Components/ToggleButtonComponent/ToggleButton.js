import React from 'react';
import './ToggleButton.css';

const ToggleButton = ({ visible, enabled, action, neutralText, activatedText }) => {
  if (!visible) return null;
  return (
    <button 
        onClick={action}
        className={`button-base ${enabled ? "button-enabled": "button-disabled"}`}
    >
      {enabled ? activatedText : neutralText}
    </button>
  )
}

export default ToggleButton;
