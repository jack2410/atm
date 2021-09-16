import axios from 'axios';

import { BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAtms = () => api.get('/atms');

export const addAtm = () => api.post('/atms');

export const removeAtm = (id: string) => api.delete(`/atms/${id}`);

export const getQueue = () => api.get('/atms/queue');
