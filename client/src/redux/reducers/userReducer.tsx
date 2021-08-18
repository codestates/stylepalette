import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  PROFILE_EDIT,
  PASSWORD_CHANGE,
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
      const { realname, username, email } = action.payload;

      const newUserInfo = {
        realname,
        username,
        email,
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

    case PROFILE_EDIT: {
      const { realname, username, email } = action.payload;
      const newProfileState = Object.assign({}, state, {
        realname,
        username,
        email,
      });
      return newProfileState;
    }

    case PASSWORD_CHANGE: {
      const { password } = action.payload;
      const newPasswordState = Object.assign({}, state, {
        password,
      });
      return newPasswordState;
    }

    default:
      return state;
  }
};

export default userReducer;
