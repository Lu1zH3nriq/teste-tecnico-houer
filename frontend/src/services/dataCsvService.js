import api from './api';

export const uploadCsvFile = async (file) => {

  const formData = new FormData();

  formData.append('file', file);

  const response = await api.post('/api/data/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 30000,

  });

  return response.data;
};
