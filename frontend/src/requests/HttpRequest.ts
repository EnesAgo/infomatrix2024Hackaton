import axios from 'axios';
import {requestBaseUrl} from "@/requests/constants";

const instance = axios.create({
    baseURL: requestBaseUrl,
    timeout: 1000,
    headers: {"Content-Type": "application/json"}
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (sessionStorage.getItem('jwtNewSmile')) {
        const accessToken = JSON.parse(sessionStorage.getItem('jwtNewSmile') as string).token;
        config.headers.Authorization = `Bearer ${accessToken}`;
        console.log(config.headers)
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
export default instance