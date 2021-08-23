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
      });
      localStorage.setItem('token', '');
      return newState;
    }

    case LOGIN_SUCCESS: {
      const token = action.payload.accessToken;
      const user = action.payload.user;
      const newState = Object.assign({}, state, {
        userid : user.id,
        username : user.username,
        userimage : user.userimage,
        email : user.email,
        token: token,
      });

      return newState;
    }

    case LOGIN_FAILURE: {
      console.log('userREDUCER login failure');
      const message = action.payload;
      const newUserState = Object.assign({}, state, {
        apiMessage: message,
      });
      return newUserState;
    }

    case SIGNUP_SUCCESS: {
      const message = action.payload;
      const newUserState = Object.assign({}, state, {
        apiMessage: message,
      });
      return newUserState;
    }

    case SIGNUP_FAILURE: {
      const message = action.payload;
      const newUserState = Object.assign({}, state, {
        apiMessage: message,
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
        apiMessage: message,
      });
      return newUserState;
    }

    case PASSWORDCHECK_FAILURE: {
      const message = action.payload;
      const newUserState = Object.assign({}, state, {
        apiMessage: message,
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
