const express = require("express");
const User = require("../models/patient");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const fatchuser = require("../middleware/fatchuser");
const { body, validationResult } = require("express-validator");
const JWT_SECRET = "Dhrup@l";

//post
router.post(
  "/createUser",
  [
    body("name", "enter velid name ").isLength({ min: 3 }),
    body("email").isEmail(),
    body("phone").isLength(10),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    //Check whether the user with this  exisist alredy
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success,error: "sorry, user with this email is alredy exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const secpwd = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        phone:req.body.phone,
        password: secpwd,
        
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      //  console.log(authToken);
      success=true;
      res.json({success,authToken});
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Sorry some error occured");
    }
  }
);

// router.post(
//   "/createUser",

//   async (req, res) => {
   
//     try {    
//     let user = await User.create({
//         name: req.body.name,
//         email: req.body.email,
//         phone:req.body.phone,
//         password:req.body.password
//       });
//       res.json(user);
//       res.redirect('.../static/home.html')
//     } catch (error) {
//       console.log("The error is " +error.message);
//       res.status(500).send("Sorry some error occured");
//     }
//   }
// );

//Login
router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }


    const { email, password } = req.body;


    try {
      let user = await User.findOne({ email });
      if (!user) {
        res
          .status(400)
          .json({ success,error: "Please try to login with currect creadnentials" });
      }
      const passwordcompare = await bcrypt.compare(password, user.password); //it returns true false
      if (!passwordcompare) {
        res
          .status(400)
          .json({ success,error: "Please try to login with currect creadnentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      //  console.log(authToken);
      success=true;
      res.json({success,authToken});
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error occurd");
    }
  }
);


//delete
router.delete('/delete/:id',async(req,res)=>{
  try {
    let data =await User.findById(req.params.id);
    if (!data) {
      return res.status(404).send("Not found or deleted");
    }
    data = await User.findByIdAndDelete(req.params.id);
    res.json("user will be deleted");
  } catch (error) {
   res.json("error is "+error) 
  }
})

//getAllTheData
router.get("/data", async (req, res) => {
  try {
    const data = await User.find();
    res.send(data);

  } catch (error) {
    res.status(500).send("Sorry some error occurd ");
  }
});
module.exports = router;
