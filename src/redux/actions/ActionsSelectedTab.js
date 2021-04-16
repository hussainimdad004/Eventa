import {
    SELECT_TAB
} from './types';
export const selectTab = (tab_id) => {
    return {
        type: SELECT_TAB,
        payload: tab_id
    }
}