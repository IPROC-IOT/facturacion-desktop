import axios from "axios";
import API_BASE_URL from "../config/api";

export const ShowCompras = async () => {
    const requestUrl = `${API_BASE_URL}/purchases/purchases-records/all/`;

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
    const requestUrl = `${API_BASE_URL}/purchases/document/all/`;

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
    const requestUrl = `${API_BASE_URL}/purchases/type-recipe/all/`;

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
    const requestUrl = `${API_BASE_URL}/purchases/supplier/all/`;

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
    const requestUrl = `${API_BASE_URL}/purchases/change-dolar-sunat/`;

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

export const CreatePucharse = async (data) => {
    const requestUrl = `${API_BASE_URL}/purchases/create/pucharse-record/`;

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

export const SearchByDatePucharse = async (desde, hasta) => {
    const requestUrl = `${API_BASE_URL}/purchases/search/date/${desde}/${hasta}/`;

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

export const SearchPucharse = async (date) => {
    const requestUrl = `${API_BASE_URL}/purchases/search/look/${date}/`;

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

export const UnitiesPucharse = async () => {
    const requestUrl = `${API_BASE_URL}/purchases/unities/all/`;

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

export const getPurcharseDetail = async (id) => {
    const requestUrl = `${API_BASE_URL}/purchases/purchases/detail/${id}/`;

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

export const getUnitiesPurchase = async (id) => {
    const requestUrl = `${API_BASE_URL}/purchases/unities-by-purchase/${id}/`;

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