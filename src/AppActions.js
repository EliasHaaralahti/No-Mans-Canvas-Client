import { store } from './App';
const pako = require('pako');

export function colorPickerVisible(visible) {
  const action = {
    type: "SET_COLOR_PICKER_VISIBLE",
    visible
  }
  store.dispatch(action)
}

export function loadingScreenVisible(visible) {
  const action = {
    type: "SET_LOADING_SCREEN",
    visible
  }
  store.dispatch(action)
}

export function setMessageBoxVisibility(visible) {
  const action = {
    type: "SET_MESSAGE_BOX_VISIBLE",
    visible
  }
  store.dispatch(action)
}

export function setCreditsMenuVisibility(visible) {
  const action = {
    type: "SET_CREDITS_VISIBLE",
    visible
  }
  store.dispatch(action)
}

export function setAdminmenuVisible(visible) {
  const action = {
    type: "SET_ADMIN_VISIBLE",
    visible
  }
  store.dispatch(action)
}

export function setMessageBoxText(message) {
  const action = {
    type: "SET_MESSAGE_BOX_TEXT",
    message
  }
  store.dispatch(action)
}

export function setKickDialogVisibility(visible) {
  const action = {
    type: "SET_KICK_DIALOG_VISIBLE",
    visible
  }
  store.dispatch(action)
}

export function setKickDialogText(message) {
  const action = {
    type: "SET_KICK_DIALOG_TEXT",
    message
  }
  store.dispatch(action)
}

export function setKickDialogButtonText(btn_text) {
  const action = {
    type: "SET_KICK_DIALOG_BUTTON_TEXT",
    btn_text
  }
  store.dispatch(action)
}

export function setUserID(userID) {
  const action = {
    type: "SET_USER_ID",
    userID
  }
  store.dispatch(action)
}

export function setPixel(data) {
  const action = {
    type: "SET_PIXEL",
    data
  }
  store.dispatch(action)
  if (data !== null) setPixelInCanvas(data);
}

export function setPixelInCanvas(data) {
  const action = {
    type: "SET_PIXEL_IN_CANVAS",
    data,
  }
  store.dispatch(action);
}

export function setPlacerInfo(data) {
  const action = {
    type: "SET_PLACER_INFO",
	data,
  }
  store.dispatch(action);
}

export function drawCanvas(data) {
  var dimension = Math.sqrt(data.length - 1)
  setDimensions(dimension)

  const action = {
    type: "DRAW_CANVAS",
    data
  }
  store.dispatch(action)
}

export function drawCanvasBin(data) {
  try {
    const decompressed = pako.inflate(data)
	var pixels = Array.from(decompressed)
  } catch (err) {
    console.log(err)
  }
  var dimension = Math.sqrt(pixels.length)
  setDimensions(dimension)
  const action = {
    type: "DRAW_CANVAS",
	pixels
  }
  store.dispatch(action)
}

export function setDrawCanvas(bool) {
  const action = {
    type: "SET_DRAW_CANVAS",
    bool
  }
  store.dispatch(action)
}

export function setDimensions(dimension) {
  const action = {
    type: "SET_COLUMNS",
    dimension
  }
  store.dispatch(action)

  const action2 = {
    type: "SET_ROWS",
    dimension
  }
  store.dispatch(action2)
}

export function setColors(colors) {
  const action = {
    type: "SET_COLORS",
    colors
  }
  store.dispatch(action)
}

export function setNickName(nick) {
  const action = {
    type: "SET_NICKNAME",
    nick
  }
  store.dispatch(action)
}

// addToIndex is optional parameter that allows sum/reduce operations.
export function setActiveColor(color, addToIndex=0) {
  const action = {
    type: "SET_ACTIVE_COLOR",
    color,
    addToIndex
  }
  store.dispatch(action)
}

export function setUserExp(amount) {
  const action = {
    type: "SET_USER_EXP",
    amount
  }
  store.dispatch(action)
}

export function setShowCleanupBtn(show) {
  const action = {
    type: "SET_SHOW_CLEANUP_BTN",
    show
  }
  store.dispatch(action)
}

export function setShowBanBtn(show) {
  const action = {
    type: "SET_SHOW_BAN_BTN",
    show
  }
  store.dispatch(action)
}

export function setTileInfoAvailable(available) {
  const action = {
    type: "SET_TILEINFO_AVAILABLE",
    available
  }
  store.dispatch(action)
}

export function toggleAdminBrushMode() {
  const action = {
    type: "TOGGLE_ADMIN_BRUSH_MODE"
  }
  store.dispatch(action)
}

export function toggleBanMode() {
  const action = {
    type: "TOGGLE_BAN_MODE"
  }
  store.dispatch(action)
}

export function setConnectedUsers(amount) {
  const action = {
    type: "SET_CONNECTED_USERS",
    amount
  }
  store.dispatch(action)
}

// TODO: Combine add and subtract tiles
export function addUserTiles(amount) {
  const action = {
    type: "ADD_USER_TILES",
    amount
  }
  store.dispatch(action)
}

export function substractUserTiles(amount) {
  const action = {
    type: "REMOVE_USER_TILES",
    amount
  }
  store.dispatch(action)
}

export function setUserTiles(amount) {
  const action = {
    type: "SET_USER_TILES",
    amount
  }
  store.dispatch(action)
}

export function addUserExp(amount) {
  const action = {
    type: "ADD_USER_EXP",
    amount
  }
  store.dispatch(action)
}

export function setLevel(level) {
  const action = {
    type: "SET_USER_LEVEL",
    level
  }
  store.dispatch(action)
}

export function setUserMaxTiles(amount) {
  const action = {
    type: "SET_USER_MAX_TILES",
    amount
  }
  store.dispatch(action)
}

export function setUserRequiredExp(amount) {
  const action = {
    type: "SET_USER_REQUIRED_EXP",
    amount
  }
  store.dispatch(action)
}

export function setNewLevelScreenVisible(visible) {
  const action = {
    type: "SET_NEW_LEVEL_SCREEN_VISIBLE",
    visible
  }
  store.dispatch(action)
}
