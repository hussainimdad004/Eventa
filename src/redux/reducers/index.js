import {
    combineReducers
} from 'redux';
import UserDataReducer from './ReducerUserData';
import SelecTab from './ReducerSelectedTab';
const combinedReducer = combineReducers({
    // user_data: UserDataReducer,
    // select_tab: SelecTab
});
const rootReducer = (state, action) => {
    return combinedReducer(state, action);
}
export default rootReducer;