import './AdminMenu.css';
import { setAdminmenuVisible, toggleBanMode, toggleAdminBrushMode } from '../../AppActions';
import ToggleButton from './Components/ToggleButtonComponent/ToggleButton';

const AdminMenu = ({ visible, showBanBtn, banModeEnabled, showCleanupBtn, adminBrushEnabled }) => {  
  if (!visible || !showBanBtn) return null;
  return (
    <div className={`adminBox`}>
      <ToggleButton 
        visible={showBanBtn} 
        enabled={banModeEnabled}
        action={toggleBanMode}
        neutralText='Ban'
        activatedText='Ban Armed'
      />

      <ToggleButton 
        visible={showCleanupBtn}
        enabled={adminBrushEnabled}
        action={toggleAdminBrushMode}
        neutralText='Cleanup'
        activatedText='Cleanup Enabled'
      />

      <button onClick={() => setAdminmenuVisible(!visible)} className={'OkButton'} >
        OK
      </button>
    </div>
  )
}

export default AdminMenu;
