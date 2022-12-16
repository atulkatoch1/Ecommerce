const express = require('express');
const {data} = require('./data');

const app = express();
const cors = require("cors");

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // For legacy browser support
  };
app.use(cors(corsOptions));

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