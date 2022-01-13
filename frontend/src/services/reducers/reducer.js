import {
    SET_COOKIE,
    SET_USER,
    INIT_STATE,
    UPDATE_CART,
    UPDATE_WISHLIST,
    EMPTY_STATE,
} from "services/reducers/constants";

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
        case UPDATE_CART:
            return {
                ...state,
                cart: action.data,
            };
        case INIT_STATE:
            return {
                ...state,
                ...action.data,
            };
        case UPDATE_WISHLIST:
            return {
                ...state,
                wishlist: action.data,
            };
        case EMPTY_STATE:
            return {};
        default:
            return state;
    }
}

export default reducer;
