// action types
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const HANDLE_MODAL = 'HANDLE_MODAL';

interface LoginProps {
  username: string;
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

export const handleModal = (data: any) => {
  return {
    type: HANDLE_MODAL,
    payload: data,
  };
};
