import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import employController from './controller/employController';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/employees', employController.getAllEmployees.bind(employController));
app.post('/createEmploy', employController.addEmployee.bind(employController));
app.delete('/deleteEmploy/:id', employController.deleteEmployee.bind(employController));
app.put('/updateEmploy/:id' , employController.updateEmployee.bind(employController))

app.listen(port,()=>{
    console.log('server running')
    mongoose.connect("mongodb://127.0.0.1:27017/EMPLOY")
.then
    console.log('db connected')
})
