// httpService.ts
import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../api_variables';
import {
  decreaseRequestCount,
  increaseRequestCount,
} from '../components/Spinner/requestCounter';
import { getRawJwtToken } from './jwtService';

const httpService = (port: number = 3000) => {
  const http = axios.create({
    baseURL: API_BASE_URL(port.toString()),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Interceptor para añadir el token a las solicitudes
  http.interceptors.request.use(
    (config) => {
      increaseRequestCount();
      const token = getRawJwtToken();
      if (token) {
        config.headers['x-auth-token'] = `${token}`;
        config.headers[
          'Authorization'
        ] = `Bearer 04f9237d-646e-4e0d-90d2-504b1f7dcbc0`;
      }
      return config;
    },
    (error) => {
      decreaseRequestCount();
      return Promise.reject(error);
    }
  );

  http.interceptors.response.use(
    (response) => {
      decreaseRequestCount();
      return response;
    },
    (error) => {
      decreaseRequestCount();
      return Promise.reject(error);
    }
  );

  const get = async <T>(
    url: string,
    params = {}
  ): Promise<AxiosResponse<T>> => {
    return http.get<T>(url, { params });
  };

  const post = async <T>(url: string, data: any): Promise<AxiosResponse<T>> => {
    return http.post<T>(url, data);
  };

  const put = async <T>(url: string, data: any): Promise<AxiosResponse<T>> => {
    return http.put<T>(url, data);
  };

  const del = async <T>(url: string): Promise<AxiosResponse<T>> => {
    return http.delete<T>(url);
  };

  return { get, post, put, delete: del };
};

export default httpService;
