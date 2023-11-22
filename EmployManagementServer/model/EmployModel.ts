import mongoose, { Document } from 'mongoose';

export interface Employ extends Document {
  id : number;
  name: string;
  department: string;
  salary: number;
}

const EmploySchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  salary: { type: Number, required: true },
});

export default mongoose.model<Employ>('Employ', EmploySchema);
