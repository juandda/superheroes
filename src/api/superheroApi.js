import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000',
});

export const getAllSuperheroes = () => {
  return client.get('/superheroes');
};

export const getSuperheroById = (id) => {
  return client.get(`/superheroes/${id}`);
};
