import { useEffect, useState } from 'react';
import EmployForm from '../src/components/Employ';
import EmployDetails from '../src/components/EmployDetails';
import DenseAppBar from '../src/components/Header';
import CircularProgress from '@mui/material/CircularProgress';
import  Employ  from './components/types/interface';
import apiService from './apiCalls/apiCalls';

const App = () => {
  const [employees, setEmployees] = useState<Employ[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await apiService.getEmployees();
      setEmployees(data);
    } catch (error : any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async (newEmployee: Employ) => {
    try {
      setLoading(true);
      const addedEmployee = await apiService.addEmployee(newEmployee);
      setEmployees([...employees, addedEmployee]);
    } catch (error : any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
    fetchEmployees();
  };

  const handleDeleteEmployee = async (id: number) => {
    try {
      setLoading(true);
      await apiService.deleteEmployee(id);
      setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== id));
    } catch (error : any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
    fetchEmployees();
  };

  const handleUpdateEmployee = async (id: number, updatedEmployee: Employ) => {
    try {
      setLoading(true);
      const updatedEmployeeData = await apiService.updateEmployee(id, updatedEmployee);
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) => (employee.id === id ? updatedEmployeeData : employee))
      );
    } catch (error : any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
    fetchEmployees();
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      <DenseAppBar />
      <EmployForm onAddEmploy={handleAddEmployee} employees={employees} />
      {employees.length > 0 && (
        <EmployDetails employDetails={employees} onDeleteEmploy={handleDeleteEmployee} onUpdateEmploy={handleUpdateEmployee} />
      )}

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {loading && <CircularProgress />}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default App;
