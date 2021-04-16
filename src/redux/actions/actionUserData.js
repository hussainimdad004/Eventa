import {
    USER_DATA_JWT
} from "./types";
export const setUserData = (_jwt_token, _user) => {
    return {
        type: USER_DATA_JWT,
        jwt: _jwt_token,
        user: _user
    }
}