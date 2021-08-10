import { LOG_IN } from '../actions/action';
import { initialState } from './initialState';

const userReducer = (
    state = initialState,
    action: { type: string; payload: any },
) => {
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
