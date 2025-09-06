// api/client.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:44315",
  headers: {
    "Content-Type": "application/json",
  },
});

const apidemande = axios.create({
  baseURL: "https://localhost:44332",
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter le token automatiquement aux requêtes apidemande
apidemande.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// On exporte les deux
export { api, apidemande };