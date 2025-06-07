// src/services/api.ts
import axios from 'axios';

export const BASE_API_URL = 'https://hooks.zapier.com/hooks/catch/472009/jla9rg';

export const api = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
