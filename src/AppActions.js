import { store } from './App';

export function colorPickerVisible(visible) {
  const action = {
    type: "SET_COLOR_PICKER_VISIBLE",
    visible
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
}

export function drawCanvas(data) {
  var dimension = Math.sqrt(data.length - 1)
  setDimensions(dimension)

  /*
  // TODO: Improve, bad way of creating array
  // Store data in multidimensional array according to dimensions
  var counter = 0;
  var canvas = []
  // 1 Because you skip responseType
  for (var y = 1; y < dimension; y++) {
    canvas[y] = []
    for (var x = 1; x < dimension; x++) {
      canvas[y][x] = data
    }
  }
  */

  const action = {
    type: "DRAW_CANVAS",
    data
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
