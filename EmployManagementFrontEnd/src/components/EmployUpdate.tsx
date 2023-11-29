import { useState } from 'react';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import Employ from './types/interface';
import departments from './types/departmentModel';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';

interface UpdateFormProps {
  onUpdateEmployee: (id: number, updatedEmployee: Employ) => void;
  employee: Employ;
}

const UpdateForm = ({ onUpdateEmployee, employee }:UpdateFormProps) => {
  const [updatedName, setUpdatedName] = useState<string>(employee.name);
  const [updatedDepartment, setUpdatedDepartment] = useState<string>(employee.department);
  const [updatedSalary, setUpdatedSalary] = useState<number>(employee.salary);

  const handleUpdate = () => {
    const updatedEmployee: Employ = {
      id: employee.id,
      name: updatedName,
      department: updatedDepartment,
      salary: updatedSalary,
    };

    onUpdateEmployee(employee.id, updatedEmployee);
  };

  return (
    <div style={{ marginTop: '30px', marginBottom: '20px', textAlign: 'center', display : 'flex', justifyContent : 'center'}}>
      
      <Avatar sx={{ bgcolor: deepPurple[500], marginTop :'8px'}}>{employee.id}</Avatar>
      
      <TextField
        label="Name"
        variant="outlined"
        value={updatedName}
        onChange={(e) => setUpdatedName(e.target.value)}
        style={{ marginLeft: '10px', width: '150px' }}
      />
     <Select
        label="Department"
        variant="outlined"
        value={updatedDepartment}
        onChange={(e) => setUpdatedDepartment(e.target.value as string)}
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
        value={updatedSalary}
        onChange={(e) => setUpdatedSalary(Number(e.target.value))}
        style={{ marginLeft: '10px', width: '100px' }}
      />
      <Button variant="contained" onClick={handleUpdate} style={{ marginLeft: '10px' }}>
        Update
      </Button>
    </div>
  );
};

export default UpdateForm;
