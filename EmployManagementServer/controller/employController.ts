import { Request, Response } from 'express';
import EmployService from '../service/employService';

class EmployController {
  async getAllEmployees(req: Request, res: Response){
    try {
      const employees = await EmployService.getAllEmployees();
      res.json(employees);
    } catch (error:any) {
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  }

  async addEmployee(req: Request, res: Response){
    try {
      const newEmployee = req.body;
      const addedEmployee = await EmployService.addEmployee(newEmployee);
      res.status(201).json(addedEmployee);
    } catch (error:any) {
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  }

  async deleteEmployee(req: Request, res: Response){
    try {
      const id = Number(req.params.id)
      await EmployService.deleteEmployee(id);
      res.status(204).send();
    } catch (error:any) {
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  }
}

export default new EmployController();
