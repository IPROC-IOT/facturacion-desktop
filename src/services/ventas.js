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

export const ShowTypeDocument = async () => {
    const requestUrl = `${API_BASE_URL}/sales/document/all/`;

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

export const ShowTypeRecipe = async () => {
    const requestUrl = `${API_BASE_URL}/sales/type-recipe/all/`;

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

export const ShowSupplier = async () => {
    const requestUrl = `${API_BASE_URL}/sales/supplier/all/`;

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

export const ChangeDolar = async () => {
    const requestUrl = `${API_BASE_URL}/sales/change-dolar-sunat/`;

    try {
        const resp = await axios({
            url: requestUrl,
            method: 'post',
            data: "",
        });
        if (resp.status === 200 || 201) {
            return resp
        }
    } catch (error) {
        return false
    }
}

export const CreateSale = async (data) => {
    const requestUrl = `${API_BASE_URL}/sales/create/sale-record/`;

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

export const SearchByDateSale = async (desde, hasta) => {
    const requestUrl = `${API_BASE_URL}/sales/search/date/${desde}/${hasta}/`;

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