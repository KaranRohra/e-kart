import { getUserAPI } from "services/apis/accounts";
import { getProductsFromCartAPI } from "services/apis/cart";

export const initializeState = async () => {
    const initialState = {};
    const cartResponse = await getProductsFromCartAPI();
    const userResponse = await getUserAPI();

    if (userResponse.data) {
        initialState.user = userResponse.data;
    }
    if (cartResponse.data) {
        initialState.cart = cartResponse.data;
    }
    return initialState;
};
