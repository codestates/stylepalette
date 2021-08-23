import { combineReducers } from 'redux';
import { postReducer, postsReducer, likeReducer } from './postReducer';
import userReducer from './userReducer';
import modalReducer from './modalReducer';
import otherUserReducer from './otherUserReducer';
import { recommendColorReducer, rouletteColorReducer } from './colorReducer';
import { userPickColorReducer, mainResultImageReducer } from './mainPageReducer';

const rootReducer = combineReducers({
  userState: userReducer,
  otherUserState: otherUserReducer,
  postState: postReducer,
  postsState: postsReducer,
  likeState: likeReducer,
  modalState: modalReducer,
  recommendcolorState: recommendColorReducer,
  roulettecolorState: rouletteColorReducer,
  userpickcolorState: userPickColorReducer,
  mainresultimageState: mainResultImageReducer,
});

export default rootReducer;
