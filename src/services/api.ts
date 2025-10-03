import axios from "axios";
//
const api = axios.create({
  baseURL: "https://api.lojabbprodutos.com.br/api/v1",
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        "Erro do servidor:",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      console.error("Sem resposta do servidor:", error.request);
    } else {
      console.error("Erro na requisição:", error.message);
    }
    return Promise.reject(error); // permite continuar tratando no try/catch
  }
);

export default api;
