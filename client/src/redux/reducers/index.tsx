import { combineReducers } from 'redux';
import postReducer from './postReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  userState: userReducer,
  postState: postReducer,
});

export default rootReducer;
