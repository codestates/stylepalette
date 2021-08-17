export const initialState = {
  user: {
    userid: null,
    realname: '',
    username: '',
    email: '',
    userimage: '',
    apiMessages: '',
  },
  posts: [],
  modal: {
    isOpen: false,
    type: '',
  },
};

export interface UserState {
  userid: number | null;
  realname: string;
  username: string;
  email: string;
  userimage: string;
}

export interface ModalState {
  isOpen: boolean;
  type: string;
}

export interface RootState {
  user: UserState;
  posts: [];
  modal: ModalState;
}
