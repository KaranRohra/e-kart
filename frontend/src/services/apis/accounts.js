import baseTemplate from "services/apis/baseTemplate";
import Cookies from "universal-cookie";

export const isUserAuthenticated = () => {
    const cookies = new Cookies();
    return cookies.get("token");
};

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

export const getUserAPI = async () => {
    const response = await baseTemplate({
        url: "/accounts/user/",
        method: "GET",
    });
    return response;
};

export const updateUserAPI = async (data) => {
    const response = await baseTemplate({
        url: "/accounts/user/",
        data: data,
        method: "PATCH",
    });
    return response;
};

export const userForgotPasswordAPI = async (data) => {
    const response = await baseTemplate({
        url: "/accounts/forgot-password/",
        data: data,
        method: "POST",
    });
    return response;
};

export const sendPasswordResetLinkAPI = async (data) => {
    const response = await baseTemplate({
        url: "/accounts/reset-password/?email=" + data.email,
        method: "GET",
    });
    return response;
};
