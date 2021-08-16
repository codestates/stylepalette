// action types
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const HANDLE_MODAL = 'HANDLE_MODAL';
export const PROFILE_EDIT = 'PROFILE_EDIT';
export const PASSWORD_CHANGE = 'PASSWORD_CHANGE';

interface LoginProps {
  username: string;
  password: string;
}

interface HandleModalProps {
  isOpen: boolean;
  type?: string;
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
export const logIn = (data: LoginProps) => {
  return {
    type: LOG_IN,
    payload: data,
  };
};

export const logOut = () => {
  return {
    type: LOG_OUT,
  };
};

export const handleModal = (data: HandleModalProps) => {
  return {
    type: HANDLE_MODAL,
    payload: data,
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
