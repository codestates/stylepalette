import { LOG_IN, LOG_OUT, PROFILE_EDIT, PASSWORD_CHANGE, SIGN_UP } from '../actions/action';
import { initialState, UserState } from './initialState';
import { dummyState } from './dummyState';

const userReducer = (
  state: UserState = dummyState.user,
  action: { type: string; payload: any },
) => {
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
    case PROFILE_EDIT:
      const { realname, username, email } = action.payload;
      const newProfileState = Object.assign({}, state, {
        realname,
        username,
        email,
      });
      return newProfileState;

    case PASSWORD_CHANGE:
      const { password } = action.payload;
      const newPasswordState = Object.assign({}, state, {
        password,
      });
      return newPasswordState;

    default:
      return state;
  }
};

export default userReducer;
