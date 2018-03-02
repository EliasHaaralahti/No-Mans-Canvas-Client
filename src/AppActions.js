import { store } from './App';

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

export function setMessageBoxText(message) {
  const action = {
    type: "SET_MESSAGE_BOX_TEXT",
    message
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
  if (data !== null) setPixelInCanvas(data[0].X, data[0].Y, data[0].colorID);
}

export function setPixelInCanvas(x, y, colorID) {
  const action = {
    type: "SET_PIXEL_IN_CANVAS",
    x,
    y,
    colorID
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

export function setActiveColor(color) {
  const action = {
    type: "SET_ACTIVE_COLOR",
    color
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
