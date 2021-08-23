import { initialState } from './initialState';
import { GET_POSTS_SUCCESS, GET_POST_FAILURE, GET_POST_SUCCESS, ISLIKED } from '../actions/action';

export const postsReducer = (
  state = initialState.posts,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case GET_POSTS_SUCCESS: {
      const newState = action.payload;
      return newState;
    }
    default:
      return state;
  }
};

export const postReducer = (state = initialState.post, action: { type: string; payload: any }) => {
  switch (action.type) {
    case GET_POST_SUCCESS: {
      const newState = action.payload;
      return newState;
    }

    case GET_POST_FAILURE: {
      console.log('postReducer failure');
      const message = action.payload;
      const newState = Object.assign({}, state, {
        apiMessage: message,
      });
      return newState;
    }

    default:
      return state;
  }
};

export const likeReducer = (
  state = initialState.isLiked,
  action: { type: string; },
) => {
  switch (action.type) {
    case ISLIKED: {
      if (!state) {
        const newState = true
        return newState
      } else {
        const newState = false
        return newState
      }
    }
    default:
      return state;
  }
};