import { useEffect, useState} from 'react';
import EmployForm from '../src/components/Employ';
import EmployDetails from '../src/components/EmployDetails';
import DenseAppBar from '../src/components/Header';
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

  return (
    <div>
      <DenseAppBar />
      <EmployForm onAddEmploy={handleAddEmployee} employees={employees} />
      <EmployDetails employDetails={employees} onDeleteEmploy={handleDeleteEmployee} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default App;
