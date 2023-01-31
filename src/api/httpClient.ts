import axios from 'axios';
import * as AxiosLogger from 'axios-logger';
import { store } from '../core/store';

const httpClient = axios.create({
  baseURL: 'https://app-idvsapi-snd-ond.azurewebsites.net/v1',
  headers: { 'Content-Type': 'application/json', Accept: '*/*' },
});

httpClient.interceptors.request.use(async (request) => {
  const { fullAccessToken, accessToken } = store.getState().sessions;
  request.headers = request.headers ?? {};

  if (fullAccessToken) {
    request.headers.Authorization = `Bearer ${fullAccessToken}`;
  } else if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }

  return AxiosLogger.requestLogger(request);
}, AxiosLogger.errorLogger);

httpClient.interceptors.response.use(async (response) => response.data, AxiosLogger.errorLogger);

export default httpClient;
