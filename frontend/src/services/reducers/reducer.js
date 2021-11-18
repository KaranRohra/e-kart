import { SET_COOKIE, SET_USER, ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from "services/reducers/constants";

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
        case ADD_PRODUCT_TO_CART || REMOVE_PRODUCT_FROM_CART:
            return {
                ...state,
                cart: action.data,
            };

        default:
            return state;
    }
}

export default reducer;
