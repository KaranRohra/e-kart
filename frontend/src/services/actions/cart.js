import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from "services/reducers/constants";

export function addProductToCart(data) {
    return {
        type: ADD_PRODUCT_TO_CART,
        data: data,
    };
}

export function removeProductFromCart({ cart, productID }) {
    delete cart[productID];
    return {
        type: REMOVE_PRODUCT_FROM_CART,
        data: cart,
    };
}
