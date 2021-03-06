export const initialState = {
  user: {
    userid: null,
    realname: '',
    username: '',
    email: '',
    userimage: '',
    apiMessage: {
      signupMessage: '',
      loginMessage: '',
      passwordMessage: '',
    },
    token: '',
    post: [],
  },
  post: {
    id: null,
    title: '',
    image: '',
    topcolor: '',
    bottomcolor: '',
    likeCount: 0,
    like: [],
    userId: null,
    user: {
      username: '',
      userimage: '',
    },
    isPublic: true,
    createdAt: '',
    updatedAt: '',
  },
  posts: [
    {
      id: null,
      title: '',
      image: '',
      topcolor: '',
      bottomcolor: '',
      userid: null,
      likeCount: 0,
      isPublic: true,
      createdAt: '',
      updatedAt: '',
    },
  ],
  otheruser: {
    userid: null,
    realname: '',
    username: '',
    email: '',
    userimage: '',
    post: [],
  },
  modal: {
    isOpen: false,
    type: '',
  },
  recommendcolor: {
    tonInton: [],
    tonOnton: [],
    monoton: [],
  },
  roulettecolor: {
    palette: [],
  },
  userpickcolor: {
    topcolor: '',
    bottomcolor: '',
  },
  mainresultimage: {
    imageblob: new Blob(),
  },
};

export interface UserState {
  userid: number | null;
  realname: string;
  username: string;
  email: string;
  userimage: string;
  apiMessage: {
    signupMessage: string;
    loginMessage: string;
    passwordMessage: string;
  };
  post: PostState[];
}

export interface OtherUserState {
  userid: number | null;
  realname: string;
  username: string;
  email: string;
  userimage: string;
}

export interface PostState {
  id: number | null;
  title: string;
  image: string;
  topcolor: string;
  bottomcolor: string;
  likeCount: number;
  like: LikeList[];
  userId: number | null;
  user: {
    username: string;
    userimage: string;
  };
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LikeList {
  userId: number | null;
}

export interface PostsState {
  id: number | null;
  title: string;
  image: string;
  topcolor: string;
  bottomcolor: string;
  likeCount: number;
  userId: number | null;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ModalState {
  isOpen: boolean;
  type: string;
  data: number;
}

export interface RecommendColor {
  tonInton: string[];
  tonOnton: string[];
  monoton: string[];
}

export interface RouletteColor {
  palette: string[];
}

export interface UserPickColor {
  topcolor: string;
  bottomcolor: string;
}

export interface MainResultImage {
  imageblob: Blob;
}

export interface RootState {
  user: UserState;
  post: PostState;
  posts: PostsState;
  modal: ModalState;
  recommendcolor: RecommendColor;
  roulettecolor: RouletteColor;
  userpickcolor: UserPickColor;
  mainresultimage: MainResultImage;
}
