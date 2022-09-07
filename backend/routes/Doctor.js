const express = require("express"); 
const router = express.Router();
const User=require("../models/doctor")
// http://127.0.0.1:5000/api/doctor/Do.Data
router.get("/Do.Data", async (req, res) => {
    try {
      const data = await User.find();
      res.send(data);
  
    } catch (error) {
      res.status(500).send("Sorry some error occurd ");
    }
  });
  module.exports = router;