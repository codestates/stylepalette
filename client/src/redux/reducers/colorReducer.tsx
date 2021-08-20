import { RECOMMEND_COLOR, ROULETTE_COLOR } from '../actions/action';
import { initialState, RecommendColor, RouletteColor } from './initialState';

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

export const rouletteColorReducer = (
  state: RouletteColor = initialState.roulettecolor,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case ROULETTE_COLOR: {
      const newState = Object.assign({}, state, {
        palette: action.payload,
      });

      return newState;
    }

    default:
      return state;
  }
};
