import axios from "axios";

const API_URL = import.meta.env.VITE_APP_BASE_URL;

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => await Promise.reject(error)
);

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export async function get<T>(
  url: string,
  config: Record<string, any> = {}
): Promise<T> {
  return await axiosApi.get(url, { ...config });
}

export async function post<T>(
  url: string,
  data: any,
  config: Record<string, any> = {}
): Promise<T> {
  return await axiosApi.post(url, data, { ...config });
}

export async function put<T>(
  url: string,
  data: any,
  config: Record<string, any> = {}
): Promise<T> {
  return await axiosApi.put(url, data, { ...config });
}

export async function del<T>(
  url: string,
  config: Record<string, any> = {}
): Promise<T> {
  return await axiosApi.delete(url, { ...config });
}
