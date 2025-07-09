import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.15.6:3000', // ex: http://192.168.0.10:3000
  timeout: 5000,
});

export default api;
