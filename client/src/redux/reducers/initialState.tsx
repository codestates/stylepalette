export const initialState = {
  user: {
    userid: null,
    realname: '',
    username: '',
    email: '',
    userimage: '',
    apiMessage: '',
    token: '',
    post: [],
  },
  posts: [],
  modal: {
    isOpen: false,
    type: '',
  },
  recommendcolor: {
    tonInton: [],
    tonOnton: [],
    monoton: [],
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

export interface RecommendColor {
  tonInton: string[];
  tonOnton: string[];
  monoton: string[];
}

export interface RootState {
  user: UserState;
  posts: [];
  modal: ModalState;
  recommendcolor: RecommendColor;
}
