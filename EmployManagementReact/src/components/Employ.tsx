import { useState } from 'react';
import {Button, MenuItem, Paper, Select, Table, TableBody,TableCell, TableContainer, TableHead, TableRow, TextField} from '@mui/material';
import Employ from './interface';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DenseAppBar from './Header';
const EmployForm= () => {
  const [name, setName] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [salary, setSalary] = useState<number>(0);
  const [employees, setEmployees] = useState<Employ[]>([]);

  const handleAddEmploy = () => {
    const newEmploy: Employ = {
      id: employees.length + 1,
      name,
      department,
      salary,
    };
    setEmployees([...employees, newEmploy]);
    setName('');
    setDepartment('');
    setSalary(0);
  };
  const handleDeleteEmploy = (id: number) => {
    const updatedEmployees = employees.filter((employ) => employ.id !== id);
    setEmployees(updatedEmployees);
  };

  return (
    <div>
      <DenseAppBar></DenseAppBar>
      <div style={{marginTop: '30px', marginBottom: '20px', textAlign: 'center'}}>
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
          <MenuItem value="IT">IT</MenuItem>
          <MenuItem value="HR">HR</MenuItem>
          <MenuItem value="Finance">Finance</MenuItem>
        </Select>
        <TextField
          label="Salary"
          variant="outlined"
          type="number"
          value={salary}
          onChange={(e) => setSalary(Number(e.target.value))}
          style={{ marginLeft: '10px', width: '100px' }}
        />
        <Button variant="contained" onClick={handleAddEmploy} style={{ marginLeft: '10px' }}>
        <AddIcon />
        </Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TableContainer component={Paper} style={{ maxWidth: '600px' }}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Salary</TableCell>
              {
              (employees.length>0) &&
              <TableCell>Delete</TableCell>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employ) => (
              <TableRow key={employ.id}>
                <TableCell>{employ.id}</TableCell>
                <TableCell>{employ.name}</TableCell>
                <TableCell>{employ.department}</TableCell>
                <TableCell>{employ.salary}</TableCell>
                <TableCell>
                <Button  onClick={() => handleDeleteEmploy(employ.id)}>
                   <IconButton aria-label="delete" size="large">
                   <DeleteIcon fontSize="inherit" />
                 </IconButton>
                 </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </div>
  );
};

export default EmployForm;
