import { LOG_IN } from '../actions/action';
import { initialState } from './initialState';
import { dummyState } from './dummyState';

const userReducer = (state = dummyState.user, action: { type: string; payload: any }) => {
  switch (action.type) {
    case LOG_IN:
      console.log(action.payload);
      // operation to update state
      // state.user = response
      return state;
    // break;
    default:
      return state;
  }
};

export default userReducer;
