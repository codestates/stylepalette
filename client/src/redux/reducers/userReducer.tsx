import { LOG_IN, LOG_OUT, PROFILE_EDIT } from '../actions/action';
import { initialState, UserState } from './initialState';
import { dummyState } from './dummyState';

const userReducer = (
  state: UserState = dummyState.user,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case LOG_IN:
      // operation to update state
      // state.user = response
      return state;
    // break;

    case LOG_OUT:
      const newState = Object.assign({}, state, {
        userid: null,
        username: '',
        email: '',
        userimage: '',
      });
      return newState;

    case PROFILE_EDIT:
      const { realname, username, email } = action.payload;
      const newProfileState = Object.assign({}, state, {
        realname,
        username,
        email,
      });
      return newProfileState;

    default:
      return state;
  }
};

export default userReducer;
