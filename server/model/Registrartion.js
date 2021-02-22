import mongoose from "mongoose";

const user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone:{
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword:{
    type: String,
    required: true,
  }
});

const userModel = mongoose.model('user',user)

export default userModel;
