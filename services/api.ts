import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Adjust this to your Express server URL

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const register = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      email,
      username,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};
