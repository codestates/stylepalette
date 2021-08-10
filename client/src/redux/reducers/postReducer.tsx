// import { initialState } from './initialState';
import { dummyState } from './dummyState';

const postReducer = (state = dummyState.posts, action: { type: string; payload: any }) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default postReducer;
