import { UPDATE_WISHLIST } from "services/reducers/constants";

export function addProductToWishlist(data) {
    return {
        type: UPDATE_WISHLIST,
        data: data,
    };
}

export function removeProductFromWishlist({ wishlist, productID }) {
    delete wishlist[productID];
    return {
        type: UPDATE_WISHLIST,
        data: wishlist,
    };
}
