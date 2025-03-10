import axios from 'axios';
import config from '../config'; 

export const addTransaction = async (transactionData) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(`${config.BASE_URL}/transaction/add`, transactionData,
       {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      );
    return response.data;
  } catch (error) {
    console.error("failed to store transaction data:", error.response?.data || error.message);
    throw error;
  }
};