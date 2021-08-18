import { combineReducers } from 'redux';
import postReducer from './postReducer';
import userReducer from './userReducer';
import modalReducer from './modalReducer';
import { recommendColorReducer } from './colorReducer';

const rootReducer = combineReducers({
  userState: userReducer,
  postState: postReducer,
  modalState: modalReducer,
  recommendcolorState: recommendColorReducer,
});

export default rootReducer;
