import { fromJS } from 'immutable'

export const initialState = fromJS({
  userID: -1,
  userExp: 0,
  rows: 0,
  columns: 0,
  colors: {},
  canvas: [],
  updatePixel: {},
  activeColor: "#0x000000",
  showColorPicker: true,
})

export default(state = initialState, action) => {
  switch (action.type) {
    case 'SET_COLOR_PICKER_VISIBLE': {
      return state.set('showColorPicker', action.visible)
    }
    case 'SET_USER_ID': {
      return state.set('userID', action.userID)
    }
    case 'SET_PIXEL': {
      return state.set('updatePixel', action.data)
    }
    case 'DRAW_CANVAS': {
      return state.set('canvas', action.data)
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
    default: {
      return state;
    }
  }
}
