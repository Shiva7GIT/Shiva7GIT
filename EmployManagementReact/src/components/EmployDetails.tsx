
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton } from '@mui/material';
import Employ from '../types/interface';
import DeleteIcon from '@mui/icons-material/Delete'
interface EmployDetailsProps {
  employDetails: Employ[];
  onDeleteEmploy: (id: number) => void;
}

const EmployDetails = ({ employDetails, onDeleteEmploy }: EmployDetailsProps) => {
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
                {employDetails.length > 0 && <TableCell>Delete</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {employDetails.map((employ) => (
                <TableRow key={employ.id}>
                  <TableCell>{employ.id}</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default EmployDetails;
