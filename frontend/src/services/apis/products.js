import baseTemplate from "services/apis/baseTemplate";

export const getProducts = (params) => {
    return baseTemplate({
        method: "get",
        url: `/products/?page=${params.page}`,
    });
};

export const getProduct = (params) => {
    return baseTemplate({
        method: "get",
        url: `/products/${params.productId}/`,
    });
};

export const getProductSalesGraphAPI = (params) => {
    return baseTemplate({
        method: "get",
        url: `/orders/product/${params.productId}/`,
    });
};

export const getCompareProductsAPI = (params) => {
    return baseTemplate({
        method: "get",
        url: `/products/compare/?products_ids=${params.ids}`,
    });
};
