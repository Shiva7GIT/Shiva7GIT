import axios from 'axios';
import  Employ from '../components/types/interface';

const BASE_URL = 'http://localhost:5000';

const apiService = {
  getEmployees: async (): Promise<Employ[]> => {
    try {
      const response = await axios.get<Employ[]>(`${BASE_URL}/employees`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching employees');
    }
  },

  addEmployee: async (newEmployee: Employ): Promise<Employ> => {
    try {
      const response = await axios.post<Employ>(`${BASE_URL}/createEmploy`, newEmployee);
      return response.data;
    } catch (error) {
      throw new Error('Error adding employee');
    }
  },

  deleteEmployee: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}/deleteEmploy/${id}`);
    } catch (error) {
      throw new Error('Error deleting employee');
    }
  },

  updateEmployee: async (id: number, updatedEmployee: Employ): Promise<Employ> => {
    try {
      const response = await axios.put<Employ>(`${BASE_URL}/updateEmploy/${id}`, updatedEmployee);
      return response.data;
    } catch (error) {
      throw new Error('Error updating employee');
    }
  },
};

export default apiService;
