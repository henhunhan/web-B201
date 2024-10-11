// src/api/dockerApi.js
import axios from 'axios';

const API_1 = 'http://localhost:3001/images'; // Mock API endpoint
const API_2 = 'http://localhost:3001/images'; // Mock API endpoint

export const getDockerFiles = async () => {
  try {
    // Mengambil data dari kedua API secara bersamaan
    const [response1, response2] = await Promise.all([
      axios.get(API_1),
      axios.get(API_2)
    ]);
    
    // Gabungkan hasil data dari kedua API
    const combinedData = {
      api1: response1.data,
      api2: response2.data
    };

    return combinedData;  // Mengembalikan data gabungan
  } catch (error) {
    console.error('Error fetching Docker files:', error);
    throw error;
  }
};
