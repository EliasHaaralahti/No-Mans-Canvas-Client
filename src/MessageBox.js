import React from 'react';
import './MessageBox.css';
import { setMessageBoxVisibility } from './AppActions';

// TODO: Use const instead of component
class MessageBox extends React.Component {
  constructor(props) {
    super(props);
  }

  onConfirm() {
    setMessageBoxVisibility(false)
  }

  render() {
    if (!this.props.visible) return null;

    const className = this.props.warning ? "warning" : "message";
    return (
      <div className="overlay">
        <div className={`messageBox ${className}`}>
          <p>{this.props.message}</p>
          <button onClick={this.onConfirm} >OK</button>
        </div>
      </div>
    )
  }
}

export default MessageBox;
