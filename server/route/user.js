import { Router } from "express";
import userModel from "../model/Registrartion.js";
import employeeModel from "../model/CreateEmploye.js";
import {
  registrationValidation,
  loginValidation,
  employeValidation
} from "../utils/userInputValidation.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/", async (req, res) => {
  const userList = await employeeModel.find();
  res.send(userList);
});

router.get("/me", async(req,res) =>{
  const token = req.header('token');

  if(!token) {
    res.json({auth:false })
  }

  try {
    const verification = jwt.verify(token, process.env.jwtSecret)
    // console.log("verification",verification);
    res.json({auth: true})
  } catch (error) {
    res.json({auth:false})
  }
  
})

const getKey = (obj, value) => {
  const key = Object.keys(obj).find((key) => obj[key] === value);
  return key;
};

const errorsend = {};

router.post("/registration", async (req, res) => {
  const { name, email, phone, password, confirmPassword } = req.body;

  const { errors, valid } = registrationValidation(
    name,
    email,
    phone,
    password,
    confirmPassword
  );

  if (!valid) {
    const err = { error: true, errors };
    res.json(err);
  }

  const hashedPassword = await argon2.hash(password);

  const newUser = new userModel({
    name,
    phone,
    email,
    hashedPassword,
  });

  try {
    const saveUser = await newUser.save();
    // req.session.name = saveUser.name
    const token = jwt.sign({user: saveUser.name}, process.env.jwtSecret, {expiresIn: "1h"});
    res.json({auth: true, token})
  } catch (error) {
    console.log(error)
    if ((error.code = "11000")) {
      const field = getKey(error.keyPattern, 1);
      errorsend[
        field
      ] = `It is already taken ${error.keyValue[field]}, try anotherone`;
    }
    const err = { error: true, errors: errorsend };
    res.json(err);
  }
});

router.post("/login", async (req, res) => {
  const { EmailOrPhone, password } = req.body;

  const { errors, valid } = loginValidation(EmailOrPhone, password);

  if (!valid) {
    const err = { error: true, errors };
    res.json(err);
  }

  const loginUser = await userModel.findOne(
    EmailOrPhone.includes("@")
      ? { email: EmailOrPhone }
      : { phone: EmailOrPhone }
  );

  if (loginUser) {
    const valid = await argon2.verify(loginUser.hashedPassword, password);

    if (!valid) {
      errorsend.password = "password did't match";
      const err = { error: true, errors: errorsend };
      res.json(err);
    }
    // req.session.name = "satish"
    const token = jwt.sign({user: loginUser.name}, process.env.jwtSecret, {expiresIn: "1h"});
    res.json({auth: true, token})
  } else {
    errorsend.EmailOrPhone = "email or phone not registrated";
    const err = { error: true, errors: errorsend };
    res.json(err);
  }
});

router.post("/add-employee", async (req, res) => {
  const { name, age, salary, phoneNumber } = req.body;
  
  const {errors,valid} = employeValidation(name,age,salary,phoneNumber);
  
  if (!valid) {
    const err = { error: true, errors };
    res.json(err);
  }
  
  const newEmployee = new employeeModel({
    name,
    age,
    salary,
    phoneNumber,
  });

  try {
    await newEmployee.save();
  } catch (error) {
    if ((error.code = "11000")) {
      const field = getKey(error.keyPattern, 1);
      console.log("field", field);
      errorsend[
        field
      ] = `It is already taken ${error.keyValue[field]}, try anotherone`;
    }
    const err = { error: true, errors: errorsend };
    console.log("err", err);
    res.json(err);
  }

  const userList = await employeeModel.find();
  res.send(userList);
});

export default router;
