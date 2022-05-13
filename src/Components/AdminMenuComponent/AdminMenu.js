import './AdminMenu.css';
import { setAdminmenuVisible } from '../../AppActions';
import BanButton from './Components/BanButtonComponent/BanButton';

const AdminMenu = ({ visible, showBanBtn, banModeEnabled }) => {
  if (!visible || !showBanBtn) return null;
  return (
    <div className={`adminBox`}>
      <BanButton visible={showBanBtn} modeEnabled={banModeEnabled}/>

      <button onClick={() => setAdminmenuVisible(!visible)} className={'OkButton'} >
        OK
      </button>
    </div>
  )
}

export default AdminMenu;
