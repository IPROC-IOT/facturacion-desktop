import axios from "axios";
import API_BASE_URL from "../config/api";

export const LoginService = async (data) => {
    const requestUrl = `${API_BASE_URL}/login/`;

    try {
        const resp = await axios({
            url: requestUrl,
            method: 'post',
            data,
        });
        if (resp.status === 200 || 201) {
            return resp
        }
    } catch (error) {
        return false
    }
}