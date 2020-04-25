import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api';
//axios.defaults.baseURL = 'https://localhost:44384/api';
const responseBody = (response) => {
  return response && response.data;
};
const sleep = (ms) => (response) =>
  new Promise((resolve) => setTimeout(() => resolve(response), ms));

const requests = {
  get: (url) =>
    axios
      .get(url)
      //.then(sleep(1000))
      .then(responseBody),
  post: (url, body) =>
    axios
      .post(url, body)
      //.then(sleep(1000))
      .then(responseBody),
  put: (url, body) =>
    axios
      .put(url, body)
      //.then(sleep(1000))
      .then(responseBody),
  delete: (url) => axios.delete(url).then(sleep(1000)).then(responseBody),
};
const Products = {
  list: () => requests.get(`/products`),
  get: (id) => requests.get(`/products/${id}`),
  create: (product) => requests.post(`/products`, product),
  update: (product) => requests.put(`products/${product.id}`, product),
  delete: (id) => requests.delete(`products/${id}`),
};
const Teams = {
  list: () => requests.get(`/teams`),
  get: (id) => requests.get(`/teams/${id}`),
  create: (team) => requests.post(`/teams`, team),
  update: (team) => requests.put(`teams/${team.id}`, team),
  delete: (id) => requests.delete(`teams/${id}`),
};
const Plans = {
  list: () => requests.get(`/plans`),
  get: (id) => requests.get(`/plans/${id}`),
  create: (plan) => requests.post(`/plans`, plan),
  update: (plan) => requests.put(`plans/${plan.id}`, plan),
  delete: (id) => requests.delete(`plans/${id}`),
};
const Markets = {
  list: () => requests.get(`/markets`),
  get: (id) => requests.get(`/markets/${id}`),
  create: (market) => requests.post(`/markets`, market),
  update: (market) => requests.put(`markets/${market.id}`, market),
  delete: (id) => requests.delete(`markets/${id}`),
};
const Cities = {
  list: () => requests.get(`/cities`),
};
const Departments = {
  list: () => requests.get(`/departments`),
};
export default { Products, Teams, Plans, Markets, Cities, Departments };
