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
    if(!this.props.visible) return null;

    const className = this.props.warning ? "warning" : "message";
    return (
        <div className={className}>
          { this.props.message }
          <input type="button" className="ok-button" value="ok" onClick={this.onConfirm} />
        </div>
    )
  }
}

export default MessageBox;
