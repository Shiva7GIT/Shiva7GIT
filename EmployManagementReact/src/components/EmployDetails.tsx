import React, { useState } from 'react';
import { Avatar, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Employ from '../types/interface';
import UpdateForm from './EmployUpdate';
import EmployForm from './Employ';

interface EmployDetailsProps {
  employDetails: Employ[];
  onDeleteEmploy: (id: number) => void;
  onUpdateEmploy: (id: number, updatedEmployee: Employ) => void;
}

const EmployDetails: React.FC<EmployDetailsProps> = ({ employDetails, onUpdateEmploy, onDeleteEmploy }) => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employ | null>(null);

  const handleUpdateClick = (employee: Employ) => {
    setSelectedEmployee(employee);
  };

  const handleUpdateEmployee = (id: number, updatedEmployee: Employ) => {
    onUpdateEmploy(id, updatedEmployee);
    setSelectedEmployee(null); 
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TableContainer component={Paper} style={{ maxWidth: '600px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Salary</TableCell>
                <TableCell>Delete</TableCell>
                <TableCell>Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employDetails.map((employ) => (
                <TableRow key={employ.id}>
                  <TableCell><Avatar sx={{ marginTop :'8px'}}>{employ.id}</Avatar></TableCell>
                  <TableCell>{employ.name}</TableCell>
                  <TableCell>{employ.department}</TableCell>
                  <TableCell>{employ.salary}</TableCell>
                  <TableCell>
                    <Button onClick={() => onDeleteEmploy(employ.id)}>
                      <IconButton aria-label="delete" size="large">
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleUpdateClick(employ)}>
                      <IconButton aria-label="update" size="large">
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {selectedEmployee && (
        <div style={{ marginTop: '20px' }}>
          <UpdateForm onUpdateEmployee={handleUpdateEmployee} employee={selectedEmployee} />
        </div>
      )}
    </>
  );
};

export default EmployDetails;
