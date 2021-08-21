import { GETUSERINFO_SUCCESS, GETUSERINFO_FAILURE } from '../actions/action';
import { initialState, UserState } from './initialState';

const otherUserReducer = (
  state: UserState = initialState.otheruser,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case GETUSERINFO_SUCCESS: {
      const { id, realname, username, email, userimage, post } = action.payload;
      const otherUserState = Object.assign({}, state, {
        userid: id,
        realname,
        username,
        email,
        userimage,
        post,
      });
      return otherUserState;
    }

    default:
      return state;
  }
};

export default otherUserReducer;
