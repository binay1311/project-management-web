import {SET_CURRENT_USER} from "./types";

export const login = (decoded) => {
    return{
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logout = () => {
    return{
        type: SET_CURRENT_USER,
        payload: {}
    }
}