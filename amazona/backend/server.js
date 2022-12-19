const express = require('express');
const {data} = require('./data');
require('dotenv').config();
import userRoute from './routes/userRoute';
import {config} from './config';

const mongoose = require('mongoose');
const mongodbUrl = config.MONGODB_URL

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
      const conn = await mongoose.connect(mongodbUrl)
      console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
      console.log(error);
      process.exit(1);
  }
}
connectDB();

const app = express();
const cors = require("cors");

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // For legacy browser support
  };
app.use(cors(corsOptions));

app.use("/api/users", userRoute);

app.get("/api/products/:id", (req,res) => {
  const productId = req.params.id;
  const product = data.products.filter(x=>x._id === productId)
  if (product) {
    res.send(...product);    
  } else {
    res.status(404).send({msg: "Product Not Found"})
  }
})

app.get("/api/products", (req,res) => {
    res.send(data.products);
})

app.listen(5000, () => { console.log(`Server started at http://localhost:5000`) });