// src/api/dockerApi.js
import axios from 'axios';

const API_URL = 'http://10.3.142.201/api/images/all'; // Mock API endpoint

export const getDockerFiles = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching Docker files:', error);
    throw error;
  }
};
