import React from 'react';
import './AdminMenu.css';
import { setAdminmenuVisible } from './AppActions';
import BanButton from './BanButton';

// TODO: Use const instead of class.
const AnotherComponent = ({ someElement }) => {
  return <div>I’m the return! </div>
}

// TODO: Use const instead of component
class AdminMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  onConfirm(visible) {
    setAdminmenuVisible(!visible)
  }

  render() {
    if (!this.props.visible) return null;
    return (
      <div className={`adminBox`}>
        <BanButton visible={this.props.isAdmin} modeEnabled={this.props.banModeEnabled}/>

        <button onClick={() => this.onConfirm(this.props.visible)} className={'OkButton'} >
          OK
        </button>
      </div>
    )
  }
}

export default AdminMenu;
