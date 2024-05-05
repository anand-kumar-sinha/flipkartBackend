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

  app.listen(4000);