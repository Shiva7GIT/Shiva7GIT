import EmployModel, { Employ } from '../model/EmployModel';

class EmployService {
  async getAllEmployees() {
    try {
      return await EmployModel.find();
    } catch (error) {
      throw new Error('Error fetching employees');
    }
  }

  async addEmployee(newEmployee: Employ){
    try {
      const data=new EmployModel(newEmployee);
      return await data.save();
    } catch (error) {
      throw new Error('Error adding employee');
    }
  }

  async deleteEmployee(id: number){
    try {
      await EmployModel.deleteOne({id:id});
    } catch (error) {
      throw new Error('Error deleting employee');
    }
  }
}

export default new EmployService();
