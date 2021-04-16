import {
    SELECT_TAB
} from '../actions/types';

const INITIAL_STATE = {
    selected_tab_id: 0
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECT_TAB:
            return {
                ...state,
                selected_tab_id: action.payload
            }

        default:
            return state;
    }
}