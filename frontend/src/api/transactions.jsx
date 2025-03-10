import axios from 'axios';
import config from '../config'; 

export const getTransactions = async (queryParams = '') => {
    const token = localStorage.getItem('token');
  
    try {
      const response = await axios.get(`${config.BASE_URL}/transaction/get?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Fetching transactions failed:", error.response?.data || error.message);
      throw error;
    }
  };

  export const deleteTransaction = async(transactionId) =>{
    const token = localStorage.getItem('token');

    try{
    const response =  await axios.delete(`${config.BASE_URL}/transaction/delete/${transactionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
    }catch(error){
      console.error('Failed to delete transaction:' , error.response?.data || error.message);
      throw error;
    }
  }

  export const updateTransaction = async(transactionId , updatedData) =>{
    const token = localStorage.getItem('token');

    try{
    const response =  await axios.put(`${config.BASE_URL}/transaction/update/${transactionId}`, 
      updatedData ,
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
    }catch(error){
      console.error('Failed to update transaction:' , error.response?.data || error.message);
      throw error;
    }
  }
  
  export const getSingleTransaction = async (transactionId) => {
    const token = localStorage.getItem('token');
  
    try {
      const response = await axios.get(`${config.BASE_URL}/transaction/get/${transactionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Fetching transactions failed:", error.response?.data || error.message);
      throw error;
    }
  };

  export const getStatistics = async() => {
    const token = localStorage.getItem('token');
  
    try {
      const response = await axios.get(`${config.BASE_URL}/transaction/statistics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Fetching transactions data failed:", error.response?.data || error.message);
      throw error;
    }
  }