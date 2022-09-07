const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type:String,
    required:true,
  },
  phone:{
    type:Number,
    minlength:10,
    maxlength:10
  }
});
const User = mongoose.model("Patient", userSchema);
module.exports = User;