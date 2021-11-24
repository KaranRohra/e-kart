import axios from "axios";
import Cookies from "universal-cookie";

const baseTemplate = async ({ url, method, data, headers }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const cookies = new Cookies();

    try {
        const response = await axios({
            url: process.env.REACT_APP_BACKEND_URL + url,
            method: method,
            data: data,
            headers: { Authorization: `Token ${cookies.get("token")}`, ...headers },
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
