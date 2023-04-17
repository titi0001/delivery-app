import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/',
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestLogin = async (body) => {
  const { data } = await api.post('/login', body);
  return data;
};

export const requestRegister = async (body) => {
  const { data } = await api.post('/register', body);
  return data;
};

export const requestCreateUser = async (body) => {
  const { data } = await api.post('/admin/register', body);
  return data;
};

export const requestUser = async () => {
  const { data } = await api.get('/user');
  return data;
};

export const deleteUser = async (id) => {
  await api.delete(`/admin/delete/${id}`);
};

export default api;
