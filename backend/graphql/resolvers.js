const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const Employee = require('../models/Employee');
require('dotenv').config();

// Helper function to authenticate user via JWT
const authenticate = (req) => {
  if (!req || !req.headers || !req.headers.authorization) {
    throw new Error("Authentication token required");
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

const resolvers = {
  Query: {
    // **Login Query**
    login: async (_, { username, password }) => {
      const user = await User.findOne({ $or: [{ username }, { email: username }] });
      if (!user) throw new Error('User not found');

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error('Invalid credentials');

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return { token, user };
    },

    // **Get All Employees Query**
    getAllEmployees: async (_, __, { req }) => {
      const userId = authenticate(req);
      return await Employee.find({ created_by: userId });
    },

    // **Search Employee by ID**
    searchEmployeeById: async (_, { eid }, { req }) => {
      await authenticate(req); // Ensure user is authenticated
    
      // Check if eid is missing or not a valid MongoDB ObjectId
      if (!eid || !mongoose.Types.ObjectId.isValid(eid)) {
        throw new Error("Invalid Employee ID format. Please provide a valid ObjectId.");
      }
    
      const employee = await Employee.findById(eid);
      if (!employee) throw new Error("Employee not found");
    
      return employee;
    },
    

    // **Search Employees by Designation or Department**
    searchEmployeeByDesignationOrDepartment: async (_, { designation, department }, { req }) => {
      await authenticate(req);
      return await Employee.find({ $or: [{ designation }, { department }] });
    }
  },

  Mutation: {
    signup: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error('User already exists');
  
      const user = new User({ username, email, password });
      await user.save();
      return user;
    },
    
    addEmployee: async (_, args, { req }) => {
      const userId = authenticate(req);
    
      const requiredFields = [
        'first_name', 'last_name', 'email', 'gender',
        'designation', 'salary', 'date_of_joining', 'department'
      ];
      for (const field of requiredFields) {
        if (!args[field]) throw new Error(`Missing field: ${field}`);
      }
    
      args.salary = parseFloat(args.salary);
      args.date_of_joining = new Date(args.date_of_joining);
    
      const employee = new Employee({ ...args, created_by: userId });
      return await employee.save();
    },
    
    
    // **Update Employee Mutation**
    updateEmployee: async (_, { eid, ...updates }, { req }) => {
      await authenticate(req);
      
      // Validate ObjectId before updating
      if (!mongoose.Types.ObjectId.isValid(eid)) {
        throw new Error("Invalid Employee ID format");
      }

      const employee = await Employee.findByIdAndUpdate(eid, updates, { new: true });
      if (!employee) throw new Error("Employee not found");
      
      return employee;
    },

    // **Delete Employee Mutation**
    deleteEmployee: async (_, { eid }, { req }) => {
      await authenticate(req);
      
      // Validate ObjectId before deleting
      if (!mongoose.Types.ObjectId.isValid(eid)) {
        throw new Error("Invalid Employee ID format");
      }

      const employee = await Employee.findByIdAndDelete(eid);
      if (!employee) throw new Error("Employee not found");

      return "Employee deleted successfully";
    }
  }
};

module.exports = resolvers;
