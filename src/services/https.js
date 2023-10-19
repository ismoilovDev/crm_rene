import axios from "axios";
import { base_url } from "../utils/const";

const https = axios.create({
    baseURL: `${base_url}/api`,
    withCredentials: true,
    headers: {
        'Accept': 'application/json;charset=utf-8',
        'Authorization': "Bearer " + window.localStorage.getItem('token')
    }
})

export default https;