import { SET_USER } from "services/reducers/constants";

export function setUser(data) {
    return {
        type: SET_USER,
        data: data,
    };
}
