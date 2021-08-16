import axios from 'axios';
import { serverUrl } from '../../utils/constants';
// action types
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const LOGOUT_SUCCESS = 'LOG_OUT';
export const HANDLE_MODAL = 'HANDLE_MODAL';
export const SIGN_UP = 'SIGN_UP';
export const PROFILE_EDIT = 'PROFILE_EDIT';
export const PASSWORD_CHANGE = 'PASSWORD_CHANGE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

interface LoginProps {
  username: string;
  password: string;
}

interface HandleModalProps {
  isOpen: boolean;
  type?: string;
}

interface SignUpProps {
  realname: string;
  username: string;
  email: string;
  password: string;
  userimage: string;
}

interface ProfileEditProps {
  realname: string;
  username: string;
  email: string;
}

interface PasswordChangeProps {
  password: string;
}

// actions creator functions
export const loginSuccess = (data: any) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

export const loginFailure = (data: any) => {
  return {
    type: LOGIN_FAILURE,
    payload: data,
  };
};

export const logIn = (data: LoginProps) => {
  return (dispatch: (arg0: { type: string; payload: any }) => void) => {
    const { username, password } = data;
    axios
      .post(
        `${serverUrl}/signin`,
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        console.log('LOGIN RESPONSE in SUCCESS: ', response.headers);
        dispatch(loginSuccess(data));
      })
      .catch((response) => {
        console.log('LOGIN RESPONSE in FAILURE: ', response);
        dispatch(loginFailure(response));
      });
  };
};

export const logOutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const logOut = () => {
  return (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    axios.get(`${serverUrl}/signout`, { withCredentials: true }).then((response) => {
      window.document.cookie = '';
      dispatch(logOutSuccess());
    });
  };
};

export const handleModal = (data: HandleModalProps) => {
  return {
    type: HANDLE_MODAL,
    payload: data,
  };
};

export const signupSuccess = (message: string) => {
  return {
    type: SIGNUP_SUCCESS,
    payload: message,
  };
};

export const signupFailure = (data: any) => {
  return {
    type: SIGNUP_FAILURE,
    payload: data,
  };
};

export const signup = (data: SignUpProps) => {
  return (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    const { userimage, realname, username, email, password } = data;
    axios
      .post(
        `${serverUrl}/signup`,
        {
          userimage: userimage,
          realname: realname,
          username: username,
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        console.log('SIGNUP RESPONSE in SUCCESS: ', response);
        // @ts-ignore
        const message = response.message || '';
        dispatch(signupSuccess(message));
      })
      .catch((response) => {
        console.log('SIGNUP RESPONSE in FAILURE: ', response);
        dispatch(signupFailure(response));
      });
  };
};

export const profileEdit = (data: ProfileEditProps) => {
  return {
    type: PROFILE_EDIT,
    payload: data,
  };
};

export const passwordChange = (data: PasswordChangeProps) => {
  return {
    type: PASSWORD_CHANGE,
    payload: data,
  };
};
