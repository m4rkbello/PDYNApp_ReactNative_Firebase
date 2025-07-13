import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://yourapi.com/api/',
    timeout: 5000,
});

export default axiosInstance;
