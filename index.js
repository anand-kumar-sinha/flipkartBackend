const express = require("express");
const app = express();
const cors = require("cors");
require("./db/config");
const Product = require("./db/Product");
const User = require("./db/User");
app.use(express.json());
app.use(cors());

//loginin user
app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    const user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.json("useremail and password wrong");
    }
  } else {
    res.json("Please Enter useremail and password");
  }
});

//creating product  --> admin
app.post("/admin/product/add", async (req, res) => {
  try {
    if (
      req.body.name &&
      req.body.price &&
      req.body.brand &&
      req.body.category &&
      req.body.imgUrl
    ) {
      const product = Product(req.body);
      let result = await product.save();
      if (result) {
        res.status(200).send(result);
      }
    } else {
      res.json("Please Enter product full details");
    }
  } catch (error) {
    res.json("Please Enter detail care fully or change product ID");
  }
});

//get all products --> user

app.get("/products", async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.json("No Products Found");
  }
});

//search product

app.get('/search/:key', async (req, res) =>{
    const product = await Product.find({
      $or : [
        {name : { $regex : req.params.key}},
        {price : { $regex : req.params.key}},
        {brand : { $regex : req.params.key}},
        {category : { $regex : req.params.key}},
      ]
    })
  
    res.send(product)
  })

app.listen(4000);
