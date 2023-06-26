import axios from 'axios';
import queryString from 'query-string';
import { CabInterface, CabGetQueryInterface } from 'interfaces/cab';
import { GetQueryInterface } from '../../interfaces';

export const getCabs = async (query?: CabGetQueryInterface) => {
  const response = await axios.get(`/api/cabs${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCab = async (cab: CabInterface) => {
  const response = await axios.post('/api/cabs', cab);
  return response.data;
};

export const updateCabById = async (id: string, cab: CabInterface) => {
  const response = await axios.put(`/api/cabs/${id}`, cab);
  return response.data;
};

export const getCabById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/cabs/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCabById = async (id: string) => {
  const response = await axios.delete(`/api/cabs/${id}`);
  return response.data;
};
