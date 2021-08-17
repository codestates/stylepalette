import { RECOMMEND_COLOR } from '../actions/action';
import { initialState, RecommendColor } from './initialState';

export const recommendColorReducer = (
  state: RecommendColor = initialState.recommendcolor,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case RECOMMEND_COLOR: {
      const { tonInton, tonOnton, monoton } = action.payload;

      const newState = Object.assign({}, state, {
        tonInton,
        tonOnton,
        monoton,
      });

      return newState;
    }

    default:
      return state;
  }
};
