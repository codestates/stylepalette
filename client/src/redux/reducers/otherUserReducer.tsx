import { GET_OTHERUSER_INFO_SUCCESS, GET_OTHERUSER_INFO_FAILURE } from '../actions/action';
import { initialState, OtherUserState } from './initialState';

const otherUserReducer = (
  state: OtherUserState = initialState.otheruser,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case GET_OTHERUSER_INFO_SUCCESS: {
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
