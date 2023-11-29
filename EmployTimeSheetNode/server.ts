// server.ts
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.listen(port,()=>{
  console.log('server running')
  mongoose.connect("mongodb://127.0.0.1:27017/TimeSheet")
.then
  console.log('db connected')
})
const timesheetSchema = new mongoose.Schema({
  employeeId: Number,
  weeks: [
    {
      week: Number,
      days: [
        {
          date: String,
          task: String,
          hours: Number,
        },
      ],
    },
  ],
});

const Timesheet = mongoose.model('Timesheet', timesheetSchema);

app.get('/timesheets/:employeeId', async (req, res) => {
  try {
    const timesheets = await Timesheet.find({ employeeId: req.params.employeeId });
    res.json(timesheets);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/timesheets/:employeeId', async (req, res) => {
  const  employeeId = req.params.employeeId;
  const data=req.body;

  const updatedTimesheetData = {
    employeeId,
    data
  };

  try {
    const updatedTimesheet = await Timesheet.updateOne(
      { employeeId },
      { $set: data }, 
      { new: true }
    );

    if (!updatedTimesheet) {
      return res.status(404).json({ error: 'Timesheet not found' });
    }

    res.json(updatedTimesheet);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/timesheets', async (req, res) => {
  const { employeeId, weeks } = req.body;
  const timesheet = new Timesheet({ employeeId, weeks });
    const savedTimesheet = await timesheet.save();
    res.json(savedTimesheet);
  
});


