import { useState } from 'react';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Employ from '../types/interface';
import departments from '../types/departmentModel';
interface EmployFormProps {
  onAddEmploy: (newEmploy: Employ) => void;
  employees: Employ[];
}

const EmployForm = ({ onAddEmploy, employees }: EmployFormProps) => {
  const [name, setName] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [salary, setSalary] = useState<number>(0);

  const handleAddEmploy = () => {
    const newEmploy: Employ = {
      id: Math.max(0, ...employees.map((employ) => employ.id)) + 1,
      name,
      department,
      salary,
    };
    onAddEmploy(newEmploy);
    setName('');
    setDepartment('');
    setSalary(0);
  };

  return (
    <div style={{ marginTop: '30px', marginBottom: '20px', textAlign: 'center' }}>
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Select
        label="Department"
        variant="outlined"
        value={department}
        onChange={(e) => setDepartment(e.target.value as string)}
        style={{ marginLeft: '10px', width: '150px' }}
      >
        {departments.map((dep) => (
          <MenuItem key={dep} value={dep}>
            {dep}
          </MenuItem>
        ))}
      </Select>
      <TextField
        label="Salary"
        variant="outlined"
        value={salary}
        onChange={(e) => setSalary(Number(e.target.value))}
        style={{ marginLeft: '10px', width: '100px' }}
      />
      <Button variant="contained" onClick={handleAddEmploy} style={{ marginLeft: '10px' }}>
        <AddIcon />
      </Button>
    </div>
  );
};

export default EmployForm;
