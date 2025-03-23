import axios, { AxiosResponse } from "axios";

const $api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BACKEND}`,
  headers:{
      "Content-Type": "application/json",
  },
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer " + localStorage.getItem('accessToken');
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (err) => {
    const originalRequest = err.config;

    if ((err.response.status === 403 || err.response.status === 401) && err.config && !err.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.post<AxiosResponse, any>(
          `${import.meta.env.VITE_API_BACKEND}/auth/token`,
          {
            token: localStorage.getItem('refreshToken'),
          }
        );
        if (response.status === 200) {
          console.log("Генерация токенов или проверка user успешна");
        } else {
          console.log("Ошибка авторизации");
        }
        localStorage.setItem('accessToken', response?.data.accessToken);
        localStorage.setItem('refreshToken', response?.data.refreshToken); //Тут надо как-бы в куки, но мне проще дебажить так
        return await $api.request(originalRequest);
      } catch (_) {
        console.log("Сработал config");
      }
    }
    return err.response;
  }
);

export default $api;