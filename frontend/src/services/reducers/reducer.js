import { SET_COOKIE, SET_USER } from "services/reducers/constants";

function reducer(state, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.data,
            };
        case SET_COOKIE:
            return {
                ...state,
                cookies: action.data,
            };
        default:
            return state;
    }
}

export default reducer;
