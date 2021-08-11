import { combineReducers } from 'redux';
import postReducer from './postReducer';
import userReducer from './userReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  userState: userReducer,
  postState: postReducer,
  modalState: modalReducer,
});

export default rootReducer;
