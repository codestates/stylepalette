import { combineReducers } from 'redux';
import postReducer from './postReducer';
import userReducer from './userReducer';
import modalReducer from './modalReducer';
import { recommendColorReducer, rouletteColorReducer } from './colorReducer';
import { userPickColorReducer, mainResultImageReducer } from './mainPageReducer';

const rootReducer = combineReducers({
  userState: userReducer,
  postState: postReducer,
  modalState: modalReducer,
  recommendcolorState: recommendColorReducer,
  roulettecolorState: rouletteColorReducer,
  userpickcolorState: userPickColorReducer,
  mainresultimageState: mainResultImageReducer,
});

export default rootReducer;
