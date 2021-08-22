import { combineReducers } from 'redux';
import postReducer from './postReducer';
import userReducer from './userReducer';
import modalReducer from './modalReducer';
import otherUserReducer from './otherUserReducer';
import { recommendColorReducer, rouletteColorReducer } from './colorReducer';

const rootReducer = combineReducers({
  userState: userReducer,
  otherUserState: otherUserReducer,
  postState: postReducer,
  modalState: modalReducer,
  recommendcolorState: recommendColorReducer,
  roulettecolorState: rouletteColorReducer,
});

export default rootReducer;
