const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  designation: { type: String, required: true },
  salary: { type: Number, required: true, min: 1000 },
  date_of_joining: { type: Date, required: true },
  department: { type: String, required: true },
  employee_photo: { type: String },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 👈 NEW
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
