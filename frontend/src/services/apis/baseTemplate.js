import axios from "axios";
import Cookies from "universal-cookie";

const baseTemplate = async ({ url, method, data, headers }) => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const cookies = new Cookies();

    try {
        const response = await axios({
            url: process.env.REACT_APP_BACKEND_URL + url,
            method: method,
            data: data,
            headers: { ...headers, Authorization: `Token ${cookies.get("token")}` },
        });
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        return {
            status: error.response.status,
            error: error.response.data,
        };
    }
};

export default baseTemplate;
