import React from 'react';
import './ColorSelector.css';

const ColorSelector = ({ colorID, group, rgb, onSelectionChanged, checked}) => {
  return (
    <div className="colorSelect">
      <input type="checkbox" id={colorID + group} name={group}
        value={colorID} onChange={(e) => onSelectionChanged(e.target.value)} checked={checked} />
      <label htmlFor={colorID + group} style={{ backgroundColor:rgb }}></label>
    </div>
  )
}

export default ColorSelector;
