import axios from 'axios'

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
    'API-KEY': import.meta.env.VITE_API_KEY,
  },
})
