import FormData from 'form-data';
import axios from 'axios';
import { serverUrl } from '../../utils/constants';
import dotenv from 'dotenv';
dotenv.config();

// action types
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const LOGOUT_SUCCESS = 'LOG_OUT';
export const HANDLE_MODAL = 'HANDLE_MODAL';
export const SIGN_UP = 'SIGN_UP';
export const PROFILE_EDIT = 'PROFILE_EDIT';
export const PROFILE_EDIT_SUCCESS = 'PROFILE_EDIT_SUCCESS';
export const PROFILE_EDIT_FAILURE = 'PROFILE_EDIT_FAILURE';
export const PASSWORD_CHECK = 'PASSWORD_CHECK';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const RECOMMEND_COLOR = 'RECOMMEND_COLOR';
export const ROULETTE_COLOR = 'ROULETTE_COLOR';
export const PASSWORDCHECK_SUCCESS = 'PASSWORDCHECK_SUCCESS';
export const PASSWORDCHECK_FAILURE = 'PASSWORDCHECK_FAILURE';
export const GETUSERINFO_SUCCESS = 'GETUSER_SUCCESS';
export const GETUSERINFO_FAILURE = 'GETUSER_FAILURE';
export const USER_PICKCOLOR = 'USER_PICKCOLOR';
export const MAIN_RESULTIMAGE = 'MAIN_RESULTIMAGE';
export const PROFILEIMAGE_EDIT = 'PROFILEIMAGE_EDIT';
export const PROFILEIMAGE_EDIT_SUCCESS = 'PROFILEIMAGE_EDIT_SUCCESS';
export const PROFILEIMAGE_EDIT_FAILURE = 'PROFILEIMAGE_EDIT_FAILURE';
export const GET_POST = 'GET_POST';
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
export const GET_POST_FAILURE = 'GET_POST_FAILURE';
export const GET_POSTS = 'GET_POSTS';
export const GET_POSTS_SUCCESS = 'GETPOSTS_SUCCESS';

interface LoginProps {
  username: string;
  password: string;
}

interface SocialLoginProps {
  authorizationCode: string | null;
  scope: string | null;
}

interface HandleModalProps {
  isOpen?: boolean;
  type?: string;
  data?: number | null;
}

interface SignUpProps {
  realname: string;
  username: string;
  email: string;
  password: string;
}

interface ProfileEditProps {
  userid: number | null;
  realname?: string;
  email?: string;
}

interface ProfileEditProps {
  userid: number | null;
  password?: string;
}

interface PasswordCheckProps {
  username: string;
  password: string;
}

interface ProfileImageEditProps {
  userid: number | null;
  file?: File;
}

interface RecommendColor {
  selectedcolor: string;
}

interface RouletteColor {
  maincolor: string;
}

interface UserPickColorProps {
  topcolor: string;
  bottomcolor: string;
}

interface MainResultImageProps {
  imageblob: Blob;
}

interface getPostProps {
  postId: number | null;
}

// actions creator functions
export const getUserSuccess = (data: any) => {
  return {
    type: GETUSERINFO_SUCCESS,
    payload: data,
  };
};

export const getUserFailure = (data: any) => {
  return {
    type: GETUSERINFO_FAILURE,
    payload: data,
  };
};

export const getUserInfo = () => {
  return (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    axios
      .get(`${serverUrl}/userinfo`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log('getuser success: ', response);
        dispatch(getUserSuccess(response.data[0]));
      })
      .catch((response) => {
        console.log('getuser FAILURE: ', response);
      });
  };
};

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
        console.log('LOGIN RESPONSE in SUCCESS: ', response.data.payload);
        dispatch(handleModal({ isOpen: false }));
        localStorage.setItem('token', response.data.payload.accessToken);
        dispatch(
          loginSuccess({
            token: response.data.payload.accessToken,
            user: response.data.payload.user,
          }),
        );
      })
      .catch((error) => {
        console.log('LOGIN RESPONSE in FAILURE: ', error.response.data.message);
        let errorMsg;
        if (error.response) {
          errorMsg = error.response.data.message;
        }
        const noUsernameMsg = '일치하는 아이디가 없습니다.';
        const wrongPasswordMsg = '비밀번호가 일치하지 않습니다.';
        if (errorMsg === 'There is no such a username') {
          dispatch(loginFailure(noUsernameMsg));
        } else {
          dispatch(loginFailure(wrongPasswordMsg));
        }
      });
  };
};

export const kakaoLogin = ({ authorizationCode, scope }: SocialLoginProps) => {
  return (dispatch: (arg0: { type: string; payload: any }) => void) => {
    axios
      .post(
        `${serverUrl}/kakao`,
        {
          code: authorizationCode,
        },
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        console.log('KAKAO LOGIN SUCCESS', response);
        localStorage.setItem('token', response.data.id_token);
        dispatch(
          loginSuccess({
            token: response.data.id_token,
            user: response.data,
          }),
        );
      })
      .catch((error) => {
        console.log('KAKAO LOGIN FAILURE', error);
      });
  };
};

export const googleLogin = ({ authorizationCode, scope }: SocialLoginProps) => {
  return (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    axios
      .post(
        `${serverUrl}/google`,
        {
          code: authorizationCode,
        },
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        console.log('GOOGLE LOGIN SUCCESS', response);
        localStorage.setItem('token', response.data.id_token);
        dispatch(
          loginSuccess({
            token: response.data.id_token,
            user: response.data,
          }),
        );
      })
      .catch((err) => {
        console.log('GOOGLE LOGIN FAILURE:', err);
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
        const message = '회원가입이 성공적으로 완료됐습니다.';
        if (response.status === 201) {
          dispatch(signupSuccess(message));
          dispatch(handleModal({ isOpen: true, type: 'login' }));
        }
      })
      .catch((response) => {
        console.log('SIGNUP RESPONSE in FAILURE: ', response);
        const message = '이미 존재하는 아이디입니다.';
        if (response.status === 400) {
          dispatch(signupFailure(message));
        }
      });
  };
};

export const profileEditSuccess = (data: any) => {
  return {
    type: PROFILE_EDIT_SUCCESS,
    payload: data,
  };
};

export const profileEditFailure = (data: string) => {
  return {
    type: PROFILE_EDIT_FAILURE,
    payload: data,
  };
};

export const profileEdit = (data: ProfileEditProps) => {
  return (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    const { userid, realname, email } = data;
    axios
      .patch(
        `${serverUrl}/userinfo/${userid}/info`,
        { realname, email },
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        dispatch(profileEditSuccess(data));
      })
      .catch((error) => {
        // console.log('PROFILE EDIT  RESPONSE in FAILURE: ');
      });
  };
};

export const passwordChange = (data: ProfileEditProps) => {
  return (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    const { userid, password } = data;
    axios
      .patch(
        `${serverUrl}/userinfo/${userid}/password`,
        { password },
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        console.log('PASSWORD CHANGE RESPONSE in SUCCESS: ', response.data);
        dispatch(handleModal({ isOpen: false }));
      })
      .catch((error) => {
        console.log('PASSWORD CHANGE RESPONSE in FAILURE: ');
        // let errorMsg;
        // if (error.response) {
        //   errorMsg = error.response.data.message;
        // }
      });
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
        `${serverUrl}/userinfo/checkuser`,
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        const message = '';
        dispatch(handleModal({ isOpen: true, type: 'profileEdit' }));
        dispatch(passwordCheckSuccess(message));
      })
      .catch((error) => {
        // console.log('CHECKUSER RESPONSE in FAILURE: ');
        // let errorMsg;
        // if (error.response) {
        //   errorMsg = error.response.data.message;
        // }
        const wrongPasswordMsg = '비밀번호가 일치하지 않습니다.';
        if (error.response.status === 400) {
          dispatch(passwordCheckFailure(wrongPasswordMsg));
        }
      });
  };
};

export const profileImageChangeSucess = (data: ProfileImageEditProps) => {
  return {
    type: PROFILEIMAGE_EDIT_SUCCESS,
    payload: data,
  };
};

export const profileImageChangeFailure = (message: string) => {
  return {
    type: PROFILEIMAGE_EDIT_FAILURE,
    payload: message,
  };
};

export const profileImageChange = (data: ProfileImageEditProps) => {
  const { userid, file } = data;
  let formData = new FormData();
  formData.append('profile', file, file?.name);

  return (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    axios
      .patch(`${serverUrl}/userinfo/${userid}/profile`, formData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log('PROFILEIMAGE RESPONSE in SUCCESS: ', response.data);
        dispatch(profileImageChangeSucess(response.data.location));
      })
      .catch((error) => {
        console.log('PROFILEIMAGE RESPONSE in FAILURE: ');
        // let errorMsg;
        // if (error.response) {
        //   errorMsg = error.response.data.message;
        // }
      });
  };
};

export const getPostSuccess = (data: any) => {
  return {
    type: GET_POST_SUCCESS,
    payload: data,
  };
};

export const getPostFailure = (data: any) => {
  return {
    type: GET_POST_FAILURE,
    payload: data,
  };
};

export const getPost = (data: getPostProps) => {
  return async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await axios
      .get(`${serverUrl}/post/${data.postId}`, {
        withCredentials: true,
      })
      .then((response) => {
        dispatch(getPostSuccess(response.data));
      })
      .catch((response) => {
        console.log('getpost failure: ', response);
      });
  };
};

export const successGetposts = (data: any) => {
  return {
    type: GET_POSTS_SUCCESS,
    payload: data,
  };
};

export const getAllPosts = () => {
  return async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await axios
      .get(`${serverUrl}/post/posts/all`, {
        withCredentials: true,
      })
      .then(async (res) => {
        await dispatch(successGetposts(res.data));
      })
      .catch((res) => {
        console.log('getposts failure', res);
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

export const successRouletteColor = (data: any) => {
  return {
    type: ROULETTE_COLOR,
    payload: data,
  };
};

export const rouletteColor = (data: RouletteColor) => {
  return async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    const { maincolor } = data;

    await axios
      .post(
        `${serverUrl}/color/roulette`,
        {
          maincolor,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        const data = res.data;
        dispatch(successRouletteColor(data));
      })
      .catch((res) => {
        return res;
      });
  };
};

export const setUserPickColor = (data: UserPickColorProps) => {
  return {
    type: USER_PICKCOLOR,
    payload: data,
  };
};

export const setMainResultImage = (data: MainResultImageProps) => {
  return {
    type: MAIN_RESULTIMAGE,
    payload: data,
  };
};

export const pressLike = (data: { postid: number | null; userid: number | null }) => {
  console.log('data:', data);

  return (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    axios
      .post(
        `${serverUrl}/post/${data.postid}/like`,
        {
          userid: data.userid,
        },
        {
          withCredentials: true,
        },
      )
      .then((response) => console.log(response));
  };
};
