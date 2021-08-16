import { LOG_IN, LOG_OUT, SIGN_UP } from '../actions/action';
import { initialState } from './initialState';
import { dummyState } from './dummyState';

const userReducer = (state = dummyState.user, action: { type: string; payload: any }) => {
  switch (action.type) {
    case LOG_IN:
      // operation to update state
      // state.user = response
      return state;
    // break;

    case LOG_OUT:
      const newState = Object.assign({}, state, {
        userid: null,
        username: '',
        email: '',
        userimage: '',
      });
      return newState;

    case SIGN_UP: {
      const newUserInfo = {
        name: action.payload.name,
        email: action.payload.email,
        username: action.payload.username,
        password: action.payload.password,
      };

      return newUserInfo;
    }

    default:
      return state;
  }
};

export default userReducer;
