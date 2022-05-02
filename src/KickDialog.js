import React from 'react';
import './KickDialog.css';
import { setKickDialogVisibility } from './AppActions';
import { resumeConnection } from './App';

class KickDialog extends React.Component {
  constructor(props) {
    super(props);
  }

  onConfirm() {
	resumeConnection()
    setKickDialogVisibility(false)
  }

  render() {
    if (!this.props.visible) return null;

    return (
      <div className="overlay">
        <div className={`messageBox`}>
          <p>{this.props.message}</p>
          <button className="button" onClick={this.onConfirm} >{this.props.btn_text}</button>
        </div>
      </div>
    )
  }
}

export default KickDialog;
