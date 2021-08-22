import { initialState } from './initialState';
import { dummyState } from './dummyState';
import { GETPOSTS_SUCCESS } from '../actions/action';

const postReducer = (state = initialState.posts, action: { type: string; payload: any }) => {
  switch (action.type) {
    case GETPOSTS_SUCCESS : {
      const newState = action.payload
      return newState;
    }
    default:
      return state;
  }
};

export default postReducer;
