// client/src/services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeader = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
};

export const getDrugs = async () => {
  const headers = await getAuthHeader();
  const response = await axios.get(`${API_URL}/drugs`, { headers });
  return response.data;
};

export const createDrug = async (drugData) => {
  const headers = await getAuthHeader();
  const response = await axios.post(`${API_URL}/drugs`, drugData, { headers });
  return response.data;
};

export const updateDrug = async (id, drugData) => {
  const headers = await getAuthHeader();
  const response = await axios.put(`${API_URL}/drugs/${id}`, drugData, { headers });
  return response.data;
};

export const deleteDrug = async (id) => {
  const headers = await getAuthHeader();
  const response = await axios.delete(`${API_URL}/drugs/${id}`, { headers });
  return response.data;
};

export const trackDrug = async (id, trackingData) => {
  const headers = await getAuthHeader();
  const response = await axios.post(`${API_URL}/drugs/${id}/track`, trackingData, { headers });
  return response.data;
};

export const getDrugByBatch = async (batchNumber) => {
  const headers = await getAuthHeader();
  const response = await axios.get(`${API_URL}/drugs/batch/${batchNumber}`, { headers });
  return response.data;
};