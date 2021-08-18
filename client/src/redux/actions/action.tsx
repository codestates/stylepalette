import axios from 'axios';
import { serverUrl } from '../../utils/constants';
// action types
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const LOGOUT_SUCCESS = 'LOG_OUT';
export const HANDLE_MODAL = 'HANDLE_MODAL';
export const SIGN_UP = 'SIGN_UP';
export const PROFILE_EDIT = 'PROFILE_EDIT';
export const PASSWORD_CHECK = 'PASSWORD_CHECK';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const RECOMMEND_COLOR = 'RECOMMEND_COLOR';
export const PASSWORDCHECK_SUCCESS = 'PASSWORDCHECK_SUCCESS';
export const PASSWORDCHECK_FAILURE = 'PASSWORDCHECK_FAILURE';

interface LoginProps {
  username: string;
  password: string;
}

interface HandleModalProps {
  isOpen?: boolean;
  type?: string;
}

interface SignUpProps {
  realname: string;
  username: string;
  email: string;
  password: string;
}

interface ProfileEditProps {
  realname: string;
  username: string;
  email: string;
}

interface PasswordCheckProps {
  username: string;
  password: string;
}

interface RecommendColor {
  selectedcolor: string;
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
        dispatch(handleModal({ isOpen: false }));
        console.log('token', response.data.payload);

        localStorage.setItem('token', response.data.payload);
        dispatch(loginSuccess(response.data.payload));
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
      localStorage.setItem('token', '');
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
    const { realname, username, email, password } = data;
    axios
      .post(
        `${serverUrl}/signup`,
        {
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
        dispatch(handleModal({ isOpen: true, type: 'login' }));
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

export const passwordCheckSuccess = (message: string) => {
  return {
    type: PASSWORDCHECK_SUCCESS,
    payload: message,
  };
};

export const passwordCheckFailure = (message: string) => {
  return {
    type: PASSWORDCHECK_FAILURE,
    payload: message,
  };
};

export const passwordCheck = (data: PasswordCheckProps) => {
  return (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    const { username, password } = data;
    axios
      .post(
        `${serverUrl}/checkuser`,
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        console.log('CHECKUSER RESPONSE in SUCCESS: ', response);
        dispatch(handleModal({ isOpen: true, type: 'profileEdit' }));
      })
      .catch((response) => {
        console.log('CHECKUSER RESPONSE in FAILURE: ', response);
        dispatch(passwordCheckFailure(response));
      });
  };
};

export const successRecommendColor = (data: any) => {
  return {
    type: RECOMMEND_COLOR,
    payload: data,
  };
};

export const recommendColor = (data: RecommendColor) => {
  return (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    const { selectedcolor } = data;
    axios
      .post(
        `${serverUrl}/color/recommend`,
        {
          selectedcolor,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        const data = res.data;
        dispatch(successRecommendColor(data));
      })
      .catch((res) => {
        return res;
      });
  };
};
