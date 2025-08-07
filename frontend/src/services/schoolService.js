import api from './api';

export const createSchool = async (data) => {


  const response = await api.post('/api/operations/create', data);
  return response.data;

};


export const getSchools = async (page = 1, pageSize = 20) => {
  const response = await api.get(`/api/operations/listData?page=${page}&pageSize=${pageSize}`);
  return response.data;
};

export const deleteSchool = async (id) => {
  const response = await api.delete(`/api/operations/delete?id=${id}`);
  return response.data;
};

export const updateSchool = async (id, data) => {
  const response = await api.put(`/api/operations/update?id=${id}`, data);
  return response.data;
};
