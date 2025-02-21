import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
 
  baseURL: "http://localhost:8080/api/",
});

api.interceptors.request.use(
  (config) => {
    const userStr = sessionStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user && user.token) {
        console.log("Token sendo usado:", user.token);
        config.headers["Authorization"] = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Se já estiver na página de login, não redirecione novamente
      if (window.location.pathname !== "/login") {
        sessionStorage.removeItem("user");
        toast.error("Sessão expirada. Faça login novamente.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    }
    return Promise.reject(error);
  }
);

export default api;