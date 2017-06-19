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
        <input type="radio" id={this.props.rgb+this.props.group} name={this.props.group}
          value={this.props.rgb} onChange={this.handleSelectionChange} />
        <label htmlFor={this.props.rgb+this.props.group} style={{backgroundColor:this.props.rgb}}></label>
      </div>
    )
  }
}

export default SelectableColor;
