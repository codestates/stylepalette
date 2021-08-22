import { USER_PICKCOLOR, MAIN_RESULTIMAGE } from '../actions/action';
import { initialState, UserPickColor, MainResultImage } from './initialState';

export const userPickColorReducer = (
  state: UserPickColor = initialState.userpickcolor,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case USER_PICKCOLOR: {
      const { topcolor, bottomcolor } = action.payload;

      const newState = Object.assign({}, state, {
        topcolor,
        bottomcolor,
      });

      return newState;
    }

    default:
      return state;
  }
};

export const mainResultImageReducer = (
  state: MainResultImage = initialState.mainresultimage,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case MAIN_RESULTIMAGE: {
      const { imageblob } = action.payload;

      const newState = Object.assign({}, state, {
        imageblob,
      });

      return newState;
    }

    default:
      return state;
  }
};
