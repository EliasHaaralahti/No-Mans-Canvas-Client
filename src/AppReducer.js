import { fromJS } from 'immutable'

export const initialState = fromJS({
  user: {
    id: -1,
    name: ''
  },
  colors: [0, 1, 2, 3],
  canvas: []
})

export default(state = initialState, action) => {
  switch (action.type) {
    case 'setUserID': {
      return;
      // return state.set('user').('id', action.userID); invalid syntax
    }
  }
}
