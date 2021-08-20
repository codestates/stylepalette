// import { initialState } from './initialState';
import { initialState, PostState } from './initialState';

const postReducer = (
  state: PostState = initialState.posts,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default postReducer;
