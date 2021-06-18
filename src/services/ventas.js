import axios from "axios";
import API_BASE_URL from "../config/api";

export const ShowVentas = async () => {
    const requestUrl = `${API_BASE_URL}/sales/sales-records/all/`;

    try {
        const resp = await axios({
            url: requestUrl,
            method: 'get',
        });
        if (resp.status === 200 || 201) {
            return resp
        }
    } catch (error) {
        return false
    }
}