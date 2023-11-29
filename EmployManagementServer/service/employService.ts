import EmployModel, { Employ } from '../model/EmployModel';


  const getAllEmployees = async () => {
    try {
      const data = await EmployModel.find(); 
        return data
    } catch (error) {
      throw new Error('Error fetching employees');
    }
  };

  const addEmployee = async (newEmployee: Employ) => {
    try {
      const data = new EmployModel(newEmployee);
      return await data.save();
    } catch (error) {
      throw new Error('Error adding employee');
    }
  };

  const deleteEmployee = async (id: number) => {
    try {
      await EmployModel.deleteOne({ id: id });
    } catch (error) {
      throw new Error('Error deleting employee');
    }
  };

  const updateEmploy = async (id: number, updatedEmployeeData: Employ) => {
    try {
      const result = await EmployModel.updateOne(
        { id: id },
        { $set: updatedEmployeeData }
      );

      if (result.modifiedCount === 0) {
        throw new Error('Employ not found or no changes made');
      }

      return await EmployModel.findOne({ id: id });
    } catch (error) {
      throw new Error('Error updating employee');
    }
  };

  


export{
  getAllEmployees,
  addEmployee,
  deleteEmployee,
  updateEmploy,
}
