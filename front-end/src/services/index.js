import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/',
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestLogin = async (body) => {
  const { data } = await api.post('login', body);
  return data;
};

export const requestRegister = async (body) => {
  const { data } = await api.post('register', body);
  return data;
};

export const requestCreateUser = async (body) => {
  const { data } = await api.post('admin/register', body);
  return data;
};

export const requestUser = async () => {
  const { data } = await api.get('user');
  return data;
};

export const requestFindUser = async (id) => {
  const { data } = await api.get(`sale/${id}`);
  return data;
};

export const deleteUser = async (id) => {
  await api.delete(`admin/delete/${id}`);
};

export const requestCreateSale = async (body) => {
  const { data } = await api.post('sale', body);
  return data;
};

export const requestProducts = async () => {
  const { data } = await api.get('products');
  return data;
};

export const requestOrdersById = async (id) => {
  const { data } = await api.get(`customer/orders/${id}`);
  return data;
};

export const requestOrdersByStatus = async (newStatus) => {
  const { data } = await api.patch(`customer/orders/${newStatus}`);
  return data;
};

export const requestOrdersByStatusAndId = async (newStatus, id) => {
  const { data } = await api.patch(`customer/orders/${newStatus}/${id}`);
  return data;
};

export const requestOrdersByDetails = async (id) => {
  const { data } = await api.get(`seller/orders/details/${id}`);
  return data;
};

export const requestFindSeller = async (id) => {
  const { data } = await api.get(`seller/orders/${id}`);
  return data;
};

export default api;
