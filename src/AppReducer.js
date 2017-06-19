import { fromJS } from 'immutable'

export const initialState = fromJS({
  user: {
    id: -1,
    name: ''
  },
  colors: [0, 1, 2, 3],
  canvas: [],
  showColorPicker: true,
})

export default(state = initialState, action) => {
  switch (action.type) {
    case 'SET_COLOR_PICKER_VISIBLE': {
      // TODO: Component is not updated with new state
      return state.set('showColorPicker', action.visible)
    }
    default: {
      return state;
    }
  }
}
