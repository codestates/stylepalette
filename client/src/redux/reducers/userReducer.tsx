import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  PROFILE_EDIT_SUCCESS,
  PASSWORDCHECK_SUCCESS,
  PASSWORDCHECK_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  GETUSERINFO_SUCCESS,
  GETUSERINFO_FAILURE,
  PROFILEIMAGE_EDIT_SUCCESS,
} from '../actions/action';
import { initialState, UserState } from './initialState';

const userReducer = (
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
        apiMessage: {
          ...state.apiMessage,
          signupMessage: '',
        },
      });
      localStorage.setItem('token', '');
      return newState;
    }

    case LOGIN_SUCCESS: {
      const { token, user } = action.payload;
      const newState = Object.assign({}, state, {
        token: token,
        userid: user?.id || user?.userid || null,
        username: user?.username || '',
        realname: user?.realname || '',
        email: user?.email || '',
        userimage: user?.userimage || '',
        apiMessage: {
          ...state.apiMessage,
          loginMessage: '',
        },
      });

      return newState;
    }

    case LOGIN_FAILURE: {
      console.log('userREDUCER login failure');
      const message = action.payload;
      const newUserState = Object.assign({}, state, {
        apiMessage: {
          ...state.apiMessage,
          loginMessage: message,
        },
      });
      return newUserState;
    }

    case SIGNUP_SUCCESS: {
      const message = action.payload;
      const newUserState = Object.assign({}, state, {
        apiMessage: {
          ...state.apiMessage,
          signupMessage: message,
        },
      });
      return newUserState;
    }

    case SIGNUP_FAILURE: {
      const message = action.payload;
      const newUserState = Object.assign({}, state, {
        apiMessage: {
          ...state.apiMessage,
          signupMessage: message,
        },
      });
      return newUserState;
    }

    case GETUSERINFO_SUCCESS: {
      const { id, realname, username, email, userimage, post } = action.payload;
      const loggedInUserState = Object.assign({}, state, {
        userid: id,
        realname,
        username,
        email,
        userimage,
        post,
      });
      return loggedInUserState;
    }
    case PROFILE_EDIT_SUCCESS:
      const { realname, email } = action.payload;
      const newProfileState = Object.assign({}, state, {
        realname,
        email,
      });
      return newProfileState;

    case PASSWORDCHECK_SUCCESS: {
      const message = action.payload;
      const newUserState = Object.assign({}, state, {
        apiMessage: {
          ...state.apiMessage,
          passwordMessage: message,
        },
      });
      return newUserState;
    }

    case PASSWORDCHECK_FAILURE: {
      const message = action.payload;
      const newUserState = Object.assign({}, state, {
        apiMessage: {
          ...state.apiMessage,
          passwordMessage: message,
        },
      });
      return newUserState;
    }

    case PROFILEIMAGE_EDIT_SUCCESS: {
      const profileImageUrl = action.payload;
      const newProfileState = Object.assign({}, state, {
        userimage: profileImageUrl,
      });
      return newProfileState;
    }
    default:
      return state;
  }
};

export default userReducer;
