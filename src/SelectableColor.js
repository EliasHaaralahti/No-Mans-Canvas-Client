import React from 'react';
import './SelectableColor.css';

class SelectableColor extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
  }

  handleSelectionChange(e) {
    this.props.onSelectionChanged(e.target.value);
  }

  render() {
    return (
      <div className="colorSelect">
        <input type="checkbox" id={this.props.colorID+this.props.group} name={this.props.group}
          value={this.props.colorID} onChange={this.handleSelectionChange} checked={this.props.checked} />
        <label htmlFor={this.props.colorID+this.props.group} style={{backgroundColor:this.props.rgb}}></label>
      </div>
    )
  }
}

export default SelectableColor;
