import { useEffect, useState} from 'react';
import EmployForm from '../src/components/Employ';
import EmployDetails from '../src/components/EmployDetails';
import DenseAppBar from '../src/components/Header';
import CircularProgress from '@mui/material/CircularProgress';
import Employ from './types/interface';
import axios from 'axios';

const App = () => {
  const [employees, setEmployees] = useState<Employ[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

 
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/employees');
        setEmployees(response.data);
      } catch (error:any) {
        setError('Error fetching employees');
        console.error('Error fetching employees:', error.message);
      } finally {
        setLoading(false);
      }
    };

    useEffect(()=>{
      fetchEmployees()
    },[])

  const handleAddEmployee = async (newEmployee: Employ) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/createEmploy', newEmployee);
      const addedEmployee = response.data;
      setEmployees([...employees, addedEmployee]);
    } catch (error:any) {
      setError('Error adding employee');
      console.error('Error adding employee:', error.message);
    } finally {
      setLoading(false);
    }
    fetchEmployees()
  };

  const handleDeleteEmployee = async (id: number) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/deleteEmploy/${id}`);
      setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== id));
    } catch (error:any) {
      setError('Error deleting employee');
      console.error('Error deleting employee:', error.message);
    } finally {
      setLoading(false);
    }
    fetchEmployees()
  };

  const handleUpdateEmployee = async (id: number, updatedEmployee: Employ) => {
    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:5000/updateEmploy/${id}`, updatedEmployee);
      const updatedEmployeeData = response.data;
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) => (employee.id === id ? updatedEmployeeData : employee))
      );
    } catch (error: any) {
      setError('Error updating employee');
      console.error('Error updating employee:', error.message);
    } finally {
      setLoading(false);
    }
    fetchEmployees();
  };

  return (
    <div>
      <DenseAppBar />
      <EmployForm onAddEmploy={handleAddEmployee} employees={employees} />
      {employees.length >0 && (<EmployDetails employDetails={employees} onDeleteEmploy={handleDeleteEmployee} onUpdateEmploy={handleUpdateEmployee} />)}

      {loading && <CircularProgress />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default App;
