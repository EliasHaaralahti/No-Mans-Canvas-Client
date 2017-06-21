import { fromJS } from 'immutable'

// TODO: Cleaning up: use dictionaries like user { ID, exp}
export const initialState = fromJS({
  userID: -1,
  userExp: 0,
  userExpLimit: 100,
  userTiles: 60,
  remainingTiles:0,
  rows: 0,
  columns: 0,
  colors: {},
  canvas: [],
  updatePixel: null,
  activeColor: 0,
  showColorPicker: false,
  canvasDraw: false,
  showLoadingScreen: true,
})

export default(state = initialState, action) => {
  switch (action.type) {
    case 'SET_COLOR_PICKER_VISIBLE': {
      return state.set('showColorPicker', action.visible)
    }
    case 'SET_LOADING_SCREEN' : {
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
      var index = action.y * state.get('columns') + action.x + 1;
      canvas[index] = {"colorID": parseInt(action.colorID, 10)};
      console.log("Setting pixel at index "+index+" with ID "+action.colorID);
      return state.set('canvas', canvas);
    }
    case 'DRAW_CANVAS': {
      return state.set('canvas', action.data).set('canvasDraw', true)
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
    case 'ADD_USER_EXP': {
      var value = state.get('userExp');
      value+=1
      console.log(value)
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
        return state.set('remainingTiles', this.state.get('userTiles'))
      }
      return state.set('remainingTiles', addValue);
    }
    case 'SET_USER_TILES': {
      if(state.get('userTiles') < action.amount + state.get('remainingTiles')) {
        return state.set('remainingTiles', state.get('userTiles'))
      }
      console.log("SET TILES: " + action.amount)
      return state.set('remainingTiles', action.amount)
    }
    case 'SET_ROWS': {
      return state.set('rows', action.dimension)
    }
    case 'SET_COLUMNS': {
      return state.set('columns', action.dimension)
    }
    default: {
      return state;
    }
  }
}
