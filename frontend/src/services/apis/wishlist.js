import baseTemplate from "services/apis/baseTemplate";

export const getProductsFromWishlistAPI = async () => {
    return await baseTemplate({
        url: "/products/wishlist/",
        method: "GET",
    });
};

export const addProductToWishlistAPI = async (productId) => {
    return await baseTemplate({
        url: "/products/wishlist/",
        method: "PUT",
        data: {
            id: productId,
        },
    });
};

export const removeProductFromWishlistAPI = async (productId) => {
    return await baseTemplate({
        url: "/products/wishlist/",
        method: "DELETE",
        data: {
            id: productId,
        },
    });
};
