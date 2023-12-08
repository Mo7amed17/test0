import axios from 'axios';

const API_BASE_URL = 'https://a8da-154-183-18-234.ngrok-free.app';

    const getToken = () => {
    const token = localStorage.getItem("_auth");
    return token ? `${token}` : null;
    };

    const getHeaders = () => {
    const token = getToken();
    if (token) {
        return {
        'x-access-token': token,
        'Content-Type': "application/json",
        };
    } else {
        return {
        'Content-Type': "application/json",
        };
    }
    };

    const API = axios.create({
    baseURL: API_BASE_URL,
    headers: getHeaders(),
    });

export default API;