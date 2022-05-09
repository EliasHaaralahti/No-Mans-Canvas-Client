import './AdminMenu.css';
import { setAdminmenuVisible } from './AppActions';
import BanButton from './BanButton';

const AdminMenu = ({ visible, isAdmin, banModeEnabled }) => {
  if (!visible || !isAdmin) return null;
  return (
    <div className={`adminBox`}>
      <BanButton visible={isAdmin} modeEnabled={banModeEnabled}/>

      <button onClick={() => setAdminmenuVisible(!visible)} className={'OkButton'} >
        OK
      </button>
    </div>
  )
}

export default AdminMenu;
