import baseTemplate from "./baseTemplate";

export const createUserAPI = async (data) => {
    const response = await baseTemplate({
        url: "/accounts/register/",
        data: data,
        method: "POST",
    });
    return response;
};

export const authenticateUserAPI = async (data) => {
    const response = await baseTemplate({
        url: "/accounts/login/",
        data: data,
        method: "POST",
    });
    return response;
};
