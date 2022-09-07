const express = require("express"); 
const router = express.Router();
const User=require("../models/hospital")
// http://127.0.0.1:5000/api/hospital/Ho.Data


router.get("/Ho.Data", async (req, res) => {
    try {
      const data = await User.find();
      res.send(data);
  
    } catch (error) {
      res.status(500).send("Sorry some error occurd ");
    }
  });
  module.exports = router;