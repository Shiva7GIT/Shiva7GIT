// App.tsx
import { useState } from 'react';
import EmployForm from '../src/components/Employ';
import EmployDetails from '../src/components/EmployDetails';
import DenseAppBar from '../src/components/Header';
import Employ from '../src/interface/interface';

const App = () => {
  const [employees, setEmployees] = useState<Employ[]>([]);

  const handleAddEmploy = (newEmploy: Employ) => {
    setEmployees([...employees, newEmploy]);
  };

  const handleDeleteEmploy = (id: number) => {
    const updatedEmployees = employees.filter((employ) => employ.id !== id);
    setEmployees(updatedEmployees);
  };

  return (
    <div>
      <DenseAppBar />
      <EmployForm onAddEmploy={handleAddEmploy} employees={employees} />
      <EmployDetails employDetails={employees} onDeleteEmploy={handleDeleteEmploy} />
    </div>
  );
};

export default App;
