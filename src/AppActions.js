import { store } from './App';

export function colorPickerVisible(visible) {
  const action = {
    type: "SET_COLOR_PICKER_VISIBLE",
    visible
  }
  store.dispatch(action)
}
