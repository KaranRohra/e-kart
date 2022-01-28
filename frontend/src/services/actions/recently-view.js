import baseTemplate from "services/apis/baseTemplate";

export const getRecentlyViewProductsAPI = () => {
    return baseTemplate({
        method: "GET",
        url: "/products/recently-viewed/",
    });
};

export const addProductToRecentlyViewAPI = async (productId) => {
    return baseTemplate({
        method: "PUT",
        url: "/products/recently-viewed/",
        data: { id: productId },
    });
};
