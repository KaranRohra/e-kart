import baseTemplate from "services/apis/baseTemplate";

export const getOrdersAPI = async () => {
    return await baseTemplate({
        url: "/orders/",
        method: "GET",
    });
};

export const getOrderByIdAPI = async (id) => {
    return await baseTemplate({
        url: `/orders/${id}/`,
        method: "GET",
    });
};

export const updateOrderAPI = async (id, data) => {
    return await baseTemplate({
        url: `/orders/${id}/`,
        method: "PATCH",
        data: data,
    });
};
