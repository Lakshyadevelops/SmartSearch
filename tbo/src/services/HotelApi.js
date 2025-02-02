import axios from 'axios';
const API_BASE_URL = 'http://localhost:8000/api';
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getHotelDetails = async (params) => {
  try {
    const response = await apiClient.post('/hotel-details', {
      params: params
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching hotel details:', error);
    throw error;
  }
};
