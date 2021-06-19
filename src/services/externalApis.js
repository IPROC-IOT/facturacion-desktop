import axios from "axios";

export const getRuc = async (ruc) => {
    const requestUrl = `https://dniruc.apisperu.com/api/v1/ruc/${ruc}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImJyeWFuamVzdXMucmFAZ21haWwuY29tIn0.q45fnl_Avj4zVfqCocwBR6qUt-uGP6fmANWoF-n4tsI`;

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
