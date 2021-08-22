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
}

export interface PostState {
  postid: number | null;
  title: string;
  image: string;
  topcolor: string;
  bottomcolor: string;
  isPublic: boolean;
  userId: number | null;
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
  posts: PostState;
  modal: ModalState;
  recommendcolor: RecommendColor;
  roulettecolor: RouletteColor;
  userpickcolor: UserPickColor;
  mainresultimage: MainResultImage;
}
