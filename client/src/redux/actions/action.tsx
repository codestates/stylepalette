// action types
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const HANDLE_MODAL = 'HANDLE_MODAL';
export const SIGN_UP = 'SIGN_UP';

interface LoginProps {
  username: string;
  password: string;
}

interface HandleModalProps {
  isOpen: boolean;
  type?: string;
}

interface SignUpProps {
  name: string;
  username: string;
  email: string;
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

export const signup = (data: SignUpProps) => {
  return {
    type: SIGN_UP,
    payload: data,
  };
};
