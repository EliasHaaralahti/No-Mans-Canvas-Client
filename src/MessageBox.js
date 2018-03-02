import React from 'react';
import './MessageBox.css';

// TODO: Use const instead of component
class MessageBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(!this.props.visible) return null;

    const className = this.props.warning ? "warning" : "message";
    return (
        <div className={className}>
          { this.props.message }
          <input type="button" className="ok-button" value="Ok" />
        </div>
    )
  }
}

export default MessageBox;
