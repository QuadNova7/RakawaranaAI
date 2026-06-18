import axios from 'axios';

const USER_API_URL = import.meta.env.VITE_USER_API_URL || 'http://localhost:8000/api';
const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL || 'http://localhost:8001/api';

export const uploadGuidelinePDF = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await axios.post(`${ADMIN_API_URL}/upload/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const reportIncident = async (description) => {
  const response = await axios.post(`${USER_API_URL}/incident/`, {
    description,
  });
  return response.data;
};
