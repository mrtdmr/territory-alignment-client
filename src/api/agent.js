import axios from 'axios';
import { toast } from 'react-toastify';
import { history } from '../index';
axios.defaults.baseURL = 'https://localhost:5001/api';
//axios.defaults.baseURL = 'https://localhost:44394/api';
axios.interceptors.request.use(undefined, (error) => {
  return Promise.reject(error);
});
axios.interceptors.response.use(undefined, (error) => {
  if (error) {
    if (error.response) {
      const { status } = error.response;
      if (error.message === 'Network Error' && !error.response)
        toast.error('Ağ hatası, servise erişilemiyor.');
      else if (status === 404) {
        history.push('/notfound');
      } else if (status === 500) toast.error('Serviste hata oluştu.');
      else toast.error('Hata Oluştu');
    } else {
      toast.error('Hata Oluştu');
    }
    throw error;
  }
});

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
  list: () => requests.get(`/team/list`),
  get: (id) => requests.get(`/teams/${id}`),
  create: (team) => requests.post(`/teams`, team),
  update: (team) => requests.put(`teams/${team.id}`, team),
  delete: (id) => requests.delete(`teams/${id}`),
};
const Plans = {
  list: () => requests.get(`/plan/list`),
  get: (id) => requests.get(`/plan/get/${id}`),
  create: (plan) => requests.post(`/plan/create`, plan),
  update: (plan) => requests.put(`plan/save`, plan),
  delete: (id) => requests.delete(`plan/delete/${id}`),
  addDepartmentToPlan: (planId, departmentId) =>
    requests.post(`plans/${planId}`, {
      departmentId: departmentId,
    }),
};
const Markets = {
  list: () => requests.get(`/market/list`),
  get: (id) => requests.get(`/markets/${id}`),
  create: (market) => requests.post(`/markets`, market),
  update: (market) => requests.put(`markets/${market.id}`, market),
  delete: (id) => requests.delete(`markets/${id}`),
};
const Cities = {
  list: () => requests.get(`/city/list`),
};
const Departments = {
  list: (planId) =>
    requests.get(`/department/list?planId=${planId ? planId : ''}`),
};
export default { Products, Teams, Plans, Markets, Cities, Departments };
