import baseTemplate from "services/apis/baseTemplate";

export const createUserCartAPI = async (token) => {
    const response = await baseTemplate({
        url: "/cart/",
        method: "POST",
        headers: {
            Authorization: token,
        },
    });
    return response;
};

export const addProductToCartAPI = async (data) => {
    const response = await baseTemplate({
        url: "/cart/",
        method: "PUT",
        data: data,
    });
    return response;
};

export const removeProductFromCartAPI = async (data) => {
    const response = await baseTemplate({
        url: "/cart/",
        method: "DELETE",
        data: data,
    });
    return response;
};

export const getProductsFromCartAPI = async () => {
    const response = await baseTemplate({
        url: "/cart/",
        method: "GET",
    });
    return response;
};
