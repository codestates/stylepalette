// import { initialState } from './initialState';
import { dummyState } from './dummyState';
import { HANDLE_MODAL } from '../actions/action';

const modalReducer = (state = dummyState.modal, action: { type?: string; payload?: any }) => {
  switch (action.type) {
    case HANDLE_MODAL:
      const newState = Object.assign({}, state, {
        isOpen: action.payload.isOpen,
        type: action.payload.type,
        data: action.payload.data
      });
      return newState;
    default:
      return state;
  }
};

export default modalReducer;
