import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  PROFILE_EDIT,
  PASSWORD_CHECK,
  SIGNUP_SUCCESS,
} from '../actions/action';
import { initialState, UserState } from './initialState';

const userReducer = (
  // state: UserState = dummyState.user,
  state: UserState = initialState.user,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case LOGOUT_SUCCESS: {
      const newState = Object.assign({}, state, {
        userid: null,
        username: '',
        email: '',
        userimage: '',
        token: '',
      });
      localStorage.setItem('token', '');
      return newState;
    }

    case LOGIN_SUCCESS: {
      const token = action.payload;
      const newState = Object.assign({}, state, {
        token: token,
      });

      return newState;
    }

    case SIGNUP_SUCCESS: {
      const message = action.payload;
      const newUserState = Object.assign({}, state, {
        apiMessages: message,
      });
      return newUserState;
    }

    case PROFILE_EDIT:
      const { realname, username, email, password } = action.payload;
      const newProfileState = Object.assign({}, state, {
        realname,
        username,
        email,
        password,
      });
      return newProfileState;

    // case PASSWORD_CHECK:
    //   const { password } = action.payload;
    //   const newPasswordState = Object.assign({}, state, {
    //     password,
    //   });
    //   return newPasswordState;
    default:
      return state;
  }
};

export default userReducer;
