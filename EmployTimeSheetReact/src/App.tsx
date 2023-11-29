import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button
} from '@mui/material';
import axios from 'axios';
// import DateRangeIcon from '@mui/icons-material/DateRange';
// import DatePicker from '@mui/lab/DatePicker';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';

interface Timesheet {
  _id: string;
  employeeId: number;
  weeks: {
    week: number;
    days: {
      date: string;
      task: string;
      hours: number;
    }[];
  }[];
}

const App: React.FC = () => {
  const [employeeId, setEmployeeId] = useState<number | string>('');
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newTask, setNewTask] = useState<string>('');
  const [newHours, setNewHours] = useState<string>('');

  useEffect(() => {
    // Fetch timesheets on component mount
    fetchTimesheets();
  }, []);

  const fetchTimesheets = async () => {
    try {
      const response = await axios.get<Timesheet[]>(`http://localhost:5000/timesheets/${employeeId}`);
      setTimesheets(response.data);
    } catch (error) {
      console.error('Error fetching timesheets:', error);
    }
  };

  const handleEmployeeIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeId(event.target.value);
  };

  // const handleDateChange = (date: Date | null) => {
  //   setSelectedDate(date);
  // };

  const generateDaysOfWeek = () => {
    const daysOfWeek: string[] = [];
    if (selectedDate) {
      const startOfWeek = new Date(selectedDate);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Find Monday
      for (let i = 0; i < 7; i++) {
        const currentDay = new Date(startOfWeek);
        currentDay.setDate(startOfWeek.getDate() + i);
        daysOfWeek.push(currentDay.toISOString().split('T')[0]);
      }
    }
    return daysOfWeek;
  };

  const handleNewTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleNewHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewHours(event.target.value);
  };

  const handleAddTask = async () => {
    try {
      await axios.post('http://localhost:5000/timesheets', {
        employeeId,
        weeks: [{
          week: 1, // Assuming week 1 for simplicity, you might want to handle weeks dynamically
          days: generateDaysOfWeek().map((day) => ({
            date: day,
            task: newTask,
            hours: parseInt(newHours, 10), // Convert to number
          })),
        }],
      });

      // Clear input values after adding a new task
      setNewTask('');
      setNewHours('');

      // Fetch timesheets after adding a new task
      fetchTimesheets();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3}>
        <Typography variant="h5">Timesheet Frontend</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="employeeId"
          label="Employee ID"
          name="employeeId"
          autoFocus
          value={employeeId}
          onChange={handleEmployeeIdChange}
        />
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(date) => handleDateChange(date)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                margin="normal"
                required
                fullWidth
              />
            )}
          />
        </LocalizationProvider> */}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="newTask"
          label="New Task"
          name="newTask"
          value={newTask}
          onChange={handleNewTaskChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="newHours"
          label="Hours"
          name="newHours"
          value={newHours}
          onChange={handleNewHoursChange}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAddTask}
        >
          Add Task
        </Button>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={fetchTimesheets}
        >
          Fetch Timesheets
        </Button>
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                {generateDaysOfWeek().map((day) => (
                  <TableCell key={day}>{day}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {timesheets.map((timesheet) => (
                timesheet.weeks.map((week) => (
                  week.days.map((day) => (
                    <TableRow key={`${timesheet._id}-${week.week}-${day.date}`}>
                      {generateDaysOfWeek().includes(day.date) && (
                        <TableCell>{day.task}</TableCell>
                      )}
                    </TableRow>
                  ))
                ))
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default App;
