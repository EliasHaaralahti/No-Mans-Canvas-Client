import { fromJS } from 'immutable'

// TODO: Cleaning up: use dictionaries like user { ID, exp}
export const initialState = fromJS({
  userID: 0,
  userExp: 0,
  userExpLimit: 0,
  username: "",
  userTiles: 0,
  remainingTiles:0,
  connectedUsers:0,
  rows: 0,
  columns: 0,
  colors: [],
  canvas: [],
  updatePixel: null,
  activeColor: 6,
  showColorPicker: false,
  canvasDraw: false,
  showLoadingScreen: true,
  showNewLevelScreen: false,
  level: 1,
  showMessageBox: false,
  messageBoxText: "",
  showKickDialog: false,
  kickDialogText: "",
  kickDialogButtonText: "Ok",
  isAdmin: false,
  banModeEnabled: false
})

export default(state = initialState, action) => {
  switch (action.type) {
    case 'SET_NICKNAME': {
      return state.set('username', action.nick)
    }
    case 'SET_COLOR_PICKER_VISIBLE': {
      return state.set('showColorPicker', action.visible)
    }
    case 'SET_MESSAGE_BOX_VISIBLE': {
      return state.set('showMessageBox', action.visible)
    }
    case 'SET_MESSAGE_BOX_TEXT': {
      return state.set('messageBoxText', action.message)
    }
    case 'SET_KICK_DIALOG_VISIBLE': {
      return state.set('showKickDialog', action.visible)
    }
    case 'SET_KICK_DIALOG_TEXT': {
      return state.set('kickDialogText', action.message)
    }
    case 'SET_KICK_DIALOG_BUTTON_TEXT': {
      return state.set('kickDialogButtonText', action.btn_text)
    }
    case 'SET_LOADING_SCREEN': {
      return state.set('showLoadingScreen', action.visible)
    }
    case 'SET_USER_ID': {
      return state.set('userID', action.userID)
    }
    case 'SET_PIXEL': {
      return state.set('updatePixel', action.data)
    }
    case 'SET_PIXEL_IN_CANVAS': {
      var canvas = state.get('canvas');
      canvas[action.data.i] = action.data.c;
      return state.set('canvas', canvas);
    }
    case 'DRAW_CANVAS': {
      return state.set('canvas', action.pixels).set('canvasDraw', true)
    }
    case 'SET_DRAW_CANVAS': {
      return state.set('canvasDraw', action.bool)
    }
    case 'SET_COLORS': {
      return state.set('colors', action.colors)
    }
    case 'SET_ACTIVE_COLOR': {
      return state.set('activeColor', action.color)
    }
    case 'SET_USER_EXP': {
      return state.set('userExp', action.amount);
    }
    case 'SET_IS_ADMIN': {
      return state.set('isAdmin', action.isAdmin)
    }
    case 'TOGGLE_BAN_MODE': {
      console.log("Toggling ban mode to " + !state.get('banModeEnabled'))
      return state.set('banModeEnabled', !state.get('banModeEnabled'))
    }
    case 'SET_CONNECTED_USERS': {
      return state.set('connectedUsers', action.amount);
    }
    case 'ADD_USER_EXP': {
      var value = state.get('userExp');
      value+=1
      return state.set('userExp', value);
    }
    case 'REMOVE_USER_TILES': {
      var subValue = state.get('remainingTiles');
      subValue -= 1
      return state.set('remainingTiles', subValue);
    }
    case 'ADD_USER_TILES': {
      var addValue = state.get('remainingTiles');
      addValue += action.amount
      if(addValue > state.get('userTiles')) {
        return state.set('remainingTiles', state.get('userTiles'))
      }
      return state.set('remainingTiles', addValue);
    }
    case 'SET_USER_TILES': {
      if(state.get('userTiles') < action.amount + state.get('remainingTiles')) {
        return state.set('remainingTiles', state.get('userTiles'))
      }
      return state.set('remainingTiles', action.amount)
    }
    case 'SET_ROWS': {
      return state.set('rows', action.dimension)
    }
    case 'SET_COLUMNS': {
      return state.set('columns', action.dimension)
    }
    case 'SET_USER_LEVEL': {
      return state.set('level', action.level)
    }
    case 'SET_USER_MAX_TILES': {
      return state.set('userTiles', action.amount)
    }
    case 'SET_USER_REQUIRED_EXP': {
      return state.set('userExpLimit', action.amount)
    }
    case 'SET_NEW_LEVEL_SCREEN_VISIBLE': {
      return state.set('showNewLevelScreen', action.state)
    }
    default: {
      return state;
    }
  }
}
