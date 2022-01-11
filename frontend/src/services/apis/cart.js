import baseTemplate from "services/apis/baseTemplate";

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

export const getProductsFromCartAPI = async (data) => {
    let url = "/cart/?";
    for (let key in data) {
        url += `${key}=${data[key]}&`;
    }
    const response = await baseTemplate({
        url: url,
        method: "GET",
    });
    return response;
};
