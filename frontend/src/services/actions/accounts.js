import { SET_COOKIE, SET_USER } from "services/reducers/constants";

export function setUser(data) {
    return {
        type: SET_USER,
        data: data,
    };
}

export function setCookie(data) {
    return {
        type: SET_COOKIE,
        data: data,
    };
}
