import {
    USER_DATA_JWT
} from "../actions/types";
const INITIAL_STATE = {
    user_info: null,
    jwt_token: null,
    email: undefined,
    phone: undefined,
    logged_in: undefined,
    type: undefined
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_DATA_JWT:
            {
                return Object.assign({}, state, {
                    jwt_token: action.token,
                    user_info: action.user,
                    logged_in: action.token != "",
                    email: action.user ? action.user.email : undefined,
                })
            }
        default:
            return state

    }
}