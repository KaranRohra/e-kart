import { getUserAPI, isUserAuthenticated } from "services/apis/accounts";
import { getProductsFromCartAPI } from "services/apis/cart";
import { getProductsFromWishlistAPI } from "services/apis/wishlist";

export const initializeState = async () => {
    const initialState = {};
    const IUA = isUserAuthenticated(); // IUA = isUserAutheticated
    const cartResponse = IUA && (await getProductsFromCartAPI());
    const userResponse = IUA && (await getUserAPI());
    const wishlistResponse = IUA && (await getProductsFromWishlistAPI());

    if (IUA) {
        initialState.user = userResponse.data;
        initialState.cart = convertProductListToDictionary(cartResponse.data);
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
