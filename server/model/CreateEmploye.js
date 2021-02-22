import mongoose from "mongoose";

const employeeInfo = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  age:{
    type: Number,
    required: true,
  },
  salary:{
    type: Number,
    required: true,
  },
  phoneNumber:{
    type: String,
    required: true,
    unique: true
  }
});

const employeeModel = mongoose.model('employeeInfo',employeeInfo)

export default employeeModel;
