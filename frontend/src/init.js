import { getUserAPI } from "services/apis/accounts";
import { getProductsFromCartAPI } from "services/apis/cart";
import { getProductsFromWishlistAPI } from "services/apis/wishlist";

export const initializeState = async () => {
    const initialState = {};
    const cartResponse = await getProductsFromCartAPI();
    const userResponse = await getUserAPI();
    const wishlistResponse = await getProductsFromWishlistAPI();

    if (userResponse.data) {
        initialState.user = userResponse.data;
    }
    if (cartResponse.data) {
        initialState.cart = convertProductListToDictionary(cartResponse.data);
    }
    if (wishlistResponse.data) {
        initialState.wishlist = convertProductListToDictionary(wishlistResponse.data);
    }
    return initialState;
};

const convertProductListToDictionary = (productList) => {
    const productDictionary = {};
    productList.forEach((product) => {
        productDictionary[product.id] = product;
    });
    return productDictionary;
};
