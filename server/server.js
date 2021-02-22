import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import Store from "connect-mongo";

const app = express();
app.use(cors());
app.use(express.json())
dotenv.config();
const MongoStore = Store(session)

import UserRouter from "./route/user.js"

const main = async () => {
  // db connection
  const conn = await mongoose.connect(process.env.dbconnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`db connect on : ${conn.connection.host}`);

  app.use(session({
    name: 'super',    
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    secret: process.env.sessionSecret,
    cookie:{
      path: '/audit',
      maxAge: 1000*60*60*24,
      httpOnly: true,
      secure: false,
    },
    resave: false,
    saveUninitialized: false
  }))
  
  app.get("/test", (req, res) => {
    const obj = {
      "hello":"satish"
    }
    res.json(obj);
  });

  app.use('/user',UserRouter)

  app.listen(process.env.port, () => {
    console.log("server is running on port : ", process.env.port);
  });
};

main().catch((error) => {
  console.log(error);
});
