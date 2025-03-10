import axios from 'axios';
import config from '../config'; 

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${config.BASE_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${config.BASE_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error.response?.data || error.message);
    throw error;
  }
};
