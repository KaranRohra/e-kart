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

export const getProductRatingsAndReviewsAPI = (params) => {
    return baseTemplate({
        method: "get",
        url: `/products/${params.productId}/rating-review/?page_no=${params.pageNo}&user_id=${params.userId}`,
    });
};

export const reviewLikeDislikeAPI = (params) => {
    return baseTemplate({
        method: "post",
        url: `/products/rating-review-likes/${params.reviewId}/`,
        data: params,
    });
};

export const createReviewAPI = (params) => {
    return baseTemplate({
        method: "POST",
        url: `/products/create-review/`,
        data: params,
    });
};

export const getReviewAPI = (params) => {
    return baseTemplate({
        method: "GET",
        url: `/products/${params.productId}/review/`,
    });
};

export const updateReviewAPI = (params) => {
    return baseTemplate({
        method: "PATCH",
        url: `/products/review/${params.reviewId}/`,
        data: params,
    });
};
