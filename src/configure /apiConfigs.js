import axios from 'axios';
import configs from './configs'

const API = axios.create({
  baseURL: configs.API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

API.interceptors.response.use(
  response => response.data,
  (error) => {
    if (error.response) {
            console.log(error.response)
            return Promise.reject({ code: error.response.status, message: error.response.data.msg }) // eslint-disable-line
    }

    if (error.request) {
            return Promise.reject({ message: 'No response was received' }) // eslint-disable-line
    }

    return Promise.reject(error);
  }
);

export { API };

