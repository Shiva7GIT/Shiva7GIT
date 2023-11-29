import express, { Request, Response,Router } from 'express';
import {getAllEmployees, addEmployee,deleteEmployee,updateEmploy,}from '../service/EmployService';
const app = express();
const router = express.Router();

  router.get('/employees', async (req: Request, res: Response) => {
    try {
      const employees = await getAllEmployees();
      res.json(employees);
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  });

  router.post('/createEmploy', async (req: Request, res: Response) => {
    try {
      const newEmployee = req.body;
      const addedEmployee = await addEmployee(newEmployee);
      res.status(201).json(addedEmployee);
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  });

 router.delete('/deleteEmploy/:id', async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await deleteEmployee(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  });

  router.put('/updateEmploy/:id', async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const updatedEmployeeData = req.body;
      const updatedEmployee = await updateEmploy(id, updatedEmployeeData);
      res.json(updatedEmployee);
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  });

  export{ router};
  
