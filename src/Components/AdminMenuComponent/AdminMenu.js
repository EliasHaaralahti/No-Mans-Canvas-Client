import './AdminMenu.css';
import { setAdminmenuVisible } from '../../AppActions';
import BanButton from './Components/BanButtonComponent/BanButton';
import BrushButton from './Components/BrushButtonComponent/BrushButton';

const AdminMenu = ({ visible, showBanBtn, banModeEnabled, showCleanupBtn, adminBrushEnabled }) => {  
  if (!visible || !showBanBtn) return null;
  return (
    <div className={`adminBox`}>
      <BanButton visible={showBanBtn} modeEnabled={banModeEnabled}/>
      <BrushButton visible={showCleanupBtn} modeEnabled={adminBrushEnabled}/>

      <button onClick={() => setAdminmenuVisible(!visible)} className={'OkButton'} >
        OK
      </button>
    </div>
  )
}

export default AdminMenu;
