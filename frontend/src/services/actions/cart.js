import { UPDATE_CART } from "services/reducers/constants";

export function addProductToCart(data) {
    return {
        type: UPDATE_CART,
        data: data,
    };
}

export function removeProductFromCart({ cart, productID }) {
    delete cart[productID];
    return {
        type: UPDATE_CART,
        data: cart,
    };
}
