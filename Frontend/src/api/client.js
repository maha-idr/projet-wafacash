// api/client.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:44315', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;