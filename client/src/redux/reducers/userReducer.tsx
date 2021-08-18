import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  PROFILE_EDIT,
  PASSWORD_CHECK,
  SIGNUP_SUCCESS,
} from '../actions/action';
import { initialState, UserState } from './initialState';
import { dummyState } from './dummyState';

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
      });
      return newState;
    }

    case LOGIN_SUCCESS: {
      const { token } = action.payload;

      const newUserInfo = {
        token,
      };

      return newUserInfo;
    }

    case SIGNUP_SUCCESS: {
      const message = action.payload;
      const newUserState = Object.assign({}, state, {
        apiMessages: message,
      });
      return newUserState;
    }

    case PROFILE_EDIT:
      const { realname, username, email, password, userimage } = action.payload;
      const newProfileState = Object.assign({}, state, {
        realname,
        username,
        email,
        password,
        userimage,
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
