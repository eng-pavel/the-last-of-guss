import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://v2991160.hosted-by-vdsina.ru',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export function setAuthToken(token: string | null) {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common.Authorization;
  }
}
